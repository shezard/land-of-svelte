<script lang="ts">
	import * as THREE from 'three';
	import { currentLevel } from '$stores/store';
	import Box from './Box.svelte';

	export let texture: THREE.Texture;
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set($currentLevel.width, $currentLevel.height);
</script>

<Box
	texture={[texture]}
	x={$currentLevel.width / 2}
	y={$currentLevel.height / 2}
	z={1}
	wx={$currentLevel.width}
	wy={$currentLevel.height}
	wz={1}
	receiveShadow
/>
