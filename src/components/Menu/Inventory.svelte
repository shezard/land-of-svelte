<script lang="ts">
	import { store } from '$stores/store';
	import type { Item } from '../..';

	const toBag = (item: Item) => () => {
		store.update((store) => {
			store.player.inventory = store.player.unequip(item);
			return store;
		});
		tooltip = null;
	};

	const toInventory = (item: Item, itemIndex: number) => () => {
		store.update((store) => {
			store.player.inventory = store.player.equip(item, itemIndex);
			return store;
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

	$: mainHand = $store.player.inventory.mainHand;
	$: offHand = $store.player.inventory.offHand;
	$: armor = $store.player.inventory.armor;

	$: stats = $store.player.getStats();
</script>

<div class="menu">
	<div class="text-3xl text-white">Character</div>

	<div class="grid grid-cols-3">
		<div class="flex flex-col text-white">
			<div class="text-2xl">
				Stats:
				<div class="pl-10">
					AC : {stats.ac} <br />
					Hit : {stats.hit} <br />
					HP : {stats.hp} <br />
					Attack : {stats.pAttack} <br />
					Defense : {stats.pDefense} <br />
				</div>
			</div>
		</div>

		<div class="flex flex-col text-white">
			<div class="text-2xl">
				Main Hand:
				{#if mainHand}
					<img
						src="textures/{mainHand.texture}.png"
						alt={mainHand.name}
						on:click={toBag(mainHand)}
						on:mouseenter={showTooltip(mainHand)}
						on:mouseleave={hideTooltip}
						on:mousemove={moveTooltip}
						on:keypress={() => {
							//no-op
						}}
					/>
				{/if}
			</div>

			<div class="text-2xl">
				Off Hand:
				{#if offHand}
					<img
						src="textures/{offHand.texture}.png"
						alt={offHand.name}
						on:click={toBag(offHand)}
						on:mouseenter={showTooltip(offHand)}
						on:mouseleave={hideTooltip}
						on:mousemove={moveTooltip}
						on:keypress={() => {
							//no-op
						}}
					/>
				{/if}
			</div>

			<div class="text-2xl">
				Armor:
				{#if armor}
					<img
						src="textures/{armor.texture}.png"
						alt={armor.name}
						on:click={toBag(armor)}
						on:mouseenter={showTooltip(armor)}
						on:mouseleave={hideTooltip}
						on:mousemove={moveTooltip}
						on:keypress={() => {
							//no-op
						}}
					/>
				{/if}
			</div>
		</div>

		<div class="flex flex-col text-white">
			<div class="text-2xl">Bag:</div>
			{#each $store.player.inventory.bag as item, index}
				<img
					src="textures/{item.texture}.png"
					alt={item.name}
					on:click={toInventory(item, index)}
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
			{tooltip.name} <br />
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
    img {
		image-rendering: pixelated;
		width: 48px;
		height: 48px;
        border: 2px solid rgba(255,255,255,0.2);
        padding: 5px;
		@apply inline cursor-pointer;
	}
</style>
