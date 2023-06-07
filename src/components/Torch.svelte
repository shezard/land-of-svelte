<script lang="ts">
	import * as THREE from 'three';
	import * as T from '@threlte/core';
	import type { Position2d } from '../index.d.ts';

	export let position: Position2d;

	export let direction = Math.PI / 2;

	export let color = 0xfff0f0;
</script>

<T.Group
	position={{
		x: 0,
		y: -0.1,
		z: 0
	}}
>
	<T.PointLight
		intensity={0.8}
		position={{
			x: position[0],
			y: 0.4,
			z: position[1]
		}}
		distance={10}
		shadow={true}
		{color}
	/>

	<T.Mesh
		geometry={new THREE.BoxGeometry(0.05, 0.05, 0.05)}
		material={new THREE.MeshLambertMaterial({
			color
		})}
		position={{
			x: position[0] + 0.45 * Math.cos(direction),
			y: 0.3,
			z: position[1] + 0.45 * Math.sin(direction)
		}}
	/>

	<T.Mesh
		geometry={new THREE.BoxGeometry(0.055, 0.2, 0.055)}
		material={new THREE.MeshLambertMaterial({
			color: 0x62351c
		})}
		position={{
			x: position[0] + 0.5 * Math.cos(direction),
			y: 0.2,
			z: position[1] + 0.5 * Math.sin(direction)
		}}
		rotation={{
			x: 0.5 * Math.cos(direction + Math.PI / 2),
			y: 0,
			z: 0.5 * Math.sin(direction + Math.PI / 2)
		}}
		castShadow
	/>
</T.Group>
