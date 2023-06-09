import type { Writable } from 'svelte/store';
import type { Store } from '..';
import { animateToggleReverse } from './animation';

export const scripts = [
	[
		{
			itemId: 1,
			action: 'click',
			doAction: animateToggleReverse((store: Writable<Store>, t: number) => {
				store.update((store: Store) => {
					const item = store.levels[0].getItem(0);
					if (item) {
						item.z = t * 1.01;
						item.collision = true;
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
