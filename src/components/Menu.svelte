<script>
	import { game, running } from '$lib/game';

	const runGame = () => {
		game.set('running');
		running.set('continue');
	};
</script>

<div class="container grid justify-items-center items-center h-screen">
	<div class="cursor-default">
		<div class="text-2xl">Land Of Svelte</div>

		<div class="cursor-pointer action" on:click={runGame}>
			{#if $running === 'fresh'}
				New Game
			{:else}
				Continue
			{/if}
		</div>

		<div class="cursor-pointer action">Controls</div>
	</div>
</div>

<style>
	.action::before {
		content: ' ';
		display: inline-block;
		width: 20px;
	}
	.action:hover::before {
		content: '☞';
	}
</style>
