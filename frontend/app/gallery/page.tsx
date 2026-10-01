import { SectionHeading } from "@/components/vivaha";
import { GalleryPageContent } from "@/components/GalleryPageContent";

export const metadata = {
  title: "Photo Gallery · Prajna weds Subrahmanya",
};

export default function GalleryPage() {
  return (
    <main>
      <section className="vv-section">
        <SectionHeading
          eyebrow="Share the moment"
          title="Photo Gallery"
          motif="lotus"
          intro="Captured something special? Add your photos below and they'll join the shared gallery for everyone to enjoy."
        />

        <GalleryPageContent />
      </section>
    </main>
  );
}
