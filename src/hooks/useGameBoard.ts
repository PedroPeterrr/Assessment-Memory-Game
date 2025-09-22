import { useState, useRef } from "react";
import type { CardData, GameSettings } from "../types/types";
import { buildDeck } from "../utils/buildDeck";

export function useGameBoard(
  settings: GameSettings,
  onState: (s: { moves: number; completed: boolean; started: boolean; revealCount: number }) => void,
  onCompleteTime: (ms: number) => void,
  setRunning: (v: boolean) => void,
  running: boolean
) {
  const { rows, cols, flipBackDelayMs } = settings;

  const [deck, setDeck] = useState<CardData[]>(() => buildDeck(rows, cols));
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const [matchedKeys, setMatchedKeys] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  function reset() {
    setDeck(buildDeck(rows, cols));
    setRevealedIds([]);
    setMatchedKeys(new Set());
    setMoves(0);
    setLock(false);
    setRunning(false);
    startTimeRef.current = null;
  }

  function onCardClick(card: CardData) {
    if (lock) return;

    if (!running) {
      setRunning(true);
      startTimeRef.current = performance.now();
    }

    const isAlreadyRevealed = revealedIds.includes(card.id);
    const isAlreadyMatched = matchedKeys.has(card.pairKey);
    if (isAlreadyRevealed || isAlreadyMatched) return;

    const newRevealed = [...revealedIds, card.id];
    setRevealedIds(newRevealed);
    onState({ moves, completed: false, started: true, revealCount: newRevealed.length });

    if (newRevealed.length % 2 === 0) {
      setMoves(m => m + 1);

      const [id1, id2] = newRevealed.slice(-2);
      const c1 = deck.find(d => d.id === id1)!;
      const c2 = deck.find(d => d.id === id2)!;

      if (c1.pairKey === c2.pairKey) {
        const next = new Set(matchedKeys);
        next.add(c1.pairKey);
        setMatchedKeys(next);

        const allMatched = next.size === deck.length / 2;
        if (allMatched) {
          setRunning(false);
          const end = performance.now();
          const elapsed = startTimeRef.current ? end - startTimeRef.current : 0;
          onState({ moves: moves + 1, completed: true, started: true, revealCount: newRevealed.length });
          onCompleteTime(elapsed);
        }
      } else {
        setLock(true);
        window.setTimeout(() => {
          setRevealedIds(ids => ids.filter(id => id !== id1 && id !== id2));
          setLock(false);
          onState({ moves: moves + 1, completed: false, started: true, revealCount: 0 });
        }, flipBackDelayMs);
      }
    }
  }

  return { deck, revealedIds, matchedKeys, moves, lock, onCardClick, reset };
}
