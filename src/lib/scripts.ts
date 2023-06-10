import type { Writable } from 'svelte/store';
import type { Store } from '..';
import { animateToggleReverse } from './animation';

export const scripts = [
	[
		{
			scriptId: 1,
			action: 'click',
			doAction: animateToggleReverse((store: Writable<Store>, t: number) => {
				store.update((store: Store) => {
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
