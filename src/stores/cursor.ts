import { writable } from 'svelte/store';

export type CursorName = 'interact' | 'attack' | null;

export const pointer = writable<CursorName>(null);

export const INTERACTIVITY_DISTANCE = 1.6;
