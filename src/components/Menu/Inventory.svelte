<script lang="ts">
	import { store } from '$stores/store';
</script>

<div>
	Inventory
	<ul>
		{#each $store.player.inventory.bag as item}
			<li>
				{item.texture}
			</li>
		{/each}
	</ul>
</div>
