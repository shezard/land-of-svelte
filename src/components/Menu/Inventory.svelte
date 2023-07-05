<script lang="ts">
    import { player } from '$stores/player';
    import type { BaseStatsName, Item } from '../..';
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

    $: baseStats = $player.getBaseStats();
    $: stats = $player.getStats();

    const addBaseStats = (baseStatsName : BaseStatsName) => () => {
        player.update((player) => {
            player.baseStats[baseStatsName]++;
            player.freeBaseStatsPoint--;
            return player;
        });
    }
</script>

<div class="menu text-white">
    <div class="text-3xl">Stats</div>

    <div class="grid grid-cols-4 text-2xl">
        <div class="pl-10">
            Level : {$player.level} <br />
            XP : {$player.xp} / {$player.getNeededXp()} <br />
        </div>
        <div>
            Strength : {baseStats.strength} {#if $player.freeBaseStatsPoint > 0}
                <span on:click={addBaseStats('strength')}>+</span>
            {/if}<br />
            Dexterity : {baseStats.dexterity}  {#if $player.freeBaseStatsPoint > 0}
                <span on:click={addBaseStats('dexterity')}>+</span>
            {/if}<br />
            wisdom : {baseStats.wisdom}  {#if $player.freeBaseStatsPoint > 0}
                <span on:click={addBaseStats('wisdom')}>+</span>
            {/if}<br />
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

    <div class="grid grid-cols-2 mt-5">
        <div>
            <div class="text-3xl">Inventory</div>
                <div class="grid grid-inventory text-2xl pl-10">
                    <div>
                        Main Hand
                    </div>
                    <div class="item ml-2">
                        <div class="placeholder">
                            {#if mainHand}
                                <MenuItem item={mainHand} on:click={toBag(mainHand)} />
                            {/if}
                        </div>
                    </div>

                    <div>
                        Off Hand
                    </div>
                    <div class="item ml-2">
                        <div class="placeholder">
                            {#if offHand}
                                <MenuItem item={offHand} on:click={toBag(offHand)} />
                            {/if}
                        </div>
                    </div>

                    <div>
                        Armor
                    </div>
                    <div class="item ml-2">
                        <div class="placeholder">
                            {#if armor}
                                <MenuItem item={armor} on:click={toBag(armor)} />
                            {/if}
                        </div>
                    </div>
                </div>
            </div>

        <div class="flex flex-col">
            <div class="text-3xl">Bag</div>

            <div class="grid grid-bag">
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

<style>

    .item {
        width: 48px;
        height: 48px;
    }

    .placeholder {
        border: 2px solid rgba(255, 255, 255, 0.2);
        height: 48px;
    }

    .grid-inventory {
        grid-template-columns: 128px 48px;
        grid-gap: 10px;
    }

    .grid-inventory div {
        line-height: 48px;
    }

    .grid-bag {
        grid-template-columns: 48px 48px 48px 48px;
        grid-template-rows: 48px 48px 48px 48px;
        grid-gap: 10px;
    }

</style>
