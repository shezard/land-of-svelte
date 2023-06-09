import type { Stats } from '..';
import { dice } from './dice';

export const fight = function (
	emitter: Stats,
	receiver: Stats,
	onMiss: () => void,
	onDamage: (damage: number) => void,
	onDeath: () => void
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

    if(newStats.hp <= 0) {
        onDeath();
    }

	return newStats;
};
