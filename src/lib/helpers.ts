import type { Level } from './Level';

export const getClosestWall = function (level: Level, x: number, y: number) {
    if (level.collisionMap[x + 1] && level.collisionMap[x + 1][y]) {
        return 0;
    }
    if (level.collisionMap[x] && level.collisionMap[x][y + 1]) {
        return Math.PI / 2;
    }
    if (level.collisionMap[x - 1] && level.collisionMap[x - 1][y]) {
        return Math.PI;
    }
    if (level.collisionMap[x] && level.collisionMap[x][y - 1]) {
        return Math.PI / 2 + Math.PI;
    }

    return 0;
};

export function clickOutside(node: HTMLElement) {
    const handleClick = (event: Event) => {
        if (!node.contains(event.target) && !event.defaultPrevented) {
            node.dispatchEvent(new CustomEvent('clickoutside', node));
        }
    };

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    };
}

export const noop = () => {
    // no-op
};
