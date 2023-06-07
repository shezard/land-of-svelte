import { writable } from 'svelte/store';
import { store } from './store';
import type { Store, GameState, RunningState } from '..';

export const game = writable<GameState>('loading');
export const running = writable<RunningState>('fresh');

const advance = () => {
	store.update((store: Store) => {
		const $currentLevel = store.levels[store.currentLevelNumber];
		store.levels[store.currentLevelNumber] = $currentLevel.advance(
			store.player.position,
			store.player.stats
		);
		return store;
	});
};

export const gameTick = () => {
	let t = 0;
	let start = Date.now();
	const tickDuration = 1000;

	const gameTick = () => {
		requestAnimationFrame(() => {
			t = Date.now() - start;

			if (t > tickDuration) {
				start = Date.now();
				advance();
			}
			gameTick();
		});
	};

	gameTick();
};
