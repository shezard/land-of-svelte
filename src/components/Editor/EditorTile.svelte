<script lang="ts">
	import type { Tile } from '../..';
    import {currentLevel} from '$stores/store';
	import { getClosestWall } from '$lib/helpers';
    import { noop } from '$lib/helpers';

	export let tile: Tile;

	export let sized = false;

    let texture: string;

	$: texture = tile.collision ? `textures/${tile.texture}.png` : `textures/${$currentLevel.floor}.png`;
	$: texture = tile.script?.texture ? `textures/${tile.script.texture[0]}.png` : texture;
</script>

<div
    class="relative"
    on:click
    on:mouseenter
    on:mousedown
    on:keypress={noop}
>
    <img
        src={texture}
        class:sized
        alt=""
        on:dragstart|preventDefault={noop}
    />

    {#if tile.light}
        <div
            class="absolute top-0 left-0 w-full h-full flex justify-center"
            style="transform:rotate({getClosestWall($currentLevel, tile.x, tile.y) + (Math.PI/2) }rad)"
        >
            <div
                class="rounded border border-1 border-black w-2 h-2 bg-yellow-200"
            >
            </div>
        </div>
    {/if}
</div>

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
