<script lang="ts">
	import { game } from '$lib/game';

	import Scene from './Scene.svelte';
	import MainMenu from './MainMenu.svelte';
	import ControlMenu from './ControlMenu.svelte';
	import Loader from './Loader.svelte';

	$: console.log($game);
</script>

{#if $game == 'loading'}
	<Loader />
{:else if $game == 'mainMenu'}
	<MainMenu />
{:else if $game == 'controlMenu'}
	<ControlMenu />
{:else if $game == 'running'}
	<Scene />
{/if}
