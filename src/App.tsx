// src/App.tsx
import React, { useState, useEffect } from "react";
import TopNavigation from "./components/NavigationPanel";
import ThemeToggle from "./components/ThemeToggle";
import ReminderToast from "./components/ReminderToast";
import HabitTrackerView from "./components/HabitTrackerView";
import StreakView from "./views/StreakView";
import FocusPieChart from "./views/FocusPieChart";
import CompletionPieChart from "./views/CompletionPieChart";
import FeedbackSection from "./components/FeedbackSection";
import AboutModal from "./components/AboutModal";
import { Habit } from "./types";
import { loadHabits } from "./utils";
import '../src/App.scss'; 

const App: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>(loadHabits());
  const [selectedView, setSelectedView] = useState<string>("tracker");
  const [showAbout, setShowAbout] = useState<boolean>(false);

  useEffect(() => {
    // Check localStorage to determine if the user has seen the About modal
    const seenAbout = localStorage.getItem('seenAbout') === 'true';
    
    // If the user hasn't seen the About modal, show it
    if (!seenAbout) {
      setShowAbout(true);
      // Mark that the user has now seen the About modal
      localStorage.setItem('seenAbout', 'true');
    }
  
    // Save the current habits to localStorage
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const handleSaveHabit = (habit: Habit) => {
    setHabits((prev) => {
      const index = prev.findIndex((h) => h.id === habit.id);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = habit;
        return updated;
      } else {
        return [...prev, habit];
      }
    });
  };

  const handleDeleteHabit = (habit: Habit) => {
    setHabits((prev) => prev.filter((h) => h.id !== habit.id));
  };

  const handleMarkCompleted = (habit: Habit) => {
    const todayStr = new Date().toISOString().split("T")[0];
    if (habit.completedDate !== todayStr) {
      const updatedHabit = { ...habit };
      updatedHabit.streak = (habit.streak || 0) + 1;
      updatedHabit.completedDate = todayStr;
      const newHistory = habit.streakHistory ? [...habit.streakHistory] : [];
      newHistory.push(updatedHabit.streak);
      if (newHistory.length > 30) {
        newHistory.shift();
      }
      updatedHabit.streakHistory = newHistory;
      handleSaveHabit(updatedHabit);
    }
  };

  return (
    <div style={{ width: "100vw", overflowX: "hidden", paddingBottom: "60px" }}>
      <header
        style={{
          padding: "1rem",
          backgroundColor: "var(--header-bg)",
          color: "var(--header-text)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              margin: "1rem 0.5rem",
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: "300%",
              textAlign: "center",
            }}
          >
            Mindful Metrics
          </h1>
          <h2
            style={{
              margin: "1rem 0",
              marginLeft: "auto",
              marginRight: "auto",
              width: "80%",
            }}
          >
            Empowering your journey to a mindful lifestyle with AI-driven habit insights
            and personalized guidance.
          </h2>
        </div>
        <ThemeToggle />
      </header>
      {showAbout && (
        <AboutModal
          onClose={() => {
            setShowAbout(false);
            localStorage.setItem("aboutSeen", "true");
          }}
        />
      )}
      
      {/* Top section with navigation on left and AI feedback on right */}
      <div style={{ display: "flex", width: "100vw", boxSizing: "border-box" }}>
        <div style={{ flex: "0 0 18%", padding: "1rem" }}>
          <TopNavigation selectedView={selectedView} onSelectView={setSelectedView} />
        </div>
        <div style={{ flex: "0 0 70%", padding: "1rem" }}>
          <FeedbackSection habits={habits} />
        </div>
      </div>
      {/* Main content area */}
      <div style={{ padding: "1rem", maxWidth: "1000px", width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
        {selectedView === "tracker" ? (
          <HabitTrackerView
            habits={habits}
            onSaveHabit={handleSaveHabit}
            onEditHabit={(habit) => {}}
            onDeleteHabit={handleDeleteHabit}
            onMarkCompleted={handleMarkCompleted}
            existingHabits={habits}
          />
        ) : selectedView === "streak" ? (
          <StreakView habits={habits} />
        ) : selectedView === "focus" ? (
          <FocusPieChart habits={habits} />
        ) : (
          <CompletionPieChart habits={habits} />
        )}
      </div>
      <ReminderToast habits={habits} />
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: "var(--header-bg)",
          color: "var(--header-text)",
          textAlign: "center",
          padding: "0.5rem 0",
          boxSizing: "border-box",
        }}
      >
        <p style={{ margin: 0 }}>
          Crafted with ❤️ and fueled by ☕,{" "}
          <a
            href="https://x.com/DivsinghDev"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none", color: "var(--link-color)" }}
          >
            Divya
          </a>{" "}
          presents this creation.
        </p>
      </footer>
    </div>
  );
};

export default App;
