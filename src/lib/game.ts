import { currentLevel, store } from '$stores/store';
import { player } from '$stores/player';
import { useFrame } from '@threlte/core';
import { get } from 'svelte/store';

const advanceFrame = (t: number) => {
    if (get(store).game.state !== 'running') {
        return;
    }

    player.update((player) => {
        return player;
    });

    if (!get(store).screen.dirty && get(currentLevel).getLoots().length === 0) {
        return;
    }

    store.update((store) => {
        // clear animation
        store.screen.dirty = false;
        store.screen.shaking = false;
        store.levels[store.currentLevelNumber].getAis().map((ai) => {
            ai.color = 0xffffff;
        });

        store.levels[store.currentLevelNumber].getLoots().map((loot) => {
            loot.t = t * 1e-3;
        });

        return store;
    });
};

const advanceGame = () => {
    if (get(store).game.state !== 'running' || get(store).game.running === 'gameOver') {
        return;
    }

    store.update((store) => {
        const $currentLevel = store.levels[store.currentLevelNumber];
        store = $currentLevel.advance(store);
        return store;
    });
};

export const gameTick = () => {
    let t = 0;
    let start = Date.now();
    const tickDuration = 1000;

    useFrame(
        () => {
            t = Date.now() - start;
            advanceFrame(Date.now());

            if (t > tickDuration) {
                start = Date.now();
                advanceGame();
            }
        },
        {
            invalidate: false
        }
    );
};
