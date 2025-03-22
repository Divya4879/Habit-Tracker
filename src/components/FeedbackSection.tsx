import React, { useState } from "react";
import { Habit } from "../types";

const API_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = process.env.REACT_APP_API_KEY || "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";
const MODEL_NAME = "llama3-8b-8192";

// Simple markdown converter for bold (**text**)
const convertMarkdownToHTML = (text: string): string => {
  return text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>").replace(/\*/g, "");
};

interface FeedbackSectionProps {
  habits: Habit[];
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ habits }) => {
  const [feedback, setFeedback] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const refreshFeedback = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL_NAME,
          messages: [
            {
              role: "user",
              content: `You are a life coach AI. The user has these habits:
${JSON.stringify(habits, null, 2)}.

Please analyze these habits in the following areas:
- physical fitness
- mental health
- upskilling
- career advancement
- healthy lifestyle
- self care
- gratitude

For each area, provide a short paragraph with:
1) Observations about the user’s current habits.
2) Personalized suggestions or next steps.
3) Benefits of following your suggestions.

Use ** for bold text where appropriate.`,
            },
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });
      if (!response.ok) {
        const errorBody = await response.text();
        console.error("API Error:", response.status, errorBody);
        setErrorMessage(`Error ${response.status}: ${errorBody}`);
        setFeedback([]);
      } else {
        const data = await response.json();
        console.log("Full API Response:", data);
        let feedbackText = "";
        if (
          data.choices &&
          Array.isArray(data.choices) &&
          data.choices.length > 0 &&
          data.choices[0].message &&
          data.choices[0].message.content
        ) {
          feedbackText = data.choices[0].message.content;
        } else if (data.feedback) {
          feedbackText = data.feedback;
        }
        if (feedbackText) {
          const feedbackArray = feedbackText.split("\n").filter((line) => line.trim() !== "");
          setFeedback(feedbackArray);
        } else {
          setFeedback([]);
        }
      }
    } catch (error) {
      console.error("Error generating feedback:", error);
      setErrorMessage("Error generating feedback. Please try again.");
      setFeedback([]);
    }
    setLoading(false);
  };

  const handleClose = () => {
    setFeedback([]);
    setErrorMessage("");
  };

  const renderFeedbackLine = (line: string, index: number) => (
    <p
      key={index}
      dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(line) }}
      style={{ marginBottom: "1rem" }}
    />
  );

  return (
    <div
      style={{
        padding: "1rem",
        margin: "1rem auto",
        border: `1px solid var(--window-border)`,
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        backgroundColor: "var(--window-bg)",
        width: "80%",
        maxWidth: "800px",
        height: feedback.length > 0 ? "auto" : "auto",
        overflowY: feedback.length > 0 ? "auto" : "visible",
      }}
    >
      <h1
        style={{
          margin: "0 0 1rem 0",
          fontSize: "1.5rem",
          textAlign: "center",
          color: "var(--text-color)",
        }}
      >
        Your customized AI-powered feedback
      </h1>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <button
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            padding: "8px",
            borderRadius: "10px",
            marginRight: "0.5rem",
          }}
          className="k-button k-primary"
          onClick={refreshFeedback}
        >
          Generate Feedback
        </button>
        {feedback.length > 0 && (
          <button
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              padding: "8px",
              borderRadius: "10px",
            }}
            className="k-button"
            onClick={handleClose}
          >
            Close
          </button>
        )}
      </div>
      {loading ? (
        <p style={{ textAlign: "center", fontWeight: "bold" }}>Loading feedback...</p>
      ) : errorMessage ? (
        <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
      ) : (
        <div>{feedback.map((line, index) => renderFeedbackLine(line, index))}</div>
      )}
    </div>
  );
};

export default FeedbackSection;
