export interface CustomOffDay {
  date: string; // ISO date string
  description?: string;
}

export interface UserPreferences {
  calculationMode: "calendar" | "business";
  showBothMetrics: boolean;
}
