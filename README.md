# Lotería (Vite + React)

Single-player, emoji-first Mexican Lotería built with Vite + React for static hosting on Netlify. Every card uses emoji art by default, with a simple flag to swap in PNG art later.

## Running locally

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

### Build & preview production output

```bash
npm run build
npm run preview
```

The optimized bundle is emitted to `dist/` and can be served as static files.

### Deploying to Netlify

1. Set **Build command** to `npm run build`.
2. Set **Publish directory** to `dist`.
3. Deploy as a static site (no server needed). Drag-and-drop the `dist/` folder or connect the repo for automatic builds.

## Emoji ↔ PNG art switch

Card art is driven by `ASSET_CONFIG` in `src/utils/gameState.js`:

```js
export const ASSET_CONFIG = {
  usePngImages: false,
};
```

- Keep `usePngImages` `false` to render emoji.
- Flip it to `true` to render PNG art. PNG paths already exist in `src/data/deck.json` and are mapped to `/public/images`. Drop your custom PNG files into `public/images/` with filenames that match the `png` fields.

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

- 5×5 tabla built from the shuffled 54-card deck
- Caller draws cards one at a time via “Next Card”
- Tap tabla tiles to mark matches with the current caller card
- Win patterns: any row, any column, main diagonal, reverse diagonal, or the four corners
- “¡Lotería!” button appears only when a valid pattern is present; the game ends on a win or when the deck is exhausted
- Confetti celebration and stat recap on win (time, accuracy, attempts, correct marks, streaks)
