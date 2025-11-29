import React, { useEffect, useMemo, useState, useCallback } from 'react';
import deckData from './data/deck.json';
import CallerCard from './components/CallerCard';
import TablaGrid from './components/TablaGrid';
import WinModal from './components/WinModal';
import ScorePanel from './components/ScorePanel';
import { shuffle } from './utils/shuffle';
import { createEmptyMarks } from './utils/gameState';
import { checkPatterns } from './utils/patternCheck';

const TABLA_SIZE = 5;

export default function App() {
  const [tabla, setTabla] = useState([]);
  const [marks, setMarks] = useState(createEmptyMarks(TABLA_SIZE));
  const [deckQueue, setDeckQueue] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [gameStatus, setGameStatus] = useState('idle'); // idle | playing | won | deck-out
  const [winReady, setWinReady] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [winPatterns, setWinPatterns] = useState([]);

  const [attempts, setAttempts] = useState(0);
  const [correctMarks, setCorrectMarks] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [lastCorrectTime, setLastCorrectTime] = useState(null);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const accuracy = attempts === 0 ? 100 : Math.round((correctMarks / attempts) * 100);
  const remaining = deckQueue.length;

  const buildTabla = useCallback(() => {
    const subset = shuffle(deckData).slice(0, TABLA_SIZE * TABLA_SIZE);
    const matrix = [];
    for (let i = 0; i < TABLA_SIZE; i += 1) {
      matrix.push(subset.slice(i * TABLA_SIZE, (i + 1) * TABLA_SIZE));
    }
    return matrix;
  }, []);

  const resetGame = useCallback(() => {
    setTabla(buildTabla());
    setMarks(createEmptyMarks(TABLA_SIZE));
    setDeckQueue(shuffle(deckData));
    setCurrentCard(null);
    setGameStatus('playing');
    setWinReady(false);
    setShowWin(false);
    setWinPatterns([]);
    setAttempts(0);
    setCorrectMarks(0);
    setStartTime(Date.now());
    setTimeElapsed(0);
    setCurrentStreak(0);
    setBestStreak(0);
    setLastCorrectTime(null);
  }, [buildTabla]);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (gameStatus === 'playing') {
        setTimeElapsed(Math.round((Date.now() - startTime) / 1000));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStatus, startTime]);

  const drawCard = () => {
    if (gameStatus !== 'playing' || deckQueue.length === 0) return;
    const [next, ...rest] = deckQueue;
    setCurrentCard(next);
    setDeckQueue(rest);
  };

  const handleMark = (row, col, card) => {
    if (gameStatus !== 'playing') return;
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

    const { hasWin, patterns } = checkPatterns(updated, TABLA_SIZE);
    if (hasWin) {
      setWinReady(true);
      setWinPatterns(patterns);
      setGameStatus('won');
    } else if (deckQueue.length === 0) {
      setCurrentCard(null);
      setGameStatus('deck-out');
    }
  };

  useEffect(() => {
    if (gameStatus === 'playing' && deckQueue.length === 0 && !winReady && !currentCard) {
      setGameStatus('deck-out');
    }
  }, [gameStatus, deckQueue.length, winReady, currentCard]);

  const stats = useMemo(
    () => ({ timeElapsed, accuracy, attempts, correctMarks, currentStreak, bestStreak, remaining }),
    [timeElapsed, accuracy, attempts, correctMarks, currentStreak, bestStreak, remaining]
  );

  const statusMessage = {
    won: '¡Patrón válido encontrado! Presiona el botón para cantar Lotería.',
    'deck-out': 'El mazo terminó. Vuelve a intentarlo con un nuevo juego.',
  }[gameStatus];

  return (
    <div className="app-shell">
      <header className="top-bar">
        <CallerCard
          current={currentCard}
          remaining={deckQueue.length}
          onNext={drawCard}
          disabled={gameStatus !== 'playing' || deckQueue.length === 0}
        />
        <div className="card-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <div className="label">Tabla</div>
            <div className="headline">{TABLA_SIZE} × {TABLA_SIZE}</div>
          </div>
          <p className="callout">
            Pulsa “Next Card” para descubrir la siguiente carta y toca las coincidencias en tu tabla.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="secondary-button" onClick={resetGame}>
              Reiniciar partida
            </button>
          </div>
        </div>
      </header>

      <TablaGrid tabla={tabla} marks={marks} currentCardId={currentCard?.id} onMark={handleMark} />

      <ScorePanel {...stats} deckSize={deckData.length} />

      <div className="footer-area">
        {winReady && (
          <button className="loteria-button" onClick={() => setShowWin(true)}>
            ¡Lotería!
          </button>
        )}
        {statusMessage && <div className="callout" role="status">{statusMessage}</div>}
        {!statusMessage && <div className="callout">Marca las cartas que coincidan con el caller.</div>}
      </div>

      <WinModal
        visible={showWin}
        stats={{ ...stats, winPatterns }}
        onRestart={() => {
          setShowWin(false);
          resetGame();
        }}
      />
    </div>
  );
}
