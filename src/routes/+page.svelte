<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';

	import { position } from '$lib/player';
	import { tiles } from '$lib/map';
	import Wall from '../components/Wall.svelte';
	import Floor from '../components/Floor.svelte';

	const keyPress = (e) => {
		if (e.key === 'z') {
			position.moveForward();
		}
		if (e.key === 'q') {
			position.moveLeft();
		}
		if (e.key === 's') {
			position.moveBackward();
		}
		if (e.key === 'd') {
			position.moveRight();
		}
		if (e.key === 'a') {
			position.rotateLeft();
		}
		if (e.key === 'e') {
			position.rotateRight();
		}
	};
</script>

<svelte:window on:keypress={keyPress} />

<SC.Canvas
	background={new THREE.Color('skyblue')}
	fog={new THREE.FogExp2('skyblue', 0.002)}
	shadows
>
	{#each $tiles as tile}
		{#if tile.type == 'wall'}
			<Wall position={tile.position} texture={tile.texture} />
		{/if}
		{#if tile.type == 'floor'}
			<Floor position={tile.position} />
		{/if}
	{/each}

	<SC.AmbientLight intensity={0.5} />
	<SC.DirectionalLight intensity={0.5} position={[-2, 3, 2]} shadow={{ mapSize: [2048, 2048] }} />
	<SC.PerspectiveCamera
		position={[$position[0], $position[1], $position[2]]}
		target={[$position[0] + Math.sin($position[3]), 0, $position[2] - Math.cos($position[3])]}
	/>
	<SC.OrbitControls
		target={[
			$position[0] + Math.sin($position[3]) / 2,
			0,
			$position[2] - Math.cos($position[3]) / 2
		]}
	/>
</SC.Canvas>
