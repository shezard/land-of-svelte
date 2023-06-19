<script lang="ts">
	import { container } from '$stores/container';
	import { store } from '$stores/store';
	import type { Item } from '../..';
	import MenuItem from './Item.svelte';

    const transfertAll = (content: Item[]) => () => {
        store.update((store) => {
            store.player.inventory.bag = store.player.inventory.bag.concat(content);
            return store;
        });
        container.set([]);
    }

	const toBag = (item: Item, itemIndex: number) => () => {
		store.update((store) => {
			store.player.inventory.bag.push(item);
			return store;
		});
		container.update((container) => {
			container.splice(itemIndex, 1);
			return container;
		});
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
	};
</script>

<div class="menu">
	<div class="text-3xl text-white cursor-pointer" on:click={transfertAll($container)} on:keypress={() => {
        //no-op
    }}>
        Transfert all
    </div>

	<div class="grid grid-cols-3">
		<div class="flex flex-col text-white">
			<div class="text-2xl">Container</div>
			{#each $container as item, index}
				<MenuItem {item} on:click={toBag(item, index)} />
			{/each}
		</div>

		<div class="flex flex-col text-white">
			<div class="text-2xl">Bag</div>
			{#each $store.player.inventory.bag as item, index}
				<MenuItem {item} on:click={toContainer(item, index)} />
			{/each}
		</div>
	</div>
</div>
