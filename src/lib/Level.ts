import { makeAstar } from './grid';
import type { Item, Map2d } from './levels';
import type { PlayerPosition } from './player';

export class Level {
	width: number;
	height: number;
	floor: number;
	collisionMap: Map2d;
	textureMap: Map2d;
	lightMap: Map2d;
	items: Item[];
	ceiling: number | undefined;

	constructor(level: Level) {
		this.width = level.width;
		this.height = level.height;
		this.floor = level.floor;
		this.collisionMap = level.collisionMap;
		this.textureMap = level.textureMap;
		this.lightMap = level.lightMap;
		this.items = level.items;
		this.ceiling = level.ceiling;
	}

	advance($playerPosition: PlayerPosition): this {
		const grid = makeAstar(this);

		this.items
			.filter((item) => {
				return item.type === 'ai';
			})
			.map((item) => {
				const nextPosition = grid.search(
					[item.x, item.y],
					[$playerPosition.x, $playerPosition.y],
					{
						rightAngle: true
					}
				);

				if (nextPosition !== undefined && nextPosition.length > 2) {
					item.x = nextPosition[1][0];
					item.y = nextPosition[1][1];

					this.replaceItem(item);
				}
			});

		return this;
	}

	getItem(itemId: number): Item | null {
		const items = this.items;

		let itemFound = null;
		items.forEach((item) => {
			if (item.id === itemId) {
				itemFound = item;
			}
		});

		return itemFound;
	}

	replaceItem(item: Item) {
		this.items.forEach((oldItem) => {
			if (oldItem.id === item.id) {
				oldItem = item;
			}
		});
	}
}
