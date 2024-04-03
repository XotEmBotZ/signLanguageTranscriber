const basePath = process.env.NODE_ENV === 'production' ? '/singLanguageTranscriber' : '';

const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    cacheStartUrl:true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: `${basePath}`,
    env: {
        basePath
    }
    // assetPrefix: `${basePath}`,
    // images: {
    //     unoptimized: true,
    // },
}

module.exports = withPWA(nextConfig)
