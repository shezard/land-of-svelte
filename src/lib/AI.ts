import type { AI, AIName, ItemName } from '..';

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
