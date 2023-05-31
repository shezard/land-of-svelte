<script lang="ts">
	import { game } from '$lib/game';
	import { currentLevel } from '$lib/levels';
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
			position.moveForward($currentLevel);
		}
		if (e.key === 'q') {
			position.moveLeft($currentLevel);
		}
		if (e.key === 's') {
			position.moveBackward($currentLevel);
		}
		if (e.key === 'd') {
			position.moveRight($currentLevel);
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
