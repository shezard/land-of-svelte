import { derived, writable } from 'svelte/store';
import { store } from './store';

export type ToolName = 'collision+' | 'collision-' | 'light' | 'ai' | null;

export const activatedTool = writable<ToolName>(null);

export const isToolActivated = writable(false);

export const currentLevelNumber = writable(0);

export const currentLevel = derived(
	[store, currentLevelNumber],
	function ([store, currentLevelNumber]) {
		return store.levels[currentLevelNumber];
	}
);
