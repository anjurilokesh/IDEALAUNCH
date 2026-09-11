# IDEALAUNCH

IDEALAUNCH is a dark-futuristic startup ideas discovery platform built with plain HTML, CSS, and JavaScript. It helps curious builders explore emerging opportunities, filter signals by sector, and keep a private watchlist.

## Features

- Session-based login, validation, protected pages, and logout using `sessionStorage`
- Dashboard with personalised welcome, signal metrics, and curated ideas
- Searchable, filterable startup idea index
- Save/unsave ideas with a persistent session watchlist
- Dynamic details page using URL parameters and `find()`
- Profile settings stored for the active session
- Responsive layout for desktop, tablet, and mobile

## Project structure

```text
IDEALAUNCH/
├── index.html          # Login
├── dashboard.html      # Dashboard
├── explore.html        # Search and filters
├── saved.html          # Watchlist
├── details.html        # Opportunity detail view
├── profile.html        # Profile settings
├── css/style.css       # Shared dark-futuristic UI
└── js/
    ├── data.js         # Idea data and saved-state helpers
    ├── auth.js         # Login, protection, and logout
    ├── app.js          # Shared layout and card rendering
    └── [page].js       # Page-specific behavior
```

## Run locally

Open `index.html` in a modern browser. No packages, build step, or server are required.

For the demo login, enter any name of at least two characters and any password of at least six characters.

## Deploy on GitHub and Netlify

1. Create a new GitHub repository and upload this project’s files.
2. In Netlify, select **Add new site** → **Import an existing project**.
3. Connect GitHub and choose the repository.
4. Leave the build command blank and set the publish directory to the repository root (`.`).
5. Click **Deploy site**. Netlify will provide the live link.

## JavaScript concepts demonstrated

The project uses arrays and objects for idea data, `map()` to render UI, `filter()` for search/categories/saved ideas, `find()` to select an idea for its details page, plus DOM manipulation, event handlers, form validation, URL parameters, and `sessionStorage`.
