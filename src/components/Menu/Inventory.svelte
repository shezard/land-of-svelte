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
    <div class="grid grid-cols-1">
        <div class="text-3xl">Stats</div>

        <div class="grid grid-cols-3 text-2xl">
            <div class="pl-10">
                Level : {$player.level} <br />
                XP : {$player.xp} <br />
            </div>
            <div>
                AC : {stats.ac} <br />
                Hit : {stats.hit} <br />
                HP : {stats.hp} <br />
            </div>
            <div>
                Attack : {stats.pAttack} <br />
                Defense : {stats.pDefense} <br />
            </div>
        </div>
    </div>

    <div class="grid grid-cols-1">

        <div class="grid grid-cols-2">
            <div>
                <div class="text-3xl">Inventory</div>
                    <div class="flex flex-col pl-10">
                        <div class="text-2xl inline-flex h-[48px] mb-2">
                            Main Hand
                            <span class="item ml-2">
                                <div class="placeholder">
                                    {#if mainHand}
                                        <MenuItem item={mainHand} on:click={toBag(mainHand)} />
                                    {/if}
                                </div>
                            </span>
                        </div>

                        <div class="text-2xl inline-flex h-[48px] mb-2">
                            Off Hand
                            <span class="item ml-2">
                                <div class="placeholder">
                                    {#if offHand}
                                        <MenuItem item={offHand} on:click={toBag(offHand)} />
                                    {/if}
                                </div>
                            </span>
                        </div>

                        <div class="text-2xl inline-flex h-[48px] mb-2">
                            Armor
                            <span class="item ml-2">
                                <div class="placeholder">
                                    {#if armor}
                                        <MenuItem item={armor} on:click={toBag(armor)} />
                                    {/if}
                                </div>
                            </span>
                        </div>
                    </div>
                </div>

            <div class="flex flex-col">
                <div class="text-3xl">Bag</div>

                <div class="grid items-grid">
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

    .item {
        width: 48px;
        height: 48px;
    }

    .placeholder {
        border: 2px solid rgba(255, 255, 255, 0.2);
        height: 48px;
    }

    .items-grid {
        grid-template-columns: 48px 48px 48px 48px;
        grid-template-rows: 48px 48px 48px 48px;
        grid-gap: 10px;
    }

</style>
