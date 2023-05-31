<script lang="ts">
	import * as THREE from 'three';
	import * as T from '@threlte/core';

	import type { Position2d } from '$lib/levels';

	export let position: Position2d;

	export let direction = Math.PI / 2;

	export let color = 0x444444;
</script>

<T.Mesh
	geometry={new THREE.BoxGeometry(0.05, 0.05, 0.025)}
	material={new THREE.MeshLambertMaterial({
		color
	})}
	position={{
		x: position[0] + 0.45 * Math.cos(direction),
		y: 0,
		z: position[1] + 0.45 * Math.sin(direction)
	}}
	interactive
	on:click
/>
