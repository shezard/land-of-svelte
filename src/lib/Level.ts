import type {
    AI,
    Script,
    LevelProp,
    Map2d,
    Store,
    Loot,
    OrientedPosition,
    Light,
    AIName,
    DoodadName
} from '..';
import { advanceAi, makeAI } from './AI';
import { makeDoodad } from './Doodad';
import { makeNpc } from './Npc';

export class Level {
    width: number;
    height: number;
    floor: string;
    ceiling: string;
    collisionMap: Map2d;
    textureMap: string[][];
    lights: Light[];
    scripts: Script[];

    constructor(level: LevelProp) {
        this.width = level.width;
        this.height = level.height;
        this.floor = level.floor;
        this.ceiling = level.ceiling;
        this.collisionMap = level.collisionMap;
        this.textureMap = level.textureMap;
        this.lights = level.lights;
        this.scripts = level.scripts;
    }

    resize(width: number, height: number): Level {
        const level = new Level(this);

        level.width = width;
        level.height = height;

        level.collisionMap = [];
        level.textureMap = [];

        for (let x = 0; x < width; x++) {
            if (!level.collisionMap[x]) {
                level.collisionMap[x] = [];
            }

            if (!level.textureMap[x]) {
                level.textureMap[x] = [];
            }

            for (let y = 0; y < height; y++) {
                if (!level.collisionMap[x][y]) {
                    if (!this.collisionMap[x]?.[y]) {
                        level.collisionMap[x][y] = 0;
                    } else {
                        level.collisionMap[x][y] = this.collisionMap[x][y];
                    }
                }

                if (!level.textureMap[x][y]) {
                    if (!this.textureMap[x]?.[y]) {
                        level.textureMap[x][y] = 'wall-0';
                    } else {
                        level.textureMap[x][y] = this.textureMap[x][y];
                    }
                }
            }
        }

        return level;
    }

    getAis(): AI[] {
        return this.scripts.filter((item) => {
            return item.type === 'ai';
        }) as AI[];
    }

    getAiAt(x: number, y: number): AI | undefined {
        return this.getAis().find((ai: AI) => {
            return ai.x === x && ai.y === y;
        });
    }

    addAiAt(x: number, y: number, aiName: AIName) {
        const id = Math.max(...this.scripts.map((script) => script.id), 0) + 1;
        this.scripts = [...this.scripts, makeAI(aiName, id, x, y)];
    }

    removeAiAt(x: number, y: number): void {
        const loot = this.getAiAt(x, y)?.loot;

        if (loot) {
            this.scripts.push({
                id: this.scripts.length,
                type: 'loot',
                name: loot,
                collision: false,
                texture: [`${loot}-0`],
                x,
                y,
                t: 0
            });
        }

        this.scripts = this.scripts.filter((script: Script) => {
            return !(script.x === x && script.y === y && script.type === 'ai');
        });
    }

    getLightAt(x: number, y: number): Light | undefined {
        return this.lights.find((light: Light) => {
            return light.x === x && light.y === y;
        });
    }

    addLightAt(x: number, y: number): void {
        const id = Math.max(...this.lights.map((light) => light.id), 0) + 1;
        this.lights = [
            ...this.lights,
            {
                id,
                x,
                y,
                t: 0
            }
        ];
    }

    removeLightAt(x: number, y: number): void {
        this.lights = this.lights.filter((light: Light) => {
            return !(light.x === x && light.y === y);
        });
    }

    getScriptAt(x: number, y: number): Script | undefined {
        return this.scripts.find((script: Script) => {
            return script.x === x && script.y === y;
        });
    }

    removeScriptAt(x: number, y: number): void {
        this.scripts = this.scripts.filter((script: Script) => {
            return !(script.x === x && script.y === y);
        });
    }

    addNpcAt(x: number, y: number, npcName: string) {
        const id = Math.max(...this.scripts.map((script) => script.id), 0) + 1;
        this.scripts = [...this.scripts, makeNpc(npcName, id, x, y)];
    }

    addDoodadAt(x: number, y: number, doodadName: DoodadName): void {
        const id = Math.max(...this.scripts.map((script) => script.id), 0) + 1;
        this.scripts = [...this.scripts, makeDoodad(doodadName, id, x, y)];
    }

    getLoots(): Loot[] {
        return this.scripts.filter((item) => {
            return item.type === 'loot';
        }) as Loot[];
    }

    getWalls(): OrientedPosition[] {
        const walls = [];
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if (this.collisionMap[i][j] == 1) {
                    walls.push({
                        x: i,
                        y: j,
                        t: 0
                    });
                }
            }
        }
        return walls;
    }

    advance(store: Store): Store {
        this.getAis().map(advanceAi(store, this));

        store.levels[store.currentLevelNumber] = this;

        return store;
    }

    getScript(scriptId: number): Script | null {
        const scripts = this.scripts;

        let scriptFound = null;
        scripts.forEach((script: Script) => {
            if (script.id === scriptId) {
                scriptFound = script;
            }
        });

        return scriptFound;
    }

    replaceScript(script: Script) {
        this.scripts = this.scripts.map((oldScript) => {
            if (oldScript.id === script.id) {
                return script;
            }

            return oldScript;
        });
    }
}
