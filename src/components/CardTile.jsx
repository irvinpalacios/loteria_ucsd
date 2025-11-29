import React from 'react';
import { getCardVisual } from '../utils/gameState';

export default function CardTile({ card, marked, isActive, onMark }) {
  const visual = getCardVisual(card);

  return (
    <button
      type="button"
      onClick={onMark}
      className={`tile ${marked ? 'marked' : ''} ${isActive ? 'active' : ''}`}
      aria-pressed={marked}
    >
      <div className="emoji" aria-hidden>
        {visual.isImage ? (
          <img src={visual.label} alt={card.name} style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
        ) : (
          visual.label
        )}
      </div>
      <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{card.name}</div>
      {marked && <span className="check" aria-hidden>✓</span>}
    </button>
  );
}
