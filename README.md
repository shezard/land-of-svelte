# Land of Svelte

![Build status](https://github.com/shezard/land-of-svelte/actions/workflows/main.yml/badge.svg)

[Play the lastest version of Land of Svelte](https://shezard.github.io/land-of-svelte/)

# TODO

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
-   [ ] Editor
    -   [x] Display script
    -   [ ] Display torch
    -   [ ] Export as json
    -   [ ] Edit tile
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
