import React, { useState } from "react";
import SkillsBubble from "./SkillsBubble";
import CompositionDonutChart from "./CompositionDonutChart";
import SkillsContainer from "./SkillsContainer";

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

  const flexWrapStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "2rem",
    alignItems: "flex-start",
    marginTop: "2rem",
    width: "100%",
    };

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
          <div style={flexWrapStyle}>
          <SkillsContainer>
            <SkillsBubble />
          </SkillsContainer>
        </div>
      )}

      {activeTab === "composition" && (
        <div style={flexWrapStyle}>
          <SkillsContainer>
            <CompositionDonutChart />
          </SkillsContainer>
        </div>
      )}
    </section>
  );
}
