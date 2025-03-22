// src/views/FocusPieChart.tsx
import React from "react";
import { Chart, ChartSeries, ChartSeriesItem, ChartLegend } from "@progress/kendo-react-charts";
import { Habit } from "../types";
import { TAGS } from "../components/HabitForm";
import "@progress/kendo-theme-default/dist/all.css";

interface FocusPieChartProps {
  habits: Habit[];
}

const FocusPieChart: React.FC<FocusPieChartProps> = ({ habits }) => {
  // Group habits by tag (case-insensitive)
  const tagGroups: { [tag: string]: string[] } = {};
  habits.forEach((habit) => {
    habit.tags.forEach((tag) => {
      const lowerTag = tag.toLowerCase();
      if (!tagGroups[lowerTag]) {
        tagGroups[lowerTag] = [];
      }
      tagGroups[lowerTag].push(habit.name);
    });
  });

  // Build data array from tagGroups
  const data = Object.keys(tagGroups).map((tagKey) => {
    const tagInfo = TAGS.find((t) => t.text.toLowerCase() === tagKey);
    return {
      category: tagInfo ? tagInfo.text : tagKey,
      habits: tagGroups[tagKey],
      count: tagGroups[tagKey].length,
      color: tagInfo ? tagInfo.color : "#007acc",
    };
  });

  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={{ textAlign: "center", color: "var(--text-color)" }}>Habits' Distribution</h2>
      <Chart>
        <ChartSeries>
          <ChartSeriesItem
            type="pie"
            data={data}
            field="count"
            categoryField="category"
            colorField="color"
            // Remove labels property entirely so no slice labels are shown
            tooltip={
              {
                visible: true,
                render: (props: any) => {
                  const dataItem = props.point?.dataItem;
                  if (!dataItem) {
                    return <div>No data</div>;
                  }
                  const habitList: string[] = dataItem.habits || [];
                  if (habitList.length === 0) {
                    return (
                      <div style={{ padding: "0.5rem", fontSize: "0.9rem", color: "var(--chart-tooltip-text)" }}>
                        <strong>{dataItem.category}</strong>: No habits
                      </div>
                    );
                  }
                  return (
                    <div style={{ padding: "0.5rem", fontSize: "0.9rem", color: "var(--chart-tooltip-text)" }}>
                      <strong>{dataItem.category}</strong>
                      <ol style={{ paddingLeft: "1rem", margin: 0 }}>
                        {habitList.map((name, index) => (
                          <li key={index}>{name}</li>
                        ))}
                      </ol>
                    </div>
                  );
                },
              } as any
            }
          />
        </ChartSeries>
        <ChartLegend visible={true} position="bottom" />
      </Chart>
    </div>
  );
};

export default FocusPieChart;
