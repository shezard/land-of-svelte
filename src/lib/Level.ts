import type { AI, Script, LevelProp, Map2d, Store, Loot } from '..';
import { fight } from './fight';
import { makeAstar } from './grid';
import { logs } from '$stores/logs';

const swapXY = function (width: number, height: number, map: Map2d): Map2d {
	const swappedMap = [] as Map2d;
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if (!swappedMap[y]) {
				swappedMap[y] = [];
			}
			swappedMap[y][x] = map[x][y];
		}
	}
	return swappedMap;
};

export class Level {
	width: number;
	height: number;
	floor: number;
	collisionMap: Map2d;
	textureMap: Map2d;
	lightMap: Map2d;
	scripts: Script[];
	ceiling: number;

	constructor(level: LevelProp) {
		this.width = level.width;
		this.height = level.height;
		this.floor = level.floor;
		this.collisionMap = swapXY(level.width, level.height, level.collisionMap);
		this.textureMap = swapXY(level.width, level.height, level.textureMap);
		this.lightMap = swapXY(level.width, level.height, level.lightMap);
		this.scripts = level.scripts;
		this.ceiling = level.ceiling;
	}

	getAis(): AI[] {
		return this.scripts.filter((item) => {
			return item.type === 'ai';
		}) as AI[];
	}

	getAiAt(x: number, y: number): AI | undefined {
		return this.getAis().find((ai: AI) => {
			return ai.x === x && ai.y === y;
		});
	}

	removeAiAt(x: number, y: number): void {
		const loot = this.getAiAt(x, y)?.loot;

		if (loot) {
			this.scripts.push({
				id: this.scripts.length,
				type: 'loot',
				name: loot,
				collision: false,
				texture: [`${loot}-0`],
				x,
				y,
				t: 0
			});
		}

		this.scripts = this.scripts.filter((script: Script) => {
			return !(script.x === x && script.y === y && script.type === 'ai');
		});
	}

	getLoots(): Loot[] {
		return this.scripts.filter((item) => {
			return item.type === 'loot';
		}) as Loot[];
	}

	advance(store: Store): Store {
		const grid = makeAstar(this);

		this.getAis().map((ai) => {
			const nextPosition = grid.search(
				[ai.x, ai.y],
				[store.player.position.x, store.player.position.y],
				{
					rightAngle: true
				}
			);

			if (nextPosition !== undefined && nextPosition.length > 2) {
				ai.x = nextPosition[1][0];
				ai.y = nextPosition[1][1];

				this.replaceScript(ai);
			}

			if (nextPosition !== undefined && nextPosition.length == 2) {
				const newPlayerStats = fight(
					ai.stats,
					store.player.stats,
					() => {
						logs.update((logs) => {
							logs.push(`You dodged a hit`);
							return logs;
						});
					},
					(damage) => {
						logs.update((logs) => {
							logs.push(`You took ${damage} dmg`);
							return logs;
						});
						store.screen.shaking = true;
					},
					() => {
						logs.update((logs) => {
							logs.push('Death!');
							return logs;
						});
						store.game.running = 'gameOver';
					}
				);

				store.player.stats = newPlayerStats;
			}
		});

		store.levels[store.currentLevelNumber] = this;

		return store;
	}

	getScript(scriptId: number): Script | null {
		const scripts = this.scripts;

		let scriptFound = null;
		scripts.forEach((script: Script) => {
			if (script.id === scriptId) {
				scriptFound = script;
			}
		});

		return scriptFound;
	}

	replaceScript(script: Script) {
		this.scripts.forEach((oldScript) => {
			if (oldScript.id === script.id) {
				oldScript = script;
			}
		});
	}
}
