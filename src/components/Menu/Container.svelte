<script lang="ts">
	import { container } from '$stores/container';
	import { store } from '$stores/store';
	import type { Item } from '../..';

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
		<div class="info text-2xl text-white absolute" style="top:{tooltipY}px;left:{tooltipX}px;">
			<span>{tooltip.name}</span> <br />
			{#if tooltip.stats.ac > 0}
				AC : {tooltip.stats.ac} <br />
			{/if}
			{#if tooltip.stats.hit > 0}
				Hit : {tooltip.stats.hit} <br />
			{/if}
			{#if tooltip.stats.hp > 0}
				HP : {tooltip.stats.hp} <br />
			{/if}
			{#if tooltip.stats.pAttack > 0}
				Attack : {tooltip.stats.pAttack} <br />
			{/if}
			{#if tooltip.stats.pDefense > 0}
				Defense : {tooltip.stats.pDefense} <br />
			{/if}
		</div>
	{/if}
</div>

<style>
	span {
		text-transform: capitalize;
	}

	img {
		image-rendering: pixelated;
		width: 24px;
		@apply inline cursor-pointer;
	}
</style>
