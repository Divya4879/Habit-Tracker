// src/types.ts
export interface Habit {
  id: string;
  name: string;
  estimatedTime: string;
  streak: number;
  streakHistory: number[];
  tags: string[];
  priority: "low" | "medium" | "high";
  status: "Pending" | "Completed";
  enableReminder: boolean;
  reminderMinutes: number;
  deadline: Date;
  completedDate?: string;
}
