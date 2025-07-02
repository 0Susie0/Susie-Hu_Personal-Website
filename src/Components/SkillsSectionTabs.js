import React, { useState } from "react";
import SkillsBubble from "./SkillsBubble";
import CompositionDonutChart from "./CompositionDonutChart";

// Simplified blue palette for lake theme
const tabStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "3rem", 
    borderBottom: "2px solid rgba(173, 216, 230, 0.3)",
    paddingBottom: "0.8rem", 
    maxWidth: "600px",
    margin: "0 auto 2rem auto",
  },
  tab: {
    position: "relative",
    padding: "0.8rem 1.5rem",
    fontSize: "1.5rem",
    fontWeight: "500",
    cursor: "pointer",
    background: "none",
    border: "none",
    transition: "all 0.3s ease-in-out",
    color: "#34495e", 
    borderRadius: "8px",
  },
  activeTab: {
    fontWeight: "700",
    color: "#2c3e50",
  },
  activeUnderline: {
    content: "" ,
    display: "block",
    height: "3px",
    width: "100%",
    background: "linear-gradient(90deg, #104c91, #6c9dc6)",
    position: "absolute",
    bottom: "-12px",
    left: "0",
    transition: "width 0.3s ease-in-out",
    borderRadius: "3px",
  },
  hoverUnderline: {
    content: "" ,
    display: "block",
    height: "3px",
    width: "100%",
    background: "#6c9dc6",
    position: "absolute",
    bottom: "-12px",
    left: "0",
    transition: "width 0.3s ease-in-out",
    opacity: "0.6", 
  },
};

export default function SkillsSectionTabs() {
  const [activeTab, setActiveTab] = useState("technical");

  return (
    <section id="skills" className="section" style={{ padding: "3rem 0", textAlign: "center" }}>
      
      
      {/* Tab Navigation */}
      <div style={tabStyles.container}>
        <button
          style={{ ...tabStyles.tab, ...(activeTab === "technical" ? tabStyles.activeTab : {}) }}
          onClick={() => setActiveTab("technical")}
        >
          Technical Skills
          {activeTab === "technical" && <div style={tabStyles.activeUnderline}></div>}
        </button>
        <button
          style={{ ...tabStyles.tab, ...(activeTab === "composition" ? tabStyles.activeTab : {}) }}
          onClick={() => setActiveTab("composition")}
        >
          Personal Talents
          {activeTab === "composition" && <div style={tabStyles.activeUnderline}></div>}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "technical" && (
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          justifyContent: "center", 
          gap: "2rem", 
          alignItems: "flex-start", 
          marginTop: "2rem", 
          width: "100%" 
        }}>
          <div style={{ 
            flex: "1 1 50%", 
            maxWidth: "750px",
            background: "rgba(255, 255, 255, 0.7)",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 8px 20px rgba(16, 76, 145, 0.08)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
          }}> 
            <SkillsBubble />
          </div>
        </div>
      )}

      {activeTab === "composition" && (
        <div style={{ 
          marginTop: "2rem", 
          padding: "1rem",
          background: "rgba(255, 255, 255, 0.7)",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(16, 76, 145, 0.08)",
          backdropFilter: "blur(8px)",
          maxWidth: "750px",
          margin: "1rem auto",
          border: "1px solid rgba(255, 255, 255, 0.5)",
        }}>
          <p style={{ 
            fontSize: "1.1rem", 
            lineHeight: "1.5", 
            color: "#34495e",
            marginBottom: "0.5rem",
            maxWidth: "700px",
            margin: "0 auto 0.5rem auto",
          }}>
            As a versatile individual, I not only have a solid technical foundation but also excel in music, sports, and languages, demonstrating exceptional talents and passion in these areas.
          </p>
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <CompositionDonutChart />
          </div>
        </div>
      )}
    </section>
  );
}
