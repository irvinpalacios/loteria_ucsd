import React from 'react';

function Stat({ label, value, accent }) {
  return (
    <div className="card-wrapper" style={{ textAlign: 'center', borderTop: `4px solid ${accent}` }}>
      <div style={{ fontSize: '0.95rem', color: '#444' }}>{label}</div>
      <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{value}</div>
    </div>
  );
}

export default function ScorePanel({ timeElapsed, accuracy, attempts, correctMarks, currentStreak, bestStreak }) {
  return (
    <div className="score-row">
      <Stat label="Tiempo" value={`${timeElapsed}s`} accent="var(--azul)" />
      <Stat label="Precisión" value={`${accuracy}%`} accent="var(--rosa)" />
      <Stat label="Intentos" value={attempts} accent="var(--amarillo)" />
      <Stat label="Aciertos" value={correctMarks} accent="var(--verde)" />
      <Stat label="Racha actual" value={`${currentStreak}x`} accent="#ff7043" />
      <Stat label="Mejor racha" value={`${bestStreak}x`} accent="#8e24aa" />
    </div>
  );
}
