import { isBrowser } from '$lib/helpers';
import { writable } from 'svelte/store';

export const hasSave = writable(isBrowser() && 'player' in localStorage);
