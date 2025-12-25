"use client";

import { Settings as SettingsIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
            <Label>Calculation Mode</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={
                  preferences.calculationMode === "calendar"
                    ? "default"
                    : "outline"
                }
                onClick={() => handleModeChange("calendar")}
              >
                Calendar Days
              </Button>
              <Button
                type="button"
                variant={
                  preferences.calculationMode === "business"
                    ? "default"
                    : "outline"
                }
                onClick={() => handleModeChange("business")}
              >
                Business Days
              </Button>
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
              <Label htmlFor="show-both" className="cursor-pointer">
                Show Both Metrics
              </Label>
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

          <Separator />

          {/* Manage Off Days */}
          <Button
            type="button"
            variant="secondary"
            onClick={onManageOffDays}
            className="w-full justify-start h-auto py-3"
          >
            <div className="text-left">
              <div className="font-medium">Manage Custom Off-Days</div>
              <div className="text-xs text-muted-foreground mt-1 font-normal">
                Add company holidays or personal off-days
              </div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
