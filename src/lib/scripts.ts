import type { Writable } from 'svelte/store';
import type { Item, Level } from './levels';

const removeItem = function (items: Item[], itemId: number): Item[] {
	return items.filter((item) => {
		return item.id != itemId;
	});
};

export const scripts = {
	level0: [
		{
			itemId: 1,
			action: 'click',
			doAction: (levels: Writable<Level[]>) => {
				levels.update((levels: Level[]) => {
					levels[0].items = removeItem(levels[0].items, 0);
					return levels;
				});
			}
		}
	]
};
