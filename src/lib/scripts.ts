import type { Writable } from 'svelte/store';
import type { Level } from './Level';
import type { OrientedPosition } from './player';

const animate = (cb: (t: number) => void, duration: number) => {
	let t = 0;
	const start = Date.now();

	const step = () => {
		requestAnimationFrame(() => {
			t = (Date.now() - start) / 1e3;
			cb(Math.min(t, 1));
			if (t < duration) {
				step();
			}
		});
	};

	step();
};

export const scripts = [
	[
		{
			itemId: 1,
			action: 'click',
			doAction: (levels: Writable<Level[]>) => {
				animate((t) => {
					levels.update((levels: Level[]) => {
						const item = levels[0].getItem(0);
						if (item) {
							item.z = t * 1.01;
							if (item.z > 1) {
								item.collision = false;
							}
							// levels[0] = levels[0].replaceItem(item);
							levels[0].replaceItem(item);
						}
						return levels;
					});
				}, 1);
			}
		},
		{
			action: 'walk',
			x: 1,
			y: 2,
			doAction: (
				levels: Writable<Level[]>,
				currentLevelNumber: Writable<number>,
				position: Writable<OrientedPosition>
			) => {
				currentLevelNumber.set(1);
				position.update((position: OrientedPosition) => {
					position.t = Math.PI / 2;
					return position;
				});
			}
		}
	],
	[
		{
			action: 'walk',
			x: 1,
			y: 2,
			doAction: (
				levels: Writable<Level[]>,
				currentLevelNumber: Writable<number>,
				position: Writable<OrientedPosition>
			) => {
				currentLevelNumber.set(0);
				position.update((position: OrientedPosition) => {
					position.t = Math.PI / 2;
					return position;
				});
			}
		}
	]
];
