"use client";

import { useEffect, useState } from "react";
import { getApprovedPhotos, type Photo } from "@/lib/api";

export interface GalleryProps {
  refreshKey?: number;
}

export function Gallery({ refreshKey = 0 }: GalleryProps) {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [error, setError] = useState("");
  const loading = photos === null;

  useEffect(() => {
    let cancelled = false;
    getApprovedPhotos()
      .then((data) => {
        if (!cancelled) setPhotos(data);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load the gallery right now.");
      });
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  if (loading) {
    return <p className="vv-gallery-empty">Loading gallery…</p>;
  }

  if (error && photos === null) {
    return <p className="vv-gallery-empty">{error}</p>;
  }

  if (photos.length === 0) {
    return <p className="vv-gallery-empty">No photos yet — be the first to share one.</p>;
  }

  return (
    <div className="vv-gallery-grid">
      {photos.map((photo) => (
        <div className="vv-gallery-item" key={photo.id}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo.image_url} alt={photo.uploader_name ? `Photo by ${photo.uploader_name}` : "Wedding photo"} loading="lazy" />
        </div>
      ))}
    </div>
  );
}
