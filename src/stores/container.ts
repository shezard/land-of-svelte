import { writable } from 'svelte/store';
import type { Container } from '..';

export const container = writable<Container>();
