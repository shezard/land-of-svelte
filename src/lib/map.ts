import { writable } from 'svelte/store';

import level0 from '$lib/maps/level-0.json';

export type Position2d = [number, number];

export type Map2d = number[][];

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

const createTiles = function () {
	const { subscribe, set } = writable<Map2d>(
		swapXY(level0.width, level0.height, level0.textureMap)
	);

	return {
		subscribe,
		set
	};
};

export const tiles = createTiles();

const createCollisions = () => {
	const { subscribe, set } = writable<Map2d>(
		swapXY(level0.width, level0.height, level0.collisionMap)
	);

	return {
		subscribe,
		set
	};
};

export const collisions = createCollisions();

const createLights = () => {
	const { subscribe, set } = writable<Map2d>(
		swapXY(level0.width, level0.height, level0.lightMap)
	);

	return {
		subscribe,
		set
	};
};

export const lights = createLights();
