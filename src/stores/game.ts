import { writable } from 'svelte/store';

const isBrowser = typeof window !== 'undefined';

export const hasSave = writable(isBrowser && 'player' in localStorage);
