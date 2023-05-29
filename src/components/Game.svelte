<script lang="ts">
	import { game } from '$lib/game';

	import Scene from './Scene.svelte';
	import Menu from './Menu.svelte';
	import Loader from './Loader.svelte';

</script>

{#if $game == 'loading'}
	<Loader />
{:else if $game == 'menu'}
	<Menu />
{:else if $game == 'running'}
	<Scene />
{/if}
