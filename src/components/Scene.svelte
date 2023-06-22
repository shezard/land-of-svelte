<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { interactivity } from '@threlte/extras';

	import { textures } from '$stores/textures';
	import { getClosestWall } from '$lib/helpers';

	import Wall from './Wall.svelte';
	import Floor from './Floor.svelte';
	import Torch from './Torch.svelte';
	import Ceiling from './Ceiling.svelte';
	import Script from './Script.svelte';
	import { gameTick } from '$lib/game';
	import { currentLevel, store } from '$stores/store';
	import type { Store } from '..';
	import { scripts } from '$lib/scripts';
	import { keyboard } from '$stores/keyboard';
	import { onMount } from 'svelte';
	import { updateCamera } from '$lib/camera';

	const { camera } = useThrelte();

	interactivity();
	gameTick();

	const doWalk = (store: Store): Store => {
		scripts[store.currentLevelNumber]
			.filter((script) => {
				return (
					script.doWalk &&
					script.x === store.player.position.x &&
					script.y === store.player.position.y
				);
			})
			.map((script) => {
				if (!script.doWalk) {
					return;
				}
				store = script.doWalk(store);
			});

		return store;
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
				store = doWalk(store);
				return store;
			});

			updateCamera($store, camera);
		}
		if (e.code === $keyboard.left) {
			store.update((store) => {
				store.player.moveLeft($currentLevel);
				store = doWalk(store);
				return store;
			});
			updateCamera($store, camera);
		}
		if (e.code === $keyboard.backward) {
			store.update((store) => {
				store.player.moveBackward($currentLevel);
				store = doWalk(store);
				return store;
			});
			updateCamera($store, camera);
		}
		if (e.code === $keyboard.right) {
			store.update((store) => {
				store.player.moveRight($currentLevel);
				store = doWalk(store);
				return store;
			});
			updateCamera($store, camera);
		}

		if (e.code === $keyboard.rotateLeft) {
			store.update((store) => {
				store.player.rotateLeft();
				return store;
			});
			updateCamera($store, camera);
		}
		if (e.code === $keyboard.rotateRight) {
			store.update((store) => {
				store.player.rotateRight();
				return store;
			});
			updateCamera($store, camera);
		}

		if (e.code === $keyboard.inventory) {
			store.navigateTo('inventory');
		}
	};

	onMount(() => updateCamera($store, camera));
</script>

<Ceiling texture={$textures[`${$currentLevel.ceiling}.png`]} />

<Floor texture={$textures[`${$currentLevel.floor}.png`]} />

{#each $currentLevel.getWalls() as wall}
	<Wall
		position={[wall.x, wall.y]}
		texture={$textures[`${$currentLevel.textureMap[wall.x][wall.y]}.png`]}
	/>
{/each}

{#each $currentLevel.lights as torch}
	<Torch position={[torch.x, torch.y]} t={getClosestWall($currentLevel, torch.x, torch.y)} />
{/each}

{#each $currentLevel.scripts as script}
	<Script {script} />
{/each}

<T.PerspectiveCamera makeDefault />

<svelte:window on:keypress={keyPress} on:keyup={keyUp} />
