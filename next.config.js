
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  serverExternalPackages: ["firebase", "@firebase/auth"],
};

module.exports = nextConfig;