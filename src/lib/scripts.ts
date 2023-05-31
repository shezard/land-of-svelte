import type { Writable } from 'svelte/store';
import type { Level } from './levels';

export const scripts = {
	level0: [
		{
			itemId: 1,
			action: 'click',
			doAction: (levels: Writable<Level[]>) => {
				levels.update((levels: Level[]) => {
					levels[0].items = levels[0].items.slice(1);
					return levels;
				});
			}
		}
	]
};
