import { RSVPForm } from "@/components/RSVPForm";
import { SectionHeading } from "@/components/vivaha";

export const metadata = {
  title: "RSVP · Prajna weds Subrahmanya",
};

export default function RSVPPage() {
  return (
    <main>
      <section className="vv-section">
        <SectionHeading eyebrow="Kindly respond" title="RSVP" motif="rings" />
        <RSVPForm />
      </section>
    </main>
  );
}
