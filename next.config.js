/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly use webpack mode for GLSL shader support
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: "asset/source",
    });
    return config;
  },

  // Provide empty turbopack config to silence the warning
  turbopack: {},
};

module.exports = nextConfig;
