<script lang="ts">
    import { JSONEditor } from 'svelte-jsoneditor'
	import { store } from '$stores/store';
	import {
        currentLevelNumber,
        currentLevel,
        isToolActivated,
        applyTool,

    } from '$stores/editor'
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

    const handleChangeTileTexture = (tile: Tile) => (e : CustomEvent<string>) : void => {
        tile.texture = e.detail;
        store.update((store) => {
            store.levels[$currentLevelNumber].textureMap[tile.x][tile.y] = e.detail;
            return store;
        });
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

                        <EditorTexture texture={tile.texture} on:change={handleChangeTileTexture(tile)} />
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
