<script lang="ts">
	import { store } from '$stores/store';
	import type { Item, Stats } from '../..';

	const toBag = (item: Item) => () => {
		store.update((store) => {
			store.player.inventory = store.player.unequip(item);
			return store;
		});
		tooltip = false;
	};

	const toInventory = (item: Item, itemIndex: number) => () => {
		store.update((store) => {
			store.player.inventory = store.player.equip(item, itemIndex);
			return store;
		});
		tooltip = false;
	};

	let tooltip = false;
	let tooltipX = 0;
	let tooltipY = 0;
	let tooltipStats: Stats = {
		hp: 0,
		maxHp: 0,
		ac: 0,
		hit: 0,
		pDefense: 0,
		pAttack: 0
	};

	const showTooltip = (item: Item) => () => {
		tooltip = true;
		tooltipStats = item.stats;
	};

	const hideTooltip = () => {
		tooltip = false;
	};

	const moveTooltip = (e: Event) => {
		tooltipX = e.layerX + 15;
		tooltipY = e.layerY + 15;
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

	<div
		class="info text-2xl text-white absolute hidden"
		class:tooltip
		style="top:{tooltipY}px;left:{tooltipX}px;"
	>
		AC : {tooltipStats.ac} <br />
		Hit : {tooltipStats.hit} <br />
		HP : {tooltipStats.hp} <br />
		Attack : {tooltipStats.pAttack} <br />
		Defense : {tooltipStats.pDefense} <br />
	</div>
</div>

<style>
	img {
		image-rendering: pixelated;
		width: 24px;
		@apply inline cursor-pointer;
	}

	.tooltip {
		display: block;
	}
</style>
