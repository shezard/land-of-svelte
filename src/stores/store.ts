import { derived, writable } from 'svelte/store';

import level0 from '$lib/maps/level-0.json';
import level1 from '$lib/maps/level-1.json';

import { Level } from '../lib/Level';
import { Player } from '../lib/Player';
import type { LevelProp, Map2d, Store } from '..';
import { makeItem } from '../lib/Item';

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

const swappedLevels = [new Level(level0 as LevelProp), new Level(level1 as LevelProp)].map(
	(level) => {
		level.collisionMap = swapXY(level.width, level.height, level.collisionMap);
		level.textureMap = swapXY(level.width, level.height, level.textureMap);
		level.lightMap = swapXY(level.width, level.height, level.lightMap);
		return level;
	}
);

const createStore = () => {
	const store = writable<Store>({
		game: {
			state: 'loading',
			running: 'newGame'
		},
		levels: swappedLevels,
		currentLevelNumber: 0,
		player: new Player(
			{ x: 2, y: 10, t: 0 },
			{
				hp: 10,
				ac: 3,
				hit: 0,
				pDefense: 0,
				pAttack: 0
			},
			{
				mainHand: makeItem('sword'),
				offHand: null
			}
		),
		screen: {
			shaking: false
		},
		ui: {
			weaponCooldownPercent: 100
		}
	});

	return store;
};

export const store = createStore();

export const currentLevel = derived(store, (store) => {
	return store.levels[store.currentLevelNumber];
});
