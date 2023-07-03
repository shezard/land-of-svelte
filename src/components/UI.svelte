<script lang="ts">
	import { lastLogs } from '$stores/logs';
	import { player } from '$stores/player';
	import { ui } from '$stores/ui';

	const attack = () => {
		if ($player.inventory.mainHand === null) {
			return;
		}
		$player.attack();
	};

	$: stats = $player.getStats();

	$: mainHandTexture = $player.inventory.mainHand?.texture ?? '';

	$: weaponBackgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0) ${$ui.weaponCooldownPercent}%, #6f6f64 ${$ui.weaponCooldownPercent}%),
			url('textures/${mainHandTexture}.png')`;

	$: hpPercent = (1 - stats.hp / stats.maxHp) * 100;
	$: xpPercent = (1 - $player.xp / $player.getNeededXp()) * 100;
</script>

<div class="grid absolute w-full h-[100px] z-10 bottom-0 border-4 border-dark border-dark-color">
	<div class="border-4 border-light text-2xl flex">
		<button
			class="weapon w-[80px] h-[80px] m-[10px] cursor-pointer border-4 border-dark-color"
			style="background-image: {weaponBackgroundImage}"
			on:click={attack}
			on:keypress={() => {
				/*no op*/
			}}
		/>
		<div class="w-40">
			<div
				class="border-4 border-dark-color w-[160px] h-[35px] m-[10px] grid items-center justify-items-center text-white"
				style="background: linear-gradient(to left, rgba(0, 0, 0, 0) {hpPercent}%, #870001 {hpPercent}%)"
			>
				{stats.hp} / {stats.maxHp}
			</div>

            <div
				class="border-4 border-dark-color w-[160px] h-[35px] m-[10px] grid items-center justify-items-center text-white"
				style="background: linear-gradient(to left, rgba(0, 0, 0, 0) {xpPercent}%, #D1B000 {xpPercent}%)"
			>
				{$player.xp} / {$player.getNeededXp()}
			</div>
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
	.border-dark-color {
		border-color: var(--border-color-dark);
	}

	.border-dark {
		padding-bottom: 4px;
		width: calc(100vw - 8px);
		box-sizing: content-box;
		border-style: inset;
	}

	.border-light {
		box-sizing: border-box;
		border-style: inset;
		border-color: #9c6b65;
		background: #9a9a8e;
		text-shadow: none;
	}

	.weapon {
		background-position: 0px 0px;
		background-size: 72px;
		image-rendering: pixelated;
	}

	.weapon:active {
		background-color: #6f6f64;
	}
</style>
