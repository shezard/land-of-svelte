import { writable } from 'svelte/store';

type PlayerPosition = [number, number, number, number];

const createPosition = () => {
	const { subscribe, update } = writable([0, 0, 10, 0] as PlayerPosition);

	return {
		subscribe,
		moveForward: () =>
			update(([x, y, z, theta]) => {
				x += Math.sin(theta);
				z -= Math.cos(theta);
				return [x, y, z, theta];
			}),
		moveBackward: () =>
			update(([x, y, z, theta]) => {
				x -= Math.sin(theta);
				z += Math.cos(theta);
				return [x, y, z, theta];
			}),
		moveLeft: () =>
			update(([x, y, z, theta]) => {
				x -= Math.cos(theta);
				z -= Math.sin(theta);
				return [x, y, z, theta];
			}),
		moveRight: () =>
			update(([x, y, z, theta]) => {
				x += Math.cos(theta);
				z += Math.sin(theta);
				return [x, y, z, theta];
			}),
		rotateLeft: () =>
			update(([x, y, z, theta]) => {
				theta -= Math.PI / 2;
				return [x, y, z, theta];
			}),
		rotateRight: () =>
			update(([x, y, z, theta]) => {
				theta += Math.PI / 2;
				return [x, y, z, theta];
			})
	};
};

export const position = createPosition();
