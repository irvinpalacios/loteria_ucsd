import React, { useMemo } from 'react';

export default function WinModal({ visible, stats, onRestart }) {
  const confettiPieces = useMemo(() => Array.from({ length: 60 }, (_, i) => i), []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="modal-overlay"
    >
      <div className="card-wrapper modal">
        <h2 className="headline">¡Lotería! 🎉</h2>
        <p className="callout">Ganaste con un patrón válido.</p>
        <div className="win-stats">
          <div><strong>Tiempo:</strong> {stats.timeElapsed}s</div>
          <div><strong>Precisión:</strong> {stats.accuracy}%</div>
          <div><strong>Aciertos:</strong> {stats.correctMarks}</div>
          <div><strong>Intentos:</strong> {stats.attempts}</div>
          <div><strong>Mejor racha:</strong> {stats.bestStreak}x</div>
          {stats.winPatterns?.length > 0 && (
            <div>
              <strong>Patrones:</strong> {stats.winPatterns.map((p) => p.type).join(', ')}
            </div>
          )}
        </div>
        <button className="loteria-button" onClick={onRestart}>
          Jugar otra vez
        </button>
      </div>
      <div className="confetti" aria-hidden>
        {confettiPieces.map((piece) => {
          const left = Math.random() * 100;
          const duration = 1.8 + Math.random();
          const delay = Math.random();
          return (
            <span
              key={piece}
              className="confetti-piece"
              style={{ left: `${left}%`, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
            />
          );
        })}
      </div>
    </div>
  );
}
