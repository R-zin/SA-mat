# Module 9: Deployment & CI/CD Manual (GitHub Pages)

def get_mod9():
    return {
        "id": "github-pages-guide",
        "number": 9,
        "title": "Production Deployment Manual: Next.js Static Export & GitHub Pages CI/CD",
        "shortTitle": "GitHub Pages CI/CD",
        "ects": "2.0 ECTS",
        "readTime": "15 min read",
        "updated": "Operational Manual",
        "sourceSlide": "Technical Deployment Guide",
        "slideUrl": "https://github.com/R-zin/SA-mat",
        "summary": "Definitive step-by-step engineering handbook for deploying Next.js 16 Static Site Generation (SSG) to GitHub Pages: next.config.mjs configuration, basePath asset resolution, GitHub Actions CI/CD pipeline, and troubleshooting 404s.",
        "tags": ["#GitHubPages", "#NextJS16", "#StaticSiteGeneration", "#GitHubActions", "#CICD", "#DevOps"],
        "subsections": [
            {
                "id": "gh-pages-architecture",
                "title": "9.1 GitHub Pages Static Architecture & Next.js Export Pipeline",
                "content": """### 🎯 Core Intuition ("The Static Edge Billboard")
When you run a traditional server-side web app (Node.js/Express), the server must be running 24/7 on a cloud machine. Every time a user visits, the server queries a database, renders HTML, and burns electricity. If 100,000 students hit the server at once during finals week, the server crashes.

In contrast, **Static Site Generation (SSG)** is like printing 10,000 glossy brochures upfront. During the build process (`next build`), Next.js pre-compiles every single page, formula, diagram, and flashcard into static, pure HTML, CSS, and JavaScript files inside the `out/` folder. **GitHub Pages** acts as a global edge content delivery network (CDN) that serves these pre-rendered files at near-zero latency, with zero server crashes and zero hosting costs!

---

### ⚙️ The Three Essential Next.js Configuration Keys
To host a Next.js application on GitHub Pages, three configuration invariants are required in `next.config.mjs`:
1. `output: 'export'`: Instructs Next.js to generate a purely static website inside the `out/` directory instead of expecting a Node.js runtime server.
2. `basePath: '/SA-mat'`: GitHub Pages serves repository websites under a subpath (`https://<username>.github.io/<repo-name>/`). Without `basePath`, browsers will look for CSS files at `https://<username>.github.io/_next/static/...` and throw 404 errors!
3. `images: { unoptimized: true }`: GitHub Pages has no server to run the Next.js on-demand image optimization engine; images must be served directly as static assets.
4. `trailingSlash: true`: Appends a trailing slash to all page routes, ensuring web servers correctly locate `index.html` within subdirectories without URL rewriting errors.""",
                "callout": {
                    "type": "pine",
                    "title": "Exam / Interview Tip: Why Trailing Slash Matters",
                    "text": "Why set trailingSlash: true? In static hosting without an active web server rewrite rule, navigating to '/sdlc-models' might fail if the server looks for a file named 'sdlc-models'. With trailingSlash: true, Next.js generates 'sdlc-models/index.html', which standard static web servers resolve seamlessly!"
                }
            },
            {
                "id": "next-config-code",
                "title": "9.2 The Production next.config.mjs Configuration",
                "content": """The configuration below dynamically handles local development (where `basePath` is empty) and GitHub Actions production deployment (where `basePath` is prefixed with the repository name):""",
                "codeSnippet": {
                    "language": "javascript",
                    "code": """/** @type {import('next').NextConfig} */
const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH;

let basePath = '';
if (envBasePath !== undefined) {
  basePath = envBasePath;
} else if (process.env.GITHUB_ACTIONS) {
  // Automatically fallback to repository name if running in GitHub Actions
  basePath = '/SA-mat';
}

const nextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;""",
                    "caption": "Production-hardened next.config.mjs supporting local dev and GitHub Pages"
                }
            },
            {
                "id": "actions-workflow",
                "title": "9.3 Automated GitHub Actions CI/CD Pipeline (.github/workflows/nextjs.yml)",
                "content": """The deployment pipeline file is located at `.github/workflows/nextjs.yml`. This workflow triggers automatically on every git push to `main`, provisions an Ubuntu runner with Node.js, installs dependencies using `npm ci`, builds the static site with `NEXT_PUBLIC_BASE_PATH`, and deploys directly to the GitHub Pages edge network.""",
                "codeSnippet": {
                    "language": "yaml",
                    "code": """name: Deploy Next.js site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Setup Pages
        uses: actions/configure-pages@v5
        with:
          static_site_generator: next

      - name: Install Dependencies
        run: npm ci

      - name: Build Next.js Static Export
        env:
          NEXT_PUBLIC_BASE_PATH: /${{ github.event.repository.name }}
        run: npx --no-install next build

      - name: Upload Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5""",
                    "caption": "Complete production GitHub Actions CI/CD workflow"
                }
            },
            {
                "id": "troubleshooting-faq",
                "title": "9.4 Verification, Common Pitfalls & Troubleshooting",
                "content": """### 🛠️ Common Deployment Pitfalls & Instant Fixes

1. **Pitfall 1: Blank White Screen or Unstyled Text (Missing CSS Chunks)**
   - *Symptom:* Browser console shows `404 Not Found` for `/_next/static/css/...`.
   - *Root Cause:* The application was built without the `/SA-mat` `basePath`.
   - *Fix:* Ensure `NEXT_PUBLIC_BASE_PATH: /${{ github.event.repository.name }}` is declared in the GitHub Actions build environment variables.

2. **Pitfall 2: `npm ci` Fails on GitHub Actions**
   - *Symptom:* `npm error: package-lock.json is out of date with package.json`.
   - *Root Cause:* Dependencies were added locally using `npm install` but `package-lock.json` was not committed to git.
   - *Fix:* Run `npm install` locally, verify `git status` shows `package-lock.json` modified, and push both files to `main`.

3. **Pitfall 3: Git Push Rejected (Non-Fast-Forward)**
   - *Symptom:* `! [rejected] main -> main (fetch first)`.
   - *Root Cause:* A remote commit exists on GitHub (e.g. initial workflow file) that does not exist in local branch history.
   - *Fix:* Execute `git fetch origin && git rebase origin/main` to rebase local commits cleanly, then execute `git push origin main`.

4. **Pitfall 4: Images Throwing 500 / Failing to Render**
   - *Symptom:* Broken image icons across the page.
   - *Root Cause:* Default `next/image` requires an active Node.js server for on-demand WebP resizing.
   - *Fix:* Add `images: { unoptimized: true }` in `next.config.mjs`.""",
                "table": {
                    "headers": ["Error Symptom", "Root Cause", "Immediate Resolution"],
                    "rows": [
                        ["404 on CSS/JS chunks", "Missing basePath in Next.js config", "Export with NEXT_PUBLIC_BASE_PATH set to repo name"],
                        ["npm ci build failure", "Uncommitted package-lock.json", "Run npm install locally, commit and push package-lock.json"],
                        ["404 on direct URL refresh", "Missing index.html in subpath", "Add trailingSlash: true to next.config.mjs"],
                        ["Broken image links", "Missing unoptimized flag", "Add images: { unoptimized: true } to next.config.mjs"]
                    ]
                },
                "callout": {
                    "type": "amber",
                    "title": "Live Production Invariant Checklist",
                    "text": "Before leaving for your exam: 1) Check GitHub Actions tab shows green checkmark. 2) Visit https://r-zin.github.io/SA-mat/ and press Ctrl+Shift+R for hard refresh. 3) Open F12 DevTools Console to confirm zero red errors!"
                }
            }
        ]
    }
