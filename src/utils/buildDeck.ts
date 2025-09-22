import { EMOJIS } from '../constant/costant';
import { shuffleInPlace } from './shuffle';
import type { CardData } from '../types/types';

export function buildDeck(rows: number, cols: number): CardData[] {
  const pairs = (rows * cols) / 2;
  const faces = shuffleInPlace([...EMOJIS]).slice(0, pairs);
  const deck: CardData[] = faces.flatMap((f, i) => ([
    { id: `${i}-a-${Math.random()}`, pairKey: String(i), face: f },
    { id: `${i}-b-${Math.random()}`, pairKey: String(i), face: f },
  ]));
  return shuffleInPlace(deck);
}