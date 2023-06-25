import { makeItem } from '$lib/Item';
import { Player } from '$lib/Player';
import { writable } from 'svelte/store';

const initialPlayer = new Player(
	{ x: 2, y: 10, t: 0 },
	{
		hp: 10,
		maxHp: 10,
		ac: 3,
		hit: 0,
		pDefense: 0,
		pAttack: 0
	},
	{
		mainHand: makeItem('sword'),
		offHand: null,
		armor: null,
		bag: [makeItem('sword'), makeItem('armor')]
	},
	0,
	1
);

export const player = writable<Player>(initialPlayer);
