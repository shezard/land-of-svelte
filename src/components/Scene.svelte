<script lang="ts">
	import * as T from '@threlte/core';

	import { textures } from '$stores/textures';
	import { getClosestWall } from '$lib/helpers';

	import Wall from './Wall.svelte';
	import Floor from './Floor.svelte';
	import Torch from './Torch.svelte';
	import Map2d from './Map2d.svelte';
	import Ceiling from './Ceiling.svelte';
	import Script from './Script.svelte';
	import { gameTick } from '$lib/game';
	import { currentLevel, store } from '$stores/store';

	gameTick();
</script>

{#if $currentLevel.ceiling}
	<Ceiling texture={$textures[`floor-${$currentLevel.ceiling}.png`]} />
{:else}
	<T.AmbientLight color={0xddffff} intensity={0.5} />
{/if}

<Floor texture={$textures[`floor-${$currentLevel.floor}.png`]} />

<Map2d map2d={$currentLevel.collisionMap} let:x let:y let:item>
	{#if item == 1}
		<Wall
			position={[x, y]}
			texture={$textures[`wall-${$currentLevel.textureMap[Number(x)][Number(y)]}.png`]}
		/>
	{/if}
</Map2d>

<Map2d map2d={$currentLevel.lightMap} let:x let:y let:item>
	{#if item}
		<Torch position={[x, y]} direction={getClosestWall($currentLevel, Number(x), Number(y))} />
	{/if}
</Map2d>

{#each $currentLevel.scripts as script}
	<Script {script} />
{/each}

<T.PerspectiveCamera
	position={{
		x: $store.player.position.x - Math.sin($store.player.position.t) * 0.5,
		y: 0,
		z: $store.player.position.y + Math.cos($store.player.position.t) * 0.5
	}}
	lookAt={{
		x: $store.player.position.x + Math.sin($store.player.position.t),
		y: 0,
		z: $store.player.position.y - Math.cos($store.player.position.t)
	}}
>
	<T.OrbitControls
		target={{
			x: $store.player.position.x,
			y: 0,
			z: $store.player.position.y
		}}
	/>
</T.PerspectiveCamera>
