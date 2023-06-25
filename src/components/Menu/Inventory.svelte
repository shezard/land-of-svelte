<script lang="ts">
    import { player } from '$stores/player';
	import type { Item } from '../..';
	import MenuItem from './Item.svelte';

	const toBag = (item: Item) => () => {
		player.update((player) => {
			player.inventory = player.unequip(item);
			return player;
		});
	};

	const toInventory = (item: Item, itemIndex: number) => () => {
		player.update((player) => {
			player.inventory = player.equip(item, itemIndex);
			return player;
		});
	};

	$: mainHand = $player.inventory.mainHand;
	$: offHand = $player.inventory.offHand;
	$: armor = $player.inventory.armor;

	$: stats = $player.getStats();
</script>

<div class="menu text-white">
	<div class="grid grid-cols-2">
	    <div class="text-3xl">Stats</div>
	    <div class="text-3xl">Inventory</div>
    </div>

	<div class="grid grid-cols-2">
        <div class="grid grid-cols-2">
            <div class="flex flex-col">
                <div class="text-2xl">
                    <div class="pl-10">
                        Level : {$player.level} <br />
                        XP : {$player.xp} <br />
                    </div>
                </div>
            </div>

            <div class="flex flex-col">
                <div class="text-2xl">
                    AC : {stats.ac} <br />
                    Hit : {stats.hit} <br />
                    HP : {stats.hp} <br />
                    Attack : {stats.pAttack} <br />
                    Defense : {stats.pDefense} <br />
                </div>
            </div>
        </div>

        <div class="grid grid-cols-2">
            <div class="flex flex-col pl-10">
                <div class="text-2xl">
                    &nbsp;<br/>
                </div>
                <div class="text-2xl">
                    Main Hand
                    {#if mainHand}
                        <MenuItem item={mainHand} on:click={toBag(mainHand)} />
                    {/if}
                </div>

                <div class="text-2xl">
                    Off Hand
                    {#if offHand}
                        <MenuItem item={offHand} on:click={toBag(offHand)} />
                    {/if}
                </div>

                <div class="text-2xl">
                    Armor
                    {#if armor}
                        <MenuItem item={armor} on:click={toBag(armor)} />
                    {/if}
                </div>
            </div>

            <div class="flex flex-col">
                <div class="text-2xl">Bag</div>

                <div class="grid item-grid">
                    {#each [...Array(8).keys()] as index}
                        <div class="placeholder">
                            {#if $player.inventory.bag[index]}
                                <MenuItem
                                    item={$player.inventory.bag[index]}
                                    on:click={toInventory($player.inventory.bag[index], index)}
                                />
                            {/if}
                        </div>
                    {/each}
                </div>
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
