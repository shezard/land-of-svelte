<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import * as THREE from 'three';
	import { T } from '@threlte/core';
	import { useCursor } from '@threlte/extras';

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
	export let interactive = false;

	const dispatch = createEventDispatcher();
	const { onPointerEnter, onPointerLeave } = useCursor('pointer', 'default');

	const enter = () => {
		interactive && onPointerEnter();
	};

	const leave = () => {
		interactive && onPointerLeave();
	};

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
	on:click={() => dispatch('click')}
	on:pointerenter={enter}
	on:pointerleave={leave}
>
	<T.BoxGeometry args={[wx, wz, wy]} />
	{#if texture.length < 2}
		<T.MeshLambertMaterial map={texture[0]} color={new THREE.Color(color)} transparent={true} />
	{:else}
		<T.MeshLambertMaterial
			attach={onAttach}
			color={new THREE.Color(color)}
			transparent={true}
		/>
	{/if}
</T.Mesh>
