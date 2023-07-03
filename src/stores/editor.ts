import { derived, writable } from 'svelte/store';
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
