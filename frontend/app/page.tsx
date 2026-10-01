import Link from "next/link";
import { Countdown, EventCard, Footer, Hero, Icon, SectionHeading, VenueCard } from "@/components/vivaha";
import { getEventDetails } from "@/lib/api";
import { formatDate, getCurrentPhase } from "@/lib/events";

export default async function HomePage() {
  const event = await getEventDetails().catch(() => null);
  const phase = getCurrentPhase(event);

  const engagement = event?.ceremonies?.[0];

  return (
    <main>
      <Hero
        bride="Prajna"
        groom="Subrahmanya"
        eyebrow={`Together with their families — ${phase.heroEventLabel}`}
        events={[{ label: phase.heroEventLabel, date: phase.heroDateLabel }]}
        place={phase.ceremony?.venue_name || event?.venue_name || "Bengaluru, Karnataka"}
        primaryCta={{ href: "/rsvp", label: "RSVP" }}
        secondaryCta={{ href: "#venue", label: "Venue & Map" }}
        tertiaryCta={{ href: "/gallery", label: "Upload Photos" }}
      />

      <section className="vv-section" id="countdown">
        <Countdown date={phase.countdownDate} label={phase.countdownLabel} />
      </section>

      <section className="vv-section vv-section-sandal" id="gallery-cta">
        <SectionHeading eyebrow="Share the moment" title="Photo Gallery" motif="lotus" />
        <p style={{ textAlign: "center", color: "var(--ink-muted)", marginBottom: "var(--space-6)" }}>
          Got photos from the celebrations? Upload them here so everyone can enjoy them together.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link href="/gallery" className="vv-btn vv-btn-primary vv-btn-lg">
            <Icon name="lotus" size={18} />
            <span>Upload Photos</span>
          </Link>
        </div>
      </section>

      <section className="vv-section" id="events">
        <SectionHeading eyebrow="Join us" title="The Events" motif="lamp" />
        <div className="vv-ev-grid">
          <EventCard
            tone="engagement"
            name={engagement?.name || "Engagement"}
            description={engagement?.description || "A small ceremony with family and close friends."}
            date={engagement?.start_time ? formatDate(engagement.start_time) : "Monday, 12 October 2026"}
            time="10:15 am"
            venue={engagement?.venue_name || event?.venue_name}
            venueNote={engagement?.address ? `, ${engagement.address}` : undefined}
          />
          <EventCard
            tone="wedding"
            name="Wedding"
            description="Date, time, and venue will be shared shortly."
            date="To be announced"
          />
        </div>
      </section>

      <section className="vv-section vv-section-sandal" id="venue">
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

      <Footer
        a="P"
        b="S"
        names="Prajna & Subrahmanya"
        note="With gratitude for your presence and blessings."
      />
    </main>
  );
}
