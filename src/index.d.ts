import type { Level } from '$lib/Level';
import type { Player } from '$lib/Player';

export type GameState = GameState;
export type RunningState = 'fresh' | 'continue';

export type Position2d = [number, number];
export type Map2d = number[][];

export interface Store {
	game: {
		state: 'loading' | 'mainMenu' | 'controlMenu' | 'running';
		running: 'fresh' | 'continue' | 'gameOver';
	};
	levels: Level[];
	currentLevelNumber: number;
	player: Player;
}

export interface LevelProp {
	width: number;
	height: number;
	floor: number;
	collisionMap: Map2d;
	textureMap: Map2d;
	lightMap: Map2d;
	scripts: Script[];
	ceiling: number | undefined;
}

export interface Doodad {
	id: number;
	type: 'door' | 'button' | 'ladder';
	collision?: boolean;
	direction?: number;
	texture?: string;
	color?: string;
	x: number;
	y: number;
	z?: number;
}

export interface AI {
	id: number;
	type: 'ai';
	collision?: boolean;
	direction?: number;
	texture?: string;
	color?: string;
	stats: Stats;
	x: number;
	y: number;
	z?: number;
}

export type Script = Doodad | AI;

export interface OrientedPosition {
	x: number;
	y: number;
	t: number;
}

export interface Stats {
	hp: number;
	ac: number;
	hit: number;
	pDefense: number;
	pAttack: number;
}

export interface Inventory {
	mainHand: null | Item;
	offHand: null;
}

export interface Item {
	name: 'sword';
	texture: string;
	stats: Stats;
}
