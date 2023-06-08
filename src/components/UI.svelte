<script>
	import { store } from '$lib/store';
</script>

<div class="grid absolute w-full h-[100px] z-10 bottom-0 border-4 border-dark">
	<div class="border-4 border-light text-2xl">
		AC : {$store.player.stats.ac} <br />
		Hit : {$store.player.stats.hit} <br />
		HP : {$store.player.stats.hp} <br />
	</div>
</div>

<style>
	.border-dark {
        padding-bottom: 4px;
        width: calc(100vw - 8px);
        box-sizing: content-box;
		border-style: inset;
		border-color: #542b29;
	}

	.border-light {
        padding-left: 4px;
        box-sizing: border-box;
		border-style: inset;
		border-color: #9c6b65;
		background: #9a9a8e;
		text-shadow: none;
	}
</style>
