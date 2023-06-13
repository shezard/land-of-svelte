<script lang="ts">
	import { store } from '$stores/store';
	import type { Item } from '../..';

	const toBag = (item: Item) => () => {
		store.update((store) => {
			store.player.inventory = store.player.unequip(item);
			return store;
		});
	};

	const toInventory = (item: Item, itemIndex: number) => () => {
		store.update((store) => {
			store.player.inventory = store.player.equip(item, itemIndex);
			return store;
		});
	};

	$: mainHand = $store.player.inventory.mainHand;
	$: offHand = $store.player.inventory.offHand;
	$: armor = $store.player.inventory.armor;
</script>

<div class="menu">
	<div class="text-3xl text-white">Inventory</div>

	<div class="grid grid-cols-2">
		<div class="flex flex-col text-white">
			<div class="text-2xl">
				Main Hand:
				{#if mainHand}
					<img
						src="textures/{mainHand.texture}.png"
						alt={mainHand.name}
						on:click={toBag(mainHand)}
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
					on:keypress={() => {
						//no-op
					}}
				/>
			{/each}
		</div>
	</div>
</div>

<style>
	img {
		image-rendering: pixelated;
		width: 24px;
		@apply inline;
	}
</style>
