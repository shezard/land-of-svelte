<script lang="ts">
	import * as THREE from 'three';
	import * as T from '@threlte/core';
	import type { Position2d } from '$lib/levels';

	export let position: Position2d;
	export let texture: THREE.Texture;
</script>

<T.Mesh
	geometry={new THREE.BoxGeometry()}
	material={new THREE.MeshLambertMaterial({
		map: texture
	})}
	position={{
		x: position[0],
		y: -1,
		z: position[1]
	}}
	receiveShadow
/>
