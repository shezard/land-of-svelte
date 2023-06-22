<script lang="ts">
    import { JSONEditor } from 'svelte-jsoneditor'
	import { store, currentLevel } from '$stores/store';
	import { activatedTool } from '$stores/editor'
	import type { Script, Tile } from '../..';
	import EditorTile from './EditorTile.svelte';
	import EditorTool from './EditorTool.svelte';
	import EditorTexture from './EditorTexture.svelte';

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
    let light : JSONContent;

	const showTileInfo = (x: number, y: number) => () => {
		tile = getTileAt(x, y);
        script = {
            json: tile.script,
        } as JSONContent
        light = {
            json: tile.light,
        } as JSONContent
	};

    const updateLevel = (dimension : 'width'|'height') => (e : Event) => {

        if(e.currentTarget === null) {
            return;
        }

        const target = e.currentTarget as HTMLInputElement;

        store.update((store) => {
            if(dimension === 'width') {
                store.levels[store.currentLevelNumber] = store.levels[store.currentLevelNumber].resize(
                    Number(target.value),
                    store.levels[store.currentLevelNumber].height
                );
            }
            if(dimension === 'height') {
                store.levels[store.currentLevelNumber] = store.levels[store.currentLevelNumber].resize(
                    store.levels[store.currentLevelNumber].width,
                    Number(target.value)
                );
            }
            return store;
        });
    }

    const handleChangeScript = (newScript : JSONContent) => {
        if(newScript.json === null) {
            return;
        }

        store.update((store) => {
            store.levels[store.currentLevelNumber].replaceScript(newScript.json);
            return store;
        });
    }

    let exportURI = '';

    const handleExport = () => {
        exportURI = 'data:application/json;charset=utf-8,' + encodeURI(JSON.stringify($currentLevel, null, 4));
    }

    let isToolActivated = false;
    const activateTool = () => {
        isToolActivated = true;
    }

    const deactivateTool = () => {
        isToolActivated = false;
    }

    const applyTool = (x: number, y: number) => (e : Event) => {

        if(!isToolActivated) {
            return;
        }

        if($activatedTool === 'collision+') {
            store.update((store) => {
                store.levels[store.currentLevelNumber].collisionMap[x][y] = 1;
                return store;
            });
        }

        if($activatedTool === 'collision-') {
            store.update((store) => {
                store.levels[store.currentLevelNumber].collisionMap[x][y] = 0;
                return store;
            });
        }

        if($activatedTool === 'light' && e.type === 'mousedown') {
            store.update((store) => {
                const light = store.levels[store.currentLevelNumber].getLightAt(x, y);
                if(light) {
                    store.levels[store.currentLevelNumber].removeLightAt(x, y);
                } else {
                    store.levels[store.currentLevelNumber].addLightAt(x, y);
                }

                return store;
            });
        }
    }

</script>

<div class="menu text-white" on:mousedown={activateTool} on:mouseup={deactivateTool}>
	<div class="text-3xl">Editor</div>

	<div class="grid grid-cols-3">
		<div>
            <div class="text-2xl">Info</div>
            <div class="grid grid-cols-2">
                <div>
                    Level [{$store.currentLevelNumber}]
                </div>
                <div>
                    <input type="number" value={$currentLevel.width} on:change={updateLevel('width')} />
                    x
                    <input type="number" value={$currentLevel.height}  on:change={updateLevel('height')}/>
                </div>
            </div>
            <div class="grid grid-cols-2">
                <div>
                    Floor
                    <EditorTexture texture={$currentLevel.floor} on:change={(e) => {
                        store.update((store) => {
                            store.levels[store.currentLevelNumber].floor = e.detail;
                            return store;
                        });
                    }} />
                </div>
                <div>
                    Ceiling
                    <EditorTexture texture={$currentLevel.ceiling} on:change={(e) => {
                        store.update((store) => {
                            store.levels[store.currentLevelNumber].ceiling = e.detail;
                            return store;
                        });
                    }} />
                </div>
            </div>
            <div class="mt-3">
                <div class="text-2xl">
                    Tools
                </div>
                <EditorTool tool="collision+" title="+ Collision" />
                <EditorTool tool="collision-" title="- Collision" />
                <EditorTool tool="light" title="Light" />
            </div>
            <div class=" mt-5">
                <a href="{exportURI}" class="inline-block border border-1 rounded px-2" on:click={handleExport} download={`level-${$store.currentLevelNumber}.json`}>
                    Export level
                </a>
            </div>
		</div>
		<div>
            <div class="flex items-center justify-center">
				{#each $currentLevel.collisionMap as rowX, x}
                    <div class="flex-1">
                        {#each rowX as _, y}
                            <EditorTile
                                tile={getTileAt(x, y)}
                                on:click={showTileInfo(x, y)}
                                on:mousedown={(e) => setTimeout(() => {
                                    applyTool(x, y)(e)
                                })}
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

                        <EditorTexture texture={`${tile.texture}`} on:change={(e) => {
                            store.update((store) => {
                                // TODO : utiliser des noms de textures dans la textures
                                store.levels[store.currentLevelNumber].textureMap[tile.x][tile.y] = e.detail;
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

<style>
    input[type=number] {
        color: black;
        width: 3rem
    }
</style>
