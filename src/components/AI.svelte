<script lang="ts">
	import type { AI } from '..';
	import Box from './Box.svelte';
	import { store } from '$stores/store';
	import * as THREE from 'three';

	export let ai: AI;
	export let texture: THREE.Texture | null;

	$: ratio = ai.stats.hp / ai.stats.maxHp;
</script>

<Box
	x={ai.x}
	y={ai.y}
	wx={Math.abs(Math.cos($store.player.position.t))}
	wy={Math.abs(Math.sin($store.player.position.t))}
	{texture}
	color={ai.color}
/>

<Box
	x={ai.x}
	y={ai.y}
	wx={Math.abs(Math.cos($store.player.position.t)) * 0.8 * ratio}
	wy={Math.abs(Math.sin($store.player.position.t)) * 0.8 * ratio}
	wz={0.05}
	z={0.5}
	color={0xff0000}
/>
