Client folder — Deploying the static frontend

This `Client/` folder is a self-contained static site (landing + registration form). It’s ready to be deployed to Netlify (drag-and-drop) or Vercel (static site). The registration form POSTS to your backend API. If you need to change the backend URL, update `Form.html` (the form's `action` attribute and the `fetch()` URL in the script).

Quick checks
- The main entry is `index.html` (landing page) which links to `Form.html`.
- `Form.html` contains the registration UI and posts to the backend at:
  https://hackathon-project-theta-amber.vercel.app/register

How to deploy (Netlify - drag & drop)
1. Zip or open this `Client/` folder.
2. Go to https://app.netlify.com/drop and drag the contents of `Client/` (not the folder itself) into the browser window.
3. Netlify publishes a URL instantly. Optionally configure a custom domain.
4. If you change the backend URL after deploy, edit `Form.html` and redeploy.

How to deploy (Vercel - static site)
1. From the Vercel dashboard, press "New Project" → "Import Git Repository" and select this repo. Set the root directory to `Client/`.
2. Use the default settings (Framework: Other / Static) and deploy.
3. Update `Form.html` if the backend URL differs from the one configured here.

Local test
- Open `Client/index.html` in a browser (double-click or serve with a static server). The form will POST to the configured backend URL.
- If you want to test against a local backend (http://localhost:5000/register): edit `Form.html` and change both the `form action="..."` and the `fetch('...')` occurrences to `http://localhost:5000/register`.

CORS & Backend notes
- If your backend restricts CORS (recommended), set the backend's `FRONTEND_URL` environment variable to your deployed frontend origin (e.g., `https://<your-netlify-site>.netlify.app`) so the API accepts requests from the frontend.
- To persist registrations, set `MONGO_URI` in your backend environment (Vercel, Railway, Render, or `.env` locally).

Contact
- If you'd like, I can:
  - Replace the hard-coded backend URL in `Form.html` with a small config loader that reads a `data-backend-url` attribute from the `index.html` (so you can change a single value after deploy).
  - Add a tiny automated deploy GitHub Action or netlify.toml to wire build settings.

Enjoy 👏
