import { Icon } from "./Icon";
import { cx, type IconName } from "./types";

export interface EventCardProps {
  tone?: "engagement" | "wedding";
  day?: string;
  name: string;
  description?: string;
  date?: string;
  time?: string;
  timeNote?: string;
  venue?: string;
  venueNote?: string;
  icon?: IconName;
  className?: string;
}

export function EventCard({
  tone = "wedding",
  day,
  name,
  description,
  date,
  time,
  timeNote,
  venue,
  venueNote,
  icon,
  className,
}: EventCardProps) {
  return (
    <article className={cx("vv-ev", `vv-ev-${tone}`, className)}>
      <div className="vv-ev-head">
        <Icon name={icon || (tone === "engagement" ? "rings" : "kalash")} size={40} />
        {day ? <span className="vv-ev-day">{day}</span> : null}
        <h3 className="vv-ev-name">{name}</h3>
      </div>
      <div className="vv-ev-body">
        {description ? <p className="vv-ev-desc">{description}</p> : null}
        {date ? (
          <p className="vv-ev-meta">
            <Icon name="calendar" size={18} />
            <span>
              <strong>{date}</strong>
            </span>
          </p>
        ) : null}
        {time ? (
          <p className="vv-ev-meta">
            <Icon name="clock" size={18} />
            <span>
              <strong>{time}</strong>
              {timeNote}
            </span>
          </p>
        ) : null}
        {venue ? (
          <p className="vv-ev-meta">
            <Icon name="pin" size={18} />
            <span>
              <strong>{venue}</strong>
              {venueNote}
            </span>
          </p>
        ) : null}
      </div>
    </article>
  );
}
