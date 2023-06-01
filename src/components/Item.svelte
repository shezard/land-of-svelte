<script lang="ts">
	import * as T from '@threlte/core';
	import * as THREE from 'three';

	import Button from './Button.svelte';

	import { textures } from '$lib/textures';
	import { getClosestWall } from '$lib/helpers';
	import { currentLevel, currentLevelNumber, levels, type Item } from '$lib/levels';
	import { scripts } from '$lib/scripts';

	export let item: Item;

	const handleClick = (item: Item) => () => {
		scripts[$currentLevelNumber]
			.filter((scripts) => {
				return scripts.itemId === item.id && scripts.action === 'click';
			})
			.map((script) => {
				script.doAction(levels, currentLevelNumber);
			});
	};
</script>

{#if item.type == 'door'}
	<T.Mesh
		interactive
		on:click={handleClick(item)}
		geometry={new THREE.BoxGeometry()}
		material={new THREE.MeshLambertMaterial({
			map: $textures[item.texture + '.png']
		})}
		position={{
			x: item.x,
			y: 0,
			z: item.y
		}}
		castShadow
		receiveShadow
	/>
{/if}

{#if item.type == 'button'}
	<Button
		on:click={handleClick(item)}
		position={[item.x, item.y]}
		direction={getClosestWall($currentLevel, item.x, item.y)}
	/>
{/if}
