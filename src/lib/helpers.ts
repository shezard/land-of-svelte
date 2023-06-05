import type { Level } from './Level';

export const getClosestWall = function (level: Level, x: number, y: number) {
	if (level.collisionMap[x + 1][y]) {
		return 0;
	}
	if (level.collisionMap[x][y + 1]) {
		return Math.PI / 2;
	}
	if (level.collisionMap[x - 1][y]) {
		return Math.PI;
	}
	if (level.collisionMap[x][y - 1]) {
		return Math.PI / 2 + Math.PI;
	}

	return NaN;
};
