"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  exitDate: z.date({
    message: "Please select an exit date",
  }),
  startDate: z.date().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CountdownFormProps {
  onSubmit: (exitDate: Date, startDate: Date) => void;
  onCancel?: () => void;
  defaultExitDate?: Date;
  defaultStartDate?: Date;
}

export function CountdownForm({
  onSubmit,
  onCancel,
  defaultExitDate,
  defaultStartDate,
}: CountdownFormProps) {
  const [selectedExitDate, setSelectedExitDate] = useState<Date | undefined>(
    defaultExitDate,
  );
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(
    defaultStartDate || new Date(),
  );
  const [showStartDate, setShowStartDate] = useState(!!defaultStartDate);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exitDate: defaultExitDate,
      startDate: defaultStartDate || new Date(),
    },
  });

  const handleExitDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedExitDate(date);
      setValue("exitDate", date);
    }
  };

  const handleStartDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedStartDate(date);
      setValue("startDate", date);
    }
  };

  const onFormSubmit = (data: FormValues) => {
    const finalStartDate = showStartDate
      ? data.startDate || new Date()
      : new Date();
    onSubmit(data.exitDate, finalStartDate);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Toggle for custom start date */}
      <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
        <div className="space-y-0.5">
          <Label htmlFor="custom-start" className="cursor-pointer">
            Custom start date
          </Label>
          <p className="text-xs text-muted-foreground">
            Set when you started planning to leave
          </p>
        </div>
        <Switch
          id="custom-start"
          checked={showStartDate}
          onCheckedChange={setShowStartDate}
        />
      </div>

      {/* Start date calendar (conditional) */}
      {showStartDate && (
        <div className="space-y-3">
          <Label>When did you start planning to leave?</Label>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedStartDate}
              onSelect={handleStartDateSelect}
              disabled={(date) => date > new Date()}
              initialFocus
            />
          </div>
          {selectedStartDate && (
            <p className="text-center text-sm text-muted-foreground">
              Start date: {format(selectedStartDate, "MMMM d, yyyy")}
            </p>
          )}
          {errors.startDate && (
            <p className="text-sm text-red-500 text-center">
              {errors.startDate.message}
            </p>
          )}
        </div>
      )}

      {/* Exit date calendar (always shown) */}
      <div className="space-y-3">
        <Label>When are you leaving?</Label>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedExitDate}
            onSelect={handleExitDateSelect}
            disabled={(date) => date < new Date()}
            initialFocus={!showStartDate}
          />
        </div>
        {selectedExitDate && (
          <p className="text-center text-sm text-muted-foreground">
            Exit date: {format(selectedExitDate, "MMMM d, yyyy")}
          </p>
        )}
        {errors.exitDate && (
          <p className="text-sm text-red-500 text-center">
            {errors.exitDate.message}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          className={onCancel ? "flex-1" : "w-full"}
          disabled={!selectedExitDate}
        >
          Start Countdown
        </Button>
      </div>
    </form>
  );
}
