import type { Stats } from '..';
import { dice } from './dice';

export const fight = function (
	emitter: Stats,
	receiver: Stats,
	onMiss: () => void,
	onDamage: (damage: number) => void
): Stats {
	const newStats: Stats = { ...receiver };

	const hit = emitter.hit - receiver.ac + dice`1d6`;

	if (hit <= 0) {
		onMiss();
		return newStats;
	}

	const damage = emitter.pAttack - receiver.pArmor;

	if (damage > 0) {
		newStats.hp -= damage;
		onDamage(damage);
	}

	return newStats;
};
