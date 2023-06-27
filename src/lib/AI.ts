import { get } from 'svelte/store';
import type { AI, AIName, ItemName, Store } from '..';
import { makeAstar } from './grid';
import { player } from '$stores/player';
import { fight } from './fight';
import { logs } from '$stores/logs';
import type { Level } from './Level';

export const makeAI = function (
	aiName: AIName,
	id: number,
	x: number,
	y: number,
	loot: ItemName | undefined = undefined
): AI {
	if (aiName === 'orc') {
		return {
			id: id,
			type: 'ai',
			name: 'orc',
			collision: true,
			texture: ['orc-1'],
			x: x,
			y: y,
			t: 0,
			stats: {
				hp: 5,
				maxHp: 5,
				ac: 0,
				hit: 0,
				pDefense: 0,
				pAttack: 1
			},
			xp: 3,
			loot: loot
		};
	}

	if (aiName === 'gobelin') {
		return {
			id: id,
			type: 'ai',
			name: 'gobelin',
			collision: true,
			texture: ['gobelin-1'],
			x: x,
			y: y,
			t: 0,
			stats: {
				hp: 3,
				maxHp: 3,
				ac: 0,
				hit: 0,
				pDefense: 0,
				pAttack: 1
			},
			xp: 3,
			loot: loot
		};
	}

	return {
		id: 0,
		type: 'ai',
		name: 'not-found',
		collision: true,
		texture: ['not-found'],
		x: x,
		y: y,
		t: 0,
		stats: {
			hp: 1,
			maxHp: 1,
			ac: 0,
			hit: 0,
			pDefense: 0,
			pAttack: 0
		},
		xp: 0
	};
};

export const advanceAi = (store: Store, level: Level) => (ai: AI) => {
	const position = get(player).position;
	const stats = get(player).stats;

	const grid = makeAstar(level);
	const nextPosition = grid.search([ai.x, ai.y], [position.x, position.y], {
		rightAngle: true
	});

	if (nextPosition !== undefined && nextPosition.length > 2) {
		ai.x = nextPosition[1][0];
		ai.y = nextPosition[1][1];

		level.replaceScript(ai);
	}

	if (nextPosition !== undefined && nextPosition.length == 2) {
		const newPlayerStats = fight(
			ai.stats,
			stats,
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
				store.screen.dirty = true;
			},
			() => {
				logs.update((logs) => {
					logs.push('Death!');
					return logs;
				});
				store.game.running = 'gameOver';
			}
		);

		player.update((player) => {
			player.stats = newPlayerStats;
			return player;
		});
	}
};
