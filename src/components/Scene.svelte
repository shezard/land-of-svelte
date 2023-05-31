<script lang="ts">
	import * as T from '@threlte/core';

	import { position } from '$lib/player';
	import { textures } from '$lib/textures';
	import { currentLevel } from '$lib/levels';

	import Wall from './Wall.svelte';
	import Floor from './Floor.svelte';
	import Torch from './Torch.svelte';
	import Map2d from './Map2d.svelte';
	import Ceiling from './Ceiling.svelte';
	import Item from './Item.svelte';
	import { getClosestWall } from '$lib/helpers';
</script>

<div class="container w-screen h-screen">
	<T.Canvas>
		{#if $currentLevel.ceiling}
			<Ceiling texture={$textures['floor-' + $currentLevel.ceiling + '.png']} />
		{:else}
			<T.AmbientLight color={0xddffff} intensity={0.5} />
		{/if}

		<Map2d map2d={$currentLevel.collisionMap} let:x let:y let:item>
			{#if item == 1}
				<Wall
					position={[x, y]}
					texture={$textures['wall-' + $currentLevel.textureMap[x][y] + '.png']}
				/>
			{/if}
			{#if item == 0}
				<Floor
					position={[x, y]}
					texture={$textures['floor-' + $currentLevel.textureMap[x][y] + '.png']}
				/>
			{/if}
		</Map2d>

		<Map2d map2d={$currentLevel.lightMap} let:x let:y let:item>
			{#if item}
				<Torch position={[x, y]} direction={getClosestWall($currentLevel, x, y)} />
			{/if}
		</Map2d>

		{#each $currentLevel.items as item}
			<Item {item} />
		{/each}

		<T.PerspectiveCamera
			position={{
				x: $position.x - Math.sin($position.t) * 0.5,
				y: 0,
				z: $position.y + Math.cos($position.t) * 0.5
			}}
			lookAt={{
				x: $position.x + Math.sin($position.t),
				y: 0,
				z: $position.y - Math.cos($position.t)
			}}
		>
			<T.OrbitControls
				target={{
					x: $position.x,
					y: 0,
					z: $position.y
				}}
			/>
		</T.PerspectiveCamera>
	</T.Canvas>
</div>
