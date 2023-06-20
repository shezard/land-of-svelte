<script lang="ts">
    import { JSONEditor, type Content } from 'svelte-jsoneditor'
	import { store, currentLevel } from '$stores/store';
	import type { Tile } from '../..';
	import EditorTile from './EditorTile.svelte';

	const getTileAt = (x: number, y: number): Tile => {
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
    let content : Content;

	const showTileInfo = (x: number, y: number) => () => {
		tile = getTileAt(x, y);
        content = {
            json: tile.script,
        } as Content
	};

    const updateLevel = (dimension : 'width'|'height') => (e : Event) => {

        if(e.currentTarget === null) {
            return;
        }

        const target = e.currentTarget as HTMLInputElement;

        store.update((store) => {
            if(dimension === 'width') {
                console.log(store.levels[store.currentLevelNumber]);
                store.levels[store.currentLevelNumber].resize(
                    Number(target.value),
                    store.levels[store.currentLevelNumber].height
                );
            }
            if(dimension === 'height') {
                store.levels[store.currentLevelNumber].resize(
                    store.levels[store.currentLevelNumber].width,
                    Number(target.value)
                );
            }
            return store;
        });
    }

    const handleChange = (newContent : Content) => {
        if(!newContent.json) {
            return;
        }

        store.update((store) => {
            store.levels[store.currentLevelNumber].replaceScript(newContent.json);
            return store;
        });
    }

    let exportURI = '';

    const handleExport = () => {
        exportURI = 'data:application/json;charset=utf-8,' + encodeURI(JSON.stringify($currentLevel, null, 4));
    }

</script>

<div class="menu text-white">
	<div class="text-3xl">Editor</div>

	<div class="grid grid-cols-3">
		<div>
			<div>Level [{$store.currentLevelNumber}]</div>
			<div>
                <input type="number" value={$currentLevel.width} on:change={updateLevel('width')} />
                x
                <input type="number" value={$currentLevel.height}  on:change={updateLevel('height')}/>
            </div>
			<div>
				Floor
				<img src={`textures/floor-${$currentLevel.floor}.png`} alt="" />
			</div>
			<div>
				Ceiling
				<img src={`textures/floor-${$currentLevel.ceiling}.png`} alt="" />
			</div>
            <div class=" mt-5">
                <a href="{exportURI}" class="inline-block border border-1 rounded px-2" on:click={handleExport} download={`level-${$store.currentLevelNumber}.json`}>
                    Export level
                </a>
            </div>
		</div>
		<div>
			<div
				class="grid"
				style="grid-template-columns: repeat({$currentLevel.width}, 1fr);grid-template-rows: repeat({$currentLevel.height}, 1fr);"
			>
				{#each $currentLevel.collisionMap as rowY, y}
					{#each rowY as _, x}
						<EditorTile
							tile={getTileAt(x, y)}
							on:click={showTileInfo(x, y)}
						/>
					{/each}
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
				<div>
					Texture <EditorTile {tile} sized />
				</div>
				<div>
					{#if tile.script}
						Script

                        <JSONEditor
                            mainMenuBar={false}
                            navigationBar={false}
                            {content}
                            onChange={handleChange}
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

	img {
		width: 48px;
		height: 48px;
	}
</style>
