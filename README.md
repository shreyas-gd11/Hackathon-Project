Hackthon - Registration App

This repository contains a small registration frontend (static HTML) and a Node/Express backend. The frontend submits a multipart/form-data POST to the backend which responds with a JSON success message. Optionally the backend can store submissions in MongoDB when MONGO_URI is provided.

Quick overview
- Frontend: static HTML files (Form.html, UI.html) — can be hosted on Netlify, Vercel, GitHub Pages, or any static host.
- Backend: Node/Express in Backend/ — deploy to Render, Railway, or another Node host.
- Database (optional): MongoDB Atlas. If you provide MONGO_URI the server can save registrations.

Files added to help deploy
- Backend/.env.example — example environment variables
- .gitignore — excludes node_modules and local files

Local testing (before deploy)
1. Open a terminal in the project root.
2. Start the backend:

PowerShell example:
cd Backend; npm install; npm start

3. Open Form.html in your browser (double-click or serve it with a static server) and submit the form.

You can serve the frontend locally with a tiny static server when needed.

Deploy backend to Render (recommended)
1. Push this repo to GitHub.
2. Create a free Render account and click "New -> Web Service".
3. Connect your GitHub repo and choose the Backend directory as the root (or set the build command to run in Backend).
4. Set the start command to: npm start.
5. In Render's environment variables add:
   - MONGO_URI = your MongoDB connection string (optional)

Deploy frontend (static) to Netlify or Vercel
1. Netlify: drag & drop the project root folder into Netlify's Sites (or connect GitHub repo and configure build to publish root). Form.html will be served at <your-site>/Form.html.
2. Vercel: connect the repo and deploy. Configure to treat the repo root as a static site.

MongoDB Atlas (optional)
1. Create a free Atlas cluster.
2. Create a database user and whitelist your IP.
3. Copy the connection string and set it as MONGO_URI in Render's environment variables.

If you'd like, I can:
- Prepare the project for a one-click deploy (add a Render render.yaml or a Procfile).
- Add MongoDB saving with Mongoose and a models/Registration.js file, and an env.example that documents required vars.
- Walk through pushing the repo to GitHub and connecting it to Render step-by-step.

Tell me which provider you prefer and whether you want me to add Mongoose models and deployment config.
