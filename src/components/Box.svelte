<script lang="ts">
	import * as THREE from 'three';
	import * as T from '@threlte/core';

	export let texture: THREE.Texture | null;

	export let x = 0;
	export let y = 0;
	export let z = 0;

	export let wx = 1;
	export let wy = 1;
	export let wz = 1;

	export let receiveShadow = false;
	export let castShadow = false;
	export let interactive = false;
</script>

<T.Mesh
	geometry={new THREE.BoxGeometry(wx, wz, wy)}
	material={new THREE.MeshLambertMaterial({
		map: texture,
		transparent: true
	})}
	position={{ x: x, y: z, z: y }}
	{receiveShadow}
	{castShadow}
	{interactive}
	on:click
/>
