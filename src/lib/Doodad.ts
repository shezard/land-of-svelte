import type { Doodad, DoodadName } from '..';

export const makeDoodad = function (
    doodadName: DoodadName,
    id: number,
    x: number,
    y: number
): Doodad {
    if (doodadName === 'door') {
        return {
            id,
            type: 'door',
            collision: true,
            texture: ['door-0'],
            x,
            y,
            t: 0
        };
    }

    return {
        id,
        type: 'not-found',
        collision: true,
        texture: ['not-found'],
        x,
        y,
        t: 0
    };
};
