<script lang="ts">
	import { Level } from '$lib/Level';
	import { Player } from '$lib/Player';
	import { updateCamera } from '$lib/camera';
	import { player } from '$stores/player';
	import { store } from '$stores/store';
	import type { Canvas } from '@threlte/core';
	import { get } from 'svelte/store';
	import type { LevelProp, Store } from '../..';
	import { hasSave } from '$stores/game';
    import { quests, type Quests } from '$stores/quest';

    export let canvas : Canvas;

	const runGame = () => {
		store.navigateTo('running');
		store.update((store) => {
			store.game.running = 'continue';
			return store;
		});
	};

	const loadGame = () => {
        const localStoragePlayer : string|null = localStorage.getItem('player');
        if(!localStoragePlayer) {
            return;
        }

        const playerProp = JSON.parse(localStoragePlayer) as Player;
        const savedPlayer = new Player(
            playerProp.position,
            playerProp.baseStats,
            playerProp.stats,
            playerProp.inventory,
            playerProp.xp,
            playerProp.level
        );
        player.set(savedPlayer);

        const localStorageStore : string|null = localStorage.getItem('store');
        if(!localStorageStore) {
            return;
        }

        const savedStore = JSON.parse(localStorageStore) as Store;
        savedStore.levels = savedStore.levels.map((level : LevelProp) => {
            return new Level(level);
        });
        store.set(savedStore);

        const localStorageQuests : string|null = localStorage.getItem('quests');
        if(!localStorageQuests) {
            return;
        }

        const savedQuests = JSON.parse(localStorageQuests) as Quests;
        quests.set(savedQuests);

        updateCamera(canvas.ctx.camera, playerProp.position);

		runGame();
    }

	const saveGame = () => {
        localStorage.setItem('player', JSON.stringify(get(player)));
        localStorage.setItem('store', JSON.stringify(get(store)));
        localStorage.setItem('quests', JSON.stringify(get(quests)));
        hasSave.set(true);
    }

	const showControlMenu = () => {
		store.navigateTo('control');
	};

	const showEditor = () => {
		store.navigateTo('editor');
	};
</script>

<div class="text-3xl text-white">Land Of Svelte</div>

{#if $store.game.running === 'newGame'}
    <div class="text-2xl text-white cursor-pointer action" on:click={runGame} on:keypress={runGame}>
        New Game
    </div>
    {#if $hasSave}
        <div class="text-2xl text-white cursor-pointer action" on:click={loadGame} on:keypress={loadGame}>
            Continue
        </div>
    {/if}
{/if}

{#if $store.game.running === 'continue'}
    <div class="text-2xl text-white cursor-pointer action" on:click={runGame} on:keypress={runGame}>
        Continue
    </div>
    <div class="text-2xl text-white cursor-pointer action" on:click={saveGame} on:keypress={saveGame}>
		Save
    </div>
{/if}

<div
	class="text-2xl text-white cursor-pointer action"
	on:click={showControlMenu}
	on:keypress={() => {
		/*no op*/
	}}
>
	Controls
</div>

<div
	class="text-2xl text-white cursor-pointer action"
	on:click={showEditor}
	on:keypress={() => {
		/*no op*/
	}}
>
	Editor
</div>
