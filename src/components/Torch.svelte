<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';

	import type { Position2d } from '$lib/levels';

	export let position: Position2d;

	export let direction = Math.PI / 2;

	export let color = 0xfff0f0;
</script>

<SC.Group position={[0, -0.1, 0]}>
	<SC.PointLight
		intensity={0.8}
		position={[position[0], 0.4, position[1]]}
		distance={10}
		shadow={true}
		{color}
	/>

	<SC.Mesh
		geometry={new THREE.BoxGeometry(0.05, 0.05, 0.05)}
		material={new THREE.MeshLambertMaterial({
			color
		})}
		position={[
			position[0] + 0.45 * Math.cos(direction),
			0.3,
			position[1] + 0.45 * Math.sin(direction)
		]}
	/>

	<SC.Mesh
		geometry={new THREE.BoxGeometry(0.055, 0.2, 0.055)}
		material={new THREE.MeshLambertMaterial({
			color: 0x62351c
		})}
		position={[
			position[0] + 0.5 * Math.cos(direction),
			0.2,
			position[1] + 0.5 * Math.sin(direction)
		]}
		rotation={[
			0.5 * Math.cos(direction + Math.PI / 2),
			0,
			0.5 * Math.sin(direction + Math.PI / 2)
		]}
		castShadow
	/>
</SC.Group>
