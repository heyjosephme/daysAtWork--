"use client";

import { Settings as SettingsIcon, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { UserPreferences } from "@/types";

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onPreferencesChange: (prefs: UserPreferences) => void;
  onManageOffDays: () => void;
}

export function Settings({
  isOpen,
  onClose,
  preferences,
  onPreferencesChange,
  onManageOffDays,
}: SettingsProps) {
  const handleModeChange = (mode: "calendar" | "business") => {
    onPreferencesChange({
      ...preferences,
      calculationMode: mode,
    });
  };

  const handleShowBothToggle = () => {
    onPreferencesChange({
      ...preferences,
      showBothMetrics: !preferences.showBothMetrics,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-background border rounded-lg shadow-lg z-50 p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5" />
                <h2 className="text-xl font-semibold">Settings</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1 hover:bg-muted rounded transition-colors"
                aria-label="Close settings"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {/* Calculation Mode */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Calculation Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleModeChange("calendar")}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      preferences.calculationMode === "calendar"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background hover:bg-muted border-border"
                    }`}
                  >
                    Calendar Days
                  </button>
                  <button
                    type="button"
                    onClick={() => handleModeChange("business")}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      preferences.calculationMode === "business"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background hover:bg-muted border-border"
                    }`}
                  >
                    Business Days
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {preferences.calculationMode === "business"
                    ? "Excludes weekends, Japanese holidays, and custom off-days"
                    : "Counts all calendar days"}
                </p>
              </div>

              {/* Show Both Metrics */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label
                    htmlFor="show-both"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Show Both Metrics
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Display calendar and business days simultaneously
                  </p>
                </div>
                <button
                  type="button"
                  id="show-both"
                  onClick={handleShowBothToggle}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    preferences.showBothMetrics
                      ? "bg-primary"
                      : "bg-muted-foreground/30"
                  }`}
                  aria-label="Toggle show both metrics"
                >
                  <motion.div
                    className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
                    animate={{
                      left: preferences.showBothMetrics ? "22px" : "2px",
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              {/* Manage Off Days */}
              <div className="pt-4 border-t">
                <button
                  type="button"
                  onClick={onManageOffDays}
                  className="w-full px-4 py-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-left"
                >
                  <div className="font-medium">Manage Custom Off-Days</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Add company holidays or personal off-days
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
