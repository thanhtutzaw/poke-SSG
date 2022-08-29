/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
}

module.exports = nextConfig

module.exports = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: ['jherr-pokemon.s3.us-west-1.amazonaws.com'],

  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  
}



// module.exports = {
//   experimental: {
//     scrollRestoration: true,
//   },
//   images: {
//   },
// };
