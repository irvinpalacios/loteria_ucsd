import React, { useEffect, useMemo, useState } from 'react';
import deckData from './data/deck.json';
import CallerCard from './components/CallerCard';
import TablaGrid from './components/TablaGrid';
import WinModal from './components/WinModal';
import ScorePanel from './components/ScorePanel';
import { shuffle } from './utils/shuffle';
import { createEmptyMarks } from './utils/gameState';
import { checkPatterns } from './utils/patternCheck';

export default function App() {
  const [tablaSize, setTablaSize] = useState(4);
  const [tabla, setTabla] = useState([]);
  const [marks, setMarks] = useState(createEmptyMarks(4));
  const [deckQueue, setDeckQueue] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [winReady, setWinReady] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [correctMarks, setCorrectMarks] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [lastCorrectTime, setLastCorrectTime] = useState(null);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const accuracy = attempts === 0 ? 100 : Math.round((correctMarks / attempts) * 100);
  const remaining = deckQueue.length + (currentCard ? 1 : 0);

  const tablaCards = useMemo(() => shuffle(deckData), []);

  const dealTabla = (size) => {
    const subset = shuffle(tablaCards).slice(0, size * size);
    const matrix = [];
    for (let i = 0; i < size; i += 1) {
      matrix.push(subset.slice(i * size, (i + 1) * size));
    }
    return matrix;
  };

  const resetGame = (size = tablaSize) => {
    const newTabla = dealTabla(size);
    setTabla(newTabla);
    setMarks(createEmptyMarks(size));
    const newDeck = shuffle(deckData);
    setDeckQueue(newDeck);
    setCurrentCard(null);
    setAttempts(0);
    setCorrectMarks(0);
    setWinReady(false);
    setShowWin(false);
    setGameEnded(false);
    setStartTime(Date.now());
    setTimeElapsed(0);
    setCurrentStreak(0);
    setBestStreak(0);
    setLastCorrectTime(null);
  };

  useEffect(() => {
    resetGame(tablaSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tablaSize]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!gameEnded) {
        setTimeElapsed(Math.round((Date.now() - startTime) / 1000));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [gameEnded, startTime]);

  const drawCard = () => {
    if (deckQueue.length === 0 || gameEnded) return;
    const [next, ...rest] = deckQueue;
    setCurrentCard(next);
    setDeckQueue(rest);
  };

  const handleMark = (row, col, card) => {
    if (gameEnded) return;
    setAttempts((prev) => prev + 1);

    if (!currentCard || card.id !== currentCard.id || marks[row][col]) {
      setCurrentStreak(0);
      return;
    }

    const updated = marks.map((r, rIdx) =>
      r.map((cell, cIdx) => (rIdx === row && cIdx === col ? true : cell))
    );
    setMarks(updated);
    setCorrectMarks((prev) => prev + 1);

    const now = Date.now();
    if (lastCorrectTime && now - lastCorrectTime <= 2000) {
      setCurrentStreak((prev) => {
        const newStreak = prev + 1;
        setBestStreak((best) => Math.max(best, newStreak));
        return newStreak;
      });
    } else {
      setCurrentStreak(1);
      setBestStreak((best) => Math.max(best, 1));
    }
    setLastCorrectTime(now);

    const { hasWin } = checkPatterns(updated, tablaSize);
    if (hasWin) {
      setWinReady(true);
      setGameEnded(true);
      setShowWin(true);
    }
  };

  useEffect(() => {
    if (!gameEnded && remaining === 0) {
      setGameEnded(true);
    }
  }, [gameEnded, remaining]);

  const stats = {
    timeElapsed,
    accuracy,
    attempts,
    correctMarks,
    bestStreak,
  };

  return (
    <div className="app-shell">
      <header className="top-bar">
        <CallerCard current={currentCard} remaining={remaining} onNext={drawCard} disabled={gameEnded} />
        <div className="card-wrapper">
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Elige tamaño</div>
          <div className="tabla-size-switch">
            {[4, 5].map((size) => (
              <button
                key={size}
                className={size === tablaSize ? 'active' : ''}
                onClick={() => setTablaSize(size)}
              >
                {size} × {size}
              </button>
            ))}
            <button className="secondary-button" onClick={() => resetGame(tablaSize)}>
              Reiniciar
            </button>
          </div>
        </div>
      </header>

      <TablaGrid tabla={tabla} marks={marks} currentCardId={currentCard?.id} onMark={handleMark} />

      <ScorePanel
        timeElapsed={timeElapsed}
        accuracy={accuracy}
        attempts={attempts}
        correctMarks={correctMarks}
        currentStreak={currentStreak}
        bestStreak={bestStreak}
      />

      <div className="footer-area">
        {winReady && !showWin && (
          <button className="loteria-button" onClick={() => setShowWin(true)}>
            ¡Lotería!
          </button>
        )}
        {!winReady && gameEnded && <div className="callout">El mazo terminó. Intenta otra vez.</div>}
        <div className="callout">Marca las cartas que coincidan con el caller.</div>
      </div>

      <WinModal
        visible={showWin}
        stats={{ ...stats, currentStreak, bestStreak }}
        onRestart={() => resetGame(tablaSize)}
      />
    </div>
  );
}
