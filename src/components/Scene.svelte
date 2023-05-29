<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';

	import { position } from '$lib/player';
	import { textures } from '$lib/textures';
	import { collisions, tiles, lights } from '$lib/map';

	import Wall from './Wall.svelte';
	import Floor from './Floor.svelte';
	import Torch from './Torch.svelte';
	import Map2d from './Map2d.svelte';

	const getLightDirection = function (x: number, y: number) {
		if ($collisions[x + 1][y]) {
			return 0;
		}
		if ($collisions[x][y + 1]) {
			return Math.PI / 2;
		}
		if ($collisions[x - 1][y]) {
			return Math.PI;
		}
		if ($collisions[x][y - 1]) {
			return Math.PI / 2 + Math.PI;
		}
	};
</script>

<SC.Canvas
	background={new THREE.Color('skyblue')}
	fog={new THREE.FogExp2('skyblue', 0.002)}
	shadows
>
	<Map2d map2d={$collisions} let:x let:y let:item>
		{#if item == 1}
			<Wall position={[x, y]} texture={$textures['wall-' + $tiles[x][y] + '.png']} />
		{/if}
		{#if item == 0}
			<Floor position={[x, y]} texture={$textures['floor-' + $tiles[x][y] + '.png']} />
		{/if}
	</Map2d>

	<SC.AmbientLight color={0xddffff} intensity={0.5} />

	<Map2d map2d={$lights} let:x let:y let:item>
		{#if item}
			<Torch position={[x, y]} direction={getLightDirection(x, y)} />
		{/if}
	</Map2d>

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
