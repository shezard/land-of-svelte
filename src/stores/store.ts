import { derived, writable } from 'svelte/store';

import level0 from '$lib/maps/level-0.json';
import level1 from '$lib/maps/level-1.json';

import { Level } from '../lib/Level';
import { Player } from '../lib/Player';
import type { LevelProp, Store } from '..';
import { makeItem } from '../lib/Item';

type Route = 'main' | 'control' | 'running' | 'inventory' | 'container';

const initialStoreState: Store = {
	game: {
		state: 'main',
		running: 'newGame',
		isLoading: true
	},
	levels: [new Level(level0 as LevelProp), new Level(level1 as LevelProp)],
	currentLevelNumber: 0,
	player: new Player(
		{ x: 2, y: 10, t: 0 },
		{
			hp: 10,
			maxHp: 10,
			ac: 3,
			hit: 0,
			pDefense: 0,
			pAttack: 0
		},
		{
			mainHand: makeItem('sword'),
			offHand: null,
			armor: null,
			bag: [makeItem('sword'), makeItem('armor')]
		}
	),
	screen: {
		shaking: false
	}
};

const createStore = () => {
	const { subscribe, set, update } = writable<Store>(initialStoreState);

	const stack: Route[] = ['main'];

	const navigateTo = (target: Route): void => {
		if (target === stack[stack.length - 1]) {
			return;
		}

		stack.push(target);

		update((store) => {
			store.game.state = target;
			return store;
		});
	};

	const back = (): void => {
		if (stack.length <= 1) {
			return;
		}

		stack.pop();
		const target = stack[stack.length - 1];

		update((store) => {
			store.game.state = target;
			return store;
		});
	};

	return {
		subscribe,
		set,
		update,
		navigateTo,
		back
	};
};

export const store = createStore();

export const currentLevel = derived(store, (store) => {
	return store.levels[store.currentLevelNumber];
});
