<script>
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
</script>

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
        geometry={new THREE.BoxGeometry(100, 100, 1)}
        material={new THREE.MeshStandardMaterial({ color: 0xffffff })}
        position={[0, -1, 0]}
        rotation={[-Math.PI*.5, 0, 0]}
        receiveShadow
    />

    <SC.AmbientLight intensity={0.5} />
    <SC.DirectionalLight intensity={0.5} position={[-2, 3, 2]} shadow={{ mapSize: [2048, 2048] }} />
	<SC.PerspectiveCamera position={[0, 0, 10]} />
    <SC.OrbitControls maxPolarAngle={Math.PI * 0.51} />
</SC.Canvas>