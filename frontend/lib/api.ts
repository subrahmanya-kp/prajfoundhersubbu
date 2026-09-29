// Server Components call the backends directly (server-to-server; no browser
// involved, so no CORS or mixed-content concern). Client Components go through
// the same-origin `/api/v1/core/*` and `/api/v1/media/*` rewrites in
// next.config.ts, which proxy to these same backends — that keeps the
// browser's requests on the Vercel origin, avoiding CORS and (https page →
// http API) mixed-content issues when the backends aren't behind a
// domain/TLS of their own.
const CORE_BACKEND_URL = process.env.CORE_BACKEND_URL || "http://localhost:8001";

const CORE_PROXY_PATH = "/api/v1/core";
const MEDIA_PROXY_PATH = "/api/v1/media";

export interface Ceremony {
  id: number;
  name: string;
  start_time: string;
  venue_name: string;
  address: string;
  description: string;
  order: number;
}

export interface EventDetails {
  couple_names: string;
  venue_name: string;
  address: string;
  latitude: string | null;
  longitude: string | null;
  map_embed_url: string;
  map_link: string;
  description: string;
  ceremonies: Ceremony[];
}

export interface RSVPPayload {
  name: string;
  contact: string;
  attending: boolean;
  guest_count: number;
  message?: string;
}

export interface RSVPResponse extends RSVPPayload {
  id: number;
  created_at: string;
}

export interface Photo {
  id: number;
  image_url: string;
  uploader_name: string;
  status: "pending" | "approved" | "rejected";
  uploaded_at: string;
}

async function parseJsonOrThrow(res: Response) {
  const text = await res.text();
  let data: unknown;
  try {
    data = text ? JSON.parse(text) : undefined;
  } catch {
    data = undefined;
  }
  if (!res.ok) {
    const message =
      data && typeof data === "object" ? JSON.stringify(data) : text || res.statusText;
    throw new Error(message);
  }
  return data;
}

/** Server Components only (e.g. app/page.tsx, app/venue/page.tsx). */
export async function getEventDetails(): Promise<EventDetails> {
  const res = await fetch(`${CORE_BACKEND_URL}/api/v1/event/`, { cache: "no-store" });
  return (await parseJsonOrThrow(res)) as EventDetails;
}

/** Client Components only — goes through the same-origin proxy rewrite. */
export async function submitRSVP(payload: RSVPPayload): Promise<RSVPResponse> {
  const res = await fetch(`${CORE_PROXY_PATH}/rsvp/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return (await parseJsonOrThrow(res)) as RSVPResponse;
}

/** Client Components only — goes through the same-origin proxy rewrite. */
export async function getApprovedPhotos(): Promise<Photo[]> {
  const res = await fetch(`${MEDIA_PROXY_PATH}/photos/`, { cache: "no-store" });
  return (await parseJsonOrThrow(res)) as Photo[];
}

/** Client Components only — goes through the same-origin proxy rewrite. */
export async function uploadPhoto(file: File, uploaderName?: string): Promise<Photo> {
  const formData = new FormData();
  formData.append("file", file);
  if (uploaderName) formData.append("uploader_name", uploaderName);

  const res = await fetch(`${MEDIA_PROXY_PATH}/photos/upload/`, {
    method: "POST",
    body: formData,
  });
  return (await parseJsonOrThrow(res)) as Photo;
}
