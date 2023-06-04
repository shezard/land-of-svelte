<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	import { game } from '$lib/game';
	import { textures } from '$lib/textures';

	const textureLoader = new THREE.TextureLoader();

	let loadedTextureCount = 0;

	const texturesToLoad = Object.keys(import.meta.glob('../../static/textures/*-*.png')).map(
		(name) => {
			return name.replace('../../static/textures/', '');
		}
	);

	onMount(() => {
		texturesToLoad.map((texture) => {
			const loadedTexture = textureLoader.load('textures/' + texture, () => {
				loadedTextureCount++;
				if (loadedTextureCount === texturesToLoad.length) {
					game.set('mainMenu');
				}
			});
			loadedTexture.magFilter = THREE.NearestFilter;
			textures.setTexture(texture, loadedTexture);
		});
	});
</script>

<div
	class="container grid justify-items-center items-center h-screen text-3xl text-white bg-stone-800"
>
	Loading ... {loadedTextureCount} / {texturesToLoad.length}
</div>
