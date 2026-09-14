# Wedding Website — Implementation Plan

Reference site: https://v0-noor-and-shahid-marriage-invitat.vercel.app
Goal: rebuild the same six-page wedding invitation site with the same content, but with an original design built from our own watercolor video artwork (see §3). All copy below is the reference's exact text and is a placeholder to be edited later.

---

## 1. Reference Audit (what they built)

**Stack observed:** Next.js App Router (RSC payload present), Tailwind CSS v4 (`lab()` colors in CSS vars), shadcn/ui (Accordion, Button, Input, Select, RadioGroup), lucide-react icons, Vercel Analytics, `next/font` (Cormorant Garamond, Montserrat, Amiri).

**Their palette (do NOT copy — listed so we deliberately diverge):**

| Token | Value |
|---|---|
| background | `#fcf7f6` (blush off-white) |
| foreground | `#2b1e1c` |
| primary | `#ac505b` (dusty rose) |
| secondary | `#f8ebe9` |
| accent | `#f9bf9f` (peach) |
| border | `#ebd9d6` |

**Their layout patterns:** fixed translucent navbar with "N ♥ S" monogram; hero text-only with countdown; centered section headings with `— • —` divider; alternating left/right vertical timeline with circle icon nodes; card-grid; accordion FAQ; single-column RSVP form; simple footer.

**Weaknesses to beat:** no hero imagery, flat white cards, generic shadcn look, no motion, no photo gallery, no Urdu/Arabic calligraphic treatment beyond one line, RSVP not persisted, hardcoded map embed with dummy coordinates, FAQ says arrival 4 PM while schedule says 8 PM (inconsistency to fix).

---

## 2. Our Stack

- **Next.js 15** (App Router, TypeScript), deployed on Vercel
- **Tailwind CSS v4** with custom design tokens in `app/globals.css`
- **shadcn/ui** only for primitives (accordion, form inputs, dialog) — heavily restyled
- **Framer Motion** — paper reveals, Ken-Burns drift, cutout parallax, countdown roll
- **lucide-react** icons
- **next/font/google**: Pinyon Script, Cormorant Garamond, Jost, Amiri (see §3)
- **RSVP persistence**: Supabase table or Google Sheets via a Route Handler (`app/api/rsvp/route.ts`), with Zod validation and Resend confirmation email (optional)
- **Content in one file**: `content/site.ts` — every string, date, hotel, FAQ lives here so text edits never touch components

---

## 3. Design Direction — "Watercolor Garden Nikah" (from the video artwork)

Source of truth for the look: the watercolor Canva video `Copy of Pink White and Brown Watercolor Wedding Mobile Video.mp4` (480×854, 22 s, no audio) and the three transparent PNG cutouts (groom, bride with roses, bride with lily). Extracted frames live in `assets/frames/`, cutouts in `assets/source/`.

**What the artwork gives us:** hand-painted watercolor on cold-press paper; a canvas glamping tent with wooden chairs; an olive tree; a rustic wooden arch with sheer white drapes on a grass floor; a faceless groom in a dark-brown jacket, white shirt, coral bow tie and blush trousers; a faceless bride in a blush hijab and gown holding a bouquet. Text in the video: names in a flowing calligraphy script, everything else in a light uppercase serif with wide tracking and thin rules. Frames are separated by torn/deckled paper edges.

**Do-not-copy checklist (vs the reference site, applies to every page):** no blush/rose flat UI palette, no circular portrait crops with a border, no centered-heading + hairline-dot-hairline divider, no white shadcn cards on tinted background, no alternating left/right timeline with circle icon nodes, no four-tile countdown, no "N ♥ S" navbar monogram, no default shadcn accordion look. If a section starts to resemble theirs, change its structure, not just its colors.

### Color tokens (`globals.css`, `@theme`) — sampled from the frames

| Token | Value | Sampled from | Use |
|---|---|---|---|
| `--color-paper` | `#f5f4ed` | blank paper areas | page background |
| `--color-paper-wash` | `#e9e6da` | faint sky wash | alternate sections |
| `--color-sage` | `#a6ad97` | olive leaves (light) | tinted panels, icons |
| `--color-olive` | `#6f7a58` | olive leaves (dark) | secondary text accents, links |
| `--color-sand` | `#dcc9b0` | tent canvas (light) | card fills |
| `--color-tan` | `#a1795a` | tent canvas (shadow) | rules, borders, labels |
| `--color-bark` | `#57341e` | chairs, arch wood | headings, buttons |
| `--color-ink` | `#33231c` | groom jacket shadow | body text |
| `--color-blush` | `#fcd7cf` | bride gown | soft highlights, hover fills |
| `--color-coral` | `#e8877a` | bow tie, bouquet roses | the single "pop" accent: CTA, active states |
| `--color-drape` | `#ebebe8` | sheer curtain | overlays, glass panels |

