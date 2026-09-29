import { Icon } from "./Icon";
import { cx, type IconName } from "./types";

export interface OrnamentProps {
  motif?: IconName;
  onDark?: boolean;
  size?: number;
  className?: string;
}

export function Ornament({ motif = "lamp", onDark, size = 26, className }: OrnamentProps) {
  return (
    <div className={cx("vv-orn", onDark && "vv-orn-light", className)} role="separator">
      <span className="vv-orn-line l" />
      <Icon name={motif} size={size} />
      <span className="vv-orn-line r" />
    </div>
  );
}
