<script lang="ts">
	import { clickOutside } from "$lib/helpers";
	import { createEventDispatcher } from "svelte";

    export let texture : string;

    let active = false;

	const dispatch = createEventDispatcher<{change: string}>();

    const textures = Object.keys(import.meta.glob('../../../static/textures/*-*.png')).map(
		(name) => {
			return name.replace('../../../static/textures/', '').replace('.png', '');
		}
	);
</script>

<img
    src={`textures/${texture}.png`} alt=""
    on:click={() => {
        active = true;
    }}
    on:keypress={() => {
        // no-op
    }}
/>

<div class="mt-2 hidden rounded absolute border grid-cols-4 grid-flow backdrop-blur" class:active>
    {#each textures as textureToPick }
        <img
            src={`textures/${textureToPick}.png`}
            alt=""
            on:click={() => {
                dispatch('change', textureToPick);
                active = false;
            }}
            use:clickOutside
            on:clickoutside={() => {
                active = false;
            }}
            on:keypress={() => {
                //no-op
            }}
        />
    {/each}
</div>

<style>
    .active {
        display: grid;
    }

    img {
        width: 48px;
        height: 48px;
        image-rendering: pixelated;
        cursor: pointer;
    }
</style>
