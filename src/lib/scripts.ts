import type { Writable } from 'svelte/store';
import type { Item, Level } from './levels';

const removeItem = function (items: Item[], itemId: number): Item[] {
	return items.filter((item) => {
		return item.id != itemId;
	});
};

export const scripts = [[
	{
		itemId: 1,
		action: 'click',
		doAction: (levels: Writable<Level[]>, currentLevelNumber : Writable<number>) => {
			levels.update((levels: Level[]) => {
				levels[0].items = removeItem(levels[0].items, 0);
				return levels;
			});
		}
	}, {
        action: 'walk',
        x: 2,
        y: 1,
        doAction: (levels: Writable<Level[]>, currentLevelNumber : Writable<number>) => {
			currentLevelNumber.set(1)
		}
    }
]];
