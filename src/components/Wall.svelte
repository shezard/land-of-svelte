<script lang="ts">
	import type * as THREE from 'three';
	import type { Position2d } from '../index.d.ts';
	import Box from './Box.svelte';

	export let position: Position2d;
	export let texture: THREE.Texture;
</script>

<Box texture={[texture]} x={position[0]} y={position[1]} castShadow receiveShadow />
