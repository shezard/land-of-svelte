import type { Level } from '$lib/Level';
import type { Player } from '$lib/Player';

export type GameState = GameState;
export type RunningState = 'fresh' | 'continue';

export type Position2d = [number, number];
export type Map2d = number[][];

export interface Store {
	game: {
		state: 'loading' | 'mainMenu' | 'controlMenu' | 'running';
		running: 'fresh' | 'continue';
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
	items: Item[];
	ceiling: number | undefined;
}

export interface Item {
	id: number;
	type: 'door' | 'button' | 'ladder' | 'ai';
	collision?: boolean;
	direction?: number;
	texture?: string;
	color?: string;
	stats?: Stats;
	x: number;
	y: number;
	z?: number;
}

export interface OrientedPosition {
	x: number;
	y: number;
	t: number;
}

export interface Stats {
	hp: number;
	ac: number;
	hit: number;
}