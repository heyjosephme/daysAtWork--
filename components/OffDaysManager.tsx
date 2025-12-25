"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { CustomOffDay } from "@/types";

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

  // Helper to parse date string in local timezone (avoids UTC conversion)
  const parseLocalDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const handleAddOffDay = () => {
    if (!selectedDate) return;

    // Format date without timezone conversion (use local date)
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

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
  const offDayDates = customOffDays.map((day) => parseLocalDate(day.date));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            <DialogTitle>Manage Custom Off-Days</DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Add new off-day */}
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">Select Date</Label>
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

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Company event, Personal day"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && selectedDate) {
                    handleAddOffDay();
                  }
                }}
              />
            </div>

            <Button
              type="button"
              onClick={handleAddOffDay}
              disabled={!selectedDate}
              className="w-full"
            >
              <Plus className="w-4 h-4" />
              Add Off-Day
            </Button>
          </div>

          {/* Right: List of custom off-days */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Custom Off-Days</span>
              <Badge variant="secondary">{customOffDays.length}</Badge>
            </div>

            {customOffDays.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm">
                <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No custom off-days added yet.</p>
                <p className="mt-1">Select a date to add your first off-day.</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {customOffDays
                  .sort(
                    (a, b) =>
                      new Date(a.date).getTime() - new Date(b.date).getTime(),
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
                          {format(parseLocalDate(offDay.date), "MMMM d, yyyy")}
                        </div>
                        {offDay.description && (
                          <div className="text-xs text-muted-foreground mt-0.5 truncate">
                            {offDay.description}
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemove(offDay.date)}
                        className="text-destructive opacity-0 group-hover:opacity-100 hover:bg-destructive/10"
                        aria-label={`Remove ${format(
                          parseLocalDate(offDay.date),
                          "MMMM d, yyyy",
                        )}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
              </div>
            )}
          </div>
        </div>

        <Separator className="my-6" />

        <Alert>
          <AlertDescription>
            <strong>Note:</strong> Custom off-days are excluded from business
            days calculations along with weekends and Japanese public holidays.
          </AlertDescription>
        </Alert>
      </DialogContent>
    </Dialog>
  );
}
