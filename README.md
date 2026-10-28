# CSE312 Software Architecture: Comprehensive Study Portal & Deployment Guide

> An authoritative, Scandinavian-minimalist academic documentation portal and interactive study system for **CSE312 Software Architecture: Principles and Practices**, designed with **Stitch MCP** and built with **Next.js 14/16 (Static Site Generation)** for zero-downtime deployment on **GitHub Pages**.

---

## 🌲 Nordic Design System (Crafted via Stitch MCP)

The portal interface was designed using **Stitch MCP** (`projects/7432742954782637376` — *Nordic Architectural Documentation Portal*), embracing Scandinavian functionalism and architectural drafting precision:
- **Color Palette:**
  - `Polar Night Spruce` (`#041920`, `#0F2624`, `#1A2E35`) — Deep anchor for high-contrast academic typography and navigation hierarchy.
  - `Arctic Frost / Nordic Mist` (`#F3FAFF`, `#F4F8FA`, `#EBF4F6`) — Calming, low-fatigue background planes for multi-hour technical reading.
  - `Pine Emerald` (`#2D6A4F`, `#40916C`) — Active invariants, verified proofs, and success states.
  - `Arctic Lichen Amber` (`#E07A5F`, `#D97706`) — Trade-off warnings, anti-patterns, and critical callouts.
  - `Hairline Delimiters` (`#D8E2DC` light / `#22353E` dark) — Crisp 1px structural framing.
- **Typography Pairing:**
  - **Headings & Theorems:** `Newsreader` (optical serif with literary gravitas)
  - **Prose & Layout:** `Plus Jakarta Sans` / `Geist` (hyper-legible geometric sans)
  - **Formulas & Code:** `JetBrains Mono` (tabular monospaced mathematical clarity)
- **Aesthetic Modes:** Full dynamic dark/light theme switcher (Nordic Frost $\leftrightarrow$ Polar Night) with persistent localStorage state and zero FOUC (Flash of Unstyled Content).

---

## 📚 Comprehensive Syllabus & Course Modules

Synthesized from all 10 official course lecture slides for **CSE312: Software Architecture (Prof. Anitha Ambat, IIIT Kottayam)**:

| Module | Topic Title | Key Mathematical Models & Frameworks | Source Slide Reference |
| :---: | :--- | :--- | :--- |
| **01** | **Software Engineering Foundations & SDLC Models** | 1968 NATO Crisis, Programs vs Products, Classical vs Iterative Waterfall, Boehm's Spiral Meta-Model (4 Quadrants), RAD, V-Model | `Part 1.pdf` & `CSE312 Software_part2.pdf` |
| **02** | **Requirements Engineering & SRS Specifications** | FR vs NFR, FURPS+, Davis's Abstraction Ladder, Mentcare Case Study, Quantitative Metrics, IEEE 830 SRS Standard | `Lect4.Req Eng,.pdf` |
| **03** | **Agile Software Development & Scrum** | 4 Manifesto Values, 12 Principles, XP (TDD Red-Green-Refactor, Pair Programming, Refactoring), Scrum (PO, SM, Team, Backlog, Velocity) | `Lect3.Agile SW Dev.pdf` |
| **04** | **Architectural Design & 4+1 Viewpoints** | Kruchten's 4+1 Views (Logical, Process, Development, Physical + Scenarios), Quality Attribute Trade-offs, Styles (Layered, Repository, Pipe & Filter, MVC, Microservices) | `Lect 5- Architectural design.pdf` |
| **05** | **Modular Design: Cohesion & Coupling** | Functional Independence, 7 Levels of Cohesion (Coincidental to Functional), 5 Classes of Coupling (Content to Data), Fan-in / Fan-out bounds, SA/SD Structure Charts | `lect 6-Cohesion and coupling.pdf` |
| **06** | **Software Testing, Metrics & Debugging** | Error-Fault-Failure Chain, Verification vs Validation, Black-Box (ECP, BVA $4n+1$, Robustness $6n+1$, Worst-Case $5^n$), White-Box, McCabe Cyclomatic Complexity ($M = E - N + 2P = P + 1$), Basis Path Testing, Levels & Debugging | `LECT 7-Testing and debugging_new.pdf` & `Whitebox_Blackbox.pdf` |
| **07** | **Project Management & Quantitative Estimation** | Size Metrics (LOC vs Albrecht Function Points $UFP \times VAF$), Boehm's Basic & Intermediate COCOMO (Organic, Semi-Detached, Embedded), Putnam's Model ($Effort \propto 1/t_d^4$), Boehm's 75% limit, Brooks' Law | `Project Management.pdf` |
| **08** | **Software Quality Assurance, ISO 9000 & CMM** | Quality Evolution (QC $\to$ QA $\to$ TQM), McCall's 11 Quality Factors, ISO 9001 Clauses & 9000-3, SEI CMM 5 Maturity Levels (Initial to Optimizing) & KPAs, PSP/TSP, Six Sigma (3.4 DPMO, DMAIC) | `quality_system.pdf` |
| **09** | **Next.js & GitHub Pages Deployment Manual** | Static Site Generation (SSG), `output: 'export'`, basePath resolution for repository sub-paths, GitHub Actions CI/CD pipeline, Custom Domain CNAME, 404 elimination | Production Architecture Guide |

