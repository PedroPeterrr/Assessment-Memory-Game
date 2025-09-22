import { useEffect, useRef, useState } from 'react';

export function useTimer(isRunning: boolean) {
  const [elapsedMs, setElapsedMs] = useState(0);
  const raf = useRef<number | null>(null);
  const start = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      start.current = performance.now() - elapsedMs;
      raf.current = requestAnimationFrame(tick);
    } else {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = null;
      start.current = null;
    }

    function tick(now: number) {
      if (start.current == null) start.current = now;
      setElapsedMs(now - start.current);
      raf.current = requestAnimationFrame(tick);
    }

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [isRunning]);

  const reset = () => setElapsedMs(0);
  return { elapsedMs, reset };
}


export const formatMs = (ms: number) => {
  const totalSeconds  = Math.floor(ms / 1000);
  const minutes  = Math.floor(totalSeconds / 60);
  const seconds  = totalSeconds % 60;
  const centiseconds = Math.floor((ms % 1000) / 10);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
};
