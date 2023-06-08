/** @type {import('next').NextConfig} */
const nextConfig = {
        images: {
            remotePatterns: [{
              protocol: 'https',
              hostname: 'firebasestorage.googleapis.com',
              port: '',
              pathname: '/realfullstack.appspot.com/o/nanaama%40gmail.com%2FIMG_20230125_144106_681%20(2).jpge4ad2835-b0be-4c70-8b6e-3456c303e4fa?alt=media&token=8ebf20e1-190a-4fee-94e0-87588f26cb06'
            }]
          }
}

module.exports = nextConfig
