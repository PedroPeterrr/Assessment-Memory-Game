export type CardId = string;

export type CardData = {
  id: CardId;
  pairKey: string;
  face: string;
}

export type GameSettings = {
  rows: number;
  cols: number;
  flipBackDelayMs: number;
}