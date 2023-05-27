<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';

	import { position } from '../lib/player';

	const keyPress = (e) => {
		if (e.key === 'z') {
			position.moveForward();
		}
		if (e.key === 'q') {
			position.moveLeft();
		}
		if (e.key === 's') {
			position.moveBackward();
		}
		if (e.key === 'd') {
			position.moveRight();
		}
		if (e.key === 'a') {
			position.rotateLeft();
		}
		if (e.key === 'e') {
			position.rotateRight();
		}
	};
</script>

<svelte:window on:keypress={keyPress} />

<SC.Canvas
	antialias
	background={new THREE.Color('skyblue')}
	fog={new THREE.FogExp2('skyblue', 0.002)}
	shadows
>
	<SC.Mesh
		geometry={new THREE.BoxGeometry()}
		material={new THREE.MeshStandardMaterial({ color: 0xff0000 })}
		castShadow
	/>

	<SC.Mesh
		geometry={new THREE.BoxGeometry()}
		material={new THREE.MeshStandardMaterial({ color: 0xff0000 })}
		position={[5, 0, 0]}
		castShadow
	/>

	<SC.Mesh
		geometry={new THREE.BoxGeometry(100, 100, 1)}
		material={new THREE.MeshStandardMaterial({ color: 0xffffff })}
		position={[0, -1, 0]}
		rotation={[-Math.PI * 0.5, 0, 0]}
		receiveShadow
	/>

	<SC.AmbientLight intensity={0.5} />
	<SC.DirectionalLight intensity={0.5} position={[-2, 3, 2]} shadow={{ mapSize: [2048, 2048] }} />
	<SC.PerspectiveCamera
		position={[$position[0], $position[1], $position[2]]}
		target={[$position[0] + Math.sin($position[3]), 0, $position[2] - Math.cos($position[3])]}
	/>
	<SC.OrbitControls
		target={[
			$position[0] + Math.sin($position[3]) / 2,
			0,
			$position[2] - Math.cos($position[3]) / 2
		]}
	/>
</SC.Canvas>
