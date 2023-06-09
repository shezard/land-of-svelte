import type { Stats } from '..';
import { logs } from './logs';

export const fight = function (emitter: Stats, receiver: Stats): Stats {
	const newStats: Stats = { ...receiver };
	newStats.hp -= 1;
	logs.update((logs) => {
		logs.push('AIE !');
		return logs;
	});
	return newStats;
};
