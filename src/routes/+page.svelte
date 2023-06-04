<script lang="ts">
	import { game, running } from '$lib/game';
	import { keyboard } from '$lib/keyboard';
	import { currentLevelNumber, currentLevel, levels } from '$lib/levels';
	import { position } from '$lib/player';
	import { scripts } from '$lib/scripts';
	import Game from '../components/Game.svelte';

	const doWalk = () => {
		scripts[$currentLevelNumber]
			.filter((script) => {
				return (
					script.action === 'walk' && script.x === $position.x && script.y === $position.y
				);
			})
			.map((script) => {
				script.doAction(levels, currentLevelNumber, position);
			});
	};

	const keyUp = (e: KeyboardEvent) => {
		if (e.key !== 'Escape') {
			return;
		}

		if (($running === 'continue' && $game === 'running') || $game === 'controlMenu') {
			game.set('mainMenu');
			return;
		}

		if ($running === 'continue' && $game === 'mainMenu') {
			game.set('running');
			return;
		}
	};

	const keyPress = (e: KeyboardEvent) => {
		if ($game !== 'running') {
			return;
		}

		if (e.key === $keyboard.forward) {
			position.moveForward($currentLevel);
			doWalk();
		}
		if (e.key === $keyboard.left) {
			position.moveLeft($currentLevel);
			doWalk();
		}
		if (e.key === $keyboard.backward) {
			position.moveBackward($currentLevel);
			doWalk();
		}
		if (e.key === $keyboard.right) {
			position.moveRight($currentLevel);
			doWalk();
		}
		if (e.key === $keyboard.rotateLeft) {
			position.rotateLeft();
		}
		if (e.key === $keyboard.rotateRight) {
			position.rotateRight();
		}
	};
</script>

<svelte:window on:keypress={keyPress} on:keyup={keyUp} />

<Game />
