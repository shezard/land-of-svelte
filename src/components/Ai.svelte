<script lang="ts">
	import type { Ai } from '..';
	import Box from './Box.svelte';
	import { player } from '$stores/player';
	import type * as THREE from 'three';

	export let ai: Ai;
	export let texture: THREE.Texture[];

	$: ratio = ai.stats.hp / ai.stats.maxHp;
</script>

<Box
	x={ai.x}
	y={ai.y}
	wx={Math.abs(Math.cos($player.position.t))}
	wy={Math.abs(Math.sin($player.position.t))}
	{texture}
	color={ai.color}
    transparent
    cursorName='attack'
    on:click={() => {
        $player.attack()
    }}
/>

<Box
	x={ai.x}
	y={ai.y}
	wx={Math.abs(Math.cos($player.position.t)) * 0.8 * ratio}
	wy={Math.abs(Math.sin($player.position.t)) * 0.8 * ratio}
	wz={0.05}
	z={0.5}
	color={0xff0000}
/>
