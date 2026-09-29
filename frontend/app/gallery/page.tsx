import { Gallery } from "@/components/Gallery";
import { SectionHeading } from "@/components/vivaha";

export const metadata = {
  title: "Photo Gallery · Prajna weds Subrahmanya",
};

export default function GalleryPage() {
  return (
    <main>
      <section className="vv-section">
        <SectionHeading eyebrow="Share the moment" title="Photo Gallery" motif="lotus" />
        <Gallery />
      </section>
    </main>
  );
}
