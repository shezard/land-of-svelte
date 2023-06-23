import { store } from '$stores/store';
import { useFrame } from '@threlte/core';

const advanceFrame = (t: number) => {
	store.update((store) => {
		if (store.game.state !== 'running') {
			return store;
		}

		// clear animation
		store.screen.shaking = false;
		store.levels[store.currentLevelNumber].getAis().map((ai) => {
			ai.color = 0xffffff;
		});

		store.levels[store.currentLevelNumber].getLoots().map((loot) => {
			loot.t = t * 1e-3;
		});

		return store;
	});
};

const advanceGame = () => {
	store.update((store) => {
		const $currentLevel = store.levels[store.currentLevelNumber];

		if (store.game.state !== 'running') {
			return store;
		}

		store = $currentLevel.advance(store);

		return store;
	});
};

export const gameTick = () => {
	let t = 0;
	let start = Date.now();
	const tickDuration = 1000;

	useFrame(
		() => {
			t = Date.now() - start;
			advanceFrame(Date.now());

			if (t > tickDuration) {
				start = Date.now();
				advanceGame();
			}
		},
		{
			invalidate: false
		}
	);
};
