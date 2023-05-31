<script lang="ts">
	import * as T from '@threlte/core';

	import { position } from '$lib/player';
	import { textures } from '$lib/textures';
	import { levels } from '$lib/levels';

	import Wall from './Wall.svelte';
	import Floor from './Floor.svelte';
	import Torch from './Torch.svelte';
	import Map2d from './Map2d.svelte';
	import Ceiling from './Ceiling.svelte';
	import Button from './Button.svelte';

	const getClosestWall = function (x: number, y: number) {
		if ($levels[0].collisionMap[x + 1][y]) {
			return 0;
		}
		if ($levels[0].collisionMap[x][y + 1]) {
			return Math.PI / 2;
		}
		if ($levels[0].collisionMap[x - 1][y]) {
			return Math.PI;
		}
		if ($levels[0].collisionMap[x][y - 1]) {
			return Math.PI / 2 + Math.PI;
		}
	};
</script>

<div class="container w-screen h-screen">
	<T.Canvas>
		{#if $levels[0].ceiling}
			<Ceiling texture={$textures['floor-' + $levels[0].ceiling + '.png']} />
		{:else}
			<T.AmbientLight color={0xddffff} intensity={0.5} />
		{/if}

		<Map2d map2d={$levels[0].collisionMap} let:x let:y let:item>
			{#if item == 1}
				<Wall
					position={[x, y]}
					texture={$textures['wall-' + $levels[0].textureMap[x][y] + '.png']}
				/>
			{/if}
			{#if item == 0}
				<Floor
					position={[x, y]}
					texture={$textures['floor-' + $levels[0].textureMap[x][y] + '.png']}
				/>
			{/if}
		</Map2d>

		<Map2d map2d={$levels[0].lightMap} let:x let:y let:item>
			{#if item}
				<Torch position={[x, y]} direction={getClosestWall(x, y)} />
			{/if}
		</Map2d>

		{#each $levels[0].items as item}
			{#if item.type == 'door'}
				<Wall position={[item.x, item.y]} texture={$textures[item.texture + '.png']} />
			{/if}

			{#if item.type == 'button'}
				<Button position={[item.x, item.y]} direction={getClosestWall(item.x, item.y)} />
			{/if}
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
