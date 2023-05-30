<script lang="ts">
	import type { Map2d } from '$lib/levels';

	export let map2d: Map2d;
</script>

{#each map2d as mapX, x}
	{#each mapX as item, y}
		<slot {x} {y} {item} />
	{/each}
{/each}
