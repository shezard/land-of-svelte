<script lang="ts">
    import * as THREE from 'three';
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
	import { scripts } from '$lib/scripts';
	import { keyboard } from '$stores/keyboard';
	import { onMount } from 'svelte';
	import { updateCamera } from '$lib/camera';
	import { get } from 'svelte/store';
	import { player } from '$stores/player';
    import { INTERACTIVITY_DISTANCE, pointer } from '$stores/cursor';

	const { camera, scene } = useThrelte();

	interactivity();
	gameTick();

	const doWalk = () => {

        const position = get(player).position;

		scripts[get(store).currentLevelNumber]
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
				script.doWalk();
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
            player.update((player) => {
				player.moveForward($currentLevel);
                doWalk();
                store.update((store) => {
                    return store;
                });
                updateCamera(camera, player.position);
                return player;
            });
		}

		if (e.code === $keyboard.left) {
            player.update((player) => {
				player.moveLeft($currentLevel);
                doWalk();
                store.update((store) => {
                    return store;
                });
                updateCamera(camera, player.position);
                return player;
            });
		}

		if (e.code === $keyboard.backward) {
            player.update((player) => {
				player.moveBackward($currentLevel);
                doWalk();
                store.update((store) => {
                    return store;
                });
                updateCamera(camera, player.position);
                return player;
            });
		}

		if (e.code === $keyboard.right) {
            player.update((player) => {
				player.moveRight($currentLevel);
                doWalk();
                store.update((store) => {
                    return store;
                });
                updateCamera(camera, player.position);
                return player;
            });
		}

		if (e.code === $keyboard.rotateLeft) {
            player.update((player) => {
				player.rotateLeft();
                store.update((store) => {
                    return store;
                });
                updateCamera(camera, player.position);
                return player;
            });
		}
		if (e.code === $keyboard.rotateRight) {
            player.update((player) => {
				player.rotateRight();
                store.update((store) => {
                    return store;
                });
                updateCamera(camera, player.position);
                return player;
            });
		}

		if (e.code === $keyboard.inventory) {
			store.navigateTo('inventory');
		}

        updateCursor();
	};

	onMount(() => updateCamera(camera, get(player).position));

    const pointerPosition = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    const updatePointer = (e : MouseEvent) => {
        pointerPosition.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        pointerPosition.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

        updateCursor();
    }

    const updateCursor = () => {
        $camera.updateMatrixWorld();
        raycaster.setFromCamera(pointerPosition, $camera);

        const intersects = raycaster.intersectObjects(scene.children, false);

        if(intersects.length) {

            let cursor = null;

            if(intersects[0].distance < INTERACTIVITY_DISTANCE) {
                if(intersects[0].object.name === 'interact') {
                    cursor = 'interact';
                }

                if(intersects[0].object.name === 'attack') {
                    cursor = 'attack';
                }
            }

            pointer.set(cursor);
        }
    }
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

<T.AmbientLight args={[new THREE.Color(0x404040)]}></T.AmbientLight>

<svelte:window on:keypress={keyPress} on:keyup={keyUp} on:mousemove={updatePointer} />
