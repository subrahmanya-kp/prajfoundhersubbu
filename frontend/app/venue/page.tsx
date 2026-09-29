import { SectionHeading, VenueCard } from "@/components/vivaha";
import { getEventDetails } from "@/lib/api";

export const metadata = {
  title: "Venue · Prajna weds Subrahmanya",
};

export default async function VenuePage() {
  const event = await getEventDetails().catch(() => null);

  return (
    <main>
      <section className="vv-section">
        <SectionHeading eyebrow="Getting there" title="Venue & Map" motif="jasmine" />
        <VenueCard
          eyebrow="Wedding & Reception"
          name={event?.venue_name || "Venue to be announced"}
          address={event?.address}
          note={event?.description}
          mapHref={event?.map_link}
          mapLabel="Open in Maps"
        />
        {event?.map_embed_url ? (
          <div
            style={{
              maxWidth: 880,
              margin: "var(--space-8) auto 0",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              border: "1px solid var(--line)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <iframe
              src={event.map_embed_url}
              width="100%"
              height="360"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Venue map"
            />
          </div>
        ) : null}

        {event?.ceremonies?.length ? (
          <div style={{ maxWidth: 880, margin: "var(--space-12) auto 0" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 28 }}>Schedule</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {event.ceremonies.map((c) => (
                <li
                  key={c.id}
                  style={{
                    padding: "var(--space-4)",
                    background: "var(--ivory-raised)",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <strong>{c.name}</strong>
                  <div style={{ color: "var(--ink-muted)", fontSize: 14 }}>
                    {new Date(c.start_time).toLocaleString("en-IN", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                    {c.venue_name ? ` · ${c.venue_name}` : ""}
                  </div>
                  {c.description ? <p style={{ margin: "var(--space-2) 0 0" }}>{c.description}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </main>
  );
}
