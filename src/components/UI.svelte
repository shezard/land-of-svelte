<script lang="ts">
	import { lastLogs } from '$stores/logs';
	import { store } from '$stores/store';

	const attack = () => {
		$store.player.attack();
	};

	$: stats = $store.player.getStats();

	$: weaponBackgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0) ${$store.ui.weaponCooldownPercent}%, #6f6f64 ${$store.ui.weaponCooldownPercent}%),
			url('textures/swords.png')`;
</script>

<div class="grid absolute w-full h-[100px] z-10 bottom-0 border-4 border-dark">
	<div class="border-4 border-light text-2xl flex">
		<button
			class="weapon w-[80px] h-[80px] m-[10px] cursor-pointer border-4"
			style="background-image: {weaponBackgroundImage}"
			on:click={attack}
			on:keypress={() => {
				/*no op*/
			}}
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
		box-sizing: border-box;
		border-style: inset;
		border-color: #9c6b65;
		background: #9a9a8e;
		text-shadow: none;
	}

	.logs {
		background-color: #9a9a8e;
	}

	.weapon {
		background-position: 0px 0px;
		background-size: 360px;
		image-rendering: pixelated;
		border-color: #542b29;
	}

	.weapon:active {
		background-color: #6f6f64;
	}
</style>
