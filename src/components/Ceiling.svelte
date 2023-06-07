<script lang="ts">
	import * as THREE from 'three';
	import * as T from '@threlte/core';
	import { currentLevel } from '$lib/store';

	export let texture: THREE.Texture;
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set($currentLevel.width, $currentLevel.height);
</script>

<T.Mesh
	geometry={new THREE.BoxGeometry($currentLevel.width, 1, $currentLevel.height)}
	material={new THREE.MeshLambertMaterial({
		map: texture
	})}
	position={{
		x: $currentLevel.width / 2,
		y: 1,
		z: $currentLevel.height / 2
	}}
	receiveShadow
/>
