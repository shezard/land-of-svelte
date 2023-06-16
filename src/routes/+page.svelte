<script lang="ts">
	import { keyboard } from '$stores/keyboard';
	import { currentLevel, store } from '$stores/store';
	import { scripts } from '$lib/scripts';
	import Game from '../components/Game.svelte';

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

		store.back();
	};

	const keyPress = (e: KeyboardEvent) => {
		if (
			($store.game.state !== 'inventory' && $store.game.state !== 'running') ||
			$store.game.running === 'gameOver'
		) {
			return;
		}

		if (e.code === $keyboard.forward) {
			store.update((store) => {
				store.player.moveForward($currentLevel);
				return store;
			});
			doWalk();
		}
		if (e.code === $keyboard.left) {
			store.update((store) => {
				store.player.moveLeft($currentLevel);
				return store;
			});
			doWalk();
		}
		if (e.code === $keyboard.backward) {
			store.update((store) => {
				store.player.moveBackward($currentLevel);
				return store;
			});
			doWalk();
		}
		if (e.code === $keyboard.right) {
			store.update((store) => {
				store.player.moveRight($currentLevel);
				return store;
			});
			doWalk();
		}

		if (e.code === $keyboard.rotateLeft) {
			store.update((store) => {
				store.player.rotateLeft();
				return store;
			});
		}
		if (e.code === $keyboard.rotateRight) {
			store.update((store) => {
				store.player.rotateRight();
				return store;
			});
		}

		if (e.code === $keyboard.inventory) {
			store.navigateTo('inventory');
		}
	};
</script>

<svelte:window on:keypress={keyPress} on:keyup={keyUp} />

<Game />