---

## 🧮 Interactive Computational Simulators

1. **Interactive Boehm COCOMO Simulator:**
   - Dynamically slide project size ($KLOC \in [2, 300]$).
   - Toggle between **Organic**, **Semi-Detached**, and **Embedded** modes.
   - Toggle between **Basic** and **Intermediate** models with Effort Adjustment Factor ($EAF$).
   - Computes Person-Months, Calendar Duration ($T_{\text{dev}}$), and Average Team Sizing with exact step-by-step mathematical proof breakdown.
2. **McCabe Cyclomatic Complexity & CFG Explorer:**
   - Modify Edges ($E$), Nodes ($N$), and Decision Predicates ($P$).
   - Derives $V(G) = E - N + 2P$ and $V(G) = P_{\text{pred}} + 1$.
   - Live risk tier badge (Low Risk $\le 10$, Moderate $11-20$, High/Untestable $>20$).
3. **Albrecht Function Points (FP) Weighting Calculator:**
   - Configurable counts and complexity ratings (Low, Average, High) for ILF, EIF, EI, EO, EQ.
   - Adjusts 14 General System Characteristics (GSCs) $\sum F_i \in [0, 70]$ to calculate Value Adjustment Factor ($VAF$) and final Adjusted FP.
4. **Architectural Pattern Blueprint Viewer:**
   - Interactive tabs for Layered, Repository/Blackboard, Pipe and Filter, Client-Server, MVC, and Microservices Mesh.
   - Shows Scandinavian grid flow schematics, formal invariants, strengths, and quality attribute matrices.
5. **Memory Flashcard Study Tool:**
   - 10 high-yield flashcards with hints, flip-to-reveal solutions, and exam formulas.
6. **Instant Global Search (⌘K):**
   - Modal search indexing all topics, formulas, keywords, and deployment instructions.

---

## 🚀 How to Deploy to GitHub Pages (Step-by-Step)

The repository includes a production-ready automated GitHub Actions workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) configured specifically for this repository (`https://github.com/R-zin/SA-mat`).

### Step 1: Configure Static Export (`next.config.mjs`)
The configuration automatically sets `output: 'export'`, enables unoptimized images for static CDN hosting, enforces trailing slashes to eliminate 404s, and dynamically detects whether it is running on GitHub Pages:

```javascript
/** @type {import('next').NextConfig} */
const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH;

let basePath = '';
if (envBasePath !== undefined) {
  basePath = envBasePath;
} else if (process.env.GITHUB_ACTIONS) {
  basePath = '/SA-mat'; // Matches your GitHub repo name
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

export default nextConfig;
```

### Step 2: Push to GitHub `main` Branch
Commit and push all source files to the remote repository:
```bash
git add .
git commit -m "feat: complete CSE312 Nordic Software Architecture portal & GitHub Pages CI/CD"
git push -u origin main
```

### Step 3: Enable GitHub Pages via GitHub Actions
1. Navigate to your repository in your browser: `https://github.com/R-zin/SA-mat`
2. Click the **Settings** tab.
3. In the left sidebar, click **Pages** (under the *Code and automation* section).
4. Under **Build and deployment** > **Source**, select **GitHub Actions** from the dropdown menu (instead of "Deploy from a branch").

### Step 4: Verify Deployment
1. Go to the **Actions** tab in your repository.
2. The workflow `"Deploy Next.js to GitHub Pages"` will run automatically.
3. Once completed, your portal will be live at:
   **`https://r-zin.github.io/SA-mat/`**

### Step 5: Custom Domain Setup (Optional)
If attaching a custom domain (e.g. `docs.cse312.org`):
1. Create a `CNAME` file in `public/CNAME` containing your domain name:
   ```bash
   echo "docs.cse312.org" > public/CNAME
   ```
2. Add a `CNAME` record in your DNS provider pointing `docs` to `r-zin.github.io`.
3. In GitHub Pages Settings, enter your custom domain and enable **Enforce HTTPS**.

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Open browser at http://localhost:3000

# Build static production export
npm run build
```

---

## 📄 License & Attribution

- **Curriculum:** CSE312 Software Architecture: Principles and Practices (IIIT Kottayam)
- **Faculty:** Prof. Anitha Ambat
- **UI Architecture:** Designed with Stitch MCP (Nordic Architectural Documentation Portal)
