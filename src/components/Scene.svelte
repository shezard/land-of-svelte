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
	import { get } from 'svelte/store';
	import { player } from '$stores/player';

	const { camera } = useThrelte();

	interactivity();
	gameTick();

	const doWalk = (store: Store): Store => {

        const position = get(player).position;

		scripts[store.currentLevelNumber]
			.filter((script) => {
				return (
					script.doWalk &&
					script.x === position.x &&
					script.y === position.y
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
            player.update((player) => {
				player.moveForward($currentLevel);
                store.update((store) => {
                    return doWalk(store);
                });
                updateCamera(camera, player.position);
                return player;
            });
		}
		if (e.code === $keyboard.left) {
            player.update((player) => {
				player.moveLeft($currentLevel);
                store.update((store) => {
                    return doWalk(store);
                });
                updateCamera(camera, player.position);
                return player;
            });
		}
		if (e.code === $keyboard.backward) {
            player.update((player) => {
				player.moveBackward($currentLevel);
                store.update((store) => {
                    return doWalk(store);
                });
                updateCamera(camera, player.position);
                return player;
            });
		}
		if (e.code === $keyboard.right) {
            player.update((player) => {
				player.moveRight($currentLevel);
                store.update((store) => {
                    return doWalk(store);
                });
                updateCamera(camera, player.position);
                return player;
            });
		}

		if (e.code === $keyboard.rotateLeft) {
            player.update((player) => {
				player.rotateLeft();
                updateCamera(camera, player.position);
                return player;
            });
		}
		if (e.code === $keyboard.rotateRight) {
            player.update((player) => {
				player.rotateRight();
                updateCamera(camera, player.position);
                return player;
            });
		}

		if (e.code === $keyboard.inventory) {
			store.navigateTo('inventory');
		}
	};

	onMount(() => updateCamera(camera, get(player).position));
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
