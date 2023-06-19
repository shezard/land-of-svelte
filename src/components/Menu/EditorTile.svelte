<script lang="ts">
	import type { Tile } from '../..';

	export let tile: Tile;

	export let sized: boolean = false;

	$: texture = tile.collision ? `textures/wall-${tile.texture}.png` : `textures/floor-0.png`;
</script>

<img
	src={texture}
	class:sized
	alt=""
	on:click
	on:keypress={() => {
		// no-op
	}}
/>

<style>
	.sized {
		width: 48px;
		height: 48px;
	}
</style>
