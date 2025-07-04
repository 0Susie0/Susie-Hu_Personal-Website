import React from "react";

export default function SkillsContainer({ children }) {
  return (
    <div
      style={{
        flex: "1 1 50%",
        maxWidth: "750px",
        background: "rgba(255, 255, 255, 0.7)",
        borderRadius: "12px",
        padding: "1.5rem",
        boxShadow: "0 8px 20px rgba(16, 76, 145, 0.08)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
      }}
    >
      {children}
    </div>
  );
} 