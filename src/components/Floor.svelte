<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import type { Position2d } from '$lib/map';
	import { loader } from '$lib/textures';

	export let position: Position2d;
	export let texture: string;

	const loadedTexture = loader.load(texture);
	loadedTexture.magFilter = THREE.NearestFilter;
</script>

<SC.Mesh
	geometry={new THREE.BoxGeometry()}
    material={new THREE.MeshLambertMaterial({
		map: loadedTexture
	})}
	position={[position[0], -1, position[1]]}
	receiveShadow
/>
