import { cx } from "./types";

export interface MonogramProps {
  a?: string;
  b?: string;
  size?: number;
  className?: string;
}

export function Monogram({ a = "P", b = "S", size = 64, className }: MonogramProps) {
  const s = size;
  return (
    <svg
      className={cx("vv-mono", className)}
      width={s}
      height={s * 1.2}
      viewBox="0 0 100 120"
      role="img"
      aria-label={`${a} and ${b}`}
    >
      <path d="M8 116 V50 A42 42 0 0 1 92 50 V116 Z" fill="none" stroke="currentColor" strokeWidth={2} />
      <path d="M15 110 V51 A35 35 0 0 1 85 51 V110 Z" fill="none" stroke="currentColor" strokeWidth={1} opacity={0.6} />
      <path
        d="M50 12 c3 3.5 4.5 7 4.5 10.5 a4.5 4.5 0 0 1 -9 0 c0 -3.5 1.5 -7 4.5 -10.5z"
        fill="currentColor"
      />
      <text x={50} y={82} textAnchor="middle" fontSize={36}>
        {a}
        {" & "}
        {b}
      </text>
      <path d="M30 96 H70" stroke="currentColor" strokeWidth={1} />
      <path d="M50 92 l4 4 -4 4 -4 -4z" fill="currentColor" />
    </svg>
  );
}
