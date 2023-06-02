import type { Writable } from 'svelte/store';
import type { Item, Level } from './levels';
import type { PlayerPosition } from './player';

const removeItem = function (items: Item[], itemId: number): Item[] {
	return items.filter((item) => {
		return item.id != itemId;
	});
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
				levels.update((levels: Level[]) => {
					levels[0].items = removeItem(levels[0].items, 0);
					return levels;
				});
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
