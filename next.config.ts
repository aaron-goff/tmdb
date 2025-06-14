import type { NextConfig } from 'next'

const isProd = process.env['IS_PROD'];

const nextConfig: NextConfig = {
    /* config options here */
    compiler: {
        removeConsole: false
    },
    assetPrefix: isProd ? '/tmdb/' : '',
    basePath: isProd ? '/tmdb/' : '',
    output: 'export',
    images: {
        'unoptimized': true
    }
}

export default nextConfig
