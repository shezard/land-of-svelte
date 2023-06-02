import { derived, writable } from 'svelte/store';

import level0 from '$lib/maps/level-0.json';
import level1 from '$lib/maps/level-1.json';

export type Position2d = [number, number];
export type Map2d = number[][];

export type Item = {
	id: number;
	type: 'door' | 'button' | 'ladder';
	collision?: boolean;
	texture?: string;
	x: number;
	y: number;
	z?: number;
};

export type Level = {
	width: number;
	height: number;
	ceiling?: number;
	collisionMap: Map2d;
	textureMap: Map2d;
	lightMap: Map2d;
	items: Item[];
};

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

const swappedLevels = [level0, level1].map((level) => {
	level.collisionMap = swapXY(level.width, level.height, level.collisionMap);
	level.textureMap = swapXY(level.width, level.height, level.textureMap);
	level.lightMap = swapXY(level.width, level.height, level.lightMap);
	return level;
}) as Level[];

export const levels = writable<Level[]>(swappedLevels);

export const currentLevelNumber = writable(0);

export const currentLevel = derived(
	[levels, currentLevelNumber],
	([$levels, $currentLevelNumber]) => {
		return $levels[$currentLevelNumber];
	}
);
