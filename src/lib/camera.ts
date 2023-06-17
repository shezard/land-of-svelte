import type { Writable } from 'svelte/store';
import type { Store } from '..';

export const updateCamera = (store: Store, camera: Writable<THREE.Camera>): void => {
	camera.update((camera) => {
		camera.position.x = store.player.position.x - Math.sin(store.player.position.t) * 0.5;
		camera.position.z = store.player.position.y + Math.cos(store.player.position.t) * 0.5;
		camera.lookAt(
			store.player.position.x + Math.sin(store.player.position.t),
			0,
			store.player.position.y - Math.cos(store.player.position.t)
		);
		return camera;
	});
};
