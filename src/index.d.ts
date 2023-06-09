import type { AiName } from '$lib/Ai';
import type { DoodadName } from '$lib/Doodad';
import type { Level } from '$lib/Level';
import type { ColorRepresentation } from 'three';

export type Position2d = [number, number];
export type Map2d = number[][];

export type GameState = (
    | {
          state: 'main' | 'control' | 'editor';
          running: 'newGame' | 'continue';
      }
    | {
          state: 'running' | 'inventory' | 'container';
          running: 'continue' | 'gameOver';
      }
) & {
    isLoading: boolean;
};

export interface Store {
    game: GameState;
    levels: Level[];
    currentLevelNumber: number;
    screen: {
        shaking: boolean;
        dirty: boolean;
    };
}

export interface LevelProp {
    width: number;
    height: number;
    floor: string;
    ceiling: string;
    collisionMap: Map2d;
    textureMap: string[][];
    lights: Light[];
    scripts: Script[];
}

export type Doodad = {
    id: number;
    type: DoodadName;
    collision?: boolean;
    interactive?: boolean;
    texture: string[];
    color?: ColorRepresentation;
    z?: number;
} & OrientedPosition;

export type Npc = {
    id: number;
    type: 'npc';
    name: string;
    collision?: boolean;
    texture: string[];
    dialogs: string[];
    color?: number;
    depth?: number;
} & OrientedPosition;

export type AiMode = 'idle' | 'attack-on-sight';

export type Ai = {
    id: number;
    type: 'ai';
    name: AiName;
    mode: AiMode;
    collision?: boolean;
    texture: string[];
    color?: number;
    stats: Stats;
    loot?: ItemName;
    xp: number;
} & OrientedPosition;

export type Panel = {
    id: number;
    type: 'panel';
    collision?: boolean;
    texture: string[];
    color?: ColorRepresentation;
    content: string[];
} & OrientedPosition;

export type Loot = {
    id: number;
    type: 'loot';
    name: ItemName;
    texture: string[];
    collision?: boolean;
    color?: ColorRepresentation;
} & OrientedPosition;

export type Container = {
    id: number;
    type: 'container';
    name: string;
    texture: string[];
    collision?: boolean;
    content: ItemName[];
} & OrientedPosition;

export type Script = Doodad | Ai | Npc | Loot | Panel | Container;

export interface OrientedPosition {
    x: number;
    y: number;
    t: number;
}

export interface BaseStats {
    strength: number;
    dexterity: number;
    wisdom: number;
}

export type BaseStatsName = keyof BaseStats;

export interface Stats {
    hp: number;
    maxHp: number;
    ac: number;
    hit: number;
    pDefense: number;
    pAttack: number;
}

export interface Inventory {
    mainHand: Item | null;
    offHand: Item | null;
    armor: Item | null;
    bag: Item[];
}

type ItemName = 'sword' | 'shield' | 'armor' | 'key' | 'not-found';

export interface Item {
    name: ItemName;
    texture: string;
    slot: 'mainHand' | 'offHand' | 'armor' | 'none';
    baseStats: BaseStats;
    stats: Stats;
    cooldown: number;
    lastAttackTimestamp: number;
}

export interface UI {
    weaponCooldownPercent: number;
}

export type Light = { id: number } & OrientedPosition;

export type Tile = {
    collision: boolean;
    light?: Light;
    texture: string;
    script?: Script;
} & OrientedPosition;
