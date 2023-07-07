import type { Npc } from '..';

export const makeNpc = function (npcName: string, id: number, x: number, y: number): Npc {
    return {
        id: id,
        type: 'npc',
        name: npcName,
        collision: true,
        texture: ['npc-1'],
        x: x,
        y: y,
        t: 0,
        depth: 0,
        dialogs: []
    };
};
