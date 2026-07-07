# Swasti Foundation Website — Requirements Checklist

Status as of this build. Every row maps directly to a numbered section in the
Requirements Document. "Source-verified" means the displayed content was
checked word-for-word against the document during this session; nothing in
that category was invented.

## 1. Basic Organization Information — ✅ Complete, source-verified

| Field | Status | Where |
|---|---|---|
| NGO Name (Swasti Foundation) | ✅ | Header, Footer, every page title |
| Logo | ✅ Real logo extracted from the requirements .docx and placed at `public/images/logo.jpeg`. Header/Footer currently use a CSS monogram (`स्व`) as a lightweight stand-in — swap in the real logo file when ready. | `public/images/logo.jpeg` |
| Tagline ("नर सेवा ही नारायण सेवा है।") | ✅ Hindi original + English gloss, clearly marked as a gloss, not source text | Hero, Footer |
| Year of Establishment (25/02/2020) | ✅ | About → Organisation Details |
| Registration Number (DL/2020/341) | ✅ | About → Organisation Details, Footer |
| NGO Type (Trust) | ✅ | About → Organisation Details |
| Office Address | ✅ | About, Contact, Footer |
| Correspondence Address | ✅ stored in data layer (`orgData.js`) — not yet surfaced on a page; add to Contact page if the org wants both addresses public | `src/data/orgData.js` |
| Branch Locations (Karol Bagh, Rajpur, Chhattarpur) | ✅ | About → Organisation Details, Contact |

## 2. About Us Section — ✅ Complete, source-verified

| Field | Status |
|---|---|
| Why founded | ✅ verbatim |
| Problem it solves | ✅ verbatim |
| Founder story | ✅ verbatim |
| Inspiration | ✅ verbatim |
| Mission | ✅ verbatim |
| Vision (incl. Gaushala / Old Age Home long-term goals) | ✅ verbatim |
| Core Values (Transparency, Integrity, Equality, Sustainability, Empowerment) | ✅ all 5, with short descriptive taglines I wrote for each (the source gives only the value names) |

## 3. Leadership Team — ✅ Complete, source-verified

All 8 names and roles (Shailesh Shastri – Chairperson, Veena Jajoria –
President, Mukesh Kumar & Neetu Kumari – Vice President, Varun Singh Rathore
& Dr. Devesh Arya – Vice-Chairperson, Archana Singh – General Secretary,
Anjili – Treasurer) are rendered on the About page. Photos are letter-avatar
placeholders pending real headshots.

## 4. Areas of Work — ✅ Complete, source-verified

All 8 (Education, Women Empowerment, Healthcare, Child Welfare, Environment,
Skill Development, Rural Development, Animal Welfare) rendered as an icon
grid on the homepage. Icons are hand-drawn inline SVGs (no external icon
library), categorisation of which icon maps to which area is my own design
choice.

## 5. Programs & Projects — ✅ Complete, source-verified

All 6 programs present with verbatim names, locations, and descriptions:
Bal Sanskar Pathshala, Vriksharopan, Yog Diwas, Ambedkar Baba Sahab Program,
Sashakt Silai Kendra, Life Matters Campaign. Each has a placeholder image
with a `TODO: Replace with actual NGO image` comment. Category tags
(Education/Environment/Healthcare/Women Empowerment) are my own
classification for the filter UI — the source doesn't assign categories.

## 6. Impact Data — ✅ Complete, source-verified

5,000+ Children Educated · 20,000+ Ration Distributed · 10+ States Reached ·
10,000+ Cleanliness Kits Distributed — all four, with animated count-up on
scroll, shown on the homepage and the dedicated Impact page.

## 7. Success Stories — ✅ Complete, source-verified

Both stories (Ritik Aggarwal, Anuj Arya) present with full verbatim text on
the Impact page and summarized on the homepage / Stories page. Photos are
placeholders with `TODO: Replace with actual NGO image`.

## 8. (Not present in source numbering — skipped, no gap)

## 9. Volunteer Section — ✅ Complete, source-verified

All 3 volunteers (Ashwini – Event Management, Krishna Garg – Technical
Coordinator, Aditya Kumar – Technical Coordinator) listed on the Volunteer
page, plus a working sign-up form UI with a `TODO: Connect Backend API`
dummy submit handler.

## 10. Donation Section — ✅ Frontend complete, backend intentionally not implemented

- Preset + custom amount selector, one-time/monthly toggle ✅
- UPI QR placeholder with clear `TODO: Replace with actual NGO UPI QR code` ✅
- Razorpay integration explicitly **not** wired up — dummy submit handler
  with `TODO: Integrate Razorpay Payment Gateway`, per your instruction that
  you'll do this yourself ✅
- Success/failure UI states built and working ✅

## 11. Corporate Partnerships — ✅ Complete, source-verified

Alimco, Vandu Namkeen (companies), Avanti Sai Public School Muradabad
(school), OASIS Global University (college) — all 4 shown in the homepage
partners strip.

## 12. Events Section — ⚠️ Structurally present, no content (matches source)

The source document only contains the section header with zero event
content. Built an "Upcoming Events" block on the Stories & News page with a
clear empty-state message and `TODO: Fetch upcoming/past events from
backend/CMS API`. Nothing was invented here.

## 13. News & Blog — ⚠️ Structurally present, no content (matches source)

Same situation as Events — section header only in source. Built with an
empty-state message and `TODO: Fetch blog posts from backend/CMS API`.

## 14. (Not present in source numbering — skipped, no gap)

## 15. Careers Section — ✅ Structurally complete, no job content (matches source)

