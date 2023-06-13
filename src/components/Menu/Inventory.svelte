<script lang="ts">
	import { store } from '$stores/store';

	$: mainHand = $store.player.inventory.mainHand;
	$: offHand = $store.player.inventory.offHand;
	$: armor = $store.player.inventory.armor;
</script>

<div class="menu">
	<div class="text-3xl text-white">Inventory</div>

	<div class="grid grid-cols-2">
		<div class="flex flex-col text-white">
			<div class="text-2xl">
				Main Hand: <img src="textures/{mainHand.texture}.png" alt={mainHand.name} />
			</div>

			<div class="text-2xl">
				Off Hand:
				{#if offHand}
					<img src="textures/{offHand.texture}.png" alt={offHand.name} />
				{/if}
			</div>

			<div class="text-2xl">
				Armor:
				{#if offHand}
					<img src="textures/{armor.texture}.png" alt={armor.name} />
				{/if}
			</div>
		</div>

		<div class="flex flex-col text-white">
			<div class="text-2xl">Bag:</div>
			{#each $store.player.inventory.bag as item}
				<img src="textures/{item.texture}.png" alt={item.name} />
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
