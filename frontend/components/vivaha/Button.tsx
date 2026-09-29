import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Icon } from "./Icon";
import { cx, type IconName } from "./types";

type Variant = "primary" | "secondary" | "gold" | "outline-light";
type Size = "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  className?: string;
  children?: ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps | "href"> & { href?: undefined };
type ButtonAsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps | "href"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button(props: ButtonProps) {
  const { variant = "primary", size, icon, href, children, className, ...rest } = props;
  const cls = cx("vv-btn", `vv-btn-${variant}`, size === "lg" && "vv-btn-lg", className);
  const content = (
    <>
      {icon ? <Icon name={icon} size={18} /> : null}
      <span>{children}</span>
    </>
  );
  if (href) {
    return (
      <a href={href} className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
