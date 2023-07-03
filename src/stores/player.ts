import { Player } from '$lib/Player';
import { writable } from 'svelte/store';

const initialPlayer = new Player(
    { x: 2, y: 10, t: 0 },
    {
        strength: 0,
        dexterity: 0,
        intelligence: 0
    },
    {
        hp: 10,
        maxHp: 10,
        ac: 3,
        hit: 0,
        pDefense: 0,
        pAttack: 0
    },
    {
        mainHand: null,
        offHand: null,
        armor: null,
        bag: []
    }
);

export const player = writable<Player>(initialPlayer);
