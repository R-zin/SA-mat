"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check, ExternalLink, Globe, ShieldCheck, AlertCircle } from "lucide-react";

export default function DeploymentGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(1);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const steps = [
    {
      num: 1,
      title: "Configure Static Export in next.config.mjs",
      desc: "Enable pure static generation (SSG) with automatic base path resolution for repository sub-paths.",
      snippet: `/** @type {import('next').NextConfig} */
const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH;

let basePath = '';
if (envBasePath !== undefined) {
  basePath = envBasePath;
} else if (process.env.GITHUB_ACTIONS) {
  basePath = '/SA-mat'; // Matches GitHub repo name
}

const nextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath ? \`\${basePath}/\` : undefined,
  images: {
    unoptimized: true, // Disables Node.js image server
  },
  trailingSlash: true, // Prevents 404s on page refresh
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;`,
      language: "javascript",
      badge: "Mandatory SSG Setting",
    },
    {
      num: 2,
      title: "Create GitHub Actions Workflow (.github/workflows/nextjs.yml)",
      desc: "Automates building Next.js static export and deploying directly to GitHub Pages CDN on every push to main.",
      snippet: `name: Deploy Next.js site to Pages

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
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
      - name: Setup Pages
        uses: actions/configure-pages@v5
        with:
          static_site_generator: next
      - name: Install dependencies
        run: npm ci
      - name: Build with Next.js
        env:
          NEXT_PUBLIC_BASE_PATH: /\${{ github.event.repository.name }}
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`,
      language: "yaml",
      badge: "Automated CI/CD",
    },
    {
      num: 3,
      title: "Activate GitHub Actions in Repository Settings",
      desc: "Configure GitHub repository to deploy from GitHub Actions instead of legacy branches.",
      snippet: `# Follow these UI navigation steps in your browser:
1. Open your repository: https://github.com/R-zin/SA-mat
2. Click 'Settings' tab (top right navigation)
3. Under 'Code and automation' in the left sidebar, click 'Pages'
4. In 'Build and deployment' > 'Source', select 'GitHub Actions'
5. Push a commit to trigger deployment:
   git add .
   git commit -m "feat: setup GitHub Pages static deployment"
   git push origin main`,
      language: "bash",
      badge: "GitHub UI Setting",
    },
    {
      num: 4,
      title: "Custom Domain & DNS Records (Optional)",
      desc: "Map an institutional subdomain (e.g. docs.cse312.org) with strict TLS 1.3 encryption.",
      snippet: `# 1. Add CNAME file to public/CNAME
echo "docs.cse312.org" > public/CNAME

# 2. Add DNS Records at your Registrar/DNS Provider:
Type: CNAME
Name: docs (or @ for apex)
Target: r-zin.github.io
TTL: Auto / 3600

# 3. For apex domain (example.com), add 4 GitHub Pages A Records:
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153`,
      language: "bash",
      badge: "Custom Domain Routing",
    },
  ];

  return (
    <div className="bg-white dark:bg-claude-darkSurface border border-claude-border dark:border-claude-darkBorder rounded-lg p-6 shadow-claude-sm my-6 transition-all" id="deployment-guide">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-claude-border dark:border-claude-darkBorder gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-md bg-claude-clay text-white">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-normal text-claude-ink dark:text-white">
              GitHub Pages Deployment Interactive Manual
            </h3>
            <p className="text-xs text-claude-muted dark:text-claude-darkMuted">
              Complete production walkthrough for zero-downtime automated static export CI/CD
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-claude-mossSubtle text-claude-moss font-mono text-xs font-medium border border-claude-mossBorder">
          <ShieldCheck className="w-4 h-4" />
          <span>Production Verified</span>
        </div>
      </div>

      {/* Step Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4">
        {steps.map((s) => (
          <button
            key={s.num}
            onClick={() => setActiveStep(s.num)}
            className={`p-3 rounded-md border text-left transition-all ${
              activeStep === s.num
                ? "border-claude-clay bg-claude-claySubtle text-claude-clay dark:text-[#E89274] font-medium ring-1 ring-claude-clay shadow-2xs"
                : "border-claude-border dark:border-claude-darkBorder bg-claude-bgSubtle dark:bg-claude-darkSurfaceElevated text-claude-muted hover:text-claude-ink dark:hover:text-white"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono mb-1">
              <span>Step 0{s.num}</span>
              {activeStep === s.num && <Check className="w-3.5 h-3.5" />}
            </div>
            <div className="text-xs font-sans line-clamp-1">{s.title.split(" ")[0]} {s.title.split(" ")[1]}</div>
          </button>
        ))}
      </div>

      {/* Active Step Content */}
      {(() => {
        const current = steps[activeStep - 1];
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif text-base font-medium text-claude-ink dark:text-white">
                  Step {current.num}: {current.title}
                </h4>
                <p className="text-xs text-claude-muted dark:text-claude-darkMuted mt-0.5">{current.desc}</p>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-claude-bgSubtle dark:bg-claude-darkSurfaceElevated border border-claude-border dark:border-claude-darkBorder text-claude-muted">
                {current.badge}
              </span>
            </div>

            {/* Terminal Window */}
            <div className="rounded-lg overflow-hidden border border-claude-border dark:border-claude-darkBorder bg-[#23201C] text-[#EAE5DD] shadow-claude-sm">
              <div className="px-4 py-2 bg-[#1A1815] flex items-center justify-between border-b border-[#35302B] text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E57373]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFB74D]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#81C784]" />
                  <span className="text-[#A39B91] ml-2 text-[11px]">{current.language.toUpperCase()}</span>
                </div>
                <button
                  onClick={() => handleCopy(current.snippet, `step-${current.num}`)}
                  className="flex items-center gap-1 text-[11px] text-[#A39B91] hover:text-white transition-colors"
                >
                  {copiedKey === `step-${current.num}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-claude-clay" />
                      <span className="text-claude-clay font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed">
                <code>{current.snippet}</code>
              </pre>
            </div>
          </div>
        );
      })()}

      {/* Troubleshooting Checklist Accordion */}
      <div className="mt-6 pt-4 border-t border-claude-border dark:border-claude-darkBorder">
        <h4 className="text-xs font-mono uppercase tracking-wider text-claude-muted dark:text-claude-darkMuted font-semibold mb-3 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-claude-clay" />
          Common GitHub Pages Pitfalls &amp; Solutions
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-md border border-claude-border dark:border-claude-darkBorder bg-claude-bgSubtle dark:bg-claude-darkSurfaceElevated shadow-claude-sm">
            <span className="font-serif font-semibold text-claude-ink dark:text-white block mb-1">
              Issue 1: 404 on Page Reload / Sub-routes
            </span>
            <p className="text-claude-muted dark:text-claude-darkMuted">
              <strong className="text-claude-clay font-mono">Fix:</strong> Add <code className="bg-white dark:bg-black px-1 rounded text-claude-ink dark:text-white">trailingSlash: true</code> to <code className="bg-white dark:bg-black px-1 rounded text-claude-ink dark:text-white">next.config.mjs</code>. This forces generation of directory index files (<code className="bg-white dark:bg-black px-1 rounded text-claude-ink dark:text-white">/path/index.html</code>) matching GitHub Pages routing.
            </p>
          </div>

          <div className="p-3.5 rounded-md border border-claude-border dark:border-claude-darkBorder bg-claude-bgSubtle dark:bg-claude-darkSurfaceElevated shadow-claude-sm">
            <span className="font-serif font-semibold text-claude-ink dark:text-white block mb-1">
              Issue 2: Broken CSS Styles &amp; Images
            </span>
            <p className="text-claude-muted dark:text-claude-darkMuted">
              <strong className="text-claude-clay font-mono">Fix:</strong> Ensure <code className="bg-white dark:bg-black px-1 rounded text-claude-ink dark:text-white">basePath: &apos;/SA-mat&apos;</code> matches the exact repository name casing. Never hardcode absolute root links; use Next.js Link or relative paths.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
