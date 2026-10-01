import { Fragment } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { Ornament } from "./Ornament";
import { Toran } from "./Toran";
import { cx, type Link } from "./types";

export interface HeroProps {
  bride?: string;
  groom?: string;
  invocation?: string | false;
  eyebrow?: string;
  joiner?: string;
  intro?: string;
  events?: { label: string; date: string }[];
  place?: string;
  primaryCta?: Link;
  secondaryCta?: Link;
  tertiaryCta?: Link;
  toranCount?: number;
  id?: string;
  className?: string;
}

export function Hero({
  bride = "Prajna",
  groom = "Subrahmanya",
  invocation,
  eyebrow = "Together with their families",
  joiner = "weds",
  intro,
  events = [],
  place,
  primaryCta,
  secondaryCta,
  tertiaryCta,
  toranCount = 16,
  id,
  className,
}: HeroProps) {
  return (
    <section className={cx("vv-hero vv-on-maroon", className)} id={id} aria-label="Invitation">
      <Toran count={toranCount} />
      <div className="vv-hero-frame">
        <span className="vv-hero-finial" aria-hidden="true">
          <Icon name="kalash" size={30} />
        </span>
        {invocation === false ? null : (
          <p className="vv-hero-inv">{invocation || "|| Sri Ganeshaya Namaha ||"}</p>
        )}
        <p className="vv-eyebrow">{eyebrow}</p>
        <h1 className="vv-hero-names">
          {bride} <span className="amp">{joiner}</span> {groom}
        </h1>
        {intro ? <p className="vv-hero-intro">{intro}</p> : null}
        <Ornament motif="lamp" onDark />
        {events.length > 0 ? (
          <ul className="vv-hero-dates">
            {events.map((e, i) => (
              <Fragment key={i}>
                {i > 0 ? <li className="sep" aria-hidden="true" /> : null}
                <li>
                  <span className="what">{e.label}</span>
                  <span className="when">{e.date}</span>
                </li>
              </Fragment>
            ))}
          </ul>
        ) : null}
        {place ? <p className="vv-hero-place">{place}</p> : null}
        {primaryCta || secondaryCta || tertiaryCta ? (
          <div className="vv-hero-ctas">
            {primaryCta ? (
              <Button variant="gold" size="lg" href={primaryCta.href}>
                {primaryCta.label}
              </Button>
            ) : null}
            {secondaryCta ? (
              <Button variant="outline-light" size="lg" href={secondaryCta.href}>
                {secondaryCta.label}
              </Button>
            ) : null}
            {tertiaryCta ? (
              <Button variant="outline-light" size="lg" href={tertiaryCta.href} icon="lotus">
                {tertiaryCta.label}
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
