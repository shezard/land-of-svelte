<script lang="ts">
    import { noop } from '$lib/helpers';
	import type { Item } from '../..';
	import ItemTooltip from './ItemTooltip.svelte';

	export let item: Item;

	let tooltip: Item | null = null;
	let tooltipX = 0;
	let tooltipY = 0;

	const showTooltip = (item: Item) => () => {
		tooltip = item;
	};

	const hideTooltip = () => {
		tooltip = null;
	};

	const moveTooltip = (e: MouseEvent) => {
		tooltipX = Number(e.layerX) + 15;
		tooltipY = Number(e.layerY) + 15;
	};
</script>

<img
	src="textures/{item.texture}.png"
	alt={item.name}
	on:click
	on:mouseenter={showTooltip(item)}
	on:mouseleave={hideTooltip}
	on:mousemove={moveTooltip}
	on:keypress={noop}
/>

{#if tooltip}
	<ItemTooltip item={tooltip} {tooltipX} {tooltipY} />
{/if}

<style>
	img {
		image-rendering: pixelated;
		width: 48px;
		height: 48px;
		padding: 5px;
		@apply inline cursor-pointer;
	}
</style>
