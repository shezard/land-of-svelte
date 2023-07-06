import { derived, get, writable } from 'svelte/store';
import { store } from './store';
import type { AiName } from '$lib/Ai';
import type { DoodadName } from '$lib/Doodad';

export type ToolName =
    | 'texture'
    | 'collision+'
    | 'collision-'
    | 'light'
    | 'ai'
    | 'npc'
    | 'doodad'
    | 'panel'
    | 'container'
    | null;

export const activatedTool = writable<ToolName>(null);

export const isToolActivated = writable(false);

export const currentTexture = writable<string>('armor-0');

export const currentAi = writable<AiName>('orc');

export const currentNpc = writable<string>('man');

export const currentDoodad = writable<DoodadName>('door');

export const currentLevelNumber = writable(0);

export const currentLevel = derived(
    [store, currentLevelNumber],
    function ([store, currentLevelNumber]) {
        return store.levels[currentLevelNumber];
    }
);

export const applyTool = (x: number, y: number) => (e: Event) => {
    const $currentLevelNumber = get(currentLevelNumber);

    if (!get(isToolActivated)) {
        return;
    }

    if (get(activatedTool) === 'texture') {
        store.update((store) => {
            store.levels[$currentLevelNumber].textureMap[x][y] = get(currentTexture);
            return store;
        });
    }

    if (get(activatedTool) === 'collision+') {
        store.update((store) => {
            store.levels[$currentLevelNumber].collisionMap[x][y] = 1;
            return store;
        });
    }

    if (get(activatedTool) === 'collision-') {
        store.update((store) => {
            store.levels[$currentLevelNumber].collisionMap[x][y] = 0;
            return store;
        });
    }

    if (get(activatedTool) === 'light' && e.type === 'mousedown') {
        store.update((store) => {
            const light = store.levels[$currentLevelNumber].getLightAt(x, y);
            if (light) {
                store.levels[$currentLevelNumber].removeLightAt(x, y);
            } else {
                store.levels[$currentLevelNumber].addLightAt(x, y);
            }

            return store;
        });
    }

    if (get(activatedTool) === 'ai' && e.type === 'mousedown') {
        store.update((store) => {
            const ai = store.levels[$currentLevelNumber].getAiAt(x, y);
            if (ai) {
                store.levels[$currentLevelNumber].removeAiAt(x, y);
            } else {
                store.levels[$currentLevelNumber].addAiAt(x, y, get(currentAi));
            }

            return store;
        });
    }

    if (get(activatedTool) === 'npc' && e.type === 'mousedown') {
        store.update((store) => {
            const ai = store.levels[$currentLevelNumber].getScriptAt(x, y);
            if (ai) {
                store.levels[$currentLevelNumber].removeScriptAt(x, y);
            } else {
                store.levels[$currentLevelNumber].addNpcAt(x, y, get(currentNpc));
            }

            return store;
        });
    }

    if (get(activatedTool) === 'doodad' && e.type === 'mousedown') {
        store.update((store) => {
            const doodad = store.levels[$currentLevelNumber].getScriptAt(x, y);
            if (doodad) {
                store.levels[$currentLevelNumber].removeScriptAt(x, y);
            } else {
                store.levels[$currentLevelNumber].addDoodadAt(x, y, get(currentDoodad));
            }

            return store;
        });
    }

    if (get(activatedTool) === 'panel' && e.type === 'mousedown') {
        store.update((store) => {
            const panel = store.levels[$currentLevelNumber].getScriptAt(x, y);
            if (panel) {
                store.levels[$currentLevelNumber].removeScriptAt(x, y);
            } else {
                store.levels[$currentLevelNumber].addPanelAt(x, y);
            }

            return store;
        });
    }

    if (get(activatedTool) === 'container' && e.type === 'mousedown') {
        store.update((store) => {
            const panel = store.levels[$currentLevelNumber].getScriptAt(x, y);
            if (panel) {
                store.levels[$currentLevelNumber].removeScriptAt(x, y);
            } else {
                store.levels[$currentLevelNumber].addContainerAt(x, y);
            }

            return store;
        });
    }
};
