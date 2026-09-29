# Prajna weds Subrahmanya — Wedding Website

A Hindu wedding website: guests can view event/venue details, RSVP, and upload
photos to a moderated gallery. Built as two Django microservices plus a
Next.js frontend.

## Services

### `core-service` (Django + DRF, port 8001)

Owns RSVPs and event/venue content.

- **`rsvp` app** — guest RSVP form submissions.
  - `POST /api/v1/rsvp/` — create an RSVP (name, contact, attending, guest
    count, optional message). Public, rate-limited. No public list/read
    endpoint — responses are only viewable via Django admin, to avoid leaking
    guest data.
  - Request/response validation is done with **Pydantic** schemas
    (`rsvp/schemas.py`), not DRF serializers — see `rsvp/views/rsvp_create.py`.
- **`event` app** — venue, map, and ceremony schedule (admin-edited content,
  not user-generated).
  - `GET /api/v1/event/` — returns the singleton `EventDetail` (couple names,
    venue, address, coordinates, map embed/link) plus every `Ceremony` in the
    wedding schedule (e.g. Engagement, Wedding), ordered.
  - Also Pydantic-validated (`event/schemas.py`).
- Health check: `GET /healthz/`.
- Django admin at `/admin/` for managing RSVPs, event details, and ceremonies.

### `media-service` (Django + DRF, port 8002)

Owns photo uploads, storage, and the public gallery.

- **`storage` package** — a storage backend abstraction
  (`storage/backends.py`) so uploads can go to **either AWS S3 or Google
  Drive**, chosen at runtime via the `STORAGE_BACKEND` env var (`s3` or
  `gdrive`). Both backends implement the same `upload()`/`delete()`
  interface, so swapping providers is a config change, not a code change.
- **`gallery` app**
  - `POST /api/v1/photos/upload/` — multipart upload. Validates the file in two
    layers before it ever reaches storage:
    1. **Metadata validation** (Pydantic, `gallery/schemas.py`) — checks the
       declared content type is in the allowed list and the file isn't over
       the size cap.
    2. **Real content sniffing** (`gallery/image_validation.py`, via Pillow)
       — actually opens and decodes the file bytes to confirm it's a genuine
       image, since a client-supplied `Content-Type` header can be spoofed
       (e.g. a script relabeled as `image/jpeg`). A file that fails to decode
       is rejected regardless of what it claims to be. Supports JPEG, PNG,
       WEBP, and HEIC/HEIF (iPhone's default photo format) via the
       `pillow-heif` plugin, registered in `gallery/apps.py`.

    New photos are created with `status=pending` — they are **not** publicly
    visible until approved.
  - `GET /api/v1/photos/` — returns only `status=approved` photos (the
    public, moderated gallery).
  - Moderation happens in Django admin: photos are listed with an
    "Approve selected" / "Reject selected" bulk action. There is no
    self-serve moderation UI by design — a family member reviews and
    approves via `/admin/`.
- Health check: `GET /healthz/`.

### `frontend` (Next.js App Router + TypeScript + Tailwind, deployed on Vercel)

The guest-facing site.

- **Server Components** (`getEventDetails`, used on `/` and `/venue`) call
  `core-service` directly, server-to-server, via the `CORE_BACKEND_URL` env
  var — no browser involved, so no CORS/mixed-content concern.
- **Client Components** (RSVP form, gallery upload/list) call same-origin
  paths — `/api/v1/core/*` and `/api/v1/media/*` — which `next.config.ts`
  rewrites (proxies) to `CORE_BACKEND_URL`/`MEDIA_BACKEND_URL` server-side.
  This keeps the browser talking only to the Vercel origin, which avoids CORS
  entirely and sidesteps HTTPS-page-calling-HTTP-API mixed-content blocking
  when the backends aren't behind their own TLS/domain. See
  [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the full request-path diagram.
- `/` — home page: Hero, countdown to the muhurtha, event cards
  (Engagement/Wedding), venue card, and a gallery teaser.
- `/rsvp` — RSVP form, posts to `core-service` via the proxy.
- `/venue` — full venue details, embedded Google Map, and ceremony schedule.
- `/gallery` — upload widget + grid of approved photos, talks to
  `media-service` via the proxy.
- `components/vivaha/` — the **Vivaha** design system components (Hero,
  Countdown, EventCard, VenueCard, Footer, SectionHeading, Button, Ornament,
  Toran, Monogram, Icon), ported from the design export in `artifacts/` into
  native TypeScript/React. Maroon + temple-gold Kannada-wedding palette,
  temple-arch motifs, Cormorant Garamond + Mulish fonts, light/dark theme
  support via CSS variables.
- `lib/api.ts` — typed fetch helpers for both backend services.

### `artifacts/`

The source design system export ("Vivaha") the frontend was built from —
tokens, component previews, SVG motifs, and content guidelines. Not part of
the running application; kept for reference when extending the frontend.

## Architecture notes

- **No separate API gateway service.** Next.js itself (via `next.config.ts`
  rewrites) is the only thing standing between the browser and the two
  Django services — no extra service to deploy/run. See
  [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the deployment topology and
  request-path diagram.
- **SQLite**, not Postgres — each service has its own SQLite database file.
  In Docker Compose this lives on a named volume per service
  (`core_data`, `media_data`); locally it defaults to a `db.sqlite3` file in
  each service's directory.
- **Migrations are run manually**, not automatically as part of any tooling
  in this repo — run `python manage.py makemigrations && python manage.py
  migrate` yourself in each service after pulling model changes.
- **Validation is Pydantic, not DRF serializers**, in both services'
  request/response handling — see `config/pydantic_utils.py` in each service
  for the shared validation-error-to-HTTP-response helper.
- **App structure convention**: within each Django app, `models/`, `views/`,
  and `tests/` are packages (one class per file, re-exported through
  `__init__.py`), not flat single files.

## Running locally

Each Django service:

```bash
cd core-service   # or media-service
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser   # to access /admin/
python manage.py runserver 8001    # 8002 for media-service
```

In `core-service`, `python manage.py seed_event` populates the singleton
`EventDetail` row (venue name, address, coordinates, Google Maps embed/link)
with the current venue details — see
`event/management/commands/seed_event.py`. Re-run it any time those details
change; it's an upsert (`update_or_create`), safe to run repeatedly.

Frontend:

```bash
cd frontend
npm install
cp .env.local.example .env.local   # points CORE_BACKEND_URL/MEDIA_BACKEND_URL at localhost:8001 / :8002
npm run dev
```

Or via Docker Compose (backend services only; frontend runs separately for
Vercel dev parity):

```bash
cp .env.example .env   # fill in STORAGE_BACKEND + S3/Drive credentials
docker compose up --build
```

## Tests

```bash
cd core-service && python manage.py test
cd media-service && python manage.py test
```
