import type { Writable } from 'svelte/store';
import type { Store } from '..';
import { animateOnce, animateToggleReverse } from './animation';

export const scripts = [
	[
		{
			scriptId: 1,
			action: 'click',
			doAction: animateToggleReverse((store, t) => {
				store.update((store) => {
					const script = store.levels[0].getScript(0);
					if (script) {
						script.z = t * 1.01;
						script.collision = true;
						if (script.z > 1) {
							script.collision = false;
						}
						store.levels[0].replaceScript(script);
					}
					return store;
				});
			}, 1)
		},
		{
			scriptId: 4,
			action: 'click',
			doAction: (store: Writable<Store>, $store: Store) => {
				if (
					$store.player.inventory.bag.filter((item) => item.name === 'key').length ===
						0 ||
					$store.levels[0].getScript(4)?.z > 0
				) {
					return;
				}
				animateOnce((store, t) => {
					store.update((store) => {
						const script = store.levels[0].getScript(4);
						if (script) {
							script.z = t * 1.01;
							script.collision = true;
							if (script.z > 1) {
								script.collision = false;
							}
							store.levels[0].replaceScript(script);
						}
						return store;
					});
				}, 1)(store);
			}
		},
		{
			action: 'walk',
			x: 1,
			y: 2,
			doAction: (store: Writable<Store>) => {
				store.update((store) => {
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
				store.update((store) => {
					store.currentLevelNumber = 0;
					store.player.position.t = Math.PI / 2;
					return store;
				});
			}
		}
	]
];
