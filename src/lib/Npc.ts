import type { Npc, NpcName } from '..';

export const makeNpc = function (npcName: NpcName, id: number, x: number, y: number): Npc {
    if (npcName === 'man') {
        return {
            id: id,
            type: 'npc',
            name: npcName,
            collision: true,
            texture: ['npc-1'],
            x: x,
            y: y,
            t: 0
        };
    }

    return {
        id: id,
        type: 'npc',
        name: 'not-found',
        collision: true,
        texture: ['npc-1'],
        x: x,
        y: y,
        t: 0
    };
};
