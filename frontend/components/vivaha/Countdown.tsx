"use client";

import { useEffect, useState } from "react";

export interface CountdownProps {
  date: string;
  label?: string;
  doneText?: string;
}

interface Diff {
  done: boolean;
  d: number;
  h: number;
  m: number;
  s: number;
}

function diff(target: string): Diff {
  const ms = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    done: ms === 0,
    d: Math.floor(ms / 864e5),
    h: Math.floor(ms / 36e5) % 24,
    m: Math.floor(ms / 6e4) % 60,
    s: Math.floor(ms / 1e3) % 60,
  };
}

const UNITS: [keyof Diff, string][] = [
  ["d", "Days"],
  ["h", "Hours"],
  ["m", "Minutes"],
  ["s", "Seconds"],
];

export function Countdown({ date, label, doneText }: CountdownProps) {
  const [t, setT] = useState<Diff>(() => diff(date));

  useEffect(() => {
    const id = setInterval(() => setT(diff(date)), 1000);
    return () => clearInterval(id);
  }, [date]);

  if (t.done) {
    return (
      <div className="vv-cd">
        <p className="vv-cd-done" suppressHydrationWarning>
          {doneText || "The celebrations have begun."}
        </p>
      </div>
    );
  }

  return (
    <div className="vv-cd" role="timer" aria-label={`${t.d} days to go`} suppressHydrationWarning>
      {label ? <p className="vv-eyebrow">{label}</p> : null}
      <div className="vv-cd-tiles">
        {UNITS.map(([key, unit]) => (
          <div key={key} className="vv-cd-tile">
            <span className="vv-cd-num" suppressHydrationWarning>
              {String(t[key]).padStart(2, "0")}
            </span>
            <span className="vv-cd-unit">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
