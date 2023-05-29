<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';

	import { position } from '$lib/player';
	import { collisions, tiles } from '$lib/map';
	import { textures } from '$lib/textures';

	import Wall from './Wall.svelte';
	import Floor from './Floor.svelte';
</script>

<SC.Canvas
	background={new THREE.Color('skyblue')}
	fog={new THREE.FogExp2('skyblue', 0.002)}
	shadows
>
	{#each $collisions as collisionX, x}
		{#each collisionX as collision, y}
			{#if collision == 1}
				<Wall position={[x, y]} texture={$textures['wall-' + $tiles[x][y] + '.png']} />
			{/if}
			{#if collision == 0}
				<Floor position={[x, y]} texture={$textures['floor-' + $tiles[x][y] + '.png']} />
			{/if}
		{/each}
	{/each}

	<SC.AmbientLight color={0xddffff} intensity={0.5} />
	<SC.DirectionalLight intensity={0.5} position={[0, 0.05, 10]} shadow={true} />
	<SC.PerspectiveCamera
		position={[
			$position.x - Math.sin($position.t) * 0.5,
			0,
			$position.y + Math.cos($position.t) * 0.5
		]}
		target={[$position.x + Math.sin($position.t), 0, $position.y - Math.cos($position.t)]}
	/>
	<SC.OrbitControls target={[$position.x, 0, $position.y]} />
</SC.Canvas>
