<script lang="ts">
	import { store } from '$stores/store';
	import { currentLevelNumber, currentLevel } from '$stores/editor'
	import EditorTexture from './EditorTexture.svelte';
	import EditorTool from "./EditorTool.svelte";

    const updateLevel = (dimension : 'width'|'height') => (e : Event) => {

        if(e.currentTarget === null) {
            return;
        }

        const target = e.currentTarget as HTMLInputElement;

        store.update((store) => {
            if(dimension === 'width') {
                store.levels[$currentLevelNumber] = store.levels[$currentLevelNumber].resize(
                    Number(target.value),
                    store.levels[$currentLevelNumber].height
                );
            }
            if(dimension === 'height') {
                store.levels[$currentLevelNumber] = store.levels[$currentLevelNumber].resize(
                    store.levels[$currentLevelNumber].width,
                    Number(target.value)
                );
            }
            return store;
        });
    }

    const updateFloorTexture = (e : CustomEvent<string>) => {
        store.update((store) => {
            store.levels[$currentLevelNumber].floor = e.detail;
            return store;
        });
    }

    const updateCeilingTexture = (e : CustomEvent<string>) => {
        store.update((store) => {
            store.levels[$currentLevelNumber].ceiling = e.detail;
            return store;
        });
    }

    let exportURI = '';

    const handleExport = () => {
        exportURI = 'data:application/json;charset=utf-8,' + encodeURI(JSON.stringify($currentLevel, null, 4));
    }

</script>
<div>
    <div class="text-2xl">Info</div>
    <div class="grid grid-cols-2">
        <div>
            Level <input type="number" min="0" bind:value={$currentLevelNumber} />
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
            <EditorTexture texture={$currentLevel.floor} on:change={updateFloorTexture} />
        </div>
        <div>
            Ceiling
            <EditorTexture texture={$currentLevel.ceiling} on:change={updateCeilingTexture} />
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
        <a
            href="{exportURI}"
            class="inline-block border border-1 rounded px-2"
            on:click={handleExport}
            download={`level-${$currentLevelNumber}.json`}
        >
            Export level
        </a>
    </div>
</div>

<style>
    input[type=number] {
        color: black;
        width: 3rem;
        text-indent: 5px;
    }
</style>
