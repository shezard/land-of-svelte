<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	import { game } from '$lib/game';
	import { textures } from '$lib/textures';

	const textureLoader = new THREE.TextureLoader();

	let loadedTextureCount = 0;
	const texturesToLoad = [
		'floor-0.png',
		'floor-1.png',
		'wall-0.png',
		'wall-1.png',
		'wall-2.png',
		'wall-3.png',
		'wall-4.png'
	];

	onMount(() => {
		texturesToLoad.map((texture) => {
			const loadedTexture = textureLoader.load('textures/' + texture, () => {
				loadedTextureCount++;
				if (loadedTextureCount === texturesToLoad.length) {
					game.set('running');
				}
			});
			loadedTexture.magFilter = THREE.NearestFilter;
			textures.setTexture(texture, loadedTexture);
		});
	});
</script>

<div>Loading ... {loadedTextureCount} / {texturesToLoad.length}</div>
