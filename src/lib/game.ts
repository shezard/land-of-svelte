import { store } from './store';
import type { Store } from '..';

const advance = () => {
	store.update((store: Store) => {
		const $currentLevel = store.levels[store.currentLevelNumber];

		if (store.game.running !== 'gameOver') {
			store = $currentLevel.advance(store);
		}

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
