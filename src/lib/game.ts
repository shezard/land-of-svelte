import { writable } from 'svelte/store';
import { levels, currentLevelNumber } from './levels';
import { position, type OrientedPosition } from './player';
import type { Level } from './Level';

type GameState = 'loading' | 'mainMenu' | 'controlMenu' | 'running';

type RunningState = 'fresh' | 'continue';

export const game = writable<GameState>('loading');

export const running = writable<RunningState>('fresh');

const advance = () => {
	let $playerPosition: OrientedPosition;

	position.subscribe((playerPosition) => {
		$playerPosition = playerPosition;
	});

	let $currentLevelNumber: number;

	currentLevelNumber.subscribe((currentLevelNumber) => {
		$currentLevelNumber = currentLevelNumber;
	});

	levels.update((levels: Level[]) => {
		const $currentLevel = levels[$currentLevelNumber];
		levels[$currentLevelNumber] = $currentLevel.advance($playerPosition);
		return levels;
	});
};

export const gameTick = () => {
	let t = 0;
	let start = Date.now();
	const tickDuration = 1000;

	const gameTick = () => {
		requestAnimationFrame(() => {
			t = Date.now() - start;

			if (t > tickDuration) {
				start = Date.now();
				advance();
			}
			gameTick();
		});
	};

	gameTick();
};
