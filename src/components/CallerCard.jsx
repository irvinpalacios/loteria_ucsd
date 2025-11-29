import React from 'react';
import { getCardVisual } from '../utils/gameState';

export default function CallerCard({ current, remaining, onNext, disabled }) {
  const visual = getCardVisual(current);

  return (
    <div className="card-wrapper" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 14 }}>
      <div
        style={{
          width: 86,
          height: 86,
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(255, 204, 0, 0.3), rgba(230, 0, 115, 0.18))',
          display: 'grid',
          placeItems: 'center',
          fontSize: '3rem',
          boxShadow: '0 12px 26px rgba(0,0,0,0.12)',
        }}
      >
        {visual.isImage && visual.label ? (
          <img src={visual.label} alt={current?.name} style={{ width: '72px', height: '72px' }} />
        ) : (
          visual.label || '✨'
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{current?.name || 'Presiona “Next Card”'}</div>
        <div className="callout">Cartas restantes: {remaining}</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="primary-button" onClick={onNext} disabled={disabled}>
            Next Card
          </button>
          <span className="callout" aria-live="polite">
            Modo arte: {visual.isImage ? 'PNG' : 'Emoji'}
          </span>
        </div>
      </div>
    </div>
  );
}
