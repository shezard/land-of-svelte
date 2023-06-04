<script lang="ts">
	import { Canvas } from '@threlte/core';

	import { game } from '$lib/game';

	import Scene from './Scene.svelte';
	import MainMenu from './MainMenu.svelte';
	import ControlMenu from './ControlMenu.svelte';
	import Loader from './Loader.svelte';
</script>

{#if $game == 'loading'}
	<Loader />
{:else if $game == 'mainMenu'}
	<MainMenu />
{:else if $game == 'controlMenu'}
	<ControlMenu />
{:else if $game == 'running'}
	<div class="container w-screen h-screen">
		<Canvas>
			<Scene />
		</Canvas>
	</div>
{/if}
