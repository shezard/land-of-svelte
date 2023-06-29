<script lang="ts">
	import Box from './Box.svelte';

	import { textures } from '$stores/textures';
	import { getClosestWall } from '$lib/helpers';
	import { scripts } from '$lib/scripts';
	import { currentLevel, store } from '$stores/store';
	import type { Container, Loot, Panel, Script, Store } from '..';
	import { makeItem } from '$lib/Item';
	import AI from './AI.svelte';
	import { logs } from '$stores/logs';
	import { container } from '$stores/container';
	import { player } from '$stores/player';
	import { get } from 'svelte/store';
	import Npc from './Npc.svelte';

	export let script: Script;

	const handleClick = (script: Script) => () => {
		scripts[get(store).currentLevelNumber]
			.filter((scripts) => {
				return scripts.scriptId === script.id && scripts.predicate();
			})
			.map((script) => {
				script.doClick?.();
			});
	};

	const handleLoot = (loot: Loot) => () => {

        player.update((player) => {
			player.inventory.bag = [makeItem(loot.name), ...player.inventory.bag];
            return player;
        });

		store.update((store: Store) => {

			store.levels[store.currentLevelNumber].scripts = store.levels[
				store.currentLevelNumber
			].scripts.filter((script) => {
				return loot.id !== script.id;
			});

			return store;
		});

		logs.update((logs) => {
			logs.push(`You take a ${loot.name}`);
			return logs;
		});
	};

	const handleContainer = (containerScript: Container) => () => {
		store.navigateTo('container');
		container.set(containerScript);
	};

	const showText = (panel: Panel) => () => {
		logs.update((logs) => {
			logs = logs.concat(panel.content);
			return logs;
		});
	};

	$: closestWallDirection = script.t
		? script.t
		: getClosestWall($currentLevel, script.x, script.y);

	$: texture = script.texture.map((texture) => $textures[`${texture}.png`]);
</script>

{#if script.type == 'door'}
	<Box
		x={script.x}
		y={script.y}
		z={script.z ?? 0}
		{texture}
		on:click={handleClick(script)}
		interactive
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
		color={0xffffff}
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
        transparent
	/>
{/if}

{#if script.type == 'ai'}
	<AI ai={script} {texture}/>
{/if}

{#if script.type == 'npc'}
	<Npc npc={script} {texture}/>
{/if}

{#if script.type == 'loot'}
	<Box
		x={script.x}
		y={script.y}
		wx={0.5}
		wy={0.0}
		wz={0.5}
		rz={script.t}
		on:click={handleLoot(script)}
		{texture}
        transparent
		interactive
	/>
{/if}

{#if script.type == 'panel'}
	<Box
		x={script.x + Math.cos(script.t) * 0.5}
		y={script.y + Math.sin(script.t) * 0.5}
		wx={0.05 + Math.abs(0.4 * Math.sin(script.t))}
		wy={0.05 + Math.abs(0.4 * Math.cos(script.t))}
		wz={0.3}
		on:click={showText(script)}
		{texture}
		interactive
	/>
{/if}

{#if script.type == 'container'}
	<Box
		x={script.x}
		y={script.y}
		z={-0.2}
		wx={0.6}
		wy={0.6}
		wz={0.6}
		rz={Math.PI}
		on:click={handleContainer(script)}
		{texture}
        transparent
		interactive
	/>
{/if}
