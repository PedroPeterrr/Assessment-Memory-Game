import styles from './Header.module.scss';
import { formatMs } from '../../hooks/useTimer';
import { sizes } from '../../constant/costant';

type Props = {
  moves: number;
  timeMs: number;
  bestMs: number | null;
  onReset: () => void;
  onResize: (rows: number, cols: number) => void;
  rows: number;
  cols: number;
  isRunning: boolean;
  isCompleted: boolean;
  ms: number
}

export default function Header({
  moves,
  ms, 
  bestMs, 
  onReset, 
  onResize, 
  rows, 
  cols, 
  isRunning, 
  isCompleted
}: Props) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Memory Match</h1>

      <div className={styles.stats}>
        <div>
          <span className={styles.statLabel}> Moves</span>
          <strong>{moves}</strong>
        </div>
        <div>
          <span className={styles.statLabel}>Time</span>
          <strong>{formatMs(ms)}</strong>
        </div>
        <div>
          <span className={styles.statLabel}>Best</span>
          <strong>{bestMs != null ? formatMs(bestMs) : '—'}</strong>
        </div>
        <button
          className={styles.button}
          onClick={onReset} 
          aria-label="Reset game"
        >
          Reset
        </button>
      </div>

      <div className={styles.actions}>
        <fieldset className={styles.sizePicker} aria-label="Board size">
          <legend>Size</legend>
          {sizes.map(s => (
            <label key={s.label}>
              <input
                type="radio"
                name="size"
                checked={rows === s.rows && cols === s.cols}
                onChange={() => onResize(s.rows, s.cols)}
              />
              {s.label}
            </label>
          ))}
        </fieldset>
      </div>

      <div className={styles.helper} aria-live="polite">
        {isCompleted ? '' : 
          isRunning 
          ? 'Good luck!' 
          : 'Press any card to start.'
        }
      </div>
    </header>
  );
}
