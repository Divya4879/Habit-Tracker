import React, { useEffect, useState } from "react";
import { Habit } from "../types";

interface ReminderToastProps {
  habits: Habit[];
}

const ReminderToast: React.FC<ReminderToastProps> = ({ habits }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [reminderMessage, setReminderMessage] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];

    const habitForReminder = habits.find((habit) => {
      if (
        habit.priority !== "high" ||
        !habit.enableReminder ||
        habit.completedDate === todayStr
      ) {
        return false;
      }
      const deadline = new Date(habit.deadline);
      const diff = deadline.getTime() - now.getTime();
      return diff > 0 && diff <= habit.reminderMinutes * 60 * 1000;
    });

    if (habitForReminder) {
      setReminderMessage(`Reminder: "${habitForReminder.name}" is due soon!`);
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [habits]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#DE3163",
        color: "#fff",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
        zIndex: 1000,
      }}
    >
      <span>{reminderMessage}</span>
      <button
        style={{
          marginLeft: "1rem",
          background: "none",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          fontWeight: "bold",
        }}
        onClick={() => setVisible(false)}
      >
        Dismiss
      </button>
    </div>
  );
};

export default ReminderToast;
