<script lang="ts">
    import { isBrowser } from "$lib/helpers";
    import { player } from "$stores/player";
    import { quests } from "$stores/quest";
    import { store } from "$stores/store";
    import { onMount } from "svelte";

    const jumpTo = function(levelNumber: number, x? : number, y? : number): void {
        store.update((store) => {
            store.currentLevelNumber = levelNumber;
            return store;
        });
        player.update((player) => {
            player.position.x = x ?? player.position.x;
            player.position.y = y ?? player.position.y;
            return player;
        })
    }

    onMount(() => {
        if(isBrowser()) {
            window.LOS = window.LOS || {
                stores: {
                    store: store,
                    player: player,
                    quests: quests
                },
                jumpTo
            };
        }
    })
</script>
