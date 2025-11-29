import React from 'react';
import { getCardVisual } from '../utils/gameState';

export default function CallerCard({ current, remaining, onNext, disabled }) {
  const visual = getCardVisual(current);
  const cardLabel = current ? current.name : 'Comienza la partida';

  return (
    <div className="card-wrapper caller-card">
      <div className="caller-art" aria-hidden>
        {visual.isImage && visual.label ? (
          <img src={visual.label} alt={current?.name} />
        ) : (
          visual.label || '🎴'
        )}
      </div>
      <div className="caller-info">
        <div className="label">Caller</div>
        <div className="headline">{cardLabel}</div>
        <p className="callout">Cartas restantes en el mazo: {remaining}</p>
        <div className="cta-row">
          <button className="primary-button" onClick={onNext} disabled={disabled}>
            Next Card
          </button>
          <span className="pill">Modo arte: {visual.isImage ? 'PNG' : 'Emoji'}</span>
        </div>
      </div>
    </div>
  );
}
