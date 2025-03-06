// next.config.js
interface WebpackConfig {
  module: {
    rules: Array<{
      test: RegExp;
      use: string[];
    }>;
  };
}

interface NextConfig {
  webpack: (config: WebpackConfig) => WebpackConfig;
}

const nextConfig: NextConfig = {
  webpack(config: WebpackConfig): WebpackConfig {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;

