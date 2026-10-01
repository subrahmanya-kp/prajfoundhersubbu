import Link from "next/link";
import { Countdown, EventCard, Footer, Hero, SectionHeading, VenueCard } from "@/components/vivaha";
import { getEventDetails } from "@/lib/api";
import { formatDate } from "@/lib/events";

export const metadata = {
  title: "Wedding · Prajna weds Subrahmanya",
};

const FALLBACK_WEDDING_DATE = "2026-12-13T10:15:00+05:30";

export default async function WeddingPage() {
  const event = await getEventDetails().catch(() => null);

  const engagement = event?.ceremonies?.[0];
  const wedding = event?.ceremonies?.[1] ?? event?.ceremonies?.[0];
  const weddingDate = wedding?.start_time ?? FALLBACK_WEDDING_DATE;

  return (
    <main>
      <Hero
        bride="Prajna"
        groom="Subrahmanya"
        eyebrow="Together with their families — Wedding"
        events={[
          {
            label: "Engagement",
            date: engagement?.start_time ? formatDate(engagement.start_time) : "Monday, 12 October 2026",
          },
          { label: "Wedding", date: formatDate(weddingDate) },
        ]}
        place={wedding?.venue_name || event?.venue_name || "Bengaluru, Karnataka"}
        primaryCta={{ href: "/rsvp", label: "RSVP" }}
        secondaryCta={{ href: "#venue", label: "Venue & Map" }}
      />

      <section className="vv-section" id="countdown">
        <Countdown date={weddingDate} label="Counting down to the muhurtha" />
      </section>

      <section className="vv-section vv-section-sandal" id="the-wedding">
        <SectionHeading eyebrow="Join us" title="The Wedding" motif="kalash" />
        <div className="vv-ev-grid">
          <EventCard
            tone="wedding"
            name={wedding?.name || "Wedding"}
            description={wedding?.description || "The wedding ceremony, followed by lunch."}
            date={formatDate(weddingDate)}
            time="10:15 am"
            timeNote=" — please be seated by 9:45 am"
            venue={wedding?.venue_name || event?.venue_name}
            venueNote={wedding?.address ? `, ${wedding.address}` : undefined}
          />
        </div>
      </section>

      <section className="vv-section" id="venue">
        <SectionHeading eyebrow="Getting there" title="Venue" motif="jasmine" />
        <VenueCard
          eyebrow="Wedding & Reception"
          name={event?.venue_name || "Venue to be announced"}
          address={event?.address}
          note={event?.description}
          mapHref={event?.map_link}
          mapLabel="Open in Maps"
        />
      </section>

      <section className="vv-section" id="gallery-cta">
        <SectionHeading eyebrow="Share the moment" title="Photo Gallery" motif="lotus" />
        <p style={{ textAlign: "center", color: "var(--ink-muted)", marginBottom: "var(--space-6)" }}>
          Upload your photos from the celebrations and browse the shared gallery.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link href="/gallery" className="vv-btn vv-btn-primary vv-btn-lg">
            <span>Go to Gallery</span>
          </Link>
        </div>
      </section>

      <Footer
        a="P"
        b="S"
        names="Prajna & Subrahmanya"
        note="With gratitude for your presence and blessings."
      />
    </main>
  );
}
