import { Monogram } from "./Monogram";
import { Ornament } from "./Ornament";
import { Toran } from "./Toran";
import { cx } from "./types";

export interface FooterProps {
  a?: string;
  b?: string;
  names?: string;
  note?: string;
  toranCount?: number;
  className?: string;
}

export function Footer({ a, b, names = "Prajna & Subrahmanya", note, toranCount = 16, className }: FooterProps) {
  return (
    <footer className={cx("vv-foot vv-on-maroon", className)}>
      <Toran count={toranCount} />
      <div className="vv-foot-inner">
        <Monogram a={a} b={b} size={56} />
        <p className="vv-foot-names">{names}</p>
        <Ornament motif="jasmine" onDark />
        {note ? <p className="vv-foot-note">{note}</p> : null}
      </div>
    </footer>
  );
}
