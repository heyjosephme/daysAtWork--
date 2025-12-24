"use client";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { calculateBusinessDays } from "@/lib/business-days";

interface CountdownTime {
  // Calendar metrics
  calendarDays: number;
  hours: number;
  minutes: number;
  seconds: number;

  // Business metrics
  businessDays: number;
  businessHours: number;

  // Breakdown
  publicHolidays: number;
  weekendDays: number;
  customOffDays: number;

  // Metadata
  isExpired: boolean;
  percentage: number;
  startDate: Date | null;
}

export function useCountdown(
  targetDate: Date | null,
  startDate: Date | null = null,
  customOffDays: (Date | string)[] = [],
): CountdownTime {
  const [timeRemaining, setTimeRemaining] = useState<CountdownTime>({
    calendarDays: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    businessDays: 0,
    businessHours: 0,
    publicHolidays: 0,
    weekendDays: 0,
    customOffDays: 0,
    isExpired: false,
    percentage: 0,
    startDate: null,
  });

  useEffect(() => {
    if (!targetDate) {
      setTimeRemaining({
        calendarDays: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        businessDays: 0,
        businessHours: 0,
        publicHolidays: 0,
        weekendDays: 0,
        customOffDays: 0,
        isExpired: false,
        percentage: 0,
        startDate: null,
      });
      return;
    }

    // Use provided start date or current date
    const effectiveStartDate = startDate || new Date();

    const calculateTimeRemaining = () => {
      const now = dayjs();
      const target = dayjs(targetDate);
      const start = dayjs(effectiveStartDate);
      const diff = target.diff(now);

      if (diff <= 0) {
        setTimeRemaining({
          calendarDays: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          businessDays: 0,
          businessHours: 0,
          publicHolidays: 0,
          weekendDays: 0,
          customOffDays: 0,
          isExpired: true,
          percentage: 100,
          startDate: effectiveStartDate,
        });
        return;
      }

      // Calendar days calculation (existing logic)
      const calendarDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      // Business days calculation (new logic)
      const businessCalc = calculateBusinessDays(
        now.toDate(),
        target.toDate(),
        customOffDays,
      );

      // Calculate business hours (assuming 8-hour workdays)
      const businessHours = businessCalc.businessDays * 8;

      // Calculate percentage: (elapsed / total) * 100
      const totalTime = target.diff(start);
      const elapsedTime = now.diff(start);
      const percentage = Math.min(
        100,
        Math.max(0, (elapsedTime / totalTime) * 100),
      );

      setTimeRemaining({
        calendarDays,
        hours,
        minutes,
        seconds,
        businessDays: businessCalc.businessDays,
        businessHours,
        publicHolidays: businessCalc.publicHolidays.length,
        weekendDays: businessCalc.weekendDays,
        customOffDays: businessCalc.customOffDays,
        isExpired: false,
        percentage,
        startDate: effectiveStartDate,
      });
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [targetDate, startDate, customOffDays]);

  return timeRemaining;
}
