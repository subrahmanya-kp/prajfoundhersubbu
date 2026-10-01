"use client";

import { useState } from "react";
import { Icon } from "@/components/vivaha";
import { Gallery } from "@/components/Gallery";
import { PhotoUploadCard } from "@/components/PhotoUploadCard";

export function GalleryPageContent() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <div className="vv-gallery-intro">
        <ol className="vv-steps">
          <li>
            <span className="vv-steps-icon">
              <Icon name="lotus" size={22} />
            </span>
            <div>
              <strong>Choose your photos</strong>
              <p>Tap &ldquo;Choose Photos&rdquo; and pick one or several from your phone or computer.</p>
            </div>
          </li>
          <li>
            <span className="vv-steps-icon">
              <Icon name="calendar" size={22} />
            </span>
            <div>
              <strong>They&apos;re reviewed first</strong>
              <p>Every photo is briefly checked by the family before it appears in the gallery below.</p>
            </div>
          </li>
          <li>
            <span className="vv-steps-icon">
              <Icon name="rings" size={22} />
            </span>
            <div>
              <strong>They join the gallery</strong>
              <p>Once approved, your photos show up here for all the guests to see.</p>
            </div>
          </li>
        </ol>

        <PhotoUploadCard onUploaded={() => setRefreshKey((k) => k + 1)} />
      </div>

      <Gallery refreshKey={refreshKey} />
    </>
  );
}
