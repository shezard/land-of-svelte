<script lang="ts">
	import { container } from '$stores/container';
	import { player } from '$stores/player';
	import type { Item } from '../..';
	import MenuItem from './Item.svelte';

	const transfertAll = (bag: Item[]) => () => {
		player.update((player) => {
			player.inventory.bag = player.inventory.bag.concat(bag);
			return player;
		});
		container.update((container) => {
			container.bag = [];
			return container;
		});
	};

	const toBag = (item: Item, itemIndex: number) => () => {
		player.update((player) => {
			player.inventory.bag.push(item);
			return player;
		});
		container.update((container) => {
			container.bag.splice(itemIndex, 1);
			return container;
		});
	};

	const toContainer = (item: Item, itemIndex: number) => () => {
		player.update((player) => {
			player.inventory.bag.splice(itemIndex, 1);
			return player;
		});
		container.update((container) => {
			container.bag.push(item);
			return container;
		});
	};
</script>

<div class="menu text-white">
	<div class="grid grid-cols-3">
		<div class="flex flex-col items-center">
			<div class="text-3xl">Bag</div>

			<div class="grid item-grid">
				{#each [...Array(8).keys()] as index}
					<div class="placeholder">
						{#if $player.inventory.bag[index]}
							<MenuItem
								item={$player.inventory.bag[index]}
								on:click={toContainer($player.inventory.bag[index], index)}
							/>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<div class="flex flex-col items-center">
			<div
				class="text-3xl cursor-pointer flex flex-col items-center"
				on:click={transfertAll($container.bag)}
				on:keypress={() => {
					//no-op
				}}
			>
				<div>Transfert all</div>
				<div>&lt;</div>
			</div>
		</div>

		<div class="flex flex-col items-center">
			<div class="text-3xl capitalize">{$container.name}</div>

			<div class="grid item-grid">
				{#each [...Array(8).keys()] as index}
					<div class="placeholder">
						{#if $container.bag[index]}
							<MenuItem
								item={$container.bag[index]}
								on:click={toBag($container.bag[index], index)}
							/>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.item-grid {
		grid-template-columns: 48px 48px 48px 48px;
		grid-template-rows: 48px 48px 48px 48px;
		grid-gap: 10px;
	}

	.placeholder {
		border: 2px solid rgba(255, 255, 255, 0.2);
	}
</style>
