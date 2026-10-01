"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/vivaha";
import { ApiError, uploadPhoto } from "@/lib/api";

export interface PhotoUploadCardProps {
  onUploaded: () => void;
}

export function PhotoUploadCard({ onUploaded }: PhotoUploadCardProps) {
  const [uploaderName, setUploaderName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ done: number; total: number } | null>(null);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [selectedFileNames, setSelectedFileNames] = useState<string[]>([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setSelectedFileNames(files.map((f) => f.name));
    setUploading(true);
    setUploadedCount(0);
    setError("");

    let succeeded = 0;
    let failed = 0;
    let throttled = false;

    for (let i = 0; i < files.length; i++) {
      setUploadProgress({ done: i, total: files.length });
      try {
        await uploadPhoto(files[i], uploaderName || undefined);
        succeeded++;
      } catch (err) {
        failed++;
        if (err instanceof ApiError && err.status === 429) {
          throttled = true;
          break; // stop the batch — retrying into the same limit just wastes time
        }
      }
    }

    setUploadProgress({ done: files.length, total: files.length });
    setUploadedCount(succeeded);
    if (throttled) {
      setError(
        succeeded > 0
          ? `You're uploading too quickly. ${succeeded} of ${files.length} photos went through — please wait a minute before uploading the rest.`
          : "You're uploading too quickly. Please wait a minute and try again."
      );
    } else if (failed > 0 && succeeded === 0) {
      setError("Upload failed. Please try smaller images or try again.");
    } else if (failed > 0) {
      setError(`${failed} of ${files.length} photos failed to upload. The rest went through fine.`);
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
    setSelectedFileNames([]);
    setUploading(false);
    if (succeeded > 0) onUploaded();
  }

  return (
    <div className="vv-card" style={{ maxWidth: 480 }}>
      <p className="vv-eyebrow" style={{ textAlign: "center", marginBottom: "var(--space-2)" }}>
        Add photos
      </p>
      <p className="vv-form-note">JPEG, PNG, WEBP, or HEIC — up to 15 MB each. Pick as many as you like.</p>
      {error ? <p className="vv-form-error">{error}</p> : null}

      <div className="vv-field">
        <label htmlFor="uploaderName">Your name (optional)</label>
        <input
          id="uploaderName"
          type="text"
          placeholder="So we know who to thank"
          value={uploaderName}
          onChange={(e) => setUploaderName(e.target.value)}
        />
      </div>

      <div className="vv-field">
        <label htmlFor="photoFile">Choose photos to upload</label>
        <div className="vv-upload-row">
          <button
            type="button"
            className="vv-btn vv-btn-secondary"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            <span>Choose Photos</span>
          </button>
          <span className="vv-upload-filename">
            {selectedFileNames.length > 0
              ? `${selectedFileNames.length} photo${selectedFileNames.length > 1 ? "s" : ""} selected`
              : "No photos chosen"}
          </span>
          <input
            ref={fileInputRef}
            id="photoFile"
            type="file"
            multiple
            className="vv-visually-hidden"
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </div>
      </div>

      {uploading && uploadProgress ? (
        <p className="vv-form-note" style={{ marginTop: "var(--space-3)" }}>
          Uploading {Math.min(uploadProgress.done + 1, uploadProgress.total)} of {uploadProgress.total}…
        </p>
      ) : !uploading && uploadedCount > 0 ? (
        <p
          className="vv-form-note"
          style={{
            marginTop: "var(--space-3)",
            color: "var(--leaf)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--space-2)",
          }}
        >
          <Icon name="lotus" size={16} />
          {uploadedCount === 1
            ? "Thanks! Your photo is waiting for a quick review before it appears below."
            : `Thanks! Your ${uploadedCount} photos are waiting for a quick review before they appear below.`}
        </p>
      ) : null}
    </div>
  );
}
