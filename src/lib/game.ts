import { writable } from 'svelte/store';

type GameState = 'loading' | 'menu' | 'running';

type RunningState = 'fresh' | 'continue';

const createGame = () => {
	const { subscribe, set, update } = writable<GameState>('loading');

	return {
		subscribe,
		set,
		toggleMenu: () =>
			update((state: GameState) => {
				if (state === 'menu') {
					state = 'running';
				} else if (state === 'running') {
					state = 'menu';
				}
				return state;
			})
	};
};

export const game = createGame();

export const running = writable<RunningState>('fresh');
