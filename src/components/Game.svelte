<script lang="ts">
	import { Canvas } from '@threlte/core';

	import { game } from '$lib/game';

	import Scene from './Scene.svelte';
	import MainMenu from './Menu/Main.svelte';
	import ControlMenu from './Menu/Control.svelte';
	import Loader from './Menu/Loader.svelte';
</script>

{#if $game == 'loading'}
	<Loader />
{:else}
	<div class="container w-screen h-screen">
		{#if $game != 'running'}
			<div
				class="grid justify-items-center items-center absolute w-full h-full z-10 backdrop-blur-sm"
			>
				<div class="cursor-default">
					{#if $game == 'mainMenu'}
						<MainMenu />
					{:else if $game == 'controlMenu'}
						<ControlMenu />
					{/if}
				</div>
			</div>
		{/if}
		<div class="absolute z-0 w-full h-full">
			<Canvas>
				<Scene />
			</Canvas>
		</div>
	</div>
{/if}
