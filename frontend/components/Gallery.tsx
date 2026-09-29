"use client";

import { useEffect, useRef, useState } from "react";
import { getApprovedPhotos, uploadPhoto, type Photo } from "@/lib/api";

export function Gallery() {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [uploaderName, setUploaderName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      await uploadPhoto(file, uploaderName || undefined);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setRefreshKey((k) => k + 1);
    } catch {
      setError("Upload failed. Please try a smaller image or try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div className="vv-card" style={{ maxWidth: 480 }}>
        <p className="vv-form-note">Uploaded photos appear here once reviewed by the family.</p>
        {error ? <p className="vv-form-error">{error}</p> : null}
        <div className="vv-field">
          <label htmlFor="uploaderName">Your name (optional)</label>
          <input
            id="uploaderName"
            type="text"
            value={uploaderName}
            onChange={(e) => setUploaderName(e.target.value)}
          />
        </div>
        <div className="vv-upload-row">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </div>
        {uploading ? <p className="vv-form-note" style={{ marginTop: "var(--space-3)" }}>Uploading…</p> : null}
      </div>

      {loading ? (
        <p className="vv-gallery-empty">Loading gallery…</p>
      ) : photos.length === 0 ? (
        <p className="vv-gallery-empty">No photos yet — be the first to share one.</p>
      ) : (
        <div className="vv-gallery-grid">
          {photos.map((photo) => (
            <div className="vv-gallery-item" key={photo.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.image_url} alt={photo.uploader_name ? `Photo by ${photo.uploader_name}` : "Wedding photo"} loading="lazy" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
