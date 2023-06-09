import type { Writable } from 'svelte/store';
import type { Store } from '..';

type AnimationDirection = 'forward' | 'backward';

export const animate = (
	cb: (store: Writable<Store>, t: number) => void,
	store: Writable<Store>,
	duration: number
) => {
	let t = 0;
	const start = Date.now();

	const step = () => {
		requestAnimationFrame(() => {
			t = (Date.now() - start) / 1e3 / duration;
			cb(store, Math.min(t, 1));
			if (t < duration) {
				step();
			}
		});
	};

	step();
};

export const animateOnce = (cb: (store: Writable<Store>, t: number) => void, duration: number) => {
	let called = false;

	return (store: Writable<Store>) => {
		if (called) {
			return;
		}

		called = true;

		let t = 0;
		const start = Date.now();

		const step = () => {
			requestAnimationFrame(() => {
				t = (Date.now() - start) / 1e3 / duration;
				cb(store, Math.min(t, 1));
				if (t < duration) {
					step();
				}
			});
		};

		step();
	};
};

export const animateToggle = (
	cb: (store: Writable<Store>, t: number) => void,
	duration: number
) => {
	let running = false;

	return (store: Writable<Store>) => {
		if (running) {
			return;
		}

		running = true;

		let t = 0;
		const start = Date.now();

		const step = () => {
			requestAnimationFrame(() => {
				t = (Date.now() - start) / 1e3 / duration;
				cb(store, Math.min(t, 1));
				if (t < duration) {
					step();
				}

				if (t > duration) {
					running = false;
				}
			});
		};

		step();
	};
};

export const animateToggleReverse = (
	cb: (store: Writable<Store>, t: number) => void,
	duration: number
) => {
	let running = false;
	let direction: AnimationDirection = 'forward';

	return (store: Writable<Store>) => {
		if (running) {
			return;
		}

		running = true;

		let t = 0;
		const start = Date.now();

		const step = () => {
			requestAnimationFrame(() => {
				if (direction == 'forward') {
					t = (Date.now() - start) / 1e3 / duration;
				}
				if (direction == 'backward') {
					t = 1 - (Date.now() - start) / 1e3 / duration;
				}

				cb(store, Math.max(0, Math.min(t, 1)));

				if (t > 0 && t < duration) {
					step();
				}

				if (t > duration || t <= 0) {
					running = false;
					direction = direction == 'forward' ? 'backward' : 'forward';
				}
			});
		};

		step();
	};
};
