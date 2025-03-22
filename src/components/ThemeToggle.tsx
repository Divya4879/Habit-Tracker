// src/components/ThemeToggle.tsx
import React, { useState, useEffect } from "react";

const ThemeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <button
      style={{
        border: "none",
        padding: "0.5em",
        margin: "1em",
        fontSize: "2em",
        borderRadius: "50%",
        backgroundColor: "var(--bg-color)"
      }}
      onClick={toggleTheme}
    >
      {darkMode ? "☀️" : "🌚"}
    </button>
  );
};

export default ThemeToggle;
