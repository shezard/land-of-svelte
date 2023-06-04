<script lang="ts">
	import * as T from '@threlte/core';
	import * as THREE from 'three';

	import Box from './Box.svelte';

	import { textures } from '$lib/textures';
	import { getClosestWall } from '$lib/helpers';
	import { currentLevel, currentLevelNumber, levels, type Item } from '$lib/levels';
	import { scripts } from '$lib/scripts';
	import { position } from '$lib/player';

	export let item: Item;

	const handleClick = (item: Item) => () => {
		scripts[$currentLevelNumber]
			.filter((scripts) => {
				return scripts.itemId === item.id && scripts.action === 'click';
			})
			.map((script) => {
				script.doAction(levels, currentLevelNumber, position);
			});
	};

	$: closestWallDirection =
		item.direction !== undefined
			? item.direction
			: getClosestWall($currentLevel, item.x, item.y);
</script>

{#if item.type == 'door'}
	<T.Mesh
		geometry={new THREE.BoxGeometry()}
		material={new THREE.MeshLambertMaterial({
			map: $textures[item.texture + '.png']
		})}
		position={{
			x: item.x,
			y: item.z ?? 0,
			z: item.y
		}}
		castShadow
		receiveShadow
	/>
{/if}

{#if item.type == 'button'}
	<Box
		x={item.x + 0.45 * Math.cos(closestWallDirection)}
		y={item.y + 0.45 * Math.sin(closestWallDirection)}
		wx={0.025 + Math.abs(0.025 * Math.sin(closestWallDirection))}
		wy={0.025 + Math.abs(0.025 * Math.cos(closestWallDirection))}
		wz={0.05}
		on:click={handleClick(item)}
		interactive
	/>
{/if}

{#if item.type == 'ladder'}
	<Box
		x={item.x + Math.cos(closestWallDirection) * 0.5}
		y={item.y + Math.sin(closestWallDirection) * 0.5}
		wx={0.1 + Math.abs(0.2 * Math.sin(closestWallDirection))}
		wy={0.1 + Math.abs(0.2 * Math.cos(closestWallDirection))}
		texture={item.texture}
		castShadow
	/>
{/if}
