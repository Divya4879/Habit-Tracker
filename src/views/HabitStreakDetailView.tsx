// src/views/HabitStreakDetailView.tsx
import React, { useState } from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartValueAxis,
  ChartValueAxisItem,
} from "@progress/kendo-react-charts";
import { Habit } from "../types";
import { TAGS } from "../components/HabitForm";
import "@progress/kendo-theme-default/dist/all.css";

interface HabitStreakDetailViewProps {
  habits: Habit[];
}

const HabitStreakDetailView: React.FC<HabitStreakDetailViewProps> = ({ habits }) => {
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(habits.length > 0 ? habits[0] : null);
  const categories = Array.from({ length: 30 }, (_, i) => (i + 1).toString());
  // Convert streakHistory to binary: 1 if value > 0, else 0.
  const binaryData = selectedHabit ? selectedHabit.streakHistory.map(val => (val > 0 ? 1 : 0)) : [];
  // Determine color based on first tag:
  const habitColor =
    selectedHabit && selectedHabit.tags && selectedHabit.tags.length > 0
      ? TAGS.find(t => t.text.toLowerCase() === selectedHabit.tags[0].toLowerCase())?.color || "#007acc"
      : "#007acc";

  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={{ textAlign: "center" }}>Habit Streak Detail</h2>
      <div style={{ marginBottom: "1rem" }}>
        <DropDownList
          data={habits}
          textField="name"
          dataItemKey="id"
          value={selectedHabit}
          onChange={(e) => setSelectedHabit(e.value)}
        />
      </div>
      {selectedHabit && (
        <Chart>
          <ChartCategoryAxis>
            <ChartCategoryAxisItem categories={categories} />
          </ChartCategoryAxis>
          <ChartValueAxis>
            <ChartValueAxisItem min={0} max={1} majorUnit={1} labels={{ format: "{0}" }} />
          </ChartValueAxis>
          <ChartSeries>
            <ChartSeriesItem type="column" data={binaryData} name={selectedHabit.name} color={habitColor} />
          </ChartSeries>
        </Chart>
      )}
    </div>
  );
};

export default HabitStreakDetailView;
