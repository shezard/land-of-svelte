<script lang="ts">
    import { JSONEditor } from 'svelte-jsoneditor'
	import { store } from '$stores/store';
	import { activatedTool, currentLevelNumber, currentLevel, isToolActivated, currentAI, currentTexture } from '$stores/editor'
	import type { Script, Tile } from '../..';
	import EditorTile from './EditorTile.svelte';
	import EditorTexture from './EditorTexture.svelte';
	import EditorInfoPane from './EditorInfoPane.svelte';

    interface JSONContent {
        json: Script|null,
    }

	$: getTileAt = (x: number, y: number): Tile => {
		return {
			x: x,
			y: y,
			t: 0,
			collision: Boolean($currentLevel.collisionMap[x][y]),
			texture: $currentLevel.textureMap[x][y],
			light: $currentLevel.getLightAt(x, y),
			script: $currentLevel.getScriptAt(x, y)
		};
	};

	let tile: Tile | null = null;

    let script : JSONContent;

	const showTileInfo = (x: number, y: number) => () => {
		tile = getTileAt(x, y);
        script = {
            json: tile.script,
        } as JSONContent
	};

    const handleChangeScript = (newScript : JSONContent) => {
        if(newScript.json === null) {
            return;
        }

        store.update((store) => {
            store.levels[$currentLevelNumber].replaceScript(newScript.json);
            return store;
        });
    }

    const applyTool = (x: number, y: number) => (e : Event) => {

        if(!$isToolActivated) {
            return;
        }

        if($activatedTool === 'texture') {
            store.update((store) => {
                store.levels[$currentLevelNumber].textureMap[x][y] = $currentTexture;
                return store;
            });
        }

        if($activatedTool === 'collision+') {
            store.update((store) => {
                store.levels[$currentLevelNumber].collisionMap[x][y] = 1;
                return store;
            });
        }

        if($activatedTool === 'collision-') {
            store.update((store) => {
                store.levels[$currentLevelNumber].collisionMap[x][y] = 0;
                return store;
            });
        }

        if($activatedTool === 'light' && e.type === 'mousedown') {
            store.update((store) => {
                const light = store.levels[$currentLevelNumber].getLightAt(x, y);
                if(light) {
                    store.levels[$currentLevelNumber].removeLightAt(x, y);
                } else {
                    store.levels[$currentLevelNumber].addLightAt(x, y);
                }

                return store;
            });
        }

        if($activatedTool === 'ai' && e.type === 'mousedown') {
            store.update((store) => {
                store.levels[$currentLevelNumber].addAiAt(x, y , $currentAI)

                return store;
            });
        }
    }

</script>

<svelte:body on:mouseup={() => isToolActivated.set(false)} />

<div class="menu text-white">
	<div class="text-3xl">Editor</div>

	<div class="grid grid-cols-3">
		<EditorInfoPane />
		<div>
            <div class="flex items-center justify-center">
				{#each $currentLevel.collisionMap as rowX, x}
                    <div class="flex-1">
                        {#each rowX as _, y}
                            <EditorTile
                                tile={getTileAt(x, y)}
                                on:click={showTileInfo(x, y)}
                                on:mousedown={(e) => {
                                    isToolActivated.set(true);
                                    applyTool(x, y)(e);
                                }}
                                on:mouseenter={applyTool(x, y)}
                            />
                        {/each}
                    </div>
				{/each}
            </div>
		</div>
		<div class="pl-5">
			{#if tile}
				<div>
					Position: [{tile.x}] [{tile.y}]
				</div>
				<div>
					Collision <input type="checkbox" bind:checked={tile.collision} />
				</div>
                {#if tile.collision}
                    <div>
                        Texture

                        <EditorTexture texture={tile.texture} on:change={(e) => {
                            if(tile === null) {
                                return;
                            }
                            tile.texture = e.detail;
                            store.update((store) => {
                                store.levels[$currentLevelNumber].textureMap[tile.x][tile.y] = e.detail;
                                return store;
                            });
                        }} />
                    </div>
                {/if}
				<div>
					{#if tile.script}
						Script

                        <JSONEditor
                            mainMenuBar={false}
                            navigationBar={false}
                            content={script}
                            onChange={handleChangeScript}
                        />
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>
