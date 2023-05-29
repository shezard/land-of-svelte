<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	import { game } from '$lib/game';

	import Scene from './Scene.svelte';
	import Menu from './Menu.svelte';
	import Loader from './Loader.svelte';

	type TextureMap = {
		[index: string]: THREE.Texture;
	};

	const textures = {} as TextureMap;

	const textureLoader = new THREE.TextureLoader();

	onMount(() => {
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

		texturesToLoad.map((texture) => {
			const loadedTexture = textureLoader.load('textures/' + texture, () => {
				loadedTextureCount++;
				if (loadedTextureCount === texturesToLoad.length) {
					game.set('running');
				}
			});
			loadedTexture.magFilter = THREE.NearestFilter;
			textures[texture] = loadedTexture;
		});
	});
</script>

{#if $game == 'loading'}
	<Loader />
{:else if $game == 'menu'}
	<Menu />
{:else if $game == 'running'}
	<Scene {textures} />
{/if}
