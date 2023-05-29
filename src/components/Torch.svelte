<script lang="ts">
	import * as SC from 'svelte-cubed';

	import type { Position2d } from '$lib/map';

	export let position: Position2d;
</script>

<SC.PointLight intensity={0.8} position={[position[0], 0.5, position[1]]} distance={10} shadow={true} />
