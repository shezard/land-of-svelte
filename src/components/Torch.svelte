<script lang="ts">
	import * as T from '@threlte/core';
	import type { Position2d } from '../index.d.ts';
	import Box from './Box.svelte';

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

	<Box
		{color}
		x={position[0] + 0.45 * Math.cos(direction)}
		y={position[1] + 0.45 * Math.sin(direction)}
		z={0.3}
		wx={0.05}
		wy={0.05}
		wz={0.05}
	/>

	<Box
		color={0x62351c}
		x={position[0] + 0.5 * Math.cos(direction)}
		y={position[1] + 0.5 * Math.sin(direction)}
		z={0.2}
		wx={0.055}
		wy={0.055}
		wz={0.2}
		rx={0.5 * Math.cos(direction + Math.PI / 2)}
		ry={0.5 * Math.sin(direction + Math.PI / 2)}
		castShadow
	/>
</T.Group>
