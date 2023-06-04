import type { Writable } from 'svelte/store';
import type { Item, Level } from './levels';
import type { PlayerPosition } from './player';

const removeItem = function (items: Item[], itemId: number): Item[] {
	return items.filter((item) => {
		return item.id != itemId;
	});
};

const getItem = function (levels: Level[], levelId: number, itemId: number): Item | null {
	const items = levels[levelId].items;

	let itemFound = null;
	items.forEach((item) => {
		if (item.id === itemId) {
			itemFound = item;
		}
	});

	return itemFound;
};

const setItem = function (levels: Level[], item: Item, levelId: number, itemId: number): Level[] {
	const items = levels[levelId].items;

	items.forEach((oldItem) => {
		if (oldItem.id === itemId) {
			oldItem = item;
		}
	});

	return levels;
};

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
			doAction: (
				levels: Writable<Level[]>,
				currentLevelNumber: Writable<number>,
				playerPosition: Writable<PlayerPosition>
			) => {
				animate((t) => {
					levels.update((levels: Level[]) => {
						const item = getItem(levels, 0, 0);
						if (item) {
							item.z = t * 1.01;
							item.collision = false;
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
				playerPosition: Writable<PlayerPosition>
			) => {
				currentLevelNumber.set(1);
			}
		}
	]
];
