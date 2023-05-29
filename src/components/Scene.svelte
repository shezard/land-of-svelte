<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';

	import { position } from '$lib/player';
	import { tiles } from '$lib/map';
	import { game } from '$lib/game';

	import Wall from './Wall.svelte';
	import Floor from './Floor.svelte';

	type TextureMap = {
		[index: string]: THREE.Texture;
	};

	const textures = {} as TextureMap;

	const textureLoader = new THREE.TextureLoader();

	onMount(() => {
		let loadedTextureCount = 0;
		const texturesToLoad = ['textures/floor-0.png', 'textures/wall-0.png'];

		texturesToLoad.map((texture) => {
			const loadedTexture = textureLoader.load(texture, () => {
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
	Loading ...
{:else if $game == 'running'}
	<SC.Canvas
		background={new THREE.Color('skyblue')}
		fog={new THREE.FogExp2('skyblue', 0.002)}
		shadows
	>
		{#each $tiles as tileX, x}
			{#each tileX as tile, y}
				{#if tile == 1}
					<Wall position={[x, y]} texture={textures['textures/wall-0.png']} />
				{/if}
				{#if tile == 0}
					<Floor position={[x, y]} texture={textures['textures/floor-0.png']} />
				{/if}
			{/each}
		{/each}

		<SC.AmbientLight intensity={0.5} />
		<SC.DirectionalLight
			intensity={0.5}
			position={[2, 5, 2]}
			shadow={{ mapSize: [2048, 2048] }}
		/>
		<SC.PerspectiveCamera
			position={[$position.x, 0, $position.y]}
			target={[$position.x + Math.sin($position.t), 0, $position.y - Math.cos($position.t)]}
		/>
		<SC.OrbitControls
			target={[
				$position.x + Math.sin($position.t) / 2,
				0,
				$position.y - Math.cos($position.t) / 2
			]}
		/>
	</SC.Canvas>
{/if}
