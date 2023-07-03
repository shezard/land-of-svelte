import type { Panel } from '..';

export const makePanel = function (id: number, x: number, y: number): Panel {
    return {
        id: id,
        type: 'panel',
        content: [],
        collision: false,
        texture: ['panel-1', 'panel-1', 'panel-1', 'panel-1', 'panel-0', 'panel-1'],
        x: x,
        y: y,
        t: 0,
    };
};
