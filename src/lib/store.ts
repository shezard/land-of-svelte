import { writable } from 'svelte/store';

import level0 from '$lib/maps/level-0.json';
import level1 from '$lib/maps/level-1.json';

import { Level } from './Level';
import { Player } from './Player';

export interface Store {
	game: {
		state: 'loading' | 'mainMenu' | 'controlMenu' | 'running';
		running: 'fresh' | 'continue';
	};
	levels: Level[];
	currentLevelNumber: number;
	player: Player;
}

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
			running: 'fresh'
		},
		levels: swappedLevels,
		currentLevelNumber: 0,
		player: new Player(
			{ x: 2, y: 10, t: 0 },
			{
				hp: 10,
				hit: 5,
				ac: 12
			}
		)
	});

	return store;
};

export const store = createStore();
