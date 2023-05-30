<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';

	import type { Position2d } from '$lib/levels';

	export let position: Position2d;

	export let direction = Math.PI / 2;

	export let color = 0x444444;

    const toggleButton = () => {
        console.log('ok ok ok');
    }
</script>

<SC.Mesh
	geometry={new THREE.BoxGeometry(0.05, 0.05, 0.025)}
	material={new THREE.MeshLambertMaterial({
		color
	})}
	position={[
		position[0] + 0.45 * Math.cos(direction),
		0,
		position[1] + 0.45 * Math.sin(direction)
	]}
    on:click={toggleButton}
/>
