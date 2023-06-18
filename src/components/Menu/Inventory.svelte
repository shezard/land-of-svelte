<script lang="ts">
	import { store } from '$stores/store';
	import type { Item } from '../..';
	import MenuItem from './Item.svelte';

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
					<MenuItem item={mainHand} on:click={toBag(mainHand)} />
				{/if}
			</div>

			<div class="text-2xl">
				Off Hand:
				{#if offHand}
					<MenuItem item={offHand} on:click={toBag(offHand)} />
				{/if}
			</div>

			<div class="text-2xl">
				Armor:
				{#if armor}
					<MenuItem item={armor} on:click={toBag(armor)} />
				{/if}
			</div>
		</div>

		<div class="flex flex-col text-white">
			<div class="text-2xl">Bag:</div>
			{#each $store.player.inventory.bag as item, index}
				<MenuItem {item} on:click={toInventory(item, index)} />
			{/each}
		</div>
	</div>
</div>
