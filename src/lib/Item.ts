import type { Item } from '..';

export const makeItem = function (weaponName: string): Item {
	return {
		name: 'sword',
		texture: 'sword.png',
		stats: {
			hp: 0,
			ac: 0,
			hit: 0,
			pAttack: 1,
			pDefense: 0
		}
	};
};
