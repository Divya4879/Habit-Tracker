// src/views/HabitTrackerView.tsx
import React, { useState } from "react";
import HabitGrid from "./HabitGrid";
import HabitForm from "./HabitForm";
import { Habit } from "../types";

interface HabitTrackerViewProps {
  habits: Habit[];
  onSaveHabit: (habit: Habit) => void;
  onEditHabit: (habit: Habit) => void;
  onDeleteHabit: (habit: Habit) => void;
  onMarkCompleted: (habit: Habit) => void;
  existingHabits: Habit[];
}

const HabitTrackerView: React.FC<HabitTrackerViewProps> = ({
  habits,
  onSaveHabit,
  onEditHabit,
  onDeleteHabit,
  onMarkCompleted,
  existingHabits,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>(undefined);

  const handleAddHabit = () => {
    setEditingHabit(undefined);
    setShowForm(true);
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setShowForm(true);
    onEditHabit(habit);
  };

  const handleSave = (habit: Habit) => {
    onSaveHabit(habit);
    setShowForm(false);
  };

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <button className="k-button k-primary" onClick={handleAddHabit}
          style={{
            fontSize : "1rem",
            fontWeight : "bold",
            padding: "8px",
            borderRadius: "10px"
        }}>
          Add Habit
        </button>
      </div>
      <HabitGrid
        habits={habits}
        onEdit={handleEditHabit}
        onDelete={onDeleteHabit}
        onMarkCompleted={onMarkCompleted}
      />
      {showForm && (
        <HabitForm
          habit={editingHabit}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
          existingHabits={existingHabits}
        />
      )}
    </div>
  );
};

export default HabitTrackerView;
