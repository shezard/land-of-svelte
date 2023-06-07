import type { Item, OrientedPosition, Stats } from '..';
import type { Level } from './Level';

const hasCollision = (items: Item[], x: number, y: number): boolean => {
	let collide = false;
	items.forEach((item) => {
		if (item.collision && item.x == x && item.y == y) {
			collide = true;
		}
	});
	return collide;
};

export class Player {
	position: OrientedPosition;
	stats: Stats;

	constructor(position: OrientedPosition, stats: Stats) {
		this.position = position;
		this.stats = stats;
	}

	moveForward(level: Level) {
		const offsetX = Math.round(+Math.sin(this.position.t));
		const offsetY = Math.round(-Math.cos(this.position.t));

		if (
			level.collisionMap[this.position.x + offsetX][this.position.y + offsetY] ||
			hasCollision(level.items, this.position.x + offsetX, this.position.y + offsetY)
		) {
			return;
		}

		this.position.x += offsetX;
		this.position.y += offsetY;
	}

	moveBackward(level: Level) {
		const offsetX = Math.round(-Math.sin(this.position.t));
		const offsetY = Math.round(+Math.cos(this.position.t));

		if (
			level.collisionMap[this.position.x + offsetX][this.position.y + offsetY] ||
			hasCollision(level.items, this.position.x + offsetX, this.position.y + offsetY)
		) {
			return;
		}

		this.position.x += offsetX;
		this.position.y += offsetY;
	}

	moveLeft(level: Level) {
		const offsetX = Math.round(-Math.cos(this.position.t));
		const offsetY = Math.round(-Math.sin(this.position.t));

		if (
			level.collisionMap[this.position.x + offsetX][this.position.y + offsetY] ||
			hasCollision(level.items, this.position.x + offsetX, this.position.y + offsetY)
		) {
			return;
		}

		this.position.x += offsetX;
		this.position.y += offsetY;
	}

	moveRight(level: Level) {
		const offsetX = Math.round(+Math.cos(this.position.t));
		const offsetY = Math.round(+Math.sin(this.position.t));
		if (
			level.collisionMap[this.position.x + offsetX][this.position.y + offsetY] ||
			hasCollision(level.items, this.position.x + offsetX, this.position.y + offsetY)
		) {
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
}
