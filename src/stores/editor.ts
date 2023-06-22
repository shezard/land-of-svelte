import { writable } from 'svelte/store';

export type ToolName = 'collision+' | 'collision-' | 'light' | null;

export const activatedTool = writable<ToolName>(null);
