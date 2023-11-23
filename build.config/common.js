const rewritesConfig = require('./rewrites/index');
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return rewritesConfig;
  },
  images: {
    loader: 'akamai',
    path: '',
    domains: ['raw.githubusercontent.com'],
  },

  productionBrowserSourceMaps: true,
  webpack: (config, { webpack }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.ignoreWarnings = [{ module: /node_modules/ }];
    return config;
  },
};
