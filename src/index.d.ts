import type { Level } from '$lib/Level';
import type { Player } from '$lib/Player';
import type { ColorRepresentation } from 'three';

export type Position2d = [number, number];
export type Map2d = number[][];

export type GameState = (
	| {
			state: 'mainMenu' | 'controlMenu';
			running: 'newGame' | 'continue';
	  }
	| {
			state: 'running' | 'inventory';
			running: 'continue' | 'gameOver';
	  }
) & {
	isLoading: boolean;
};

export interface Store {
	game: GameState;
	levels: Level[];
	currentLevelNumber: number;
	player: Player;
	screen: {
		shaking: boolean;
	};
	ui: UI;
}

export interface LevelProp {
	width: number;
	height: number;
	floor: number;
	collisionMap: Map2d;
	textureMap: Map2d;
	lightMap: Map2d;
	scripts: Script[];
	ceiling: number;
}

export type Doodad = {
	id: number;
	type: 'door' | 'button' | 'ladder';
	collision?: boolean;
	texture: string[];
	color?: ColorRepresentation;
	z?: number;
} & OrientedPosition;

export type AI = {
	id: number;
	type: 'ai';
	name: string;
	collision?: boolean;
	texture: string[];
	color?: number;
	stats: Stats;
	loot?: ItemName;
	z?: number;
} & OrientedPosition;

export type Panel = {
	id: number;
	type: 'panel';
	collision?: boolean;
	texture: string[];
	color?: ColorRepresentation;
	content: string[];
	z?: number;
} & OrientedPosition;

export type Loot = {
	id: number;
	type: 'loot';
	name: string;
	texture: string[];
	collision?: boolean;
	texture: string;
	color?: ColorRepresentation;
	z?: number;
} & OrientedPosition;

export type Script = Doodad | AI | Loot | Panel;

export interface OrientedPosition {
	x: number;
	y: number;
	t: number;
}

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
	stats: Stats;
	cooldown: number;
	lastAttackTimestamp: number;
}

export interface UI {
	weaponCooldownPercent: number;
}
