import { writable } from 'svelte/store';
import { levels, type Level, currentLevelNumber } from './levels';
import { makeAstar } from './grid';
import { position, type PlayerPosition } from './player';
import { setItem } from './helpers';

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

		$currentLevel.items
			.filter((item) => {
				return item.type === 'ai';
			})
			.map((item) => {
				const nextPosition = grid.search(
					[item.x, item.y],
					[$playerPosition.x, $playerPosition.y],
					{
						rightAngle: true
					}
				);

				if (nextPosition && nextPosition.length > 2) {
					item.x = nextPosition[1][0];
					item.y = nextPosition[1][1];

					levels = setItem(levels, item, $currentLevelNumber, item.id);
				}
			});

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
