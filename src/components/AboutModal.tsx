// src/components/AboutModal.tsx
import React from "react";
import { Window } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";

interface AboutModalProps {
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  return (
    <Window
      title="About Mind Metrics"
      onClose={onClose}
      style={{
        position: "fixed",
        top: "45%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "var(--window-bg)",
        color: "var(--text-color)",
        border: `1px solid var(--window-border)`,
        width: "75vw",
        height: "60vh"
      }}
    >
      {/* Custom close button in the top-right corner */}
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <Button 
          onClick={onClose}
          icon="close"
          fillMode="flat" // Use fillMode for button appearance
        //   themeColor="primary" // Adjust themeColor as needed
          style={{ fontSize: "1.2rem", color: "var(--header-bg)" }}
        />
      </div>
      <div style={{ padding: "1rem", paddingTop: "1rem" }}>
      <p>🌿 Welcome to <strong style={{ color: "var(--primary-color)" }}>Mindful Metrics</strong> – your <strong>elegant habit tracker</strong> for <strong>balance & productivity</strong>! 🌟</p>  

<ul>  
  <li>✅ <strong>Track habits & streaks</strong></li>  
  <li>📊 <strong>Visualize progress</strong></li>  
  <li>🎯 <strong>Monitor focus areas</strong></li>  
  <li>💡 <strong>Get personalized insights</strong></li>  
</ul>  

<p>✨ <strong>Achieve your best self with Mindful Metrics!</strong> 💫</p>

        <p>
          <strong style={{ color: "var(--primary-color)" }}>Key Features:</strong> Track your habits, view your streaks, monitor your focus areas, and see your task completion status at a glance.
        </p>
        <p>
          Enjoy your journey to a more balanced, productive life with <strong style={{ color: "var(--primary-color)" }}>Mindful Metrics</strong>!
        </p>
      </div>
    </Window>
  );
};

export default AboutModal;
