import styles from './Card.module.scss';

type Props = {
  face: string;
  isRevealed: boolean;
  isMatched: boolean;
  isDisabled: boolean;
  onClick: () => void;
  index: number;
}

function CardBase({ 
  face, 
  isRevealed, 
  isMatched, 
  isDisabled, 
  onClick, 
  index 
}: Props) {
const stateClass = isMatched ? `${styles.revealed} ${styles.matched}`
  : isRevealed ? styles.revealed : styles.hidden;

  return (
    <button
      className={`${styles.card} ${stateClass}`}
      onClick={onClick}
      disabled={isDisabled}
      aria-pressed={isRevealed || isMatched}
      aria-label={isMatched 
        ? `Card ${index + 1}, matched` 
        : isRevealed 
        ? `Card ${index + 1}, revealed` 
        : `Card ${index + 1}, face down`
      } 
    >
      <span 
        className={styles.front} 
        aria-hidden={!isRevealed && !isMatched}
      >
        ?
      </span>

      <span 
        className={styles.back} 
        aria-hidden={!(isRevealed || isMatched)}
      >
        {face}
      </span>
    </button>
  );
}

export default CardBase;
