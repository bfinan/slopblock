import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/1MC",
        destination:
          "https://docs.google.com/presentation/d/1I4W6cfLPrOS3EVM0a8EVuYObCpFBDEyI8ycMC8HFgVk/edit?usp=sharing",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
