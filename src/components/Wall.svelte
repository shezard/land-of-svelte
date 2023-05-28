<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import type { Position2d } from '$lib/map';

	export let position: Position2d;
</script>

<SC.Mesh
	geometry={new THREE.BoxGeometry()}
	material={new THREE.MeshStandardMaterial({ color: 0xff0000 })}
	position={[position[0], 0, position[1]]}
	castShadow
/>
