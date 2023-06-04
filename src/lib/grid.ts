import { Grid, Astar } from 'fast-astar';

import type { Level } from './levels';

export const makeAstar = (currentLevel: Level) => {
	const grid = new Grid({
		col: currentLevel.width,
		row: currentLevel.height
	});

	for (let i = 0; i < currentLevel.width; i++) {
		for (let j = 0; j < currentLevel.width; j++) {
			if (currentLevel.collisionMap[i][j]) {
				grid.set([i, j], 'value', 1);
			}
		}
	}

	currentLevel.items.map((item) => {
		grid.set([item.x, item.y], 'value', Number(item.collision));
	});

	return new Astar(grid);
};
