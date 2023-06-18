import { derived, type Readable } from 'svelte/store';
import { store } from './store';
import type { UI } from '..';

export const ui = derived(store, function (store): UI {
	const weapon = store.player.inventory.mainHand;

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
