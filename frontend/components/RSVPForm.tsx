"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Icon } from "@/components/vivaha";
import { submitRSVP } from "@/lib/api";

export function RSVPForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      await submitRSVP({
        name,
        contact,
        attending: attending === "yes",
        guest_count: guestCount,
        message: message || undefined,
      });
      setStatus("done");
    } catch {
      setError("Something went wrong sending your RSVP. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="vv-card">
        <div className="vv-form-success">
          <Icon name="lotus" size={40} style={{ color: "var(--kumkum)" }} />
          <h3>Thank you</h3>
          <p style={{ color: "var(--ink-muted)" }}>
            Your RSVP has been received. We look forward to celebrating with you.
          </p>
          {attending === "yes" ? (
            <>
              <p style={{ color: "var(--ink-muted)", marginTop: "var(--space-2)" }}>
                Have photos from the celebrations? Share them with everyone.
              </p>
              <Link
                href="/gallery"
                className="vv-btn vv-btn-primary vv-btn-lg"
                style={{ marginTop: "var(--space-4)" }}
              >
                <span>Upload Photos</span>
              </Link>
            </>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <form className="vv-card" onSubmit={handleSubmit}>
      <p className="vv-form-note">Please let us know if you&apos;ll be joining the celebrations.</p>
      {error ? <p className="vv-form-error">{error}</p> : null}

      <div className="vv-field">
        <label htmlFor="name">Your name</label>
        <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="vv-field">
        <label htmlFor="contact">Phone or email</label>
        <input id="contact" type="text" required value={contact} onChange={(e) => setContact(e.target.value)} />
      </div>

      <div className="vv-field">
        <label>Will you be attending?</label>
        <div className="vv-radio-row">
          <label>
            <input
              type="radio"
              name="attending"
              checked={attending === "yes"}
              onChange={() => setAttending("yes")}
            />
            Joyfully attending
          </label>
          <label>
            <input
              type="radio"
              name="attending"
              checked={attending === "no"}
              onChange={() => setAttending("no")}
            />
            Regretfully decline
          </label>
        </div>
      </div>

      <div className="vv-field">
        <label htmlFor="guestCount">Number of guests (including yourself)</label>
        <input
          id="guestCount"
          type="number"
          min={1}
          max={20}
          required
          value={guestCount}
          onChange={(e) => setGuestCount(Number(e.target.value))}
        />
      </div>

      <div className="vv-field">
        <label htmlFor="message">Message to the couple (optional)</label>
        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>

      <button type="submit" className="vv-btn vv-btn-primary vv-btn-lg" disabled={status === "submitting"} style={{ width: "100%" }}>
        <span>{status === "submitting" ? "Sending…" : "Send RSVP"}</span>
      </button>
    </form>
  );
}
