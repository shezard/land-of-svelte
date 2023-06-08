import type { Writable } from 'svelte/store';
import type { Store } from '..';

const animate = (
	cb: (store: Writable<Store>, t: number) => void,
	store: Writable<Store>,
	duration: number
) => {
	let t = 0;
	const start = Date.now();

	const step = () => {
		requestAnimationFrame(() => {
			t = (Date.now() - start) / 1e3 / duration;
			cb(store, Math.min(t, 1));
			if (t < duration) {
				step();
			}
		});
	};

	step();
};

const animateOnce = (cb: (store: Writable<Store>, t: number) => void, duration: number) => {
	let called = false;

	return (store: Writable<Store>) => {
		if (called) {
			return;
		}

		called = true;

		let t = 0;
		const start = Date.now();

		const step = () => {
			requestAnimationFrame(() => {
				t = (Date.now() - start) / 1e3 / duration;
				cb(store, Math.min(t, 1));
				if (t < duration) {
					step();
				}
			});
		};

		step();
	};
};

export const scripts = [
	[
		{
			itemId: 1,
			action: 'click',
			doAction: animateOnce((store: Writable<Store>, t: number) => {
				store.update((store: Store) => {
					const item = store.levels[0].getItem(0);
					if (item) {
						item.z = t * 1.01;
						if (item.z > 1) {
							item.collision = false;
						}
						store.levels[0].replaceItem(item);
					}
					return store;
				});
			}, 1)
		},
		{
			action: 'walk',
			x: 1,
			y: 2,
			doAction: (store: Writable<Store>) => {
				store.update((store: Store) => {
					store.currentLevelNumber = 1;
					store.player.position.t = Math.PI / 2;
					return store;
				});
			}
		}
	],
	[
		{
			action: 'walk',
			x: 1,
			y: 2,
			doAction: (store: Writable<Store>) => {
				store.update((store: Store) => {
					store.currentLevelNumber = 0;
					store.player.position.t = Math.PI / 2;
					return store;
				});
			}
		}
	]
];
