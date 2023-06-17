import type { Store } from '..';
import { animateOnce, animateToggleReverse } from './animation';

export const scripts = [
	[
		{
			scriptId: 1,
			predicate: () => true,
			doClick: animateToggleReverse((store, t) => {
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
			predicate: ($store: Store): boolean => {
				return $store.player.inventory.bag.filter((item) => item.name === 'key').length > 0;
			},
			doClick: animateOnce((store, t) => {
				store.update((store) => {
					const script = store.levels[0].getScript(4);
					if (script) {
						script.z = t * 1.01;
						script.collision = true;
						if (script.z > 1) {
							script.collision = false;
							store.player.inventory.bag = store.player.inventory.bag.filter(
								(item) => item.name !== 'key'
							);
						}
						store.levels[0].replaceScript(script);
					}
					return store;
				});
			}, 1)
		},
		{
			x: 1,
			y: 2,
			doWalk: (store: Store): Store => {
				store.currentLevelNumber = 1;
				store.player.position.t = Math.PI / 2;
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
				store.player.position.t = Math.PI / 2;
				return store;
			}
		}
	]
];
