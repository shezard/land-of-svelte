<script lang="ts">
	import * as THREE from 'three';
	import * as T from '@threlte/core';
	import { useCursor } from '@threlte/extras';

	export let texture: THREE.Texture | null = null;
	export let color: THREE.ColorRepresentation = 0xffffff;

	export let x = 0;
	export let y = 0;
	export let z = 0;

	export let wx = 1;
	export let wy = 1;
	export let wz = 1;

	export let rx = 0;
	export let ry = 0;
	export let rz = 0;

	export let receiveShadow = false;
	export let castShadow = false;
	export let interactive = false;

	const { onPointerEnter, onPointerLeave } = useCursor('pointer', 'default');
</script>

<T.Mesh
	geometry={new THREE.BoxGeometry(wx, wz, wy)}
	material={new THREE.MeshLambertMaterial({
		map: texture,
		transparent: true,
		color: color
	})}
	position={{ x: x, y: z, z: y }}
	rotation={{ x: rx, y: rz, z: ry }}
	{receiveShadow}
	{castShadow}
	{interactive}
	on:click
	on:pointerenter={onPointerEnter}
	on:pointerleave={onPointerLeave}
/>
