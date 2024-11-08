/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/**'
          },
          {
            protocol: 'http',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/**'
          }
        ]
      },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },  
      

};

export default nextConfig;
