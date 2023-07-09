import type { Doodad } from '..';

export const doodadOptions = ['door', 'ladder', 'half-block', 'button'] as const;
export type DoodadName = (typeof doodadOptions)[number] | 'not-found';

export const makeDoodad = function (
    doodadName: DoodadName,
    id: number,
    x: number,
    y: number
): Doodad {
    if (doodadName === 'door') {
        return {
            id,
            type: doodadName,
            collision: true,
            texture: ['door-0'],
            x,
            y,
            t: 0
        };
    }

    if (doodadName === 'ladder') {
        return {
            id,
            type: doodadName,
            collision: false,
            texture: ['ladder-0', 'ladder-0', 'ladder-1', 'ladder-1', 'ladder-1', 'ladder-1'],
            x,
            y,
            t: 0
        };
    }

    if (doodadName === 'half-block') {
        return {
            id,
            type: doodadName,
            collision: true,
            texture: ['ladder-0', 'ladder-0', 'ladder-1', 'ladder-1', 'ladder-1', 'ladder-1'],
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
