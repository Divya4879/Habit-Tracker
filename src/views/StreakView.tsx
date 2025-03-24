import React, { useState } from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartValueAxis,
  ChartValueAxisItem
} from "@progress/kendo-react-charts";
import { Habit } from "../types";
import { TAGS } from "../components/HabitForm";
import "@progress/kendo-theme-default/dist/all.css";

const getOrdinal = (n: number): string => {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const formatDate = (date: Date): string => {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${getOrdinal(day)} ${month}, ${year}`;
};

const getLast30Dates = (): Date[] => {
  const dates: Date[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dates.push(d);
  }
  return dates;
};

interface StreakViewProps {
  habits: Habit[];
}

const StreakView: React.FC<StreakViewProps> = ({ habits }) => {
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(habits.length > 0 ? habits[0] : null);
  const [viewType, setViewType] = useState<"weekly" | "monthly">("weekly");

  const weeklyCategories = Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`);

  const monthlyCategories = Array.from({ length: 30 }, (_, i) => `${i + 1}`);

  const getWeeklyData = (habit: Habit): number[] => {
    const last7 = habit.streakHistory.slice(-7);
    return last7.map(val => (val > 0 ? 1 : 0));
  };

  const getMonthlyData = (habit: Habit): number[] => {
    const last30 = habit.streakHistory.slice(-30);
    return last30.map(val => (val > 0 ? 1 : 0));
  };

  const last30Dates = getLast30Dates(); 

  const getTooltipContent = (index: number): string => {
    const date = last30Dates[index];
    const formatted = formatDate(date);
   
    localStorage.setItem("hoveredDate", formatted);
    return `<span style="color: var(--text-color)">${formatted}</span>`;
  };

  const habitColor =
    selectedHabit && selectedHabit.tags && selectedHabit.tags.length > 0
      ? TAGS.find(t => t.text.toLowerCase() === selectedHabit.tags[0].toLowerCase())?.color || "var(--primary-color)"
      : "var(--primary-color)";

  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={{ textAlign: "center", color: "var(--text-color)" }}>Streak Charts</h2>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
        <div style={{ margin: "0.5rem" }}>
          <label style={{ marginRight: "0.5rem", color: "var(--text-color)" }}>Time Period:</label>
          <DropDownList
            data={["weekly", "monthly"]}
            value={viewType}
            onChange={(e) => setViewType(e.value)}
          />
        </div>
        <div style={{ margin: "0.5rem" }}>
          <label style={{ marginRight: "0.5rem", color: "var(--text-color)" }}>Habit:</label>
          <DropDownList
            data={habits}
            textField="name"
            dataItemKey="id"
            value={selectedHabit}
            onChange={(e) => setSelectedHabit(e.value)}
          />
        </div>
      </div>
      {selectedHabit && viewType === "weekly" && (
        <Chart>
          <ChartCategoryAxis>
            <ChartCategoryAxisItem categories={weeklyCategories} />
          </ChartCategoryAxis>
          <ChartValueAxis>
            <ChartValueAxisItem min={0} max={1} majorUnit={1} labels={{ format: "{0}" }} />
          </ChartValueAxis>
          <ChartSeries>
            <ChartSeriesItem
              type="column"
              data={getWeeklyData(selectedHabit)}
              name={selectedHabit.name}
              color={habitColor}
              tooltip={{ visible: false }}
            />
          </ChartSeries>
        </Chart>
      )}
      {selectedHabit && viewType === "monthly" && (
        <Chart>
          <ChartCategoryAxis>
            <ChartCategoryAxisItem categories={monthlyCategories} title={{ text: "Days" }} />
          </ChartCategoryAxis>
          <ChartValueAxis>
            <ChartValueAxisItem min={0} max={1} majorUnit={1} labels={{ format: "{0}" }} />
          </ChartValueAxis>
          <ChartSeries>
            <ChartSeriesItem
              type="column"
              data={getMonthlyData(selectedHabit)}
              name={selectedHabit.name}
              color={habitColor}
              tooltip={
                {
                  visible: true,
                  
                  template: (e: any) => getTooltipContent(e.point.index)
                } as any
              }
            />
          </ChartSeries>
        </Chart>
      )}
    </div>
  );
};

export default StreakView;
