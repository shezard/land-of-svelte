import type { AI, Script, LevelProp, Map2d, Store, Loot, OrientedPosition } from '..';
import { fight } from './fight';
import { makeAstar } from './grid';
import { logs } from '$stores/logs';

const swapXY = function (width: number, height: number, map: Map2d): Map2d {
	const swappedMap = [] as Map2d;
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if (!swappedMap[y]) {
				swappedMap[y] = [];
			}
			swappedMap[y][x] = map[x][y];
		}
	}
	return swappedMap;
};

export class Level {
	width: number;
	height: number;
	floor: number;
	collisionMap: Map2d;
	textureMap: Map2d;
	lights: OrientedPosition[];
	scripts: Script[];
	ceiling: number;

	constructor(level: LevelProp) {
		this.width = level.width;
		this.height = level.height;
		this.floor = level.floor;
		this.collisionMap = swapXY(level.width, level.height, level.collisionMap);
		this.textureMap = swapXY(level.width, level.height, level.textureMap);
		this.lights = level.lights;
		this.scripts = level.scripts;
		this.ceiling = level.ceiling;
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

	getLightAt(x: number, y: number): OrientedPosition | undefined {
		return this.lights.find((light: OrientedPosition) => {
			return light.x === x && light.y === y;
		});
	}

	getScriptAt(x: number, y: number): Script | undefined {
		return this.scripts.find((script: Script) => {
			return script.x === x && script.y === y;
		});
	}

	getLoots(): Loot[] {
		return this.scripts.filter((item) => {
			return item.type === 'loot';
		}) as Loot[];
	}

	getWalls(): OrientedPosition[] {
		const walls = [];
		for (let i = 0; i < this.width; i++) {
			for (let j = 0; j < this.width; j++) {
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
		const grid = makeAstar(this);

		this.getAis().map((ai) => {
			const nextPosition = grid.search(
				[ai.x, ai.y],
				[store.player.position.x, store.player.position.y],
				{
					rightAngle: true
				}
			);

			if (nextPosition !== undefined && nextPosition.length > 2) {
				ai.x = nextPosition[1][0];
				ai.y = nextPosition[1][1];

				this.replaceScript(ai);
			}

			if (nextPosition !== undefined && nextPosition.length == 2) {
				const newPlayerStats = fight(
					ai.stats,
					store.player.stats,
					() => {
						logs.update((logs) => {
							logs.push(`You dodged a hit`);
							return logs;
						});
					},
					(damage) => {
						logs.update((logs) => {
							logs.push(`You took ${damage} dmg`);
							return logs;
						});
						store.screen.shaking = true;
					},
					() => {
						logs.update((logs) => {
							logs.push('Death!');
							return logs;
						});
						store.game.running = 'gameOver';
					}
				);

				store.player.stats = newPlayerStats;
			}
		});

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
