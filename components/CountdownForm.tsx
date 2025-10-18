"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  exitDate: z.date({
    message: "Please select an exit date",
  }),
  startDate: z.date().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CountdownFormProps {
  onSubmit: (exitDate: Date, startDate: Date) => void;
  defaultExitDate?: Date;
  defaultStartDate?: Date;
}

export function CountdownForm({
  onSubmit,
  defaultExitDate,
  defaultStartDate,
}: CountdownFormProps) {
  const [selectedExitDate, setSelectedExitDate] = useState<Date | undefined>(
    defaultExitDate
  );
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(
    defaultStartDate || new Date()
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
          <label className="text-sm font-medium">Custom start date</label>
          <p className="text-xs text-muted-foreground">
            Set when you started planning to leave
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowStartDate(!showStartDate)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            showStartDate ? "bg-primary" : "bg-input"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              showStartDate ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Start date calendar (conditional) */}
      {showStartDate && (
        <div className="space-y-3">
          <label className="text-sm font-medium">
            When did you start planning to leave?
          </label>
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
        <label className="text-sm font-medium">When are you leaving?</label>
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

      <Button type="submit" className="w-full" disabled={!selectedExitDate}>
        Start Countdown
      </Button>
    </form>
  );
}
