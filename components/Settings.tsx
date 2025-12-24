"use client";

import { Settings as SettingsIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5" />
            <DialogTitle>Settings</DialogTitle>
          </div>
        </DialogHeader>

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
            <Switch
              id="show-both"
              checked={preferences.showBothMetrics}
              onCheckedChange={handleShowBothToggle}
            />
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
      </DialogContent>
    </Dialog>
  );
}