Rule: paper + bark + tan do the work; sage/olive for nature; blush for warmth; coral only for one CTA per screen.

### Typography (match the video's type)

| Role | Font (Google) | Notes |
|---|---|---|
| Names / large script | **Pinyon Script** (closest to the video's calligraphy) — fallback **Great Vibes** | Only for names, the "&", and one hero line |
| Headings & labels | **Cormorant Garamond** 300/400, uppercase, `tracking-[0.18em]` | Mirrors "TOGETHER WITH THEIR FAMILIES" style |
| Body | **Cormorant Garamond** 400 italic for quotes, **Jost** 300/400 for paragraphs and UI | Jost keeps forms legible |
| Arabic (Bismillah) | **Amiri** | painted-ink brown, not gold |
| Numerals (date, countdown) | **Cormorant Garamond** 300 at display size, tan color | echoes the big "25 / 26" in the video |

### Surfaces & textures (this is what makes it feel painted, not "themed")
- **Paper texture** everywhere: tileable cold-press paper PNG (`public/textures/paper.png`) at 100% opacity as the body background, plus a `mix-blend-mode: multiply` grain layer on cards.
- **Deckled / torn edges** between sections: SVG `clip-path` masks with irregular edges (`public/masks/torn-top.svg`, `torn-bottom.svg`), exactly like the frame transitions in the video. No straight section boundaries on the home page.
- **Watercolor washes** as section backgrounds: soft sage/sand blobs (pre-rendered PNGs with alpha, or CSS radial-gradients + `filter: blur`) sitting behind headings.
- **Painted rules**: dividers are short brush-stroke SVGs in tan, not 1px lines.
- **Foliage**: olive-branch cutouts (from the frames, background removed) peeking in from section corners, `object-fit: contain`, slight parallax.
- **Cards**: sand-tinted paper with a hand-drawn (slightly wobbly) border SVG; no shadows; hover → blush wash fades in.
- **Buttons**: bark fill with paper text, ends slightly rounded like a stamp; primary CTA uses coral. Hover → border-only with a brush underline.
- **Icons**: lucide at `stroke-width: 1.25`, colored tan; or tiny watercolor glyphs (leaf, ring, tent, chair) where we have art.

### Motion
- **Ken-Burns drift** on the painted scenes (scale 1 → 1.06 over 20 s), as in the video — only inside the 9:16 stage, never full-bleed.
- **Paper reveal**: sections enter by the torn edge sliding up 24 px + fade (Framer `whileInView`).
- **Cutouts float**: bride and groom cutouts drift ±6 px on scroll (parallax), never bounce.
- **Text**: calligraphy names "write in" via SVG stroke `pathLength` on the hero only; everything else fades.
- Respect `prefers-reduced-motion` (drift off, reveals instant).

---

---

## 4. Site Map & Routes

```
/            Home ("A Painted Invitation": arch hero, sentence countdown, meet the couple, day strip, venue scene, contents, RSVP band)
/our-story   Couple intro + journey timeline + quote
/schedule    Date/venue card, order of events, dress code
/rsvp        Form → API → DB, success state
/travel      Venue + map, getting there, hotels, assistance
/faqs        Accordion + contact card
```

Shared: `Navbar`, `Footer`, `SectionHeading`, `TornEdge`, `BrushRule`, `PaperCard`, `Wash`, `Foliage`, `Reveal` (motion wrapper).

---

## 5. Project Structure

```
wedding_card/
├─ app/
│  ├─ layout.tsx            fonts, metadata, Navbar, Footer, Analytics
│  ├─ globals.css           @theme tokens, textures, base styles
│  ├─ page.tsx              Home
│  ├─ our-story/page.tsx
│  ├─ schedule/page.tsx
│  ├─ rsvp/page.tsx
│  ├─ travel/page.tsx
│  ├─ faqs/page.tsx
│  └─ api/rsvp/route.ts     POST handler (Zod → Supabase/Sheets)
├─ components/
│  ├─ layout/Navbar.tsx, Footer.tsx, MobileMenu.tsx
│  ├─ ui/                   shadcn primitives (restyled)
│  ├─ paper/TornEdge.tsx, BrushRule.tsx, PaperCard.tsx, Wash.tsx, Foliage.tsx
│  ├─ motion/Reveal.tsx
│  ├─ home/ArchHero.tsx, SentenceCountdown.tsx, MeetTheCouple.tsx, DayStrip.tsx, VenueScene.tsx, ContentsList.tsx, RsvpBand.tsx
│  ├─ story/CoupleCards.tsx, Timeline.tsx, Quote.tsx
│  ├─ schedule/SaveTheDate.tsx, EventList.tsx, DressCode.tsx
│  ├─ rsvp/RsvpForm.tsx
│  ├─ travel/VenueCard.tsx, GettingThere.tsx, Hotels.tsx, Assistance.tsx
│  └─ faqs/FaqAccordion.tsx, ContactCard.tsx
├─ content/site.ts          ALL copy & data (below)
├─ lib/utils.ts, lib/rsvp-schema.ts
└─ public/
   ├─ art/groom.png, bride-roses.png, bride-lily.png        (cutouts, from assets/source)
   ├─ art/scene-arch.png, scene-tent.png, scene-couple.png (upscaled frames)
   ├─ art/olive-branch-left.png, olive-branch-right.png, tent-only.png, chairs.png
   ├─ textures/paper.png, grain.png
   └─ masks/torn-top.svg, torn-bottom.svg, brush-rule.svg, wobbly-border.svg
```

---

## 6. Content

> **Live values now live in `content/site.ts`:** Groom Mohd. Saif Uddin & Bride Farhat Khatoon (groom first everywhere). Nikah: Friday 25 Sep 2026, 8 PM, Inam Vihar, Ghaziabad, UP. Walima: Saturday 26 Sep 2026, 8 PM, JMD Garden, Aya Nagar, Arjangarh, New Delhi. Still placeholder: contact phone, hotels, story bios, RSVP deadline (set to 20 Sep 2026).

The text below is the reference site's original copy, kept for structure.

### 6.1 Global
- **Title:** `Our Wedding | Dr. Shahid Ansari & Noor Fatma`
- **Meta description:** `Join us in celebrating the wedding of Dr. Shahid Ansari and Noor Fatma on June 2nd, 2026`
- **Monogram:** `N` ♥ `S`
- **Nav:** Welcome · Our Story · Schedule · RSVP · Travel · FAQs
- **Credit line (nav, small italic):** `designed by Er. MD Shoaib` → replace with our own
- **Footer:** `Noor & Shahid` / `June 2, 2026` / `Made with love`
- **Wedding date:** Tuesday, June 2, 2026 (countdown target: `2026-06-02T20:00:00+05:30`)
- **Venue:** Geetanjali Banquet Hall, Near Holy Family Hospital, Tilkamanji, Bhagalpur, Bihar
- **Contact phone:** +91 8603026099
- **RSVP deadline:** May 15, 2026

### 6.2 Home `/`
- Arabic: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ`
- `Together with their families`
- `Noor Fatma` & `Dr. Shahid Ansari`
- `Request the pleasure of your company` / `at the celebration of their marriage`
- `Tuesday, June 2, 2026` · `Geetanjali Banquet Hall, Bhagalpur`
- Countdown: Days / Hours / Minutes / Seconds
- CTA: `RSVP Now`
- **Welcome section:** heading `Welcome to Our Wedding`
  - `We are overjoyed to invite you to share in the celebration of our love. Your presence would mean the world to us as we begin this beautiful journey together.`
  - `This website has all the information you need about our special day. We can't wait to celebrate with you!`
- **Quick links (3 cards):**
  - Our Story — `Learn how our love story began`
  - Schedule — `View the wedding day timeline`
  - Travel — `Find accommodation & directions`

### 6.3 Our Story `/our-story`
- Heading: `Our Story`
- Subtitle: `Every love story is beautiful, but ours is our favorite. Here's how two hearts found their way to each other.`
- **Bride card:** `Noor Fatma` · label `The Bride` · `A soul filled with grace and warmth. Her light shines through everything she does, bringing joy to all around her.`
- **Groom card:** `Dr. Shahid Ansari` · label `The Groom` · `A dedicated professional with a heart full of dreams. His kindness, wisdom, and gentle spirit make every day brighter.`
- Timeline heading: `Our Journey Together`

| # | Label | Title | Text | Icon |
|---|---|---|---|---|
| 1 | The Beginning | When We First Met | Our paths crossed in a moment that would change our lives forever. What started as a simple introduction blossomed into something beautiful. | heart |
| 2 | Growing Together | Building Our Bond | Through countless conversations, shared dreams, and quiet moments, we discovered how perfectly we complement each other. Every day brought us closer. | sparkles |
| 3 | The Proposal | A Question Asked | With hearts full of love and hope for the future, the question was asked and joyfully answered. We knew this was just the beginning of our forever. | heart (filled) |
| 4 | June 2, 2026 | Our Wedding Day | And now, we invite you to join us as we celebrate our love and commitment at Geetanjali Banquet Hall, Bhagalpur. This is where our forever begins. | calendar |

- Quote: `"Whatever our souls are made of, his and mine are the same."` — `Emily Brontë`

### 6.4 Schedule `/schedule`
- Heading: `Wedding Schedule`
- Subtitle: `Join us for a day filled with love, joy, and celebration. Here's what to expect on our special day.`
- **Save the Date card:** `Tuesday, June 2, 2026` · `Geetanjali Banquet Hall` · `Near Holy Family Hospital, Tilkamanji, Bhagalpur`
- Heading: `Order of Events`

| # | Event | Time | Description |
|---|---|---|---|
| 1 | Guest Arrival | 8:00 PM | Welcome drinks and light refreshments as guests arrive |
| 2 | Nikah Ceremony | 9:00 PM | The sacred wedding ceremony uniting Shahid and Noor |
| 3 | Wedding Dinner | 9:30 PM | Enjoy a lavish feast prepared with love |

- **Dress Code:** `Traditional & Elegant` — `We invite you to dress in your finest traditional attire or formal wear. Let's make this celebration as colorful and joyous as our love!`

### 6.5 RSVP `/rsvp`
- Heading: `RSVP`
- Subtitle: `We would be honored by your presence. Please let us know if you can join us on our special day.`
- Fields:
  - `Full Name *` — placeholder `Enter your full name`
  - `Phone Number` — placeholder `+91 98765 43210`
  - `Will you be attending? *` — radio: `Joyfully Accept` / `Regretfully Decline`
  - `Number of Guests *` — select: `1 Guest`, `2 Guests`, `3 Guests`, `4 Guests`, `5+ Guests`
  - `Dietary Requirements` — textarea, placeholder `Any allergies or dietary restrictions?`
  - Button: `Submit RSVP`
- Note: `Please respond by May 15, 2026`
- Success state (ours, new): "Thank you, {name}. We can't wait to celebrate with you." / decline variant.

### 6.6 Travel `/travel`
- Heading: `Travel & Accommodation`
- Subtitle: `Everything you need to know about getting to Bhagalpur and where to stay during the celebration.`
- **Venue:** `Wedding Venue` · `Geetanjali Banquet Hall` · `Near Holy Family Hospital, Tilkamanji, Bhagalpur, Bihar` · button `Open in Google Maps` → `https://www.google.com/maps/search/Geetanjali+Banquet+Hall+Tilkamanji+Bhagalpur`
- Heading: `Getting to Bhagalpur`
  - **By Air:** `The nearest airport is Jay Prakash Narayan International Airport, Patna (PAT), approximately 250 km from Bhagalpur. From there, you can hire a taxi or take a train to Bhagalpur.`
  - **By Train:** `Bhagalpur Junction is well-connected to major cities. Direct trains are available from Kolkata, Delhi, and Patna. The venue is about 3 km from the railway station.`
  - **By Road:** `Bhagalpur is connected via NH-80 and NH-31. Regular bus services and taxis are available from Patna, Kolkata, and other nearby cities.`
- Heading: `Where to Stay` — `Here are some recommended hotels near the venue. We suggest booking early to ensure availability.`

| Hotel | Address | Distance / Tier | Phone |
|---|---|---|---|
| Hotel Nataraj Sarovar Portico | Station Road, Bhagalpur | 3 km from venue • 4 Star | +91 641 242 0000 |
| Hotel Ganga Sagar | Khalifabagh, Bhagalpur | 2.5 km from venue • 3 Star | +91 641 230 1234 |
| Hotel Maurya | Tilkamanjhi, Bhagalpur | 1 km from venue • Budget Friendly | +91 641 234 5678 |

- **Assistance:** `Need Travel Assistance?` — `If you need help with travel arrangements or have any questions, please don't hesitate to reach out.` — `Contact: +91 8603026099`

### 6.7 FAQs `/faqs`
- Heading: `Frequently Asked Questions`
- Subtitle: `Have questions about our wedding? Here are answers to some common queries. If you can't find what you're looking for, don't hesitate to reach out!`

| Q | A |
|---|---|
| When should I RSVP by? | Please RSVP by May 15, 2026, so we can finalize our arrangements. We would love to know if you can join us as early as possible! |
| What should I wear? | We encourage traditional and elegant attire. Ladies may wear sarees, lehengas, or formal suits, while gentlemen may wear sherwanis, kurta-pajamas, or formal suits. Feel free to dress in colorful and festive outfits! |
| Can I bring a plus one? | Due to venue capacity, we kindly ask that you only bring guests who have been specifically named on your invitation. If you have any questions about your invitation, please contact us directly. |
| Will there be parking available? | Yes, Geetanjali Banquet Hall has ample parking space for all guests. Valet service will also be available for your convenience. |
| Is the venue wheelchair accessible? | Yes, the venue is wheelchair accessible. Please let us know in advance if you have any specific accessibility requirements, and we will be happy to make arrangements. |
| What type of food will be served? | A lavish multi-cuisine dinner will be served, featuring both vegetarian and non-vegetarian options. If you have any dietary restrictions or allergies, please mention them in your RSVP. |
| Can I take photos during the ceremony? | We have hired professional photographers and videographers to capture our special day. We kindly request an unplugged ceremony (no phones/cameras during the Nikah). You are welcome to take photos during the reception and dinner! |
| Will there be entertainment for children? | While we adore your little ones, this will be an adults-only celebration. We hope you understand and enjoy a night out! |
| What time should I arrive? | Guest arrival begins at 4:00 PM. We encourage you to arrive on time so you don't miss the Nikah ceremony, which starts promptly at 5:00 PM. **(Reference bug: conflicts with 8 PM schedule — fix when editing.)** |
| Is there a gift registry? | Your presence is the greatest gift! However, if you wish to give us something, please visit our Registry page for some suggestions. We truly appreciate any gesture of love. **(No registry page exists — drop or add.)** |
| How can I get to the venue? | Geetanjali Banquet Hall is located near Holy Family Hospital in Tilkamanji, Bhagalpur. Please visit our Travel & Accommodation page for detailed directions and transportation options. |
| Whom should I contact for more information? | For any questions or special requests, please reach out to us directly via phone at +91 8603026099. We're happy to help! |

- **Contact card:** `Still Have Questions?` — `We're here to help! If you have any other questions or need assistance, please don't hesitate to contact us.` — `Phone: +91 8603026099`

---

## 7. Page-by-Page Design Spec (ours, in the watercolor system)

### Home — the animated invitation (`components/home/InvitationStage.tsx`)

**Why this shape:** the source art is only 480×854. Stretched full-width it pixelates. So the painted frames are only ever drawn inside a **9:16 stage that matches the source size**: on phones the stage *is* the screen (≈1× scale), on desktop it is a centered card of at most 860 px tall (≈1.05×) sitting on a **vector-only backdrop** (paper texture SVG, washes, olive-branch SVGs, faint script initials). Cutouts render at ≤ 60 % of their native height. Nothing raster is ever scaled past ~1.1×.

**The sequence** (auto-plays like the video, ~27 s, then holds):

| # | Scene | Set | Motion | Text |
|---|---|---|---|---|
| 1 | Intro | paper | Bismillah, then names fade/rise in, coral "&" pops | You are invited to the wedding of · Noor Fatma & Dr. Shahid Ansari |
| 2 | Arch | arch painting | blooms in from a circle like a wet wash, then slow drift | Noor & Ansari · date |
| 3 | Invite | tent painting | torn-paper wipe up; tent stays as the set from here on | Together with their families invite you… |
| 4 | Groom | tent | groom cutout slides in from the left | The Groom · Dr. Shahid Ansari |
| 5 | Bride | tent | groom exits, bride cutout slides in from the right | The Bride · Noor Fatma |
| 6 | Date | tent | both cutouts enter, flip and meet face to face | Nikah Ceremony · TUESDAY · 2 · AT 8 PM · venue |
| 7 | RSVP | tent + couple | hold | Will you join us? · RSVP Now · Kindly respond by May 15, 2026 · Scroll for details |

**Controls:** story-style progress bars (tap a bar to jump), tap the stage to advance, ←/→ keys, Skip, Replay, pauses when the tab is hidden. `prefers-reduced-motion` jumps straight to the final composed scene.

**Below the stage** (`#details`): sentence countdown on a vector wash, meet-the-couple paper cards with cutouts, day-at-a-glance strip, venue card with the tent painting constrained to a 420 px 9:16 frame, contents list, closing RSVP band with the two cutouts facing each other.

**Raster rule for the whole site:** frames (`scene-*.png`) may only appear inside boxes ≤ 500 px wide; cutouts ≤ 500 px tall. Everything full-bleed must be CSS/SVG (washes, paper, foliage, torn edges).

### Our Story
1. Heading `Our Story` in script, subtitle in tracked serif, olive branch top-right.
2. **Couple portraits:** the two cutouts standing full-height on paper with a soft sand wash behind each (like the video's solo frames), names in script, `THE BRIDE` / `THE GROOM` labels, bios in Jost. No circles, no borders.
3. **Journey timeline:** a single **vertical brush stroke** in tan down the left (desktop: center), with **small watercolor glyphs** as nodes (leaf, two rings, ring box, tent). Entries stack on one side with the label in tracked serif, title in Cormorant, text in Jost. Each entry sits on its own torn-edge paper scrap, slightly rotated (±1°) for a collage feel.
4. **Quote:** the couple-facing scene washed light with the Brontë quote in italic Cormorant over the paper sky; attribution in tracked serif.

### Schedule
1. Heading block.
2. **Save the Date:** replicate the video's date block: `TUESDAY` · big `2` · `AT 8 PM`, `JUNE` above, `2026` below, thin rules either side; venue and address under it; `Add to Calendar` (.ics) as a stamp button.
3. **Order of Events:** three paper scraps in a row (stacked on mobile) with painted glyphs (chairs, rings, table), time in large light serif, description in Jost. Chairs painting as a baseline.
4. **Dress code:** blush wash panel, `TRADITIONAL & ELEGANT` in tracked serif, text in Jost, with three small watercolor swatches (blush, sand, olive) as a palette suggestion.

### RSVP
- Desktop: left column is the bride-with-lily cutout on paper with the date block; right column is the form on a large torn-edge paper card. Mobile: cutout small at the top.
- Inputs: underline-only in tan on paper, labels in tracked serif; radios as two paper "tickets" (`Joyfully Accept` / `Regretfully Decline`) that get a coral stamp when selected; guest count as a segmented row of paper chips; textarea with paper grain.
- Submit: coral stamp button `Submit RSVP`. Success: the couple-facing scene fades in with "Thank you, {name}" in script; decline: "We'll miss you, {name}" with the olive branch.

### Travel
1. **Venue card:** Google Maps embed (real embed URL, not the reference's dummy coords) inside a torn-edge paper frame, tinted with a sage overlay until hover; address; `Open in Google Maps` stamp button.
2. **Getting there:** three paper scraps with hand-drawn plane / train / car glyphs in tan, titles in tracked serif.
3. **Hotels:** rows (not cards) like a ledger: hotel name in Cormorant, address and tier in Jost, distance in tan serif, `tel:` link in coral. Painted rule between rows.
4. **Assistance:** sand wash panel with phone and WhatsApp stamp buttons.

### FAQs
- Accordion items are stacked paper scraps with torn top edges overlapping by 8 px; question in Cormorant, a hand-drawn `+` that rotates to `×`; open item's scrap lifts and gains a blush wash; answer in Jost.
- Contact card at the bottom with the olive branch and the phone.

### Navbar / Footer
- Navbar: transparent over the hero; after 40 px scroll becomes a paper strip with a torn bottom edge. Left: `Noor & Shahid` in Pinyon Script (the `&` in coral). Links in tracked serif; active link has a short brush underline. Mobile: full-screen paper menu with the olive branch and staggered links.
- Footer: the chairs painting along the top edge, then paper: `Noor & Shahid` in script, `June 2, 2026`, `Made with love`, a tiny Bismillah, and our own credit line.

---

## 8. Implementation Steps

1. **Scaffold:** `npx create-next-app@latest wedding_card --ts --tailwind --app --src-dir=false --eslint`; init shadcn (`npx shadcn@latest init`), add accordion, button, input, textarea, label, radio-group, select.
2. **Tokens & fonts:** define `@theme` in `globals.css` (paper/sage/tan/bark/blush/coral); load Pinyon Script, Cormorant Garamond, Jost, Amiri via `next/font/google` as `--font-script`, `--font-serif`, `--font-sans`, `--font-arabic`.
3. **Paper system:** prepare textures/masks/cutouts (see §9), build `TornEdge`, `BrushRule`, `PaperCard`, `Wash`, `Foliage` components.
4. **Layout:** `Navbar` (scroll-aware, mobile menu), `Footer`, `SectionHeading`, `Reveal`.
5. **Content file:** `content/site.ts` with typed objects for couple, event, venue, schedule, hotels, faqs, story, copy.
6. **Pages:** Home → Our Story → Schedule → FAQs → Travel → RSVP (in that order; RSVP last since it needs backend).
7. **RSVP backend:** Supabase project + `rsvps` table (`id, name, phone, attending, guests, dietary, created_at`); `app/api/rsvp/route.ts`; env vars in `.env.local`; rate-limit by IP (simple in-memory or Upstash).
8. **Extras:** `.ics` generator, `sitemap.ts`, `opengraph-image.tsx`, favicon monogram, `robots.ts`.
9. **Polish:** motion pass, `prefers-reduced-motion`, Lighthouse ≥95, keyboard nav, alt text, color contrast (gold on ivory only for decorative, never body text).
10. **Deploy:** GitHub repo → Vercel; set env vars; custom domain optional.

---

## 9. Assets

### Already have (from the video and PNGs)
| File | What | Notes |
|---|---|---|
| `assets/source/groom-cutout.png` | groom, transparent bg, 248×972 | usable as-is; upscale 2× (Real-ESRGAN or Photoshop) for retina |
| `assets/source/bride-cutout-roses.png` | bride with rose bouquet, 433×953 | primary bride art |
| `assets/source/bride-cutout-lily.png` | bride with lily bouquet | RSVP page variant |
| `assets/frames/scene-arch-couple.png` | arch + drapes + couple, 480×854 | hero background (needs upscale, and ideally a version without the couple so cutouts can be layered) |
| `assets/frames/scene-tent-olive.png` | tent + chairs + olive tree | countdown and venue backgrounds |
| `assets/frames/scene-tent-tree-left.png` | tent with tree on left, partial | crop for olive branch and chairs |
| `assets/frames/scene-couple-facing.png` | couple facing each other | closing band, RSVP success, quote |

### To produce
- **Higher-res exports.** The video is only 480×854. Re-export the Canva design as PNG at 1080×1920 (or download the individual Canva elements: tent, olive tree, arch, chairs, drapes) so nothing is upscaled. If not possible, upscale frames 3–4× with Real-ESRGAN and accept slight softness (it suits watercolor).
- **Background-removed pieces** cut from the frames: `olive-branch-left.png`, `olive-branch-right.png`, `tent-only.png`, `chairs.png`, `arch-only.png` (rembg or manual).
- **Paper texture** tile (cold-press, 1024×1024, seamless) and a grain PNG.
- **Torn-edge masks** (SVG, 3–4 variants) and a **brush-rule** SVG, **wobbly-border** SVG, **brush-arrow** SVG.
- **Watercolor glyphs** (leaf, rings, ring box, tent, chair, plane, train, car, map pin) — small PNGs or hand-traced SVGs in tan/sage.
- Real Google Maps embed URL for Geetanjali Banquet Hall.
- Favicon (script "N&S" on paper) and OG image (hero frame with names).

## 10. Open Items to Confirm Later
- Final names, date, venue, phone (text edit pass).
- Arrival time consistency (4 PM vs 8 PM).
- Remove or implement registry.
- RSVP storage choice (Supabase vs Google Sheets).
- Dark mode: skip (watercolor paper is inherently light).
- Get Canva source exports at 1080×1920 or individual elements for crisp art.
