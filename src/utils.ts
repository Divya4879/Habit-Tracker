// src/utils.ts
import { Habit } from "./types";

const STORAGE_KEY = "habits";

export function loadHabits(): Habit[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    const habits = JSON.parse(data) as Habit[];
    return habits.map((h) => ({
      ...h,
      deadline: new Date(h.deadline),
    }));
  }
  return [];
}

export function saveHabits(habits: Habit[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}
