import { store } from '$stores/store';

const advanceUi = () => {
	store.update((store) => {
		// clear animation
		store.screen.shaking = false;
		store.levels[store.currentLevelNumber].getAis().map((ai) => {
			ai.color = 0xffffff;
		});

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
	store.update((store) => {
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
