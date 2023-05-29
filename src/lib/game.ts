import { writable } from 'svelte/store';

type GameState = 'loading' | 'running';

const createGame = () => {
	const { subscribe, set } = writable<GameState>('loading');

	return {
		subscribe,
		set
	};
};

export const game = createGame();
