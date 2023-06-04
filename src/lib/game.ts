import { writable } from 'svelte/store';

type GameState = 'loading' | 'mainMenu' | 'controlMenu' | 'running';

type RunningState = 'fresh' | 'continue';

export const game = writable<GameState>('loading');

export const running = writable<RunningState>('fresh');
