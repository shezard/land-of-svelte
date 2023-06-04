import { writable } from 'svelte/store';
import { levels, type Level, currentLevelNumber } from './levels';
import { makeAstar } from './grid';
import { position, type PlayerPosition } from './player';

type GameState = 'loading' | 'mainMenu' | 'controlMenu' | 'running';

type RunningState = 'fresh' | 'continue';

export const game = writable<GameState>('loading');

export const running = writable<RunningState>('fresh');

const advance = () => {
	let $playerPosition: PlayerPosition;

	position.subscribe((playerPosition) => {
		$playerPosition = playerPosition;
	});

	let $currentLevelNumber: number;

	currentLevelNumber.subscribe((currentLevelNumber) => {
		$currentLevelNumber = currentLevelNumber;
	});

	levels.update((levels: Level[]) => {
		const $currentLevel = levels[$currentLevelNumber];
		const grid = makeAstar($currentLevel);

		// TODO : actual ai movement
		// console.log(
		// 	grid.search([2, 5], [$playerPosition.x, $playerPosition.y], {
		// 		rightAngle: true
		// 	})
		// );

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
