<script lang="ts">
	import { collisions } from '$lib/map';
	import { position } from '$lib/player';
	import Scene from '../components/Scene.svelte';

	const keyPress = (e) => {
		if (e.key === 'z') {
			position.moveForward($collisions);
		}
		if (e.key === 'q') {
			position.moveLeft($collisions);
		}
		if (e.key === 's') {
			position.moveBackward($collisions);
		}
		if (e.key === 'd') {
			position.moveRight($collisions);
		}
		if (e.key === 'a') {
			position.rotateLeft();
		}
		if (e.key === 'e') {
			position.rotateRight();
		}
	};
</script>

<svelte:window on:keypress={keyPress} />

<Scene />
