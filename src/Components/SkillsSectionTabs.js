import React, { useState } from "react";
import SkillsBubble from "./SkillsBubble";
import CompositionDonutChart from "./CompositionDonutChart";
import SkillsList from "./SkillsList";

const tabStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "3rem", 
    borderBottom: "2px solid #ddd",
    paddingBottom: "0.5rem", 
  },
  tab: {
    position: "relative",
    padding: "0.8rem 1.5rem",
    fontSize: "1.5rem",
    fontWeight: "545",
    cursor: "pointer",
    background: "none",
    border: "none",
    transition: "all 0.3s ease-in-out",
    color: "#333", 
  },
  activeTab: {
    fontWeight: "bold",
    color: "#0077b6",
  },
  activeUnderline: {
    content: "" ,
    display: "block",
    height: "3px",
    width: "100%",
    backgroundColor: "#0077b6",
    position: "absolute",
    bottom: "-3px",
    left: "0",
    transition: "width 0.3s ease-in-out",
  },
  hoverUnderline: {
    content: "" ,
    display: "block",
    height: "3px",
    width: "100%",
    backgroundColor: "#0077b6",
    position: "absolute",
    bottom: "-3px",
    left: "0",
    transition: "width 0.3s ease-in-out",
    opacity: "0.6", 
  },
};

export default function SkillsSectionTabs() {
  const [activeTab, setActiveTab] = useState("technical");

  return (
    <section id="skills" className="section" style={{ padding: "2rem 0", textAlign: "center" }}>
    
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
          Composition
          {activeTab === "composition" && <div style={tabStyles.activeUnderline}></div>}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "technical" && (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem", alignItems: "center", marginTop: "0.8rem", width: "100%" }}>
          <div style={{ flex: "1 1 50%", maxWidth: "600px" }}> 
            <SkillsBubble />
          </div>
          <div style={{ flex: "1 1 50%", maxWidth: "600px" }}> 
            <SkillsList />
          </div>
        </div>
      )}

      {activeTab === "composition" && (
        <div style={{ marginTop: "2rem", padding: "0 1rem" }}>
           <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#333" }}>
            In addition to technical skills, Susie Hu is a multi-faceted individual with expertise in various areas,
            including music, sports, and bilingual communication.
          </p>
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <CompositionDonutChart />
          </div>
        </div>
      )}
    </section>
  );
}
