# Savanna static pages

Three Savanna learner pages, frozen from the **local dev app** into plain HTML + CSS so they can be
opened offline and used as a reference for front-end and accessibility work.

Open `index.html` (or any file in `pages/`) directly with `file://` — double-clicking works, no
server needed.

## What is here

| Page | Learner / course | What it shows |
|------|------------------|----------------|
| `pages/homepage-v1-paced.html` | Björn Sibanda — **WR 100: Fundamentals of Effective Communication**, cohort F26-SEM-16W (31 Aug – 20 Dec 2026), week 10 of 15 | Courses dropdown (3 courses), week strip with **every week preloaded**, "continue where you left off", immediate deliverables, period progress, overall score (59.56%, "slightly behind"), upcoming events |
| `pages/homepage-v1-self-paced.html` | Amara Nwosu — **VA-1: VA Foundations & Professional Identity** | Course-progression gauge (16% against the 70% graduation threshold), 1 of 3 modules complete, **working module switcher**, **preloaded programme modal**, pacing boost (11 days left), upcoming events |
| `pages/concept-with-navigation.html` | Amara Nwosu — concept *"The Future of the VA Industry"* | Curriculum navigation panel (read / current / unread states) beside a full authored concept: callouts, numbered card grid, two-column comparison, icon lists, "Mark as complete". The "Need a Fast Track?" block and the Padlet reflection block are removed on request. |


## Layout

```
savanna_static_pages/
├── index.html                 landing page linking the three captures
├── pages/*.html               the frozen pages (relative links into ../assets)
├── assets/
   ├── css/                   the application's own stylesheets, unminified — application_alx.css 
   │                          (sprockets, themed), app.css (esbuild), Google Fonts, Typekit —
   │                          plus static-page.css, the only one written for these pages
   ├── fonts/                 76 font files, all referenced by the stylesheets above
   ├── img/                   51 images: logos, icons, concept artwork, substituted embeds
   └── js/                    popper.js + bootstrap.bundle.js (the exact files the live app
                              serves through sprockets) + static-page.js
```

Everything is shared: the three pages point at the same `assets/` tree, nothing is duplicated and
nothing is minified or gzipped. Captures are additive, so each run ends by dropping assets no
published page references any more — otherwise the Rive stills from retired week panels would
pile up run after run.

## What still works

These are live in the frozen pages, driven by `assets/js/static-page.js` against content that was
pre-rendered during the capture and parked in `<template>` elements (so nothing is duplicated in
the accessibility tree and no id appears twice):

| Control | Page | Behaviour |
|---|---|---|
| **Hamburger** | all | Collapses the sidebar to its 70px icon rail and back, remembered in `localStorage` under `sidebar-collapsed`. It moves the same three things the app does: `body.sidebar-collapsed`, `expanded` on `#sidebar`, and the labels (React wrote `display` inline on each, so `assets/css/static-page.css` overrides them from the body class). |
| **Week strip** | paced homepage | Every week of the course was rendered server-side at capture time; clicking one swaps the panel below it and moves the `active` state. The chevrons and the scroll-into-view of the selected week are reimplemented from the component's own sidecar JS. |
| **Score details modal** | paced homepage | Server-rendered per week, so it opens on its own — including the one that arrives with a week you switch to. |
| **My activities** | self-paced homepage | Each module's activity list was rendered at capture time; clicking a module swaps the panel beside it, as `HomepageSelfPacedActivities.tsx` does. |
| **Programme modal** | self-paced homepage | "Program details" normally fetches `/dashboards/program_structure.json` on first open — the capture opens it once so the fetched tree is baked in. Its course and module accordions expand and collapse: React renders only the body of an *open* section, so the capture opens each one to materialise its content, pairs every toggle with the element it controls (`data-static-collapse-toggle` / `data-static-collapse-body`) and closes again the ones the app had closed. |
| **Courses dropdown** | all | Server-rendered markup, so Bootstrap's dropdown opens it with no help: three courses across a programme group and "Other courses". |
| **Curriculum bar** | all | The bar fixed under the header pads the content by its own height and slides away on scroll down, as `CurrentCurriculumScrollBehavior.tsx` does. |
| Dropdowns, modals, accordions, collapse, tooltips | all | Bootstrap's own bundle. |

Captured dashboard links and actions not listed above remain inert.

## Accessibility speech

The shared accessibility panel offers opt-in **Read on Hover**, **Read selected text**, and **Stop
reading** controls. It first uses a matching voice already available in the learner's browser/device.
If that voice is missing, it can fall back to Google Cloud Text-to-Speech when configured. No speech
credentials belong in the static pages.

The Google Cloud endpoint is scaffolded in `backend/google-tts/`. To test it:

1. Enable the APIs, create a service account, and grant it the `roles/cloudtts.user` role:

   ```text
   gcloud services enable texttospeech.googleapis.com run.googleapis.com cloudbuild.googleapis.com
   gcloud iam service-accounts create savanna-tts
   gcloud projects add-iam-policy-binding PROJECT_ID --member=serviceAccount:savanna-tts@PROJECT_ID.iam.gserviceaccount.com --role=roles/cloudtts.user
   ```

2. Deploy from the repository root. Replace `PROJECT_ID` and `YOUR_SITE`; include the exact
   local/production origins in `ALLOWED_ORIGINS`. The deploy output includes the service URL.

   ```text
   gcloud run deploy savanna-speech --source backend/google-tts --region us-central1 --service-account savanna-tts@PROJECT_ID.iam.gserviceaccount.com --set-env-vars "^@^ALLOWED_ORIGINS=http://localhost:5500,http://127.0.0.1:5500,https://YOUR_SITE" --max-instances 1 --concurrency 2 --allow-unauthenticated
   ```
3. Set `window.SAVANNA_TTS_ENDPOINT` in `assets/js/speech-config.js` to
   `https://YOUR_CLOUD_RUN_URL/synthesize`.
4. Serve the static pages over HTTP (for example, `python -m http.server 5500`); browser `file://`
   pages cannot make the cross-origin speech request.

The backend uses Cloud Run's service-account credentials (Application Default Credentials) and
returns MP3 audio. Google Cloud must have a voice for the selected locale; unsupported locales return
an error and the text remains on screen. Confirm the provider's actual voice coverage and quality for
all six languages before relying on it.

The endpoint is billable and public when configured for browser access. CORS is not authentication.
Use API quotas and spending alerts for a trial; add proper abuse protection before using it publicly.


