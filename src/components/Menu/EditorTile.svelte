<script lang="ts">
	import type { Tile } from '../..';

	export let tile: Tile;

	export let sized: boolean = false;

	$: texture = tile.collision ? `textures/wall-${tile.texture}.png` : `textures/floor-0.png`;

	$: texture =
		tile.script && tile.script.texture ? `textures/${tile.script.texture[0]}.png` : texture;
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
	img {
		aspect-ratio: 1;
	}

	.sized {
		width: 48px;
		height: 48px;
	}
</style>
