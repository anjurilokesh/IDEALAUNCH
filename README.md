# IdeaLaunch 🚀

Discover ideas. Build the future.

IdeaLaunch is a startup-ideas discovery platform built with plain **HTML, CSS, and JavaScript** — no frameworks, no build step. UI style: **Dark Futuristic UI**, styled as a mission-control console.

## Live demo

- **Live site:** _add your Netlify URL here_
- **Repository:** _add your GitHub URL here_

## Features

- 🔐 Session-based login (`sessionStorage`) with form validation (callsign + passcode rules)
- 🛡️ Protected pages — any page other than Login redirects to Login if there's no active session
- 🚪 Logout clears the session and saved-ideas list
- 📊 Dashboard with live stats (total ideas, categories, saved count, growth-stage count)
- 🔍 Explore Ideas with live search and category filtering
- ⭐ Save/unsave ideas, persisted for the session, with a dedicated Saved Ideas page
- 📄 Idea Details page with a founder's note, market size, and a save action
- 👤 Profile page showing session info and an editable session-only bio
- 📱 Fully responsive layout (sidebar collapses to a top bar on small screens)

## Pages

| Page | File |
|---|---|
| Login | `login.html` |
| Dashboard | `dashboard.html` |
| Explore Ideas | `explore.html` |
| Saved Ideas | `saved.html` |
| Idea Details | `idea-details.html?id=IL-001` |
| Profile | `profile.html` |

## Project structure

```
idealaunch/
├── index.html          # routes to login or dashboard based on session
├── login.html
├── dashboard.html
├── explore.html
├── saved.html
├── idea-details.html
├── profile.html
├── css/
│   └── style.css       # design system: tokens, layout, components
├── js/
│   ├── data.js          # IDEAS array + CATEGORIES (derived)
│   ├── auth.js           # session handling, validation, saved-ideas storage
│   ├── app.js            # shared rendering: cards, grids, filters
│   ├── dashboard.js
│   ├── explore.js
│   ├── saved.js
│   ├── details.js
│   └── profile.js
└── README.md
```

## JavaScript concepts used

- **Arrays & objects** — `IDEAS` is an array of idea objects in `data.js`
- **Functions** — every page's logic is composed from small named functions
- **`map()`** — building category `<option>` lists and rendering tag pills
- **`filter()`** — search + category filtering on Explore, saved-ideas lookups
- **`find()`** — looking up a single idea by id on the Details page
- **DOM manipulation** — building cards and panels with `innerHTML` / `createElement`
- **Events** — `submit`, `input`, `change`, and `click` listeners throughout
- **Forms & validation** — the login form validates callsign and passcode before creating a session
- **`sessionStorage`** — session object, saved-idea ids, and profile bio all live here and clear on logout / tab close

## How auth works (demo-only)

There's no backend. "Signing in" validates the input shape (callsign ≥ 3 characters; passcode ≥ 6 characters with at least one letter and one number) and stores a session object in `sessionStorage`. Any page other than Login calls `requireSession()` on load, which redirects to Login if that session object is missing. Logging out clears the session and the saved-ideas list for that tab.

## Running locally

No build step — just open `login.html` in a browser, or serve the folder with any static server:

```bash
npx serve .
```

## Deploying to Netlify

1. Push this folder to a GitHub repository.
2. In Netlify, "Add new site" → "Import an existing project" → connect the repo.
3. Build command: none. Publish directory: `.` (project root).
4. Deploy — Netlify will serve `index.html` at the root.

## Author

M. Harshavardhan's IdeaLaunch task — Sakith Harvan Technologies internship assignment.
