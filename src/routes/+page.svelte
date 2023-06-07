<script lang="ts">
	import { game, running } from '$lib/game';
	import { keyboard } from '$lib/keyboard';
	import { currentLevel, store } from '$lib/store';
	import { scripts } from '$lib/scripts';
	import Game from '../components/Game.svelte';
	import type { Store } from '..';

	const doWalk = () => {
		scripts[$store.currentLevelNumber]
			.filter((script) => {
				return (
					script.action === 'walk' &&
					script.x === $store.player.position.x &&
					script.y === $store.player.position.y
				);
			})
			.map((script) => {
				script.doAction(store);
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
			store.update((store: Store) => {
				store.player.moveForward($currentLevel);
				return store;
			});
			doWalk();
		}
		if (e.key === $keyboard.left) {
			store.update((store: Store) => {
				store.player.moveLeft($currentLevel);
				return store;
			});
			doWalk();
		}
		if (e.key === $keyboard.backward) {
			store.update((store: Store) => {
				store.player.moveBackward($currentLevel);
				return store;
			});
			doWalk();
		}
		if (e.key === $keyboard.right) {
			store.update((store: Store) => {
				store.player.moveRight($currentLevel);
				return store;
			});
			doWalk();
		}
		if (e.key === $keyboard.rotateLeft) {
			store.update((store: Store) => {
				store.player.rotateLeft();
				return store;
			});
		}
		if (e.key === $keyboard.rotateRight) {
			store.update((store: Store) => {
				store.player.rotateRight();
				return store;
			});
		}
	};
</script>

<svelte:window on:keypress={keyPress} on:keyup={keyUp} />

<Game />
