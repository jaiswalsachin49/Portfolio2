/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Turbopack completely
  experimental: {
    turbo: false,
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: "asset/source",
    });
    return config;
  },
};

module.exports = nextConfig;
