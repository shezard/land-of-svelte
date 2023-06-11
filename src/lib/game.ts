import { store } from '$stores/store';
import type { Store } from '..';

const advanceUi = () => {
	store.update((store: Store) => {
		const weapon = store.player.inventory.mainHand;

		if (weapon.lastAttackTimestamp === 0) {
			return store;
		}

		store.ui.weaponCooldownPercent =
			((Date.now() - weapon.lastAttackTimestamp) / (weapon.cooldown * 1e3)) * 100;

		return store;
	});
};

const advanceGame = () => {
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
			advanceUi();

			if (t > tickDuration) {
				start = Date.now();
				advanceGame();
			}

			gameTick();
		});
	};

	gameTick();
};
