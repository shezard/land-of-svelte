import { derived, writable } from 'svelte/store';
import { store } from './store';

export type ToolName = 'collision+' | 'collision-' | 'light' | null;

export const activatedTool = writable<ToolName>(null);

export const currentLevelNumber = writable(0);

export const currentLevel = derived(
	[store, currentLevelNumber],
	function ([store, currentLevelNumber]) {
		return store.levels[currentLevelNumber];
	}
);
