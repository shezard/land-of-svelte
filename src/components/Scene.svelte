<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';

	import { position } from '$lib/player';
	import { collisions, tiles } from '$lib/map';
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
		const texturesToLoad = ['floor-0.png','floor-1.png', 'wall-0.png', 'wall-1.png', 'wall-2.png', 'wall-3.png', 'wall-4.png'];

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
	Loading ...
{:else if $game == 'running'}
	<SC.Canvas
		background={new THREE.Color('skyblue')}
		fog={new THREE.FogExp2('skyblue', 0.002)}
		shadows
	>
		{#each $collisions as collisionX, x}
			{#each collisionX as collision, y}
				{#if collision == 1}
					<Wall position={[x, y]} texture={textures['wall-' + $tiles[x][y] + '.png']} />
				{/if}
				{#if collision == 0}
					<Floor position={[x, y]} texture={textures['floor-' + $tiles[x][y] + '.png']} />
				{/if}
			{/each}
		{/each}

		<SC.AmbientLight color={0xddffff} intensity={0.5} />
		<SC.DirectionalLight
			intensity={0.5}
			position={[2, 5, 2]}
			shadow={{ mapSize: [2048, 2048] }}
		/>
		<SC.PerspectiveCamera
			position={[$position.x - Math.sin($position.t) * .5, 0, $position.y + Math.cos($position.t) * .5]}
			target={[$position.x + Math.sin($position.t), 0, $position.y - Math.cos($position.t)]}
		/>
		<SC.OrbitControls
			target={[
				$position.x,
				0,
				$position.y
			]}
		/>
	</SC.Canvas>
{/if}
