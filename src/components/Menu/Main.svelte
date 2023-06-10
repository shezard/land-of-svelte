<script lang="ts">
	import { store } from '$stores/store';
	import type { Store } from '../..';

	const runGame = () => {
		store.update((store: Store) => {
			store.game.state = 'running';
			store.game.running = 'continue';
			return store;
		});
	};

	const showControlMenu = () => {
		store.update((store: Store) => {
			store.game.state = 'controlMenu';
			return store;
		});
	};
</script>

<div class="text-3xl text-white">Land Of Svelte</div>

<div class="text-2xl text-white cursor-pointer action" on:click={runGame} on:keypress={runGame}>
	{#if $store.game.running === 'newGame'}
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
