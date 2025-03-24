import React from "react";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import { useMediaQuery } from "react-responsive";

interface NavigationPanelProps {
  selectedView: string;
  onSelectView: (view: string) => void;
}

const NavigationPanel: React.FC<NavigationPanelProps> = ({ selectedView, onSelectView }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const views = [
    { id: "tracker", label: "Habit Tracker" },
    { id: "streak", label: "Streak Charts" },
    { id: "focus", label: "Habits' Distribution" },
    { id: "completion", label: "Today's Progress" },
  ];

  if (isMobile) {
    return (
      <TabStrip
        selected={views.findIndex((v) => v.id === selectedView)}
        onSelect={(e) => {
          const index = e.selected;
          onSelectView(views[index].id);
        }}
      >
        {views.map((view) => (
          <TabStripTab title={view.label} key={view.id} />
        ))}
      </TabStrip>
    );
  } else {
    return (
      <div style={{ width: "200px", borderRight: `1px solid var(--secondary-color)`, padding: "1rem" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {views.map((view) => (
            <li
              key={view.id}
              style={{
                marginBottom: "1rem",
                cursor: "pointer",
                fontWeight: selectedView === view.id ? "bold" : "normal",
                fontSize: selectedView === view.id ? "120%" : "normal",
                color: "var(--text-color)",
              }}
              onClick={() => onSelectView(view.id)}
            >
              {view.label}
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default NavigationPanel;
