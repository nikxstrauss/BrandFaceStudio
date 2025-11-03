/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',                 // neue Art des static exports (statt next export)
  distDir: 'dist',                  // statt .next → wird dist generiert
  trailingSlash: true,             // URLs enden auf /
  allowedDevOrigins: ["*.preview.same-app.com"], // Preview-Domain erlauben (wird nur lokal genutzt)

  images: {
    unoptimized: true,             // nötig für static export, da sonst Image Optimization nicht funktioniert
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
      "i.ytimg.com",
      "cdn-cf-east.streamable.com",
    ],
  },
};

module.exports = nextConfig;