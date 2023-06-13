import type { Item } from '..';

export const makeItem = function (itemName: string): Item {
	if (itemName === 'sword') {
		return {
			name: 'sword',
			texture: 'sword-0',
			slot: 'mainHand',
			stats: {
				hp: 0,
				maxHp: 0,
				ac: 0,
				hit: 0,
				pAttack: 1,
				pDefense: 0
			},
			cooldown: 1,
			lastAttackTimestamp: 0
		};
	}

	if (itemName === 'armor') {
		return {
			name: 'armor',
			texture: 'armor-0',
			slot: 'armor',
			stats: {
				hp: 0,
				maxHp: 0,
				ac: 2,
				hit: 0,
				pAttack: 0,
				pDefense: 0
			},
			cooldown: 0,
			lastAttackTimestamp: 0
		};
	}

	if (itemName === 'shield') {
		return {
			name: 'shield',
			texture: 'shield-0',
			slot: 'offHand',
			stats: {
				hp: 0,
				maxHp: 0,
				ac: 2,
				hit: 0,
				pAttack: 0,
				pDefense: 0
			},
			cooldown: 0,
			lastAttackTimestamp: 0
		};
	}

	return {
		name: 'not-found',
		texture: 'not-found-0',
		slot: 'armor',
		stats: {
			hp: 0,
			maxHp: 0,
			ac: 0,
			hit: 0,
			pAttack: 0,
			pDefense: 0
		},
		cooldown: 0,
		lastAttackTimestamp: 0
	};
};
