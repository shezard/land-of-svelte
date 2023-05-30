<script lang="ts">
	import { game } from '$lib/game';
	import { levels } from '$lib/levels';
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
			position.moveForward($levels[0].collisionMap);
		}
		if (e.key === 'q') {
			position.moveLeft($levels[0].collisionMap);
		}
		if (e.key === 's') {
			position.moveBackward($levels[0].collisionMap);
		}
		if (e.key === 'd') {
			position.moveRight($levels[0].collisionMap);
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
