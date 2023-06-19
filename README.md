# Land of Svelte

![Build status](https://github.com/shezard/land-of-svelte/actions/workflows/main.yml/badge.svg)

[Play the lastest version of Land of Svelte](https://shezard.github.io/land-of-svelte/)

# TODO

-   [/] Add combat "animation"
-   [/] Display ennemy hp as a health bar
-   [/] Add item grabbing / inventory display
-   [/] Split script execution into predicate and execution
-   [/] Add door + key on level 0
-   [/] Add missing key texture
-   [/] Add support for WASD and ZQSD keyboards
-   [/] Better display of clickable (change cursor -> see next.thretle.xyz)
-   [/] Use Oriented Position type inside Script
-   [ ] Display player hp as a health bar
-   [ ] Add treasure chest
-                                                     [/] Add multiple texture handling (for a single item)
-                                                     [/] Container doClick
-                                                     [/] Extract tooltip as a component
-                                                     [/] Container screen + button lootAll
-                                                     [/] Show border around item in inventory
-                                                     [ ] Multiple loot
-   [ ] Better handling of game over
-   [ ] Pause game while in the menu
-   [ ] Gold
-   [ ] Try to fix alpha transparency showing canvas background

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
