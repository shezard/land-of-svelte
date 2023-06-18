import { writable } from 'svelte/store';
import type { Item } from '..';

export const container = writable<Item[]>([]);
