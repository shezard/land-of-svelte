<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type * as THREE from 'three';
	import { T } from '@threlte/core';
	import { colorCache } from '$lib/color';
    import { INTERACTIVITY_DISTANCE, type CursorName } from '$stores/cursor';

	export let texture: THREE.Texture[] = [];
	export let color: number | undefined = undefined;

	export let x = 0;
	export let y = 0;
	export let z = 0;

	export let wx = 1;
	export let wy = 1;
	export let wz = 1;

	export let rx = 0;
	export let ry = 0;
	export let rz = 0;

	export let receiveShadow = false;
	export let castShadow = false;
	export let transparent = false;
	export let cursorName : CursorName = null;

	const dispatch = createEventDispatcher();

    const handleClick = (e : THREE.Event) => {
		cursorName && e.distance < INTERACTIVITY_DISTANCE && dispatch('click');
    }

    const onAttach = (parent : THREE.Mesh, self : THREE.MeshLambertMaterial) : void => {
        parent.material = texture.map((texture) => {
            const material = self.clone();
            material.map = texture;
            return material;
        });
    }
</script>

<T.Mesh
	position={[x, z, y]}
	rotation={[rx, rz, ry]}
	{receiveShadow}
	{castShadow}
    name={cursorName}
	on:click={handleClick}
>
	<T.BoxGeometry args={[wx, wz, wy]} />
	{#if texture.length < 2}
		<T.MeshLambertMaterial
            map={texture[0]}
            color={colorCache(color)}
            {transparent}
        />
	{:else}
		<T.MeshLambertMaterial
			attach={onAttach}
			color={colorCache(color)}
			{transparent}
		/>
	{/if}
</T.Mesh>
