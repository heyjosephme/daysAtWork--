import type { NextConfig } from "next";
import { execSync } from "child_process";

const getGitHash = () => {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch (error) {
    return "unknown";
  }
};

const getBuildTime = () => {
  return new Date().toISOString();
};

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_GIT_HASH: getGitHash(),
    NEXT_PUBLIC_BUILD_TIME: getBuildTime(),
  },
};

export default nextConfig;
