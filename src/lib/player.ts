import { writable } from 'svelte/store';
import type { Map2d } from './map';

type PlayerPosition = { x: number; y: number; t: number };

const createPosition = () => {
	const { subscribe, update } = writable({ x: 2, y: 9, t: 0 } as PlayerPosition);

	return {
		subscribe,
		moveForward: (collisions: Map2d) =>
			update(({ x, y, t }) => {
				const offsetX = +Math.sin(t);
				const offsetY = -Math.cos(t);

				if (collisions[x + offsetX][y + offsetY]) {
					return { x, y, t };
				}
				return { x: x + offsetX, y: y + offsetY, t };
			}),
		moveBackward: (collisions: Map2d) =>
			update(({ x, y, t }) => {
				const offsetX = -Math.sin(t);
				const offsetY = +Math.cos(t);

				if (collisions[x + offsetX][y + offsetY]) {
					return { x, y, t };
				}
				return { x: x + offsetX, y: y + offsetY, t };
			}),
		moveLeft: (collisions: Map2d) =>
			update(({ x, y, t }) => {
				const offsetX = -Math.cos(t);
				const offsetY = -Math.sin(t);

				if (collisions[x + offsetX][y + offsetY]) {
					return { x, y, t };
				}
				return { x: x + offsetX, y: y + offsetY, t };
			}),
		moveRight: (collisions: Map2d) =>
			update(({ x, y, t }) => {
				const offsetX = +Math.cos(t);
				const offsetY = +Math.sin(t);

				if (collisions[x + offsetX][y + offsetY]) {
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
