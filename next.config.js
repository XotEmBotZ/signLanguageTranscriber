const basePath = ''

const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    cacheStartUrl:true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
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
