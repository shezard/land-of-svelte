import { get, type Writable } from 'svelte/store';
import { store } from '$stores/store';

export const updateCamera = (camera: Writable<THREE.Camera>): void => {
	const position = get(store).player.position;

	camera.update((camera) => {
		camera.position.x = position.x - Math.sin(position.t) * 0.5;
		camera.position.z = position.y + Math.cos(position.t) * 0.5;
		camera.lookAt(position.x + Math.sin(position.t), 0, position.y - Math.cos(position.t));
		return camera;
	});
};
