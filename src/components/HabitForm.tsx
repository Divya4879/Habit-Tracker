import React, { useState, useEffect } from "react";
import { Window } from "@progress/kendo-react-dialogs";
import { DropDownList, MultiSelect } from "@progress/kendo-react-dropdowns";
import { Label } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { Habit } from "../types";

const getLocalDateStr = (date: Date = new Date()): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

interface HabitFormProps {
  habit?: Habit;
  onSave: (habit: Habit) => void;
  onClose: () => void;
  existingHabits: Habit[];
}

export const TAGS = [
  { text: "physical fitness", color: "#1E90FF" },
  { text: "mental health", color: "#800080" },
  { text: "upskilling", color: "#FFA500" },
  { text: "career advancement", color: "#008000" },
  { text: "healthy lifestyle", color: "#20B2AA" },
  { text: "self care", color: "#FF69B4" },
  { text: "gratitude", color: "#FFD700" },
];

const PRIORITY_OPTIONS = ["low", "medium", "high"];
const STATUS_OPTIONS = ["Pending", "Completed"];

const HabitForm: React.FC<HabitFormProps> = ({ habit, onSave, onClose, existingHabits }) => {
  const todayStr = getLocalDateStr();

  const [name, setName] = useState(habit?.name || "");
  const [estimatedTime, setEstimatedTime] = useState(habit?.estimatedTime || "");
  const [selectedTags, setSelectedTags] = useState<string[]>(habit?.tags || []);
  const [priority, setPriority] = useState<Habit["priority"]>(habit?.priority || "low");
  const [status, setStatus] = useState<Habit["status"]>(habit?.status || "Pending");
  const [enableReminder, setEnableReminder] = useState(habit?.enableReminder || false);
  const [reminderMinutes, setReminderMinutes] = useState(habit?.reminderMinutes || 30);
  const [errors, setErrors] = useState<{ name?: string; estimatedTime?: string }>({});
  const [completedDate, setCompletedDate] = useState<string | null>(habit?.completedDate || null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = getLocalDateStr();
      if (completedDate && completedDate !== currentDate && status === "Completed") {
        setStatus("Pending");
        setCompletedDate(null);
        if (habit) {
          const updatedHabit = { ...habit, status: "Pending", completedDate: null };
          localStorage.setItem("habit_" + habit.id, JSON.stringify(updatedHabit));
        }
      }
    }, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [completedDate, status, habit]);

  const validate = () => {
    const newErrors: { name?: string; estimatedTime?: string } = {};
    if (!name.trim()) newErrors.name = "Habit name is required.";
    if (!estimatedTime.trim()) newErrors.estimatedTime = "Estimated time is required.";
    const duplicateExists = existingHabits.some(
      (h) =>
        h.name.toLowerCase() === name.trim().toLowerCase() &&
        (!habit || h.id !== habit.id)
    );
    if (duplicateExists) {
      newErrors.name = "A habit with this name already exists!";
    }
    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const newHabit: Habit = {
      id: habit ? habit.id : Date.now().toString(),
      name,
      estimatedTime,
      tags: selectedTags,
      priority,
      status,
      enableReminder,
      reminderMinutes,
      deadline: midnight,
      streak: habit?.streak || 0,
      streakHistory: habit?.streakHistory || [],
      completedDate: habit?.completedDate,
    };

    if (status === "Completed") {
      if (!completedDate || completedDate !== todayStr) {
        newHabit.streak = (habit?.streak || 0) + 1;
        newHabit.completedDate = todayStr;
        setCompletedDate(todayStr);
        const newHistory = habit?.streakHistory ? [...habit.streakHistory] : [];
        newHistory.push(newHabit.streak);
        if (newHistory.length > 30) {
          newHistory.shift();
        }
        newHabit.streakHistory = newHistory;
      }
    }

    localStorage.setItem("habit_" + newHabit.id, JSON.stringify(newHabit));
    onSave(newHabit);
  };

  return (
    <Window
      title={habit ? "Edit Habit" : "Add Habit"}
      onClose={onClose}
      width={window.innerWidth * 0.6}
      height={window.innerHeight * 0.6}
    >
      <div style={{ padding: "1rem", minWidth: "400px" }}>
        <div style={{ marginBottom: "1rem" }}>
          <Label>Habit/Action</Label>
          <Input
            type="text"
            className="k-textbox"
            value={name}
            onChange={(e) => setName(e.target.value as string)}
            style={{ width: "100%" }}
          />
          {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <Label>Estimated Time Needed</Label>
          <Input
            type="text"
            className="k-textbox"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value as string)}
            style={{ width: "100%" }}
          />
          {errors.estimatedTime && <div style={{ color: "red" }}>{errors.estimatedTime}</div>}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Tags</label>
          <MultiSelect
            data={TAGS}
            textField="text"
            dataItemKey="text"
            value={TAGS.filter((t) => selectedTags.includes(t.text))}
            onChange={(e) =>
              setSelectedTags(e.value.map((item: any) => item.text))
            }
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Priority</label>
          <DropDownList
            data={PRIORITY_OPTIONS}
            value={priority}
            onChange={(e) => setPriority(e.value)}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Status</label>
          <DropDownList
            data={STATUS_OPTIONS}
            value={status}
            onChange={(e) => setStatus(e.value)}
          />
        </div>
        {(priority === "high" || priority === "medium") && (
          <div style={{ marginBottom: "1rem" }}>
            <label>
              <input
                type="checkbox"
                checked={enableReminder}
                onChange={(e) => setEnableReminder(e.target.checked)}
              />{" "}
              Enable Reminder
            </label>
            {enableReminder && (
              <div>
                <Label>Reminder Minutes Before Midnight</Label>
                <Input
                  type="number"
                  className="k-textbox"
                  value={reminderMinutes}
                  onChange={(e) => setReminderMinutes(Number(e.target.value))}
                  style={{ width: "100%" }}
                />
              </div>
            )}
          </div>
        )}
        <div style={{ textAlign: "right" }}>
          <button className="k-button" onClick={onClose} style={{ marginRight: "0.5rem" }}>
            Cancel
          </button>
          <button className="k-button k-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </Window>
  );
};

export default HabitForm;
