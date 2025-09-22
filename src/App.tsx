import { useEffect, useMemo, useState } from 'react';
import { Header, GameBoard, Modal} from './component/index';
import styles from './App.module.scss';
import type { GameSettings } from './types/types';
import { useTimer, formatMs } from './hooks/useTimer';
import { useGameStats } from './hooks/useGameStats';

export default function App() {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [moves, setMoves] = useState(0);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [running, setRunning] = useState(false);

  const { bestMs, lastFinishMs, showCongrats, onCompleteTime, setShowCongrats, setLastFinishMs } = useGameStats();

  const settings: GameSettings = useMemo(() => ({
    rows, cols, flipBackDelayMs: 600,
  }), [rows, cols]);

  const { elapsedMs, reset: resetTimer } = useTimer(running);

  useEffect(() => {
    if (!started) resetTimer();
  }, [started, resetTimer]);

  function onState(s: { moves: number; completed: boolean; started: boolean; revealCount: number }) {
    setMoves(s.moves);
    setCompleted(s.completed);
    setStarted(s.started);
  }

  const handleReset = () => {
    setShowCongrats(false);
    setLastFinishMs(null);
    setStarted(false);
    setCompleted(false);
    setRunning(false);
    setMoves(0);
    resetTimer();
    setRemountKey(k => k + 1);
  };

  const playAgain = () => {
    handleReset();
  };

  const [remountKey, setRemountKey] = useState(0);

  const onResize = (r: number, c: number) => {
    setRows(r);
    setCols(c);
    handleReset();
  };

  return (
    <div className={styles.app}>
      <Modal
        open={showCongrats}
        title="🎉 You did it!"
        onClose={() => setShowCongrats(false)}
        primary={{ label: 'Play again', onClick: playAgain }}
      >
        <p>
          Time: <strong>{lastFinishMs != null ? formatMs(lastFinishMs) : '—'}</strong><br/>
          Moves: <strong>{moves}</strong><br/>
          Best: <strong>{bestMs != null ? formatMs(bestMs) : '—'}</strong>
          {lastFinishMs != null && bestMs != null && lastFinishMs === bestMs ? ' 🏆 New record!' : ''}
        </p>
        <p>Tap <em>Play again</em> to reshuffle and go for a better time.</p>
      </Modal>

      <Header
        moves={moves}
        timeMs={elapsedMs}
        bestMs={bestMs}
        onReset={handleReset}
        onResize={onResize}
        rows={rows}
        cols={cols}
        isRunning={running}
        isCompleted={completed}
        ms={elapsedMs}
      />

      <GameBoard
        key={`${rows}x${cols}:${remountKey}`}
        settings={settings}
        onState={onState}
        onCompleteTime={onCompleteTime}
        running={running}
        setRunning={setRunning}
      />
    </div>
  );
}
