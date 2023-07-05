<script lang="ts">
	import type { Npc } from '..';
	import Box from './Box.svelte';
	import { player } from '$stores/player';
	import type * as THREE from 'three';

	export let npc: Npc;
	export let texture: THREE.Texture[];
</script>

<Box
	x={npc.x}
	y={npc.y}
	wx={Math.abs(Math.cos($player.position.t))}
	wy={Math.abs(Math.sin($player.position.t))}
	{texture}
	color={npc.color}
    transparent
    cursorName='interact'
/>
