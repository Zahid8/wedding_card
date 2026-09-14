# Farhat &amp; Saif — Wedding Website

A six-page watercolor wedding invitation site built from original artwork
(see `assets/`). Next.js 15 App Router · Tailwind CSS v4 · Framer Motion · Zod.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it into Vercel — the framework auto-detects as **Next.js**, no
   overrides needed.
3. (Optional) Add the environment variables below to persist RSVPs. Without
   them, the API route accepts submissions and logs to the server console so
   the site still works out of the box.

### Optional environment variables

| Var | Purpose |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-only) |
| `SUPABASE_RSVP_TABLE` | Table name (default `rsvps`) |
| `RSVP_WEBHOOK_URL` | Fallback POST target (Zapier / Make / Sheets webhook) |

If both Supabase envs are set, the site writes to a table shaped like:

```sql
create table rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text,
  attending text not null,
  guests text not null,
  dietary text
);
```

If only `RSVP_WEBHOOK_URL` is set, submissions POST there instead.

## Editing content

All copy lives in [`content/site.ts`](./content/site.ts) — names, date,
venue, schedule, hotels, FAQs. Text edits never touch components.

## Assets

Watercolor source PNGs are in [`assets/`](./assets). The deployed art lives
in `public/art/`. Swap any file there and rebuild.
