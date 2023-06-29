import type { Writable } from 'svelte/store';
import type { OrientedPosition } from '..';

export const updateCamera = (camera: Writable<THREE.Camera>, position: OrientedPosition): void => {
    camera.update((camera) => {
        camera.position.x = position.x - Math.sin(position.t) * 0.5;
        camera.position.z = position.y + Math.cos(position.t) * 0.5;
        camera.lookAt(position.x + Math.sin(position.t), 0, position.y - Math.cos(position.t));
        return camera;
    });
};
