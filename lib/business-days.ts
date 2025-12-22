import Holidays from "date-holidays";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

// Extend dayjs with required plugins
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);

// Initialize Japanese holidays detector
const holidays = new Holidays("JP");

export interface BusinessDaysResult {
  calendarDays: number;
  businessDays: number;
  publicHolidays: Date[];
  weekendDays: number;
  customOffDays: number;
}

/**
 * Calculate business days between two dates
 * Excludes: weekends (Sat/Sun), Japanese public holidays, and custom off-days
 *
 * @param startDate - Start date (inclusive)
 * @param endDate - End date (inclusive)
 * @param customOffDays - Array of custom off-days (ISO date strings or Date objects)
 * @returns Detailed breakdown of calendar days vs business days
 */
export function calculateBusinessDays(
  startDate: Date,
  endDate: Date,
  customOffDays: (Date | string)[] = [],
): BusinessDaysResult {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const calendarDays = end.diff(start, "days");

  // Get Japanese public holidays in date range
  // Check holidays for both start and end years (in case countdown spans multiple years)
  const yearStart = start.year();
  const yearEnd = end.year();
  const years = new Set([yearStart, yearEnd]);

  let allHolidays: any[] = [];
  for (const year of years) {
    allHolidays = allHolidays.concat(holidays.getHolidays(year));
  }

  const publicHolidays = allHolidays
    .filter((h) => {
      const holidayDate = dayjs(h.date);
      return holidayDate.isBetween(start, end, "day", "[]"); // '[]' = inclusive on both ends
    })
    .map((h) => new Date(h.date));

  let businessDays = 0;
  let weekendDays = 0;
  let customOffDaysCount = 0;

  // Iterate through each day from start to end
  let current = start;
  while (current.isSameOrBefore(end, "day")) {
    const dayOfWeek = current.day();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday = 0, Saturday = 6

    // Check if current day is a public holiday
    const isPublicHoliday = publicHolidays.some((h) =>
      dayjs(h).isSame(current, "day"),
    );

    // Check if current day is a custom off-day
    const isCustomOffDay = customOffDays.some((d) =>
      dayjs(d).isSame(current, "day"),
    );

    // Count the day based on its type
    if (isWeekend) {
      weekendDays++;
    } else if (isPublicHoliday || isCustomOffDay) {
      // Don't count as business day
      if (isCustomOffDay && !isPublicHoliday) {
        // Only count as custom off-day if it's not already a public holiday
        customOffDaysCount++;
      }
    } else {
      // It's a regular business day
      businessDays++;
    }

    current = current.add(1, "day");
  }

  return {
    calendarDays,
    businessDays,
    publicHolidays,
    weekendDays,
    customOffDays: customOffDaysCount,
  };
}
