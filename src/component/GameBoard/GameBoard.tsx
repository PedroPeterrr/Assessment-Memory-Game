import { useMemo} from 'react';
import styles from './GameBoard.module.scss';
import Card from '../Card/Card';
import type { GameSettings } from '../../types/types';
import { useGameBoard } from '../../hooks/useGameBoard';

type Props = {
  settings: GameSettings;
  onState: (s: {
    moves: number;
    completed: boolean;
    started: boolean;
    revealCount: number;
  }) => void;
  onCompleteTime: (ms: number) => void;
  running: boolean;
  setRunning: (v: boolean) => void;
}

export default function GameBoard({ 
  settings,
  onState, 
  onCompleteTime, 
  running,
  setRunning
}: Props) {
  const { rows, cols } = settings;

  const { deck, revealedIds, matchedKeys, lock, onCardClick } =
    useGameBoard(settings, onState, onCompleteTime, setRunning, running);

  const gridStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
    }),
    [rows, cols]
  );
  
  return (
    <div className={styles.boardWrapper}>
      <div
        className={styles.board}
        style={gridStyle}
        role="grid"
        aria-rowcount={rows}
        aria-colcount={cols}
      >
        {deck.map((card, i) => {
          const isRevealed = revealedIds.includes(card.id);
          const isMatched = matchedKeys.has(card.pairKey);
          return (
            <div key={card.id} role="gridcell" className={styles.cell}>
              <Card
                face={card.face}
                isRevealed={isRevealed}
                isMatched={isMatched}
                isDisabled={lock || isRevealed || isMatched}
                onClick={() => onCardClick(card)}
                index={i}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
