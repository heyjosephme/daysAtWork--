"use client";

import { useEffect, useRef, useState } from "react";
import type { MilestonePosition } from "@/types";

const STORAGE_MILESTONES_KEY = "celebratedMilestones";
const MILESTONES: MilestonePosition[] = [25, 50, 75];

interface UseMilestonesReturn {
  currentMilestone: MilestonePosition | null;
  showCelebration: boolean;
  markCelebrated: () => void;
  getMarkerState: (position: MilestonePosition) => boolean;
}

export function useMilestones(
  percentage: number,
  exitDate: Date | null,
  startDate: Date | null,
): UseMilestonesReturn {
  const [celebratedMilestones, setCelebratedMilestones] = useState<string[]>(
    [],
  );
  const [currentMilestone, setCurrentMilestone] =
    useState<MilestonePosition | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const prevPercentage = useRef(0);
  const prevDatesRef = useRef<string>("");

  // Load celebrated milestones from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_MILESTONES_KEY);
    if (stored) {
      try {
        setCelebratedMilestones(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse celebrated milestones:", e);
      }
    }
  }, []);

  // Reset milestones when dates change
  useEffect(() => {
    const datesKey = `${exitDate?.toISOString()}-${startDate?.toISOString()}`;
    if (prevDatesRef.current && prevDatesRef.current !== datesKey) {
      // Dates changed, reset celebrated milestones
      setCelebratedMilestones([]);
      localStorage.removeItem(STORAGE_MILESTONES_KEY);
      setShowCelebration(false);
      setCurrentMilestone(null);
    }
    prevDatesRef.current = datesKey;
  }, [exitDate, startDate]);

  // Detect milestone crossing
  useEffect(() => {
    // Find the highest milestone that has been crossed
    for (let i = MILESTONES.length - 1; i >= 0; i--) {
      const milestone = MILESTONES[i];
      const milestoneKey = `milestone-${milestone}`;

      // Check if we just crossed this milestone
      const crossed =
        prevPercentage.current < milestone && percentage >= milestone;

      if (crossed && !celebratedMilestones.includes(milestoneKey)) {
        // Trigger celebration for this milestone
        setCurrentMilestone(milestone);
        setShowCelebration(true);
        break;
      }
    }

    prevPercentage.current = percentage;
  }, [percentage, celebratedMilestones]);

  const markCelebrated = () => {
    if (currentMilestone) {
      const milestoneKey = `milestone-${currentMilestone}`;
      const updated = [...celebratedMilestones, milestoneKey];
      setCelebratedMilestones(updated);
      localStorage.setItem(STORAGE_MILESTONES_KEY, JSON.stringify(updated));
      setShowCelebration(false);
      setCurrentMilestone(null);
    }
  };

  const getMarkerState = (position: MilestonePosition): boolean => {
    return percentage >= position;
  };

  return {
    currentMilestone,
    showCelebration,
    markCelebrated,
    getMarkerState,
  };
}
