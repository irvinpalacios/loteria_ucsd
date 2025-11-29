import React from 'react';
import CardTile from './CardTile';

export default function TablaGrid({ tabla, marks, currentCardId, onMark }) {
  const size = tabla.length;
  return (
    <div
      className="grid-container card-wrapper"
      style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
    >
      {tabla.flat().map((card, idx) => {
        const row = Math.floor(idx / size);
        const col = idx % size;
        const marked = marks[row][col];
        const isActive = currentCardId === card.id;
        return (
          <CardTile
            key={card.id}
            card={card}
            marked={marked}
            isActive={isActive}
            onMark={() => onMark(row, col, card)}
          />
        );
      })}
    </div>
  );
}
