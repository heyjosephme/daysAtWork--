"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Calendar as CalendarIcon, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import type { CustomOffDay } from "@/types";
import { format } from "date-fns";

interface OffDaysManagerProps {
  isOpen: boolean;
  onClose: () => void;
  customOffDays: CustomOffDay[];
  onAdd: (offDay: CustomOffDay) => void;
  onRemove: (date: string) => void;
}

export function OffDaysManager({
  isOpen,
  onClose,
  customOffDays,
  onAdd,
  onRemove,
}: OffDaysManagerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [description, setDescription] = useState("");

  const handleAddOffDay = () => {
    if (!selectedDate) return;

    const dateString = selectedDate.toISOString().split("T")[0];

    // Check if this date already exists
    const exists = customOffDays.some((day) => day.date === dateString);
    if (exists) {
      alert("This date is already added as an off-day");
      return;
    }

    onAdd({
      date: dateString,
      description: description.trim() || undefined,
    });

    // Reset form
    setSelectedDate(undefined);
    setDescription("");
  };

  // Convert custom off days to Date objects for calendar highlighting
  const offDayDates = customOffDays.map((day) => new Date(day.date));

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
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-background border rounded-lg shadow-lg z-50 p-6 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                <h2 className="text-xl font-semibold">
                  Manage Custom Off-Days
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1 hover:bg-muted rounded transition-colors"
                aria-label="Close off-days manager"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left: Add new off-day */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Select Date
                  </label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    modifiers={{
                      offDay: offDayDates,
                    }}
                    modifiersStyles={{
                      offDay: {
                        backgroundColor: "var(--destructive)",
                        color: "var(--destructive-foreground)",
                        fontWeight: "bold",
                      },
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="text-sm font-medium mb-2 block"
                  >
                    Description (Optional)
                  </label>
                  <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., Company event, Personal day"
                    className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && selectedDate) {
                        handleAddOffDay();
                      }
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddOffDay}
                  disabled={!selectedDate}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Off-Day
                </button>
              </div>

              {/* Right: List of custom off-days */}
              <div className="space-y-4">
                <div className="text-sm font-medium">
                  Custom Off-Days ({customOffDays.length})
                </div>

                {customOffDays.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground text-sm">
                    <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>No custom off-days added yet.</p>
                    <p className="mt-1">
                      Select a date to add your first off-day.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                    {customOffDays
                      .sort(
                        (a, b) =>
                          new Date(a.date).getTime() -
                          new Date(b.date).getTime(),
                      )
                      .map((offDay) => (
                        <motion.div
                          key={offDay.date}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors group"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-medium">
                              {format(new Date(offDay.date), "MMMM d, yyyy")}
                            </div>
                            {offDay.description && (
                              <div className="text-xs text-muted-foreground mt-0.5 truncate">
                                {offDay.description}
                              </div>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemove(offDay.date)}
                            className="p-2 text-destructive opacity-0 group-hover:opacity-100 hover:bg-destructive/10 rounded transition-all"
                            aria-label={`Remove ${format(
                              new Date(offDay.date),
                              "MMMM d, yyyy",
                            )}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </motion.div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="mt-6 pt-6 border-t text-xs text-muted-foreground">
              <p>
                <strong>Note:</strong> Custom off-days are excluded from
                business days calculations along with weekends and Japanese
                public holidays.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
