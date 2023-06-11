import type { Level } from '$lib/Level';
import type { Player } from '$lib/Player';
import type { ColorRepresentation } from 'three';

export type Position2d = [number, number];
export type Map2d = number[][];

export interface Store {
	game: {
		state: 'loading' | 'mainMenu' | 'controlMenu' | 'running';
		running: 'newGame' | 'continue' | 'gameOver';
	};
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
	ceiling?: number | undefined;
}

export interface Doodad {
	id: number;
	type: 'door' | 'button' | 'ladder';
	collision?: boolean;
	direction?: number;
	texture?: string;
	color?: ColorRepresentation;
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
	color?: ColorRepresentation;
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
	maxHp: number;
	ac: number;
	hit: number;
	pDefense: number;
	pAttack: number;
}

export interface Inventory {
	mainHand: Item;
	offHand: null;
}

export interface Item {
	name: 'sword';
	texture: string;
	stats: Stats;
	cooldown: number;
	lastAttackTimestamp: number;
}

export interface UI {
	weaponCooldownPercent: number;
}
