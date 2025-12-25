"use client";

import { motion } from "motion/react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { MilestoneData, MilestonePosition } from "@/types";

interface MilestoneCelebrationProps {
  milestone: MilestonePosition | null;
  isOpen: boolean;
  onClose: () => void;
}

const MILESTONE_DATA: Record<MilestonePosition, MilestoneData> = {
  25: {
    emoji: "🎯",
    title: "Quarter Way There!",
    message: "25% less suffering! Keep going!",
    gradient: "from-green-500 to-emerald-500",
  },
  50: {
    emoji: "🎉",
    title: "Halfway Point!",
    message: "50% done with this nonsense! You're crushing it!",
    gradient: "from-blue-500 to-cyan-500",
  },
  75: {
    emoji: "🚀",
    title: "Final Stretch!",
    message: "75% towards freedom! Almost there!",
    gradient: "from-purple-500 to-pink-500",
  },
};

export function MilestoneCelebration({
  milestone,
  isOpen,
  onClose,
}: MilestoneCelebrationProps) {
  if (!milestone) return null;

  const data = MILESTONE_DATA[milestone];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-md text-center"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">{data.title}</DialogTitle>
        <motion.div
          className="space-y-6 py-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
        >
          {/* Emoji */}
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0, type: "spring", stiffness: 200 }}
          >
            <motion.p
              className="text-7xl"
              animate={{
                scale: 1.2,
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              {data.emoji}
            </motion.p>
          </motion.div>

          {/* Title */}
          <motion.p
            className={`text-4xl font-bold bg-gradient-to-r ${data.gradient} bg-clip-text text-transparent`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {data.title}
          </motion.p>

          {/* Message */}
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {data.message}
          </motion.p>

          {/* Dismiss Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button onClick={onClose} className="w-full">
              Awesome!
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
