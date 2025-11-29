# Lotería (Vite + React)

A single-player digital Lotería experience with emoji art, built for static hosting on Netlify. Cards default to emoji icons and are ready to swap for PNG art through a config flag.

## Getting started

```bash
npm install
npm run dev
```

The site is Vite-based; the dev server runs at `http://localhost:5173` by default.

### Building for production

```bash
npm run build
npm run preview
```

The build output lives in `dist/` and can be deployed directly to Netlify as a static site.

### Netlify deployment

1. Set the build command to `npm run build`.
2. Publish directory: `dist`.
3. No server required; this is a fully static React app.

## Emoji/PNG art switch

Card art is controlled by `ASSET_CONFIG` in `src/utils/gameState.js`:

```js
export const ASSET_CONFIG = {
  usePngImages: false,
};
```

Set `usePngImages` to `true` to render PNG files. PNG paths already live in `src/data/deck.json` and map to `/public/images`. Keep your custom PNG assets inside `public/images/` and ensure filenames match the `png` fields.

## File structure

```
public/
  images/             # drop-in PNG assets (optional)
src/
  components/
    CallerCard.jsx
    TablaGrid.jsx
    CardTile.jsx
    WinModal.jsx
    ScorePanel.jsx
  data/
    deck.json
  utils/
    shuffle.js
    patternCheck.js
    gameState.js
  App.jsx
  main.jsx
  styles.css
vite.config.js
```

## Game rules (implemented)

- 4×4 or 5×5 tablas drawn from the 54-card deck
- Caller draws cards in order; tap tiles to mark matches
- Win patterns: any row, any column, diagonal, reverse diagonal, or four corners
- Game ends on a win or when the deck is exhausted
- Stats: completion time, accuracy, attempts, correct marks, streak tracking for marks within 2 seconds
- Confetti and "¡Lotería!" celebration on win
