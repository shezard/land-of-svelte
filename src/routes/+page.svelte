<script lang="ts">
	import { position } from '$lib/player';
	import Scene from '../components/Scene.svelte';

	const keyPress = (e) => {
		if (e.key === 'z') {
			position.moveForward();
		}
		if (e.key === 'q') {
			position.moveLeft();
		}
		if (e.key === 's') {
			position.moveBackward();
		}
		if (e.key === 'd') {
			position.moveRight();
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
