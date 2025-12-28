import type { NextConfig } from "next";
import { execSync } from "child_process";

const getGitHash = () => {
  // Try Vercel's env var first (for cloud builds)
  if (process.env.VERCEL_GIT_COMMIT_SHA) {
    return process.env.VERCEL_GIT_COMMIT_SHA.substring(0, 7);
  }

  // Fall back to local git command (for local builds)
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch (error) {
    return "dev";
  }
};

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_GIT_HASH: getGitHash(),
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
};

export default nextConfig;
