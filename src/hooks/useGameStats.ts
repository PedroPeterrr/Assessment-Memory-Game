import { useState } from "react";

export function useGameStats() {
  const BEST_KEY = "best_time";
  const [bestMs, setBestMs] = useState<number | null>(null);
  const [lastFinishMs, setLastFinishMs] = useState<number | null>(null);
  const [showCongrats, setShowCongrats] = useState(false);

  function onCompleteTime(elapsed: number) {
    setLastFinishMs(elapsed);
    const better = bestMs == null || elapsed < bestMs;
    if (better) {
      setBestMs(elapsed);
      localStorage.setItem(BEST_KEY, String(elapsed));
    }
    setShowCongrats(true);
  }

  return { bestMs, lastFinishMs, showCongrats, onCompleteTime, setShowCongrats, setLastFinishMs };
}
