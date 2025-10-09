# PortfolioSite (Vanilla HTML/CSS/JS)

Ultra-minimal, responsive personal portfolio. Static-only: no frameworks, no build step.

## Structure
- `index.html` — main page with sections: About, Portfolio, Collaborations, Contact
- `style.css` — minimalist theme, responsive grid, animations
- `script.js` — smooth scrolling UX, section reveal, mobile nav
- `assets/` — replace SVG placeholders with your images/logos

## Quick edit guide
Open `index.html` and search for these comments:
- "Replace with your concise bio" — update About text
- Portfolio grid: duplicate a `.card` and change `href`, `img`, title, tags
- Clients: swap `assets/client-*.svg` with your logos and update `alt`
- Contact: change email/link; update the form `action` if using Formspree/Netlify
- Footer: your name appears in multiple places — replace `[Your Name]`

Colors and spacing: adjust CSS variables in `style.css` under `:root` (e.g. `--accent`).

## Deploy to Koyeb (with Docker)
1. Push this folder to a Git repository (GitHub/GitLab).
2. In Koyeb, create a new App → choose your repo.
3. Select "Docker" as the build method.
4. Set the Dockerfile path to `./Dockerfile` (or leave default).
5. Configure environment variables:
   - PORT: 8000
6. Deploy. The site will be served via Nginx on port 8000.

## Deploy to Koyeb (Static Site - Alternative)
1. Push this folder to a Git repository (GitHub/GitLab).
2. In Koyeb, create a new App → choose your repo.
3. Select a Static Site (no runtime). Set:
   - Publish directory: `/` (project root) or leave default
   - Index document: `index.html`
   - Error document: `index.html` (optional single-page fallback)
4. Deploy. All assets are referenced with relative paths and require no server.

Note: For static deployment, the `.htaccess` file will be ignored as Koyeb uses Nginx, not Apache.

## Accessibility & performance
- Semantic headings, skip link, reduced motion support
- System font stack, minimal JS, lazy images

## License
You own your content (text/images). Code is MIT.
