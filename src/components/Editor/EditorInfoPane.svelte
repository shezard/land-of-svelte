<script lang="ts">
	import { store } from '$stores/store';
	import { currentLevelNumber, currentLevel, currentTexture, currentAI, currentNpc, currentDoodad } from '$stores/editor';
    import { textures } from '$stores/textures';
	import EditorTexture from './EditorTexture.svelte';
	import EditorTool from "./EditorTool.svelte";
	import type { AIName, DoodadName } from '../..';
	import { Level } from '$lib/Level';

    const changeLevel = (e: Event) => {
        if(e.currentTarget === null) {
            return;
        }

        const target = e.currentTarget as HTMLInputElement;

        const levelNumber = Number(target.value);

        if(levelNumber >= $store.levels.length) {
            store.update((store) => {

                const level = new Level({
                    width: 0,
                    height: 0,
                    floor: 'floor-0',
                    ceiling: 'floor-1',
                    collisionMap: [[]],
                    textureMap: [[]],
                    lights: [],
                    scripts: [],
                });

                store.levels.push(level.resize(12, 12));

                return store;
            })
        }

        currentLevelNumber.set(levelNumber);
    }

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

    const textureOptions = Object.keys($textures).map((texture) => {
        return texture.replace('.png', '');
    });

    const aiOptions : AIName[] = ['orc', 'gobelin'];

    const npcOptions : string[] = ['man'];

    const doodadOptions : DoodadName[] = ['door'];

</script>
<div>
    <div class="text-2xl">Info</div>
    <div class="grid grid-cols-2">
        <div>
            Level <input type="number" min="0" value={$currentLevelNumber} on:change={changeLevel} />
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
        <EditorTool tool="collision+">
            + Collision
        </EditorTool>
        <EditorTool tool="collision-">
            - Collision
        </EditorTool>

        <EditorTool tool="texture">
            Texture
            <select on:click|stopPropagation bind:value={$currentTexture}>
                {#each textureOptions as texture}
                    <option value="{texture}">{texture}</option>
                {/each}
            </select>
        </EditorTool>

        <EditorTool tool="light">
            Light
        </EditorTool>

        <EditorTool tool="ai">
            AI
            <select on:click|stopPropagation bind:value={$currentAI}>
                {#each aiOptions as ai}
                    <option value="{ai}">{ai}</option>
                {/each}
            </select>
        </EditorTool>

        <EditorTool tool="npc">
            NPC
            <select on:click|stopPropagation bind:value={$currentNpc}>
                {#each npcOptions as npc}
                    <option value="{npc}">{npc}</option>
                {/each}
            </select>
        </EditorTool>

        <EditorTool tool="doodad">
            Doodad
            <select on:click|stopPropagation bind:value={$currentDoodad}>
                {#each doodadOptions as doodad}
                    <option value="{doodad}">{doodad}</option>
                {/each}
            </select>
        </EditorTool>
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
    input {
        color: black;
        width: 3rem;
        text-indent: 5px;
    }

    select {
        color: black;
        text-indent: 2px;
        padding-right: 4px;
    }
</style>
