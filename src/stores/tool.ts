import { writable } from 'svelte/store';

export type ToolName = 'collision+' | 'collision-' | null;

export const activatedTool = writable<ToolName>(null);
