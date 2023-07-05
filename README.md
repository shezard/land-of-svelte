# Land of Svelte

![Build status](https://github.com/shezard/land-of-svelte/actions/workflows/main.yml/badge.svg)

[Play the lastest version of Land of Svelte](https://shezard.github.io/land-of-svelte/)

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## TODO

-   [x] Add combat "animation"
-   [x] Display ennemy hp as a health bar
-   [x] Add item grabbing / inventory display
-   [x] Split script execution into predicate and execution
-   [x] Add door + key on level 0
-   [x] Add missing key texture
-   [x] Add support for WASD and ZQSD keyboards
-   [x] Better display of clickable (change cursor -> see next.thretle.xyz)
-   [x] Use Oriented Position type inside Script
-   [x] Display player hp as a health bar
-   [x] Add treasure chest
-   [x] Pause game while in the menu
-   [x] Container: fix store not updating
-   [ ] Cursor
    -   [x] Click on AI should attack
    -   [x] Fix cursor bypassing walls
    -   [ ] Use custom cursor for each action (fight / interact / talk ?)
    -   [ ] Move interactive name on mesh in userData ?
-   [x] Editor
-   [ ] Dialog
    -   [x] Move npc title into level.json
    -   [x] Unify dialog and dialog choice
    -   [x] Split answer and response
    -   [x] Save/Load quests
    -   [x] Persist/load quest and dialog store state
    -   [x] Add quest reward for Ned / Ted (shortcut to level 2)
    -   [x] Add stats subsystem test
    -   [ ] Dialog editor ?
-   [x] Saving / Loading
-   [ ] Level 2
    -   [x] Move levels to maps folder
    -   [x] XP / Leveling
    -   [ ] Level 2 npc
    -   [ ] Auto-import levels from level folder
-   [ ] Better handling of game over
-   [ ] Gold & shop
