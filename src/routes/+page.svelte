<script lang="ts">
	import { game } from '$lib/game';
	import { collisions } from '$lib/map';
	import { position } from '$lib/player';
	import Game from '../components/Game.svelte';

	const keyUp = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			game.toggleMenu();
		}
	};

	const keyPress = (e: KeyboardEvent) => {
		if ($game !== 'running') {
			return;
		}

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

<svelte:window on:keypress={keyPress} on:keyup={keyUp} />

<Game />
