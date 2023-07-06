import type { Container } from '..';

export const makeContainer = function (id: number, x: number, y: number): Container {
    return {
        id: id,
        type: 'container',
        name: 'treasure chest',
        collision: true,
        texture: ['chest-1', 'chest-1', 'chest-1', 'chest-1', 'chest-0', 'chest-1'],
        x: x,
        y: y,
        t: 0,
        content: []
    };
};
