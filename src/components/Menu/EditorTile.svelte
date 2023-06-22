<script lang="ts">
	import type { Tile } from '../..';
    import {currentLevel} from '$stores/store';

	export let tile: Tile;

	export let sized = false;

    let texture: string;

	$: texture = tile.collision ? `textures/wall-${tile.texture}.png` : `textures/${$currentLevel.floor}.png`;
	$: texture = tile.script?.texture ? `textures/${tile.script.texture[0]}.png` : texture;
</script>

<img
	src={texture}
	class:sized
	alt=""
	on:click
    on:mouseenter
    on:mousedown
	on:keypress={() => {
		// no-op
	}}
    on:dragstart|preventDefault={() => {
        // no-op
    }}
/>

<style>
	img {
		aspect-ratio: 1;
        width: 100%;
        height: 100%;
	}

	.sized {
		width: 48px;
		height: 48px;
	}
</style>
