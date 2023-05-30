import { writable } from 'svelte/store';

import level0 from '$lib/maps/level-0.json';

export type Position2d = [number, number];
export type Map2d = number[][];

type Level = {
    width: number,
    height: number,
    ceiling? : number,
    collisionMap: Map2d,
    textureMap: Map2d,
    lightMap: Map2d,
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

const swappedLevels = [level0].map((level) => {
    level.collisionMap = swapXY(level.width, level.height, level.collisionMap);
    level.textureMap = swapXY(level.width, level.height, level.textureMap);
    level.lightMap = swapXY(level.width, level.height, level.lightMap);
    return level;
});

export const levels = writable<Level[]>(swappedLevels);
