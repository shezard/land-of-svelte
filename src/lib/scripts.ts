import type { Writable } from 'svelte/store';
import type { Level } from './levels';
import type { PlayerPosition } from './player';
import { getItem, setItem } from './helpers';

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
						const item = getItem(levels, 0, 0);
						if (item) {
							item.z = t * 1.01;
							if (item.z > 1) {
								item.collision = false;
							}
							levels = setItem(levels, item, 0, 0);
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
				position: Writable<PlayerPosition>
			) => {
				currentLevelNumber.set(1);
				position.update((position: PlayerPosition) => {
					position.t = Math.PI / 2;
					return position;
				});
			}
		}
	],
	[]
];
