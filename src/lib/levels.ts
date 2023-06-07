import { derived } from 'svelte/store';
import { store } from './store';

export const currentLevel = derived(store, (store) => {
	return store.levels[store.currentLevelNumber];
});
