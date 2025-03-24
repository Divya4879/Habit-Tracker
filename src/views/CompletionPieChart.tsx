import React from "react";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartLegend,
} from "@progress/kendo-react-charts";
import { Habit } from "../types";
import "@progress/kendo-theme-default/dist/all.css";

interface CompletionPieChartProps {
  habits: Habit[];
}

const CompletionPieChart: React.FC<CompletionPieChartProps> = ({ habits }) => {
  const todayStr = new Date().toISOString().split("T")[0];

  const completedHabits = habits.filter(
    (habit) => habit.completedDate === todayStr
  );
  const pendingHabits = habits.filter(
    (habit) => habit.completedDate !== todayStr
  );

  const totalTimeCompleted = completedHabits.reduce(
    (acc, habit) => acc + Number(habit.estimatedTime),
    0
  );
  const totalTimePending = pendingHabits.reduce(
    (acc, habit) => acc + Number(habit.estimatedTime),
    0
  );

  const data = [
    {
      category: "Completed",
      habits: completedHabits.map((habit) => habit.name),
      time: totalTimeCompleted,
      color: "#28a745",
    },
    {
      category: "Pending",
      habits: pendingHabits.map((habit) => habit.name),
      time: totalTimePending,
      color: "#dc3545",
    },
  ];

  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={{ textAlign: "center", color: "var(--text-color)" }}>
        Today's Progress
      </h2>
      <Chart>
        <ChartSeries>
          <ChartSeriesItem
            type="pie"
            data={data}
            field="time"
            categoryField="category"
            colorField="color"
            labels={{ visible: false }}
            tooltip={{
              visible: true,
              render: (props: any) => {
                const dataItem: any = props.point?.dataItem;
                if (!dataItem) {
                  return <div>No data</div>;
                }
                const habitList: string[] = dataItem.habits || [];
                return (
                  <div
                    style={{
                      padding: "0.5rem",
                      fontSize: "0.9rem",
                      color: "var(--chart-tooltip-text)",
                    }}
                  >
                    <strong>{dataItem.category}</strong>
                    <div>
                      Time Allotted: <strong>{dataItem.time}</strong> (mins)
                    </div>
                    {habitList.length > 0 && (
                      <ol style={{ paddingLeft: "1rem", margin: 0 }}>
                        {habitList.map((name, index) => (
                          <li key={index}>{name}</li>
                        ))}
                      </ol>
                    )}
                  </div>
                );
              },
            } as any}
          />
        </ChartSeries>
        <ChartLegend visible={true} position="bottom" />
      </Chart>
    </div>
  );
};

export default CompletionPieChart;

