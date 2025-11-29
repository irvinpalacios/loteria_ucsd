import React from 'react';
import { getCardVisual } from '../utils/gameState';

const baseTile = {
  background: 'linear-gradient(145deg, rgba(255,255,255,0.96), rgba(255,255,255,0.85))',
  border: '2px solid rgba(0,0,0,0.05)',
  borderRadius: '14px',
  boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
  padding: '12px',
  cursor: 'pointer',
  position: 'relative',
  transition: 'transform 120ms ease, box-shadow 180ms ease, border-color 180ms ease',
};

export default function CardTile({ card, marked, isActive, onMark }) {
  const visual = getCardVisual(card);

  return (
    <button
      type="button"
      onClick={onMark}
      style={{
        ...baseTile,
        transform: marked ? 'translateY(-2px) scale(1.01)' : undefined,
        borderColor: marked ? 'var(--verde)' : isActive ? 'var(--rosa)' : baseTile.border,
        boxShadow: marked
          ? '0 12px 26px rgba(0, 155, 58, 0.25)'
          : isActive
          ? '0 12px 26px rgba(230, 0, 115, 0.2)'
          : baseTile.boxShadow,
      }}
      aria-pressed={marked}
    >
      <div
        style={{
          fontSize: '2.2rem',
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {visual.isImage ? (
          <img
            src={visual.label}
            alt={card.name}
            style={{ width: '64px', height: '64px', objectFit: 'contain' }}
          />
        ) : (
          visual.label
        )}
      </div>
      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{card.name}</div>
      {marked && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            right: 10,
            top: 8,
            background: 'var(--verde)',
            color: 'white',
            borderRadius: '50%',
            width: 24,
            height: 24,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 18px rgba(0, 155, 58, 0.35)',
          }}
        >
          ✓
        </span>
      )}
    </button>
  );
}
