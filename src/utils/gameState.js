export const ASSET_CONFIG = {
  usePngImages: false,
};

export function createEmptyMarks(size) {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => false));
}

export function getCardVisual(card) {
  if (!card) return { label: '', isImage: false };
  return ASSET_CONFIG.usePngImages && card.png
    ? { label: card.png, isImage: true }
    : { label: card.emoji, isImage: false };
}
