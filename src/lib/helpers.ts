import type { Item, Level } from './levels';

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

export const getItem = function (levels: Level[], levelId: number, itemId: number): Item | null {
	const items = levels[levelId].items;

	let itemFound = null;
	items.forEach((item) => {
		if (item.id === itemId) {
			itemFound = item;
		}
	});

	return itemFound;
};

export const setItem = function (
	levels: Level[],
	item: Item,
	levelId: number,
	itemId: number
): Level[] {
	const items = levels[levelId].items;

	items.forEach((oldItem) => {
		if (oldItem.id === itemId) {
			oldItem = item;
		}
	});

	return levels;
};
