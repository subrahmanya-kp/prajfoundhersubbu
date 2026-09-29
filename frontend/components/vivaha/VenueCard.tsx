import { Button } from "./Button";
import { Icon } from "./Icon";
import { cx } from "./types";

function Kolam() {
  const g: React.ReactNode[] = [];
  const S = 36;
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 14; x++) {
      const cx0 = x * S + 18;
      const cy0 = y * S + 18;
      g.push(<circle key={`d${x}-${y}`} cx={cx0} cy={cy0} r={1.6} fill="currentColor" />);
      if ((x + y) % 2 === 0) {
        const d = `M${cx0} ${cy0 - 14} Q${cx0 + 14} ${cy0 - 14} ${cx0 + 14} ${cy0} Q${cx0 + 14} ${cy0 + 14} ${cx0} ${cy0 + 14} Q${cx0 - 14} ${cy0 + 14} ${cx0 - 14} ${cy0} Q${cx0 - 14} ${cy0 - 14} ${cx0} ${cy0 - 14}Z`;
        g.push(<path key={`p${x}-${y}`} d={d} fill="none" stroke="currentColor" strokeWidth={1} />);
      }
    }
  }
  return (
    <svg className="kolam" viewBox="0 0 504 324" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g opacity={0.4}>{g}</g>
    </svg>
  );
}

export interface VenueCardProps {
  eyebrow?: string;
  name: string;
  address?: string;
  note?: string;
  mapHref?: string;
  mapLabel?: string;
  className?: string;
}

export function VenueCard({ eyebrow, name, address, note, mapHref, mapLabel, className }: VenueCardProps) {
  return (
    <article className={cx("vv-venue", className)}>
      <div className="vv-venue-art">
        <Kolam />
        <span className="pin">
          <Icon name="pin" size={38} />
        </span>
      </div>
      <div className="vv-venue-body">
        {eyebrow ? <p className="vv-eyebrow">{eyebrow}</p> : null}
        <h3>{name}</h3>
        {address ? <address>{address}</address> : null}
        {note ? <p className="vv-venue-note">{note}</p> : null}
        {mapHref ? (
          <Button variant="primary" href={mapHref} icon="pin" target="_blank" rel="noopener">
            {mapLabel || "Open in Maps"}
          </Button>
        ) : null}
      </div>
    </article>
  );
}
