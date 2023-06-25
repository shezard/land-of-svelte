import { derived } from 'svelte/store';
import { player } from './player';
import type { UI } from '..';

export const ui = derived(player, function (player): UI {
	const weapon = player.inventory.mainHand;

	if (weapon === null || weapon.lastAttackTimestamp === 0) {
		return {
			weaponCooldownPercent: 100
		};
	}

	return {
		weaponCooldownPercent:
			((Date.now() - weapon.lastAttackTimestamp) / (weapon.cooldown * 1e3)) * 100
	};
});
