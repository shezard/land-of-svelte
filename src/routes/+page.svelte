<script lang="ts">
	import { game } from '$lib/game';
	import { currentLevelNumber, currentLevel, levels } from '$lib/levels';
	import { position } from '$lib/player';
	import { scripts } from '$lib/scripts';
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
            scripts[$currentLevelNumber].filter((script) => {
                return script.action === 'walk' && script.x === $position.x && script.y === $position.y
            }).map((script) => {
                script.doAction(levels, currentLevelNumber);
            });
		}
		if (e.key === 'q') {
			position.moveLeft($currentLevel);
            scripts[$currentLevelNumber].filter((script) => {
                return script.action === 'walk' && script.x === $position.x && script.y === $position.y
            }).map((script) => {
                script.doAction(levels, currentLevelNumber);
            });
		}
		if (e.key === 's') {
			position.moveBackward($currentLevel);
            scripts[$currentLevelNumber].filter((script) => {
                return script.action === 'walk' && script.x === $position.x && script.y === $position.y
            }).map((script) => {
                script.doAction(levels, currentLevelNumber);
            });
		}
		if (e.key === 'd') {
			position.moveRight($currentLevel);
            scripts[$currentLevelNumber].filter((script) => {
                return script.action === 'walk' && script.x === $position.x && script.y === $position.y
            }).map((script) => {
                script.doAction(levels, currentLevelNumber);
            });
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
