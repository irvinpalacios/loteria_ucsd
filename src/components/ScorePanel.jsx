import React from 'react';

function Stat({ label, value, accent }) {
  return (
    <div className="card-wrapper stat" style={{ borderTop: `4px solid ${accent}` }}>
      <div className="label">{label}</div>
      <div className="headline" style={{ fontSize: '1.3rem' }}>{value}</div>
    </div>
  );
}

export default function ScorePanel({ timeElapsed, accuracy, attempts, correctMarks, currentStreak, bestStreak, remaining, deckSize }) {
  return (
    <div className="score-row">
      <Stat label="Tiempo" value={`${timeElapsed}s`} accent="var(--azul)" />
      <Stat label="Precisión" value={`${accuracy}%`} accent="var(--rosa)" />
      <Stat label="Intentos" value={attempts} accent="var(--amarillo)" />
      <Stat label="Aciertos" value={correctMarks} accent="var(--verde)" />
      <Stat label="Racha actual" value={`${currentStreak}x`} accent="#ff7043" />
      <Stat label="Mejor racha" value={`${bestStreak}x`} accent="#8e24aa" />
      <Stat label="Cartas sin llamar" value={`${remaining}/${deckSize}`} accent="#00695c" />
    </div>
  );
}
