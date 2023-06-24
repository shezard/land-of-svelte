<script lang="ts">
	import { T } from '@threlte/core';
	import type { Position2d } from '../index.d.ts';
	import Box from './Box.svelte';
	import { colorCache } from '$lib/color.js';

	export let position: Position2d;

	export let t = Math.PI / 2;
</script>

<T.Group position.y={-0.1}>
	<T.PointLight
		intensity={0.8}
		position={[position[0], 0.4, position[1]]}
		distance={10}
		color={colorCache(0xffdede)}
		castShadow={true}
	/>

	<Box
		color={0xfff0f0}
		x={position[0] + 0.45 * Math.cos(t)}
		y={position[1] + 0.45 * Math.sin(t)}
		z={0.3}
		wx={0.05}
		wy={0.05}
		wz={0.05}
	/>

	<Box
		color={0x62351c}
		x={position[0] + 0.5 * Math.cos(t)}
		y={position[1] + 0.5 * Math.sin(t)}
		z={0.2}
		wx={0.055}
		wy={0.055}
		wz={0.2}
		rx={0.5 * Math.cos(t + Math.PI / 2)}
		ry={0.5 * Math.sin(t + Math.PI / 2)}
	/>
</T.Group>
