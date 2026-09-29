import type * as React from 'react';
export type IconName = 'lamp' | 'kalash' | 'jasmine' | 'lotus' | 'rings' | 'calendar' | 'clock' | 'pin';
export interface Link { href: string; label: string }
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'primary' | 'secondary' | 'gold' | 'outline-light'; size?: 'md' | 'lg'; icon?: IconName; href?: string }
export declare function Button(props: ButtonProps): React.ReactElement;
export declare function Icon(props: { name: IconName; size?: number; label?: string; className?: string; style?: React.CSSProperties }): React.ReactElement;
export declare function Ornament(props: { motif?: IconName; onDark?: boolean; size?: number }): React.ReactElement;
export declare function Toran(props: { count?: number; className?: string }): React.ReactElement;
export declare function Monogram(props: { a?: string; b?: string; size?: number }): React.ReactElement;
export declare function SectionHeading(props: { eyebrow?: string; title: string; intro?: string; motif?: IconName; ornament?: boolean; id?: string }): React.ReactElement;
export interface HeroProps { bride: string; groom: string; invocation?: string | false; eyebrow?: string; joiner?: string; intro?: string; events?: { label: string; date: string }[]; place?: string; primaryCta?: Link; secondaryCta?: Link; toranCount?: number; id?: string }
export declare function Hero(props: HeroProps): React.ReactElement;
export declare function Countdown(props: { date: string; label?: string; doneText?: string }): React.ReactElement;
export interface EventCardProps { tone?: 'engagement' | 'wedding'; day?: string; name: string; description?: string; date?: string; time?: string; timeNote?: string; venue?: string; venueNote?: string; icon?: IconName }
export declare function EventCard(props: EventCardProps): React.ReactElement;
export declare function VenueCard(props: { eyebrow?: string; name: string; address?: string; note?: string; mapHref?: string; mapLabel?: string }): React.ReactElement;
export declare function Footer(props: { a?: string; b?: string; names?: string; note?: string; toranCount?: number }): React.ReactElement;
declare global { interface Window { Vivaha: { Button: typeof Button; Icon: typeof Icon; Ornament: typeof Ornament; Toran: typeof Toran; Monogram: typeof Monogram; SectionHeading: typeof SectionHeading; Hero: typeof Hero; Countdown: typeof Countdown; EventCard: typeof EventCard; VenueCard: typeof VenueCard; Footer: typeof Footer } } }
