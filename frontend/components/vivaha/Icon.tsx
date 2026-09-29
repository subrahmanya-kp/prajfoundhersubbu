import type { CSSProperties } from "react";
import { cx, type IconName } from "./types";

const PATHS: Record<IconName, () => React.ReactNode> = {
  lamp: () => (
    <>
      <path d="M12 1.8c.9 1.1 1.3 2 1.3 2.8a1.3 1.3 0 0 1-2.6 0c0-.8.4-1.7 1.3-2.8z" fill="currentColor" />
      <path
        d="M6.2 4.4c.6.8.9 1.4.9 2a.9.9 0 0 1-1.8 0c0-.6.3-1.2.9-2zM17.8 4.4c.6.8.9 1.4.9 2a.9.9 0 0 1-1.8 0c0-.6.3-1.2.9-2z"
        fill="currentColor"
      />
      <path d="M4.5 8.2h15c-.6 2-3.8 3.3-7.5 3.3S5.1 10.2 4.5 8.2z" fill="currentColor" />
      <path d="M12 11.5v7M10 14h4" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
      <path d="M7.5 21.8c.6-2 2.4-3.3 4.5-3.3s3.9 1.3 4.5 3.3z" fill="currentColor" />
    </>
  ),
  kalash: () => (
    <>
      <path d="M12 1.8c.9 1.3 1.3 2.4 1.3 3.3a1.3 1.3 0 0 1-2.6 0c0-.9.4-2 1.3-3.3z" fill="currentColor" />
      <path
        d="M7 7.5c1.5-.9 3.2-1.3 5-1.3s3.5.4 5 1.3M5.5 6.8l2.3 1.4M18.5 6.8l-2.3 1.4"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M8.5 9h7v1.3c3 1.3 4.5 3.8 4.5 6.4 0 3-2.6 5.3-8 5.3s-8-2.3-8-5.3c0-2.6 1.5-5.1 4.5-6.4z"
        fill="currentColor"
      />
    </>
  ),
  jasmine: () => (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <ellipse
          key={i}
          cx={12}
          cy={6.6}
          rx={2.8}
          ry={5}
          transform={`rotate(${i * 72} 12 12)`}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.4}
        />
      ))}
      <circle cx={12} cy={12} r={1.8} fill="currentColor" />
    </>
  ),
  lotus: () => (
    <>
      <path d="M12 4c2 2.2 3 4.6 3 7.2 0 2.7-1.2 4.8-3 6.3-1.8-1.5-3-3.6-3-6.3C9 8.6 10 6.2 12 4z" fill="currentColor" />
      <path
        d="M12 17.5c-1.8-.2-4.8-1.2-6.4-3.5-1-1.5-1.4-3.2-1.4-4.6 2 .2 4.2 1.2 5.2 2.6M12 17.5c1.8-.2 4.8-1.2 6.4-3.5 1-1.5 1.4-3.2 1.4-4.6-2 .2-4.2 1.2-5.2 2.6"
        fill="currentColor"
        opacity={0.75}
      />
      <path
        d="M3 19.5c3 .8 6 1.2 9 1.2s6-.4 9-1.2"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),
  rings: () => (
    <>
      <circle cx={9} cy={14} r={5.5} fill="none" stroke="currentColor" strokeWidth={1.7} />
      <circle cx={15} cy={14} r={5.5} fill="none" stroke="currentColor" strokeWidth={1.7} />
      <path d="M13 3.5l2 2.5-2 2.5-2-2.5z" fill="currentColor" />
    </>
  ),
  calendar: () => (
    <>
      <rect x={3.5} y={5} width={17} height={15.5} rx={2} fill="none" stroke="currentColor" strokeWidth={1.6} />
      <path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
    </>
  ),
  clock: () => (
    <>
      <circle cx={12} cy={12} r={8.5} fill="none" stroke="currentColor" strokeWidth={1.6} />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" fill="none" />
    </>
  ),
  pin: () => (
    <>
      <path
        d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <circle cx={12} cy={10} r={2.3} fill="currentColor" />
    </>
  ),
};

export interface IconProps {
  name: IconName;
  size?: number;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function Icon({ name, size = 24, label, className, style }: IconProps) {
  const draw = PATHS[name] ?? PATHS.lamp;
  return (
    <svg
      className={cx("vv-icon", className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      style={style}
    >
      {draw()}
    </svg>
  );
}
