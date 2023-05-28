import { writable } from 'svelte/store';

export type Position2d = [number, number];

type Tile = {
	type: 'wall' | 'floor';
	position: Position2d;
	texture: string;
};

const createTiles = function () {
	const tiles = [];

	for (let i = 0; i < 100; i++) {
		tiles.push({
			type: 'floor' as const,
			position: [i % 10, Math.floor(i / 10)] as Position2d,
            texture: 'textures/floor-0.png'
		});
	}

	tiles.push({
		type: 'wall' as const,
		position: [0, 0] as Position2d,
		texture: 'textures/wall-0.png'
	});

	tiles.push({
		type: 'wall' as const,
		position: [0, 5] as Position2d,
		texture: 'textures/wall-0.png'
	});

	tiles.push({
		type: 'wall' as const,
		position: [2, 5] as Position2d,
		texture: 'textures/wall-0.png'
	});

	tiles.push({
		type: 'wall' as const,
		position: [3, 5] as Position2d,
		texture: 'textures/wall-0.png'
	});

	const { subscribe } = writable<Tile[]>(tiles);

	return {
		subscribe
	};
};

export const tiles = createTiles();
