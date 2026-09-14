# Deploy

Repo: https://github.com/Zahid8/wedding_card · Next.js 16 · deploys on Vercel with zero config.

## 1. Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build check
```

## 2. Push changes

```bash
git add -A
git commit -m "your message"
git push origin main
```

Vercel redeploys automatically on every push to `main`.

## 3. First-time Vercel setup

1. Go to https://vercel.com/new and import `Zahid8/wedding_card`.
2. Framework is auto-detected as **Next.js**. Leave build settings default.
3. Click **Deploy**. First build takes about 2 minutes.
4. Open the `*.vercel.app` URL. Set the same URL as `site.url` in `content/site.ts` so share previews resolve, then push.

## 4. RSVP storage (optional)

Without any env vars, RSVPs are accepted and logged to Vercel runtime logs (Project → Logs). To persist them, add env vars under **Project → Settings → Environment Variables** and redeploy.

**Option A: Supabase (preferred)**

| Variable | Value |
|---|---|
| `SUPABASE_URL` | `https://<project>.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | service role key from Project Settings → API |
| `SUPABASE_RSVP_TABLE` | `rsvps` (default) |

Create the table in the Supabase SQL editor:

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

**Option B: Webhook (Google Sheets via Zapier or Make)**

| Variable | Value |
|---|---|
| `RSVP_WEBHOOK_URL` | the webhook URL |

Ignored if Supabase vars are set. Payload is JSON with `name`, `phone`, `attending`, `guests`, `dietary`, `timestamp`.

## 5. Custom domain (optional)

**Project → Settings → Domains → Add**, then create the DNS records Vercel shows at your registrar. HTTPS is automatic.

## 6. Editing content

All text, names, dates, venues, phone, and map links live in `content/site.ts`. Artwork is in `public/art/`. Edit, commit, push.
