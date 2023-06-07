type GameState = 'loading' | 'mainMenu' | 'controlMenu' | 'running';
type RunningState = 'fresh' | 'continue';

type Position2d = [number, number];
type Map2d = number[][];

interface LevelProp {
	width: number;
	height: number;
	floor: number;
	collisionMap: Map2d;
	textureMap: Map2d;
	lightMap: Map2d;
	items: Item[];
	ceiling: number | undefined;
}

interface Item {
	id: number;
	type: 'door' | 'button' | 'ladder' | 'ai';
	collision?: boolean;
	direction?: number;
	texture?: string;
	color?: string;
	stats?: Stats;
	x: number;
	y: number;
	z?: number;
}

interface OrientedPosition {
	x: number;
	y: number;
	t: number;
}

interface Stats {
	hp: number;
	ac: number;
	hit: number;
}
