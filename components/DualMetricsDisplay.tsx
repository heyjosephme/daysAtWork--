"use client";

import { motion } from "motion/react";

interface DualMetricsDisplayProps {
  calendarDays: number;
  businessDays: number;
  weekendDays: number;
  publicHolidays: number;
  customOffDays: number;
  primaryMode: "calendar" | "business";
}

export function DualMetricsDisplay({
  calendarDays,
  businessDays,
  weekendDays,
  publicHolidays,
  customOffDays,
  primaryMode,
}: DualMetricsDisplayProps) {
  const totalOffDays = weekendDays + publicHolidays + customOffDays;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      {/* Primary metric display */}
      <div className="text-center">
        <div className="text-sm text-muted-foreground mb-1">
          {primaryMode === "business" ? "Business Days" : "Calendar Days"}
        </div>
        <div className="text-4xl font-bold">
          {primaryMode === "business" ? businessDays : calendarDays}
        </div>
      </div>

      {/* Comparison */}
      <div className="text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <span className={primaryMode === "calendar" ? "font-semibold" : ""}>
            {calendarDays} calendar days
          </span>
          <span>=</span>
          <span className={primaryMode === "business" ? "font-semibold" : ""}>
            {businessDays} business days
          </span>
        </div>
      </div>

      {/* Breakdown */}
      {totalOffDays > 0 && (
        <div className="text-center text-xs text-muted-foreground">
          <div className="flex items-center justify-center gap-1 flex-wrap">
            <span>Excludes:</span>
            {weekendDays > 0 && <span>{weekendDays} weekends</span>}
            {publicHolidays > 0 && (
              <>
                {weekendDays > 0 && <span>+</span>}
                <span>{publicHolidays} holidays</span>
              </>
            )}
            {customOffDays > 0 && (
              <>
                {(weekendDays > 0 || publicHolidays > 0) && <span>+</span>}
                <span>{customOffDays} custom off-days</span>
              </>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
