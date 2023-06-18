<script lang="ts">
	import { container } from '$stores/container';
	import { store } from '$stores/store';
	import type { Item } from '../..';
	import ItemTooltip from './ItemTooltip.svelte';

	const toBag = (item: Item, itemIndex: number) => () => {
		store.update((store) => {
			store.player.inventory.bag.push(item);
			return store;
		});
		container.update((container) => {
			container.splice(itemIndex, 1);
			return container;
		});
		tooltip = null;
	};

	const toContainer = (item: Item, itemIndex: number) => () => {
		store.update((store) => {
			store.player.inventory.bag.splice(itemIndex, 1);
			return store;
		});
		container.update((container) => {
			container.push(item);
			return container;
		});
		tooltip = null;
	};

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

<div class="menu">
	<div class="text-3xl text-white">Transfert</div>

	<div class="grid grid-cols-3">
		<div class="flex flex-col text-white">
			<div class="text-2xl">Bag:</div>
			{#each $store.player.inventory.bag as item, index}
				<img
					src="textures/{item.texture}.png"
					alt={item.name}
					on:click={toContainer(item, index)}
					on:mouseenter={showTooltip(item)}
					on:mouseleave={hideTooltip}
					on:mousemove={moveTooltip}
					on:keypress={() => {
						//no-op
					}}
				/>
			{/each}
		</div>

		<div class="flex flex-col text-white">
			<div class="text-2xl">Container:</div>
			{#each $container as item, index}
				<img
					src="textures/{item.texture}.png"
					alt={item.name}
					on:click={toBag(item, index)}
					on:mouseenter={showTooltip(item)}
					on:mouseleave={hideTooltip}
					on:mousemove={moveTooltip}
					on:keypress={() => {
						//no-op
					}}
				/>
			{/each}
		</div>
	</div>

	{#if tooltip}
        <ItemTooltip item={tooltip} {tooltipX} {tooltipY}/>
	{/if}
</div>

<style>
	img {
		image-rendering: pixelated;
		width: 48px;
		height: 48px;
        border: 2px solid rgba(255,255,255,0.2);
        padding: 5px;
		@apply inline cursor-pointer;
	}
</style>
