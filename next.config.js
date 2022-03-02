const isProd = process.env.NODE_ENV === "production";

module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  assetPrefix: isProd ? process.env.CDN_ENDPOINT : "",
};
