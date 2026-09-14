# Deploy to Vercel

1. Push to GitHub: `git init && git add . && git commit -m "init" && git remote add origin <your-repo> && git push -u origin main`
2. Go to https://vercel.com/new and import the repo.
3. Framework preset auto-detects **Next.js** — leave all build settings default.
4. Click **Deploy**. Wait ~2 minutes for the first build.
5. Open the assigned `*.vercel.app` URL.

## Optional: persist RSVPs

Add env vars in **Project → Settings → Environment Variables**, then redeploy.

**Supabase** (preferred):
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_RSVP_TABLE` (default `rsvps`)

Create the table:
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

**Webhook** (Zapier / Make / Google Sheets): `RSVP_WEBHOOK_URL`

Without either, RSVPs are accepted and logged to Vercel runtime logs.

## Custom domain

**Project → Settings → Domains → Add**, then update DNS with the records Vercel shows.
