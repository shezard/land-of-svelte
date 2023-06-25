import { player } from '$stores/player';
import { get } from 'svelte/store';
import type { Doodad, Store } from '..';

import { animateOnce, animateToggleReverse } from './animation';

export const scripts = [
	[
		{
			scriptId: 1,
			predicate: () => true,
			doClick: animateToggleReverse((store, t) => {
				store.update((store) => {
					const script = store.levels[0].getScript(0) as Doodad;
					script.z = t * 1.01;
					script.collision = true;
					if (script.z > 1) {
						script.collision = false;
					}
					store.levels[0].replaceScript(script);
					return store;
				});
			}, 1)
		},
		{
			scriptId: 4,
			predicate: (): boolean => {
				return get(player).inventory.bag.filter((item) => item.name === 'key').length > 0;
			},
			doClick: animateOnce((store, t) => {
				store.update((store) => {
					const script = store.levels[0].getScript(4) as Doodad;
					script.z = t * 1.01;
					script.collision = true;
					if (script.z > 1) {
						script.collision = false;
						player.update((player) => {
							player.inventory.bag = player.inventory.bag.filter(
								(item) => item.name !== 'key'
							);
							return player;
						});
					}
					store.levels[0].replaceScript(script);
					return store;
				});
			}, 1)
		},
		{
			x: 1,
			y: 2,
			doWalk: (store: Store): Store => {
				store.currentLevelNumber = 1;
				player.update((player) => {
					player.position.t = Math.PI / 2;
					return player;
				});
				return store;
			}
		}
	],
	[
		{
			x: 1,
			y: 2,
			doWalk: (store: Store): Store => {
				store.currentLevelNumber = 0;
				player.update((player) => {
					player.position.t = Math.PI / 2;
					return player;
				});
				return store;
			}
		}
	]
];
