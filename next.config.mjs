/** @type {import('next').NextConfig} */
// When deploying to GitHub Pages repository 'SA-mat', base path is '/SA-mat'
// When deploying to custom domain or testing locally, basePath can be empty ''
const isProd = process.env.NODE_ENV === 'production';
const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH;

let basePath = '';
if (envBasePath !== undefined) {
  basePath = envBasePath;
} else if (process.env.GITHUB_ACTIONS) {
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

export default nextConfig;
