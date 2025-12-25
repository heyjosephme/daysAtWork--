"use client";

import { motion } from "motion/react";
import { format } from "date-fns";

export function Footer() {
  const gitHash = process.env.NEXT_PUBLIC_GIT_HASH || "dev";
  const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME || "";

  const formattedBuildTime = buildTime
    ? format(new Date(buildTime), "MMM d, yyyy HH:mm")
    : "";

  return (
    <motion.footer
      className="mt-auto py-6 text-center text-xs text-muted-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="space-y-1">
        <p>
          Version:{" "}
          <code className="font-mono bg-secondary px-1.5 py-0.5 rounded text-[10px]">
            {gitHash}
          </code>
        </p>
        {formattedBuildTime && (
          <p className="text-[10px]">Built: {formattedBuildTime}</p>
        )}
      </div>
    </motion.footer>
  );
}
