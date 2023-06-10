import { writable } from 'svelte/store';

interface Keyboard {
	forward: string;
	backward: string;
	left: string;
	right: string;
	rotateLeft: string;
	rotateRight: string;
}

export const keyboard = writable<Keyboard>({
	forward: 'z',
	left: 'q',
	backward: 's',
	right: 'd',
	rotateLeft: 'a',
	rotateRight: 'e'
});
