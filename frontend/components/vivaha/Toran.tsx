import { cx } from "./types";

export interface ToranProps {
  count?: number;
  className?: string;
}

export function Toran({ count = 16, className }: ToranProps) {
  const n = count;
  const U = 48;
  const W = n * U;
  const H = 96;
  const kids: React.ReactNode[] = [];

  let d = "M0 10";
  for (let i = 0; i < n; i++) {
    d += ` Q${i * U + U / 2} 22 ${(i + 1) * U} 10`;
  }
  kids.push(<path key="s" className="str" d={d} />);
  kids.push(<path key="s2" className="str" d={`M0 4 H${W}`} style={{ strokeWidth: 1.2 }} />);

  for (let i = 0; i < n; i++) {
    const x = i * U + U / 2;
    if (i % 2 === 0) {
      kids.push(
        <g key={`l${i}`} transform={`translate(${x} 16)`}>
          <path className="leaf" d="M0 0 C 11 9 12 32 0 50 C -12 32 -11 9 0 0 Z" />
          <path className="rib" d="M0 4 V44" />
        </g>
      );
    } else {
      const len = i % 4 === 1 ? 5 : 7;
      const end = 18 + len * 9;
      kids.push(<line key={`t${i}`} className="thr" x1={x} y1={14} x2={x} y2={end} />);
      for (let k = 0; k < len; k++) {
        const y = 22 + k * 9;
        const side = k % 2 ? 1 : -1;
        kids.push(
          <ellipse
            key={`b${i}-${k}`}
            className="bud"
            cx={x + side * 2.6}
            cy={y}
            rx={2.6}
            ry={4.4}
            transform={`rotate(${side * 22} ${x + side * 2.6} ${y})`}
          />
        );
      }
      kids.push(<circle key={`e${i}`} className="bead" cx={x} cy={end + 3} r={2.6} />);
    }
  }

  return (
    <svg className={cx("vv-toran", className)} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      {kids}
    </svg>
  );
}
