import { derived, writable } from 'svelte/store';

import level0 from '$lib/maps/level-0.json';
import level1 from '$lib/maps/level-1.json';

import { Level } from '../lib/Level';
import type { LevelProp, Store } from '..';

type Route = 'main' | 'control' | 'editor' | 'running' | 'inventory' | 'container';

const initialStoreState: Store = {
    game: {
        state: 'main',
        running: 'newGame',
        isLoading: true
    },
    levels: [new Level(level0 as LevelProp), new Level(level1 as LevelProp)],
    currentLevelNumber: 0,
    screen: {
        shaking: false,
        dirty: false
    }
};

const createStore = () => {
    const { subscribe, set, update } = writable<Store>(initialStoreState);

    const stack: Route[] = ['main'];

    const navigateTo = (target: Route): void => {
        if (target === stack[stack.length - 1]) {
            return;
        }

        stack.push(target);

        update((store) => {
            store.game.state = target;
            return store;
        });
    };

    const back = (): void => {
        if (stack.length <= 1) {
            return;
        }

        stack.pop();
        const target = stack[stack.length - 1];

        update((store) => {
            store.game.state = target;
            return store;
        });
    };

    return {
        subscribe,
        set,
        update,
        navigateTo,
        back
    };
};

export const store = createStore();

export const currentLevel = derived(store, (store) => {
    return store.levels[store.currentLevelNumber];
});
