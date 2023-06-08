import type { Stats } from '..';

export const fight = function (emitter: Stats, receiver: Stats): Stats {
	receiver.hp -= 1;
	return receiver;
};
