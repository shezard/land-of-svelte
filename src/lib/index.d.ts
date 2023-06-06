declare module 'fast-astar' {
	class Grid {
		constructor(grid: { col: number; row: number });
		set(coords: [number, number], value: 'value', passable: 0 | 1): void;
	}

	class Astar {
		constructor(grid: Grid);
		search(
			originCoords: [number, number],
			destinationCoords: [number, number],
			options: { rightAngle: boolean }
		): undefined | [number, number][];
	}
}
