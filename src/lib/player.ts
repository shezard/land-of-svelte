import { writable } from 'svelte/store';
import type { Level, Item } from './levels';

export type PlayerPosition = { x: number; y: number; t: number };

const hasCollision = (items: Item[], x: number, y: number): boolean => {
	let collide = false;
	items.forEach((item) => {
		if (item.collision && item.x == x && item.y == y) {
			collide = true;
		}
	});
	return collide;
};

const createPosition = () => {
	const { subscribe, set, update } = writable<PlayerPosition>({ x: 2, y: 10, t: 0 });

	return {
		subscribe,
		set,
		update,
		moveForward: (level: Level) =>
			update(({ x, y, t }) => {
				const offsetX = Math.round(+Math.sin(t));
				const offsetY = Math.round(-Math.cos(t));

				if (
					level.collisionMap[x + offsetX][y + offsetY] ||
					hasCollision(level.items, x + offsetX, y + offsetY)
				) {
					return { x, y, t };
				}
				return { x: x + offsetX, y: y + offsetY, t };
			}),
		moveBackward: (level: Level) =>
			update(({ x, y, t }) => {
				const offsetX = Math.round(-Math.sin(t));
				const offsetY = Math.round(+Math.cos(t));

				if (
					level.collisionMap[x + offsetX][y + offsetY] ||
					hasCollision(level.items, x + offsetX, y + offsetY)
				) {
					return { x, y, t };
				}
				return { x: x + offsetX, y: y + offsetY, t };
			}),
		moveLeft: (level: Level) =>
			update(({ x, y, t }) => {
				const offsetX = Math.round(-Math.cos(t));
				const offsetY = Math.round(-Math.sin(t));

				if (
					level.collisionMap[x + offsetX][y + offsetY] ||
					hasCollision(level.items, x + offsetX, y + offsetY)
				) {
					return { x, y, t };
				}
				return { x: x + offsetX, y: y + offsetY, t };
			}),
		moveRight: (level: Level) =>
			update(({ x, y, t }) => {
				const offsetX = Math.round(+Math.cos(t));
				const offsetY = Math.round(+Math.sin(t));

				if (
					level.collisionMap[x + offsetX][y + offsetY] ||
					hasCollision(level.items, x + offsetX, y + offsetY)
				) {
					return { x, y, t };
				}
				return { x: x + offsetX, y: y + offsetY, t };
			}),
		rotateLeft: () =>
			update(({ x, y, t }) => {
				t -= Math.PI / 2;
				return { x, y, t };
			}),
		rotateRight: () =>
			update(({ x, y, t }) => {
				t += Math.PI / 2;
				return { x, y, t };
			})
	};
};

export const position = createPosition();
