<script lang="ts">
	import { store } from '$stores/store';
</script>

<div class="text-3xl text-white">Inventory</div>

<div class="grid grid-cols-2">
	<div class="flex flex-col text-white">
		{#each $store.player.inventory.bag as item}
			<img src="textures/{item.texture}.png" alt={item.name} />
		{/each}
	</div>
</div>

<style>
	img {
		image-rendering: pixelated;
	}
</style>
