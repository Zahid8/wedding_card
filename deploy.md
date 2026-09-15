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

## 4. Custom domain (optional)

**Project → Settings → Domains → Add**, then create the DNS records Vercel shows at your registrar. HTTPS is automatic.

## 5. WhatsApp / social preview

The link preview image is `app/opengraph-image.jpg` (1200×630, under 300 KB as WhatsApp requires). Replace that file (and `app/twitter-image.jpg`) to change it. On Vercel the absolute URL is taken from the production deployment host automatically; to force a specific domain set `NEXT_PUBLIC_SITE_URL=https://your-domain`. WhatsApp caches previews per URL for a day or more, so test with a fresh query string such as `?v=2` after redeploying.

## 6. Editing content

- Text, names, dates, venues, phone, map links: `content/site.ts`.
- Artwork (bride, groom, background): `content/art.ts`. Drop new files in `public/art/`, update the three entries (path, pixel size, which way the character faces), then run `python3 scripts/make-og.py` to refresh the WhatsApp preview. Commit and push.
