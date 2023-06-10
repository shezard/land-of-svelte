<script lang="ts">
	import { lastLogs } from '$lib/logs';
	import { store } from '$lib/store';

	const attack = () => {
		$store.player.attack();
	};

    let stats = $store.player.getStats();
</script>

<div class="grid absolute w-full h-[100px] z-10 bottom-0 border-4 border-dark">
	<div class="border-4 border-light text-2xl flex">
		<div
			class="sprite w-[100px] h-[100px] cursor-pointer"
			on:click={attack}
			on:keypress={attack}
		/>
		<div class="w-20" />
		<div>
			AC : {stats.ac} <br />
			Hit : {stats.hit} <br />
			HP : {stats.hp} <br />
		</div>
		<div class="w-20" />
		<div class="logs">
			{#each $lastLogs as log}
				<div>{log}</div>
			{/each}
		</div>
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

	.logs {
		background-color: #9a9a8e;
	}

	.sprite {
		background: url('textures/swords.png') top left no-repeat;
		background-position: 0px 0px;
		background-size: 500px;
		image-rendering: pixelated;
	}
</style>
