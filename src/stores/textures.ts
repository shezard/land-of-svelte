import { writable } from 'svelte/store';

type TextureMap = Record<string, THREE.Texture>;

const createTextures = () => {
	const { subscribe, set, update } = writable<TextureMap>({});

	return {
		subscribe,
		set,
		setTexture: (name: string, texture: THREE.Texture) =>
			update((textures) => {
				textures[name] = texture;
				return textures;
			})
	};
};

export const textures = createTextures();
