<script lang="ts">
	import type { Item } from "../..";

    export let item : Item;
    export let tooltipX : number;
    export let tooltipY : number;
</script>

<div
    class="info text-2xl text-white absolute"
    style="top:{tooltipY}px;left:{tooltipX}px;"
>
    <span>{item.name}</span> <br />
    {#if item.stats.ac > 0}
        AC : {item.stats.ac} <br />
    {/if}
    {#if item.stats.hit > 0}
        Hit : {item.stats.hit} <br />
    {/if}
    {#if item.stats.hp > 0}
        HP : {item.stats.hp} <br />
    {/if}
    {#if item.stats.pAttack > 0}
        Attack : {item.stats.pAttack} <br />
    {/if}
    {#if item.stats.pDefense > 0}
        Defense : {item.stats.pDefense} <br />
    {/if}
</div>


<style>
	span {
		text-transform: capitalize;
	}
</style>
