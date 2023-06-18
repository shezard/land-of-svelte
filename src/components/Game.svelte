<script lang="ts">
	import { Canvas } from '@threlte/core';

	import { store } from '$stores/store';

	import Scene from './Scene.svelte';
	import MainMenu from './Menu/Main.svelte';
	import ControlMenu from './Menu/Control.svelte';
	import Loader from './Menu/Loader.svelte';
	import UI from './UI.svelte';
	import Inventory from './Menu/Inventory.svelte';

	$: shaking = $store.screen.shaking;
</script>

{#if $store.game.isLoading}
	<Loader />
{:else}
	<div class="container w-screen h-screen">
		{#if $store.game.state != 'running'}
			<div
				class="grid justify-items-center items-center absolute w-full h-full z-10 backdrop-blur-sm"
			>
				<div class="cursor-default menu">
					{#if $store.game.state == 'mainMenu'}
						<MainMenu />
					{:else if $store.game.state == 'controlMenu'}
						<ControlMenu />
					{:else if $store.game.state == 'inventory'}
						<Inventory />
					{/if}
				</div>
			</div>
		{:else}
			<UI />
		{/if}
		<div class="absolute z-0 w-full h-full bg-stone-800 overflow-hidden" class:shaking>
			<Canvas rendererParameters={{ antialias: false }}>
				<Scene />
			</Canvas>
		</div>
	</div>
{/if}

<style>
	.shaking {
		animation: shake 0.45s;
	}
</style>
