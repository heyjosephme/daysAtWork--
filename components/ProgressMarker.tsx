"use client";

import { motion } from "motion/react";
import type { MilestonePosition } from "@/types";

interface ProgressMarkerProps {
  position: MilestonePosition;
  isActive: boolean;
  emoji: string;
}

const GRADIENT_MAP: Record<MilestonePosition, string> = {
  25: "from-green-500 to-emerald-500",
  50: "from-blue-500 to-cyan-500",
  75: "from-purple-500 to-pink-500",
};

export function ProgressMarker({
  position,
  isActive,
  emoji,
}: ProgressMarkerProps) {
  const gradient = GRADIENT_MAP[position];

  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 z-10"
      style={{ left: `${position}%`, transform: "translate(-50%, -50%)" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
    >
      {isActive ? (
        <motion.div
          className={`w-3 h-3 rounded-full bg-gradient-to-r ${gradient} shadow-lg`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
        >
          <motion.div
            className={`absolute inset-0 rounded-full bg-gradient-to-r ${gradient} opacity-50 blur-sm`}
            animate={{ scale: 1.05 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <span className="sr-only">
            {emoji} Milestone {position}% reached
          </span>
        </motion.div>
      ) : (
        <div className="w-2 h-2 rounded-full bg-gray-400/30 border border-gray-400/50">
          <span className="sr-only">Milestone {position}%</span>
        </div>
      )}
    </motion.div>
  );
}
