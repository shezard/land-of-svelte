<script lang="ts">
	import * as THREE from 'three';
	import * as T from '@threlte/core';
	import { levels } from '$lib/levels';

	export let texture: THREE.Texture;
</script>

<T.Mesh
	geometry={new THREE.BoxGeometry($levels[0].width, 1, $levels[0].height)}
	material={new THREE.MeshLambertMaterial({
		map: texture
	})}
	position={{
		x: $levels[0].width / 2,
		y: 1,
		z: $levels[0].height / 2
	}}
	receiveShadow
/>
