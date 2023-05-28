<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import type { Position2d } from '$lib/map';

	export let position: Position2d;
</script>

<SC.Mesh
	geometry={new THREE.BoxGeometry()}
	material={new THREE.MeshStandardMaterial({ color: 0x00ff00 })}
	position={[position[0], -1, position[1]]}
	receiveShadow
/>