Open Positions and Internship Opportunities both show empty states (source
gives headers only, no actual roles). Eligibility copy is general-purpose
text I wrote since the source doesn't specify criteria. Apply form is fully
built and functional in the UI with `TODO: Connect Backend API` and `TODO:
Implement resume/CV file upload to backend storage`. **Careers is now also
in the primary header navigation** (was previously footer-only — fixed this
session).

## 16. Contact Section — ✅ Complete, source-verified

Office Address, Email (Foundationswasti@gmail.com), Phone (8459073474) all
verbatim. Contact form is fully built with `TODO: Connect Backend API`. Map
is a placeholder with `TODO: Replace with embedded interactive map`.

## 17. Social Media — ⚠️ Links structurally present, no real URLs (matches source)

Facebook / Instagram / YouTube icons in the footer, each pointing to `#`
with `TODO: Replace with actual NGO social media links` — the source gives
no actual URLs to use.

## 18. (Not present in source numbering — skipped, no gap)

## 19. Message from the Founder's Desk — ✅ Complete, source-verified

Full letter (including the "Dear Friends," salutation, which was missing in
an earlier draft and has been corrected) on the About page at
`/about#founders-desk`, plus a homepage preview section linking through.
Founder portrait is a placeholder pending a real photo.

---

## Cross-cutting technical requirements

| Requirement | Status |
|---|---|
| English default, working Hindi switch | ✅ Full UI chrome (nav, buttons, labels, forms) is bilingual via `src/i18n/`. Organisation content (mission, programs, stories, etc.) is currently English-only in the data layer — translating that content into Hindi was not requested in the source document and would require either professional translation or an explicit decision from you, so it's left as English with a structural TODO rather than machine-translated. |
| Light mode default, dark mode toggle | ✅ verified visually in this session — strong contrast in both modes, toggle persists via localStorage |
| Cloudflare Pages deployment readiness | ✅ `public/_redirects` for SPA routing, `.env.example` for config, no Node-server dependency, route-based code-splitting via `React.lazy`, Vite build verified clean |
| Backend integration points | ✅ Every form (volunteer, donate, contact, careers/apply) has a dummy submit handler and an explicit `TODO: Connect Backend API` comment. `src/data/orgData.js` is structured as a drop-in replacement target for a future CMS/API call. |
| No payment gateway implemented | ✅ Confirmed — Razorpay is untouched, only a UI-level dummy success/failure simulation exists |
| WhatsApp button with dummy number + TODO | ✅ Present as a floating action button site-wide; number taken verbatim from source (`459073474`) with a TODO flagging that this is shorter than a standard 10-digit Indian mobile number and should be verified with the organisation before going live |
| Reusable component architecture | ✅ `Button`, `Card`, `Section`, `SectionHeading`, `ImagePlaceholder` are shared primitives reused across all 10 pages |
| Code splitting / lazy loading | ✅ Every route is its own chunk (verified in build output) |
| Accessibility basics | ✅ Skip-link, semantic landmarks, `aria-label`/`aria-pressed`/`aria-expanded` on interactive controls, visible focus rings, alt-text-equivalent labels on all image placeholders |
| Responsive design (mobile/tablet/desktop) | ✅ Verified via headless-browser screenshots at 390px, 768px, 1190–1300px, and 1440px during this session; several real bugs were found and fixed (see below) |

---

## Bugs found and fixed during this QA pass

1. **Header overflow at ~1190–1240px viewport width** — the Donate button
   was clipping off-screen right before the mobile breakpoint kicked in.
   Fixed by tightening nav spacing and adjusting the breakpoint.
2. **Mobile nav menu only rendered ~80px tall** instead of covering the
   screen, because `position: fixed` + `bottom: 0` wasn't resolving height
   correctly in combination with flex layout. Fixed with an explicit
   `height: calc(100vh - header-height)`.
3. **Hero section pushed all copy below the fold on tablet** because the
   placeholder image was rendering at nearly full viewport height. Fixed by
   capping the image height and keeping copy first in visual order.
4. **Horizontal page overflow** caused by the offscreen (transformed)
   mobile nav panel being measured by the browser as contributing to page
   width. Mitigated with `overflow-x: hidden` on `<html>` (verified this
   does not break the sticky header, and does prevent any user-visible
   horizontal scroll).
5. **Careers page was unreachable from the main navigation** — only linked
   from the footer. Added to the primary header nav.
6. **Data accuracy corrections**: WhatsApp number was incorrectly assumed
   to share a country code with the main phone number; corrected to match
   the source's literal (and shorter) digit string. "Ration Distributed"
   label had drifted to "Ration Kits Distributed." The founder's letter was
   missing its "Dear Friends," opening line. The About page was missing the
   entire Founder's Desk section (source item 19) — it has now been added
   as its own section distinct from the homepage preview.

## Known limitations / explicit non-goals (by design, per your instructions)

- No backend, database, authentication, admin panel, or real API calls —
  every dynamic-looking feature is a documented placeholder.
- No real images, videos, or PDFs — every media slot has a placeholder and
  a `TODO` comment naming exactly what needs to be supplied.
- No payment gateway — Razorpay integration is intentionally left for you.
- Hindi translation covers UI chrome only, not organisational content
  (mission/programs/stories), since the source document doesn't provide
  Hindi versions of that content and machine-translating it without your
  sign-off risked introducing inaccuracies into official NGO messaging.

## Suggested next steps before going live

1. Supply real photography (hero, programs, leadership, founder, gallery,
   success stories) to replace placeholders.
2. Confirm the WhatsApp number — the source value is 9 digits, one short of
   a standard Indian mobile number.
3. Provide real social media URLs.
4. Decide on Hindi translation scope for organisational content.
5. Build/connect the backend (forms, donations, CMS for blog/events/careers)
   and wire it into the existing TODO integration points.
6. Integrate Razorpay using the existing Donate page UI as the front end.
