import React, { useState } from "react";
import { motion } from "framer-motion";
//import "./SkillsBubble.css"; // (Optional: additional styles for skills)

const extendedPalette = [
  "#03045e", "#023e8a", "#0077b6", "#0096c7", "#00b4d8",
  "#48cae4", "#90e0ef", "#ade8f4", "#caf0f8",
];

const skills = [
  { name: "Java", level: 95 },
  { name: "SQL", level: 90 },
  { name: "Python", level: 85 },
  { name: "HTML", level: 80 },
  { name: "CSS", level: 80 },
  { name: "Git", level: 80 },
  { name: "Firebase", level: 75 },
  { name: "JavaScript", level: 75 },
  { name: "Linux", level: 70 },
  { name: "React", level: 70 },
];

function hexToRGBA(hex, alpha) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex.split("").map((x) => x + x).join("");
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getBubbleSize(level) {
  const minLevel = 70, maxLevel = 95;
  const minSize = 60, maxSize = 90;
  return ((level - minLevel) / (maxLevel - minLevel)) * (maxSize - minSize) + minSize;
}

function orderSkills(skills) {
  const sorted = [...skills].sort((a, b) => b.level - a.level);
  const n = sorted.length;
  const ordered = new Array(n);
  const center = Math.floor(n / 2);
  ordered[center] = sorted[0];
  let left = center - 1, right = center + 1, i = 1;
  while (i < n) {
    if (left >= 0) {
      ordered[left] = sorted[i];
      i++;
      left--;
      if (i >= n) break;
    }
    if (right < n) {
      ordered[right] = sorted[i];
      i++;
      right++;
    }
  }
  return ordered;
}

function generatePositions(total, spacing = 120) {
  const positions = [];
  const center = Math.floor(total / 2);
  for (let i = 0; i < total; i++) {
    positions.push({ x: (i - center) * spacing });
  }
  return positions;
}

function getAssignedColor(index, total) {
  const center = Math.floor(total / 2);
  const offset = Math.abs(index - center);
  return extendedPalette[Math.min(offset, extendedPalette.length - 1)];
}

const Sparkles = ({ bubbleSize }) => {
  const sparkleCount = 3;
  const sparkles = Array.from({ length: sparkleCount }, () => ({
    x: Math.random() * bubbleSize - bubbleSize / 2,
    y: Math.random() * bubbleSize - bubbleSize / 2,
    size: Math.random() * 4 + 2,
    delay: Math.random(),
  }));
  return sparkles.map((s, idx) => (
    <motion.div
      key={idx}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
      transition={{
        duration: 0.5 + Math.random() * 0.5,
        repeat: Infinity,
        delay: s.delay,
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        left: `calc(50% + ${s.x}px)`,
        top: `calc(50% + ${s.y}px)`,
        width: `${s.size}px`,
        height: `${s.size}px`,
        borderRadius: "50%",
        background: "white",
        pointerEvents: "none",
        filter: "blur(1px)",
      }}
    />
  ));
};

function BubbleItem({ skill, pos, assignedColor, bubbleSize }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ x: pos.x, y: 0 }}
      animate={{ y: [0, -5, 0] }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        scale: 1.1,
        y: -12,
        backgroundColor: assignedColor,
        boxShadow: `0 0 30px 10px ${hexToRGBA(assignedColor, 0.8)}, inset 0 0 10px ${hexToRGBA(assignedColor, 0.6)}`,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate3d(-50%, -50%, 0)",
        width: `${bubbleSize}px`,
        height: `${bubbleSize}px`,
        borderRadius: "50%",
        background: "transparent",
        border: `2px solid ${assignedColor}`,
        boxShadow: "0 0 15px rgba(65,105,225,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "box-shadow 0.3s ease, background-color 0.2s ease",
      }}
    >
      {hovered && <Sparkles bubbleSize={bubbleSize} />}
      <motion.span
        whileHover={{
          textShadow: "0 0 12px white",
          transition: { duration: 0.15, ease: "easeOut" },
        }}
        style={{
          color: "#fff",
          fontWeight: "bold",
          textAlign: "center",
          pointerEvents: "none",
          textShadow: "0 0 2px rgba(0, 0, 0, 0.7)",
        }}
      >
        {skill.name}
      </motion.span>
    </motion.div>
  );
}

export default function SkillsBubble() {
  const orderedSkills = orderSkills(skills);
  const positions = generatePositions(orderedSkills.length, 120);
  return (
    <section id="skills" className="section">
      <div className="container">
        <h2>Technical Skills</h2>
        <div style={{ position: "relative", width: "100%", minHeight: "400px", overflow: "hidden" }}>
          {orderedSkills.map((skill, index) => {
            const pos = positions[index];
            const bubbleSize = getBubbleSize(skill.level);
            const assignedColor = getAssignedColor(index, orderedSkills.length);
            return (
              <BubbleItem
                key={skill.name}
                skill={skill}
                pos={pos}
                assignedColor={assignedColor}
                bubbleSize={bubbleSize}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
