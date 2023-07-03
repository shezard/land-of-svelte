import type { Item, ItemName } from '..';

export const makeItem = function (itemName: ItemName): Item {
    if (itemName === 'sword') {
        return {
            name: 'sword',
            texture: 'sword-0',
            slot: 'mainHand',
            baseStats: {
                strength: 0,
                dexterity: 0,
                intelligence: 0
            },
            stats: {
                hp: 0,
                maxHp: 0,
                ac: 0,
                hit: 0,
                pAttack: 1,
                pDefense: 0
            },
            cooldown: 1,
            lastAttackTimestamp: 0
        };
    }

    if (itemName === 'armor') {
        return {
            name: 'armor',
            texture: 'armor-0',
            slot: 'armor',
            baseStats: {
                strength: 0,
                dexterity: 0,
                intelligence: 0
            },
            stats: {
                hp: 0,
                maxHp: 0,
                ac: 2,
                hit: 0,
                pAttack: 0,
                pDefense: 0
            },
            cooldown: 0,
            lastAttackTimestamp: 0
        };
    }

    if (itemName === 'shield') {
        return {
            name: 'shield',
            texture: 'shield-0',
            slot: 'offHand',
            baseStats: {
                strength: 0,
                dexterity: 0,
                intelligence: 0
            },
            stats: {
                hp: 0,
                maxHp: 0,
                ac: 2,
                hit: 0,
                pAttack: 0,
                pDefense: 0
            },
            cooldown: 0,
            lastAttackTimestamp: 0
        };
    }

    if (itemName === 'key') {
        return {
            name: 'key',
            texture: 'key-0',
            slot: 'none',
            baseStats: {
                strength: 0,
                dexterity: 0,
                intelligence: 0
            },
            stats: {
                hp: 0,
                maxHp: 0,
                ac: 0,
                hit: 0,
                pAttack: 0,
                pDefense: 0
            },
            cooldown: 0,
            lastAttackTimestamp: 0
        };
    }

    return {
        name: 'not-found',
        texture: 'not-found-0',
        slot: 'armor',
        baseStats: {
            strength: 0,
            dexterity: 0,
            intelligence: 0
        },
        stats: {
            hp: 0,
            maxHp: 0,
            ac: 0,
            hit: 0,
            pAttack: 0,
            pDefense: 0
        },
        cooldown: 0,
        lastAttackTimestamp: 0
    };
};
