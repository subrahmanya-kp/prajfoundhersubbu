import { Ornament } from "./Ornament";
import { cx, type IconName } from "./types";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  motif?: IconName;
  ornament?: boolean;
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  motif = "jasmine",
  ornament = true,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <header className={cx("vv-sh", className)}>
      {eyebrow ? <p className="vv-eyebrow">{eyebrow}</p> : null}
      <h2 id={id}>{title}</h2>
      {intro ? <p className="intro">{intro}</p> : null}
      {ornament ? <Ornament motif={motif} /> : null}
    </header>
  );
}
