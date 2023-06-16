import { writable } from 'svelte/store';

interface Keyboard {
	forward: string;
	backward: string;
	left: string;
	right: string;
	rotateLeft: string;
	rotateRight: string;
	inventory: string;
}

export type Action = keyof Keyboard;

export const keyboard = writable<Keyboard>({
	forward: 'KeyW',
	left: 'KeyA',
	backward: 'KeyS',
	right: 'KeyD',
	rotateLeft: 'KeyQ',
	rotateRight: 'KeyE',
	inventory: 'KeyI'
});
