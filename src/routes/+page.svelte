<script lang="ts">
	import { keyboard } from '$stores/keyboard';
	import { currentLevel, store } from '$stores/store';
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

		if (
			($store.game.running === 'continue' && $store.game.state === 'running') ||
			$store.game.state === 'controlMenu'
		) {
			store.update((store: Store) => {
				store.game.state = 'mainMenu';
				return store;
			});
			return;
		}

		if (
			($store.game.running === 'continue' || $store.game.running === 'gameOver') &&
			$store.game.state === 'mainMenu'
		) {
			store.update((store: Store) => {
				store.game.state = 'running';
				return store;
			});
			return;
		}
	};

	const keyPress = (e: KeyboardEvent) => {
		if ($store.game.state !== 'running' || $store.game.running === 'gameOver') {
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
