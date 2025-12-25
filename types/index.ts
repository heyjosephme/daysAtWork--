export interface CustomOffDay {
  date: string; // ISO date string
  description?: string;
}

export interface UserPreferences {
  calculationMode: "calendar" | "business";
  showBothMetrics: boolean;
}

export type MilestonePosition = 25 | 50 | 75;

export interface MilestoneData {
  emoji: string;
  title: string;
  message: string;
  gradient: string;
}
