# Canine Companions — Program Dashboard

Internal web application for tracking monthly program data across all six regions and thirteen program areas. Built for Canine Companions staff to enter, review, and visualize monthly figures — with a cross-reference tool for the Graduate Log and a live dashboard for regional comparisons.

---

## What It Does

There are four main sections:

**Home** — Table of contents organized by role. Each card links directly to the relevant data entry section. You can filter by month and year to see which sections have data entered for that period.

**Data Entry** — Where regional staff input monthly figures. Select your region from the sticky pill bar at the top, then navigate through your sections using the tabs. Data auto-saves to Supabase as you type. The Save button is there if you want to force a sync.

**Graduate Log** — Manual entry for client/dog graduation records. Upload the "YTD Credited Placements" report from Salesforce as a CSV, then run the cross-reference to flag anything that doesn't match up — both directions. Clients not found in Salesforce are highlighted red; Salesforce records not in the manual log are highlighted blue.

**Monthly Dashboard** — Visual summary of all entered data. Charts are broken out by section and organized with the CCI brand color palette. You can filter by individual month, quarterly views (Q1–Q4), or year-to-date.

---

## Sections Tracked

| Section | Role |
|---|---|
| Applicant / Candidates | Program Directors |
| Graduates | Program Directors |
| Dog Placements | Program Directors |
| Professional Training Dogs | Training Manager |
| Release Dogs | Training Manager |
| Therapy Dogs | Therapy Dog Program Manager |
| Breeder Dogs | Breeding Program Manager |
| Puppy Placements | Puppy Program Managers |
| Active Puppy Raisers | Puppy Program Managers |
| Puppy Interest | Puppy Program Managers |
| Prison Programs | Puppy Program Managers |
| College Clubs | Puppy Program Managers |

---

## Tech Stack

- **Frontend** — Vanilla HTML, CSS, JavaScript. No build step, no frameworks.
- **Backend / Auth** — [Supabase](https://supabase.com) (PostgreSQL + Supabase Auth)
- **Charts** — [Chart.js 4.4](https://www.chartjs.org) + chartjs-plugin-datalabels
- **Fonts** — Poppins, Montserrat (Google Fonts)

---

## Repository Structure

```
/
├── index.html      # Main app shell + login page + all HTML structure
├── styles.css      # All CSS — design tokens, layout, components
├── app.js          # All JavaScript — config, data, auth, rendering
├── schema.sql      # Supabase database schema (run once to set up)
└── README.md
```

---

## Setup

### 1. Supabase

You'll need a free Supabase project. Once you have one:

1. Go to **SQL Editor → New Query**
2. Paste the contents of `schema.sql` and run it
3. Go to **Authentication → Users** and add accounts for anyone who needs access

### 2. Environment Config

The Supabase project URL and anon key are hardcoded in `app.js` near the top of the file:

```js
const SUPA_URL = 'https://your-project.supabase.co';
const SUPA_KEY = 'your-anon-key';
```

Replace those with your project values if you're setting this up fresh. The anon key is safe to include in frontend code — it only has the permissions defined by your RLS policies.

### 3. Deploy

This is a static site — no server needed. Drag and drop the folder onto [Netlify](https://netlify.com) or push to GitHub and enable GitHub Pages.

**Netlify (easiest):**
1. Go to netlify.com → drag the project folder onto the deploy zone
2. Done — you'll get a URL like `https://cc-program-dashboard.netlify.app`

**GitHub Pages:**
1. Push to a GitHub repo
2. Settings → Pages → Deploy from main branch
3. The URL will be `https://yourusername.github.io/repo-name`

---

## Adding Users

Users are managed directly in Supabase:

1. Go to your project → **Authentication → Users**
2. Click **Invite user** or **Add user**
3. Enter their email — they'll get a link to set their password

There's no self-registration. Only accounts you create will be able to log in.

---

## Logo

The nav bar has a placeholder where the official Canine Companions logo goes. Once you have the asset, open `index.html` and replace this block:

```html
<div class="brand-logo-placeholder">
  <div class="blp-box"></div>
</div>
```

with:

```html
<img src="logo.png" class="brand-logo" alt="Canine Companions">
```

Drop `logo.png` (or whatever the file is named) into the project folder alongside `index.html`.

---

## Notes

- Data is stored per field — not as a JSON blob — so each year/month/section/region/field combination is its own database row. This makes it easy to query, audit, and expand later.
- The Graduate Log entries persist to their own table (`graduate_entries`) separately from the program data.
- Sessions stay active so users don't need to log in every time they open the dashboard.
- June–December will show empty until data is entered for those months. The seed data covers January–May 2026 for reference.
