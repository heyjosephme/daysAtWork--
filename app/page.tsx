"use client";

import { Settings as SettingsIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { CountdownDisplay } from "@/components/CountdownDisplay";
import { CountdownForm } from "@/components/CountdownForm";
import { OffDaysManager } from "@/components/OffDaysManager";
import { Settings } from "@/components/Settings";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { CustomOffDay, UserPreferences } from "@/types";

const STORAGE_EXIT_KEY = "exitDate";
const STORAGE_START_KEY = "startDate";
const STORAGE_OFF_DAYS_KEY = "customOffDays";
const STORAGE_PREFERENCES_KEY = "preferences";

export default function Home() {
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [customOffDays, setCustomOffDays] = useState<CustomOffDay[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences>({
    calculationMode: "calendar",
    showBothMetrics: true,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showOffDaysManager, setShowOffDaysManager] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedExit = localStorage.getItem(STORAGE_EXIT_KEY);
    const storedStart = localStorage.getItem(STORAGE_START_KEY);
    const storedOffDays = localStorage.getItem(STORAGE_OFF_DAYS_KEY);
    const storedPrefs = localStorage.getItem(STORAGE_PREFERENCES_KEY);

    if (storedExit) {
      setTargetDate(new Date(storedExit));
    }
    if (storedStart) {
      setStartDate(new Date(storedStart));
    }
    if (storedOffDays) {
      try {
        setCustomOffDays(JSON.parse(storedOffDays));
      } catch (e) {
        console.error("Failed to parse custom off days:", e);
      }
    }
    if (storedPrefs) {
      try {
        setPreferences(JSON.parse(storedPrefs));
      } catch (e) {
        console.error("Failed to parse preferences:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const handleDateSubmit = (exitDate: Date, submittedStartDate: Date) => {
    setTargetDate(exitDate);
    setStartDate(submittedStartDate);
    localStorage.setItem(STORAGE_EXIT_KEY, exitDate.toISOString());
    localStorage.setItem(STORAGE_START_KEY, submittedStartDate.toISOString());
  };

  const handleReset = () => {
    setTargetDate(null);
    setStartDate(null);
    localStorage.removeItem(STORAGE_EXIT_KEY);
    localStorage.removeItem(STORAGE_START_KEY);
  };

  const handleAddOffDay = (offDay: CustomOffDay) => {
    const updatedOffDays = [...customOffDays, offDay];
    setCustomOffDays(updatedOffDays);
    localStorage.setItem(STORAGE_OFF_DAYS_KEY, JSON.stringify(updatedOffDays));
  };

  const handleRemoveOffDay = (date: string) => {
    const updatedOffDays = customOffDays.filter((day) => day.date !== date);
    setCustomOffDays(updatedOffDays);
    localStorage.setItem(STORAGE_OFF_DAYS_KEY, JSON.stringify(updatedOffDays));
  };

  const handlePreferencesChange = (prefs: UserPreferences) => {
    setPreferences(prefs);
    localStorage.setItem(STORAGE_PREFERENCES_KEY, JSON.stringify(prefs));
  };

  const handleManageOffDays = () => {
    setShowSettings(false);
    setShowOffDaysManager(true);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          type="button"
          onClick={() => setShowSettings(true)}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label="Open settings"
        >
          <SettingsIcon className="w-5 h-5" />
        </button>
        <ThemeToggle />
      </div>
      <main className="max-w-4xl w-full space-y-12">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold tracking-tight">Days at Work--</h1>
          <p className="text-muted-foreground text-lg">
            Count down to your freedom
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {targetDate ? (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <CountdownDisplay
                targetDate={targetDate}
                startDate={startDate}
                customOffDays={customOffDays}
                preferences={preferences}
              />
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-sm text-muted-foreground hover:text-foreground underline transition-colors"
                >
                  Change date
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.4 }}
              className="max-w-md mx-auto"
            >
              <CountdownForm
                onSubmit={handleDateSubmit}
                defaultExitDate={targetDate || undefined}
                defaultStartDate={startDate || undefined}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Settings Modal */}
      <Settings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        preferences={preferences}
        onPreferencesChange={handlePreferencesChange}
        onManageOffDays={handleManageOffDays}
      />

      {/* Off Days Manager Modal */}
      <OffDaysManager
        isOpen={showOffDaysManager}
        onClose={() => setShowOffDaysManager(false)}
        customOffDays={customOffDays}
        onAdd={handleAddOffDay}
        onRemove={handleRemoveOffDay}
      />
    </div>
  );
}
