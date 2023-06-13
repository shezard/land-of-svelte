import type { Item } from '..';

export const makeItem = function (weaponName: string): Item {
	return {
		name: 'sword',
		texture: 'sword-0',
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
};
