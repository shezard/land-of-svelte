<script lang="ts">
	import * as T from '@threlte/core';
	import * as THREE from 'three';

	import Box from './Box.svelte';

	import { textures } from '$stores/textures';
	import { getClosestWall } from '$lib/helpers';
	import { scripts } from '$lib/scripts';
	import { currentLevel, store } from '$stores/store';
	import type { Script } from '..';

	export let script: Script;

	const handleClick = (script: Script) => () => {
		scripts[$store.currentLevelNumber]
			.filter((scripts) => {
				return scripts.scriptId === script.id && scripts.action === 'click';
			})
			.map((script) => {
				script.doAction(store);
			});
	};

	const handleLoot = (script: Script) => () => {
		console.log(script);
	};

	$: closestWallDirection =
		script.direction !== undefined
			? script.direction
			: getClosestWall($currentLevel, script.x, script.y);

	$: texture = script.texture ? $textures[`${script.texture}.png`] : null;
</script>

{#if script.type == 'door'}
	<T.Mesh
		geometry={new THREE.BoxGeometry()}
		material={new THREE.MeshLambertMaterial({
			map: texture
		})}
		position={{
			x: script.x,
			y: script.z ?? 0,
			z: script.y
		}}
		castShadow
		receiveShadow
	/>
{/if}

{#if script.type == 'button'}
	<Box
		x={script.x + 0.45 * Math.cos(closestWallDirection)}
		y={script.y + 0.45 * Math.sin(closestWallDirection)}
		wx={0.025 + Math.abs(0.025 * Math.sin(closestWallDirection))}
		wy={0.025 + Math.abs(0.025 * Math.cos(closestWallDirection))}
		wz={0.05}
		on:click={handleClick(script)}
		{texture}
		interactive
	/>
{/if}

{#if script.type == 'ladder'}
	<Box
		x={script.x + Math.cos(closestWallDirection) * 0.5}
		y={script.y + Math.sin(closestWallDirection) * 0.5}
		wx={0.1 + Math.abs(0.2 * Math.sin(closestWallDirection))}
		wy={0.1 + Math.abs(0.2 * Math.cos(closestWallDirection))}
		{texture}
		castShadow
	/>
{/if}

{#if script.type == 'ai'}
	<Box
		x={script.x}
		y={script.y}
		wx={Math.abs(Math.cos($store.player.position.t))}
		wy={Math.abs(Math.sin($store.player.position.t))}
		{texture}
		color={script.color}
	/>

	<Box
		x={script.x}
		y={script.y}
		wx={Math.abs(Math.cos($store.player.position.t)) * 0.8}
		wy={Math.abs(Math.sin($store.player.position.t)) * 0.8}
		wz={0.05}
		z={0.5}
		color={0xff0000}
	/>

	<Box
		x={script.x -
			Math.abs(Math.cos($store.player.position.t)) * 0.5 +
			(Math.abs(Math.cos($store.player.position.t)) *
				0.8 *
				(1 - script.stats.hp / script.stats.maxHp)) /
				2}
		y={script.y -
			Math.abs(Math.sin($store.player.position.t)) * 0.5 +
			(Math.abs(Math.sin($store.player.position.t)) *
				0.8 *
				(1 - script.stats.hp / script.stats.maxHp)) /
				2}
		z={0.5}
		wx={Math.abs(Math.cos($store.player.position.t)) *
			0.8 *
			(1 - script.stats.hp / script.stats.maxHp)}
		wy={Math.abs(Math.sin($store.player.position.t)) *
			0.8 *
			(1 - script.stats.hp / script.stats.maxHp)}
		wz={0.05}
		color={0x000000}
	/>
{/if}

{#if script.type == 'loot'}
	<Box x={script.x} y={script.y} z={-0.4} wz={0.1} on:click={handleLoot(script)} {texture} />
{/if}
