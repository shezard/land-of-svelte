<script>
	import { game, running } from '$lib/game';

	const runGame = () => {
		game.set('running');
		running.set('continue');
	};

	const showControlMenu = () => {
		game.set('controlMenu');
	};
</script>

<div class="text-3xl text-white">Land Of Svelte</div>

<div class="text-2xl text-white cursor-pointer action" on:click={runGame} on:keypress={runGame}>
	{#if $running === 'fresh'}
		New Game
	{:else}
		Continue
	{/if}
</div>

<div
	class="text-2xl text-white cursor-pointer action"
	on:click={showControlMenu}
	on:keypress={showControlMenu}
>
	Controls
</div>

<style>
	.action::before {
		content: ' ';
		display: inline-block;
		width: 2rem;
	}
	.action:hover::before {
		content: '☞';
	}
</style>
