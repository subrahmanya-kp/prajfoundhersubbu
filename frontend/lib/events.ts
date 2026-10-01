import type { Ceremony, EventDetails } from "./api";

export interface PhaseContent {
  phase: "engagement" | "wedding";
  ceremony: Ceremony | undefined;
  heroEventLabel: string;
  heroDateLabel: string;
  countdownLabel: string;
  countdownDate: string;
}

const FALLBACK_ENGAGEMENT_DATE = "2026-10-12T10:15:00+05:30";
const FALLBACK_WEDDING_DATE = "2026-12-13T10:15:00+05:30";

/**
 * Picks Engagement vs Wedding as the "current" phase for the home page Hero
 * and Countdown: Wedding once the Engagement ceremony's start_time has
 * passed, Engagement before that. Falls back to date-based defaults when
 * ceremonies haven't been seeded in core-service yet, so the home page still
 * renders something sensible.
 */
export function getCurrentPhase(event: EventDetails | null, now: Date = new Date()): PhaseContent {
  const ceremonies = event?.ceremonies ?? [];
  const engagement = ceremonies[0];
  const wedding = ceremonies[1] ?? ceremonies[0];

  const engagementStart = engagement?.start_time ?? FALLBACK_ENGAGEMENT_DATE;
  const isPastEngagement = now.getTime() >= new Date(engagementStart).getTime();

  if (isPastEngagement && wedding) {
    return {
      phase: "wedding",
      ceremony: wedding,
      heroEventLabel: "Wedding",
      heroDateLabel: formatDate(wedding.start_time ?? FALLBACK_WEDDING_DATE),
      countdownLabel: "Counting down to the muhurtha",
      countdownDate: wedding.start_time ?? FALLBACK_WEDDING_DATE,
    };
  }

  return {
    phase: "engagement",
    ceremony: engagement,
    heroEventLabel: "Engagement",
    heroDateLabel: formatDate(engagementStart),
    countdownLabel: "Counting down to the engagement",
    countdownDate: engagementStart,
  };
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

export function formatTime(iso: string): string {
  return new Date(iso)
    .toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    })
    .toLowerCase();
}
