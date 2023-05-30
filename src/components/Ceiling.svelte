<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import { levels } from '$lib/levels';

	export let texture: THREE.Texture;
</script>

<SC.Mesh
	geometry={new THREE.BoxGeometry($levels[0].width, 1, $levels[0].height)}
	material={new THREE.MeshLambertMaterial({
		map: texture
	})}
	position={[$levels[0].width / 2, 1, $levels[0].height / 2]}
	receiveShadow
/>
