import type { Inventory, OrientedPosition, Stats, Store, Weapon } from '..';
import type { Level } from './Level';
import { fight } from './fight';
import { logs } from './logs';
import { store } from './store';

export class Player {
	position: OrientedPosition;
	stats: Stats;
	inventory: Inventory;

	constructor(position: OrientedPosition, stats: Stats, inventory: Inventory) {
		this.position = position;
		this.stats = stats;
		this.inventory = inventory;
	}

	moveForward(level: Level) {
		const offsetX = Math.round(+Math.sin(this.position.t));
		const offsetY = Math.round(-Math.cos(this.position.t));

		if (this.hasCollision(level, this.position.x + offsetX, this.position.y + offsetY)) {
			return;
		}

		this.position.x += offsetX;
		this.position.y += offsetY;
	}

	moveBackward(level: Level) {
		const offsetX = Math.round(-Math.sin(this.position.t));
		const offsetY = Math.round(+Math.cos(this.position.t));

		if (this.hasCollision(level, this.position.x + offsetX, this.position.y + offsetY)) {
			return;
		}

		this.position.x += offsetX;
		this.position.y += offsetY;
	}

	moveLeft(level: Level) {
		const offsetX = Math.round(-Math.cos(this.position.t));
		const offsetY = Math.round(-Math.sin(this.position.t));

		if (this.hasCollision(level, this.position.x + offsetX, this.position.y + offsetY)) {
			return;
		}

		this.position.x += offsetX;
		this.position.y += offsetY;
	}

	moveRight(level: Level) {
		const offsetX = Math.round(+Math.cos(this.position.t));
		const offsetY = Math.round(+Math.sin(this.position.t));
		if (this.hasCollision(level, this.position.x + offsetX, this.position.y + offsetY)) {
			return;
		}

		this.position.x += offsetX;
		this.position.y += offsetY;
	}

	rotateLeft() {
		this.position.t -= Math.PI / 2;
	}

	rotateRight() {
		this.position.t += Math.PI / 2;
	}

	hasCollision(level: Level, x: number, y: number): boolean {
		if (level.collisionMap[x][y]) {
			return true;
		}

		let collide = false;
		level.items.forEach((item) => {
			if (item.collision && item.x == x && item.y == y) {
				collide = true;
			}
		});

		return collide;
	}

	attack(): void {
		const offsetX = Math.round(+Math.sin(this.position.t));
		const offsetY = Math.round(-Math.cos(this.position.t));

		store.update((store: Store) => {
			const ai = store.levels[store.currentLevelNumber].getAiAt(
				this.position.x + offsetX,
				this.position.y + offsetY
			);
			if (!ai) {
				return store;
			}
			const newAiStats = fight(
				store.player.getStats(),
				ai.stats,
				() => {
					logs.update((logs) => {
						logs.push(`You missed a hit`);
						return logs;
					});
				},
				(damage) => {
					logs.update((logs) => {
						logs.push(`You hit for ${damage} dmg`);
						return logs;
					});
				},
				() => {
					logs.update((logs) => {
						logs.push('You killed an ennemy');
						return logs;
					});
				}
			);

			ai.stats = newAiStats;

			if (ai.stats.hp === 0) {
				store.levels[store.currentLevelNumber].removeAiAt(
					this.position.x + offsetX,
					this.position.y + offsetY
				);
			}

			return store;
		});
	}

    getStats() : Stats
    {
        return [this.inventory.mainHand].reduce(function(stats, item : Weapon|null) {
            if(item) {
                stats.hp += item.stats.hp;
                stats.ac += item.stats.ac;
                stats.hit += item.stats.hit;
                stats.pAttack += item.stats.pAttack;
                stats.pDefense += item.stats.pDefense;
            }

            return stats;
        }, {...this.stats});
    }
}
