import type { AI, Item, LevelProp, Map2d, Store } from '..';
import { fight } from './fight';
import { makeAstar } from './grid';
import { logs } from './logs';

export class Level {
	width: number;
	height: number;
	floor: number;
	collisionMap: Map2d;
	textureMap: Map2d;
	lightMap: Map2d;
	items: Item[];
	ceiling: number | undefined;

	constructor(level: LevelProp) {
		this.width = level.width;
		this.height = level.height;
		this.floor = level.floor;
		this.collisionMap = level.collisionMap;
		this.textureMap = level.textureMap;
		this.lightMap = level.lightMap;
		this.items = level.items;
		this.ceiling = level.ceiling;
	}

	getAis(): AI[] {
		return this.items.filter((item) => {
			return item.type === 'ai';
		}) as AI[];
	}

	advance(store: Store): Store {
		const grid = makeAstar(this);

		this.getAis().map((item) => {
			const nextPosition = grid.search(
				[item.x, item.y],
				[store.player.position.x, store.player.position.y],
				{
					rightAngle: true
				}
			);

			if (nextPosition !== undefined && nextPosition.length > 2) {
				item.x = nextPosition[1][0];
				item.y = nextPosition[1][1];

				this.replaceItem(item);
			}

			if (nextPosition !== undefined && nextPosition.length == 2) {
				const newPlayerStats = fight(item.stats, store.player.stats);
				if (newPlayerStats.hp >= 0) {
					store.player.stats = newPlayerStats;
				} else {
					logs.update((logs) => {
						logs.push('Death!');
						return logs;
					});
					store.game.running = 'gameOver';
				}
			}
		});

		store.levels[store.currentLevelNumber] = this;

		return store;
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
