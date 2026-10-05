import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // three.js ships modern ESM; transpiling keeps older targets happy.
  transpilePackages: ["three"],
};

export default withNextIntl(nextConfig);
