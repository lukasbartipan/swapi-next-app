/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vieraboschkova.github.io",
        pathname: "/swapi-gallery/static/assets/img/people/**",
      },
    ],
  },
};

module.exports = nextConfig;
