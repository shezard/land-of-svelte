<script lang="ts">
	import { store } from '$stores/store';

	const runGame = () => {
		store.navigateTo('running');
		store.update((store) => {
			store.game.running = 'continue';
			return store;
		});
	};

	const showControlMenu = () => {
		store.navigateTo('control');
	};

	const showEditor = () => {
		store.navigateTo('editor');
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
	on:keypress={() => {
		/*no op*/
	}}
>
	Controls
</div>

<div
	class="text-2xl text-white cursor-pointer action"
	on:click={showEditor}
	on:keypress={() => {
		/*no op*/
	}}
>
	Editor
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
