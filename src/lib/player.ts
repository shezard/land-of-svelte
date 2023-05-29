import { writable } from 'svelte/store';

type PlayerPosition = {x:number, y:number, t:number};

const createPosition = () => {
	const { subscribe, update } = writable({x:0, y:9, t:0} as PlayerPosition);

	return {
		subscribe,
		moveForward: () =>
			update(({x, y, t}) => {
				x += Math.sin(t);
				y -= Math.cos(t);
				return {x, y, t};
			}),
		moveBackward: () =>
			update(({x, y, t}) => {
				x -= Math.sin(t);
				y += Math.cos(t);
				return {x, y, t};
			}),
		moveLeft: () =>
			update(({x, y, t}) => {
				x -= Math.cos(t);
				y -= Math.sin(t);
				return {x, y, t};
			}),
		moveRight: () =>
			update(({x, y, t}) => {
				x += Math.cos(t);
				y += Math.sin(t);
				return {x, y, t};
			}),
		rotateLeft: () =>
			update(({x, y, t}) => {
				t -= Math.PI / 2;
				return {x, y, t};
			}),
		rotateRight: () =>
			update(({x, y, t}) => {
				t += Math.PI / 2;
				return {x, y, t};
			})
	};
};

export const position = createPosition();
