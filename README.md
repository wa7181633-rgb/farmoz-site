# Farmoz — website

The production site for **Farmoz — Web & AI Systems**: a one-page sales site for a web development and AI automation studio. Fixed price, fixed timeline, no build step.

<p align="left">
  <a href="https://wa7181633-rgb.github.io/farmoz-site/"><img alt="Live Demo" src="https://img.shields.io/badge/Live%20Demo-Open-22d3ee?style=for-the-badge&logo=googlechrome&logoColor=white" /></a>
  <img alt="HTML" src="https://img.shields.io/badge/HTML-5-E34F26?style=flat-square&logo=html5&logoColor=white" />
  <img alt="CSS" src="https://img.shields.io/badge/CSS-3-1572B6?style=flat-square&logo=css3&logoColor=white" />
  <img alt="JS" src="https://img.shields.io/badge/JS-vanilla-F7DF1E?style=flat-square&logo=javascript&logoColor=06080f" />
  <img alt="Dependencies" src="https://img.shields.io/badge/dependencies-0-34d399?style=flat-square" />
</p>

**Live:** https://wa7181633-rgb.github.io/farmoz-site/

---

## Why it exists

Most small-business sites fail for boring, fixable reasons: slow on mobile, no clear call to action, no social preview, no structured data. This site is built the other way around — 20 KB of HTML, semantic markup, one obvious action per section, and a contact flow that lands in WhatsApp or email with zero backend.

## Features

- **Zero dependencies** — no npm, no framework, no build. Upload the folder and it runs.
- **Single config file** (`config.js`) drives brand, email, WhatsApp and GitHub across the whole page.
- **Real conversion path** — pricing cards and template CTAs prefill the contact form with the right package.
- **Contact form with no backend** — builds a structured `mailto:` message, plus an instant WhatsApp link.
- **SEO done properly** — unique title and description, canonical URL, Open Graph + Twitter cards, `robots.txt`, `sitemap.xml`.
- **Structured data** — `ProfessionalService` JSON-LD so Google can show services and price range.
- **Accessible** — skip link, focus states, ARIA labels, keyboard-friendly nav.
- **Dark, responsive UI** — custom-property palette, scroll reveal animations, mobile menu.
- **Custom 404 page** matching the design.

## Files

| File | Purpose |
|---|---|
| `index.html` | Full page — hero, services, templates, pricing, process, FAQ, contact |
| `styles.css` | All styling; colours live in `:root` at the top |
| `script.js` | Config injection, mobile menu, scroll reveal, form handling |
| `config.js` | **Edit this only** — brand, tagline, email, WhatsApp, GitHub, website |
| `og-image.svg` | 1200×630 social preview card |
| `404.html`, `robots.txt`, `sitemap.xml` | SEO and error handling |

## Run it locally

```bash
# simplest: just open the file
start index.html        # Windows
open index.html         # macOS

# or serve it properly (needed to test the sitemap/404)
node ../tools/serve.mjs 5500 .
```

## Make it yours

Edit `config.js`:

```js
window.FARMOZ_CONFIG = {
  brand: "Your Brand",
  tagline: "What you do",
  email: "you@example.com",
  whatsapp: "923001234567",   // country code, no + or spaces
  github: "yourusername",
  website: "",
};
```

Then change the palette in `styles.css`:

```css
:root {
  --accent: #22d3ee;    /* primary */
  --accent-2: #a78bfa;  /* secondary */
  --accent-3: #34d399;  /* success */
}
```

Update the canonical URL, `og:url` and `og:image` in `index.html` to your own domain before going live.

## Deploy

| Host | Steps |
|---|---|
| **GitHub Pages** | Settings → Pages → Source `main` / `/root` |
| **Netlify** | Drag the folder onto https://app.netlify.com/drop |
| **Cloudflare Pages** | Connect the repo, no build command, output `/` |

## Audit your own site

Pair this with the free [site-audit](https://github.com/wa7181633-rgb/site-audit) CLI:

```bash
node ../site-audit/audit.mjs yourdomain.com
```

## Need a custom site?

This is the exact style of work I deliver for clients — fixed price, fixed timeline.

→ Message me on [WhatsApp](https://wa.me/923122581354) or email farmoz98@gmail.com

## License

MIT — see [LICENSE](LICENSE). Use it for your own studio if it helps.
