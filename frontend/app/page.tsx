import Link from "next/link";
import { Countdown, EventCard, Footer, Hero, SectionHeading, VenueCard } from "@/components/vivaha";
import { getEventDetails } from "@/lib/api";

const WEDDING_DATE = "2026-12-13T10:15:00+05:30";

export default async function HomePage() {
  const event = await getEventDetails().catch(() => null);

  const engagement = event?.ceremonies?.[0];
  const wedding = event?.ceremonies?.[1] ?? event?.ceremonies?.[0];

  return (
    <main>
      <Hero
        bride="Prajna"
        groom="Subrahmanya"
        events={[
          { label: "Engagement", date: "Sat, 12 Dec 2026" },
          { label: "Wedding", date: "Sun, 13 Dec 2026" },
        ]}
        place={event?.venue_name || "Bengaluru, Karnataka"}
        primaryCta={{ href: "/rsvp", label: "RSVP" }}
        secondaryCta={{ href: "#venue", label: "Venue & Map" }}
      />

      <section className="vv-section" id="countdown">
        <Countdown date={WEDDING_DATE} label="Counting down to the muhurtha" />
      </section>

      <section className="vv-section vv-section-sandal" id="events">
        <SectionHeading eyebrow="Join us" title="The Events" motif="lamp" />
        <div className="vv-ev-grid">
          <EventCard
            tone="engagement"
            day="Day One"
            name={engagement?.name || "Engagement"}
            description={engagement?.description || "A small ceremony with family and close friends."}
            date="Saturday, 12 December 2026"
            time="10:15 am"
            venue={engagement?.venue_name || event?.venue_name}
            venueNote={engagement?.address ? `, ${engagement.address}` : undefined}
          />
          <EventCard
            tone="wedding"
            day="Day Two"
            name={wedding?.name || "Wedding"}
            description={wedding?.description || "The wedding ceremony, followed by lunch."}
            date="Sunday, 13 December 2026"
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
