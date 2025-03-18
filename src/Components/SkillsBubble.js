import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

// Focused blue palette for lake theme
const blueShades = [
  "#104c91",  // Deep blue
  "#1a6fc7",  // Medium blue
  "#4d94db",  // Blue
  "#6c9dc6",  // Light blue
  "#add8e6",  // Light sky blue
  "#d3e9f6"   // Pale blue
];

function getColorForLevel(level) {
  const minLevel = 70, maxLevel = 95;
  const colorCount = blueShades.length;
  const ratio = 1 - (level - minLevel) / (maxLevel - minLevel);
  const index = Math.round(ratio * (colorCount - 1));
  return blueShades[Math.max(0, Math.min(index, colorCount - 1))];
}

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

const Sparkles = ({ bubbleSize }) => {
  const sparkleCount = 4;
  const sparkles = Array.from({ length: sparkleCount }, () => ({
    x: Math.random() * bubbleSize - bubbleSize / 2,
    y: Math.random() * bubbleSize - bubbleSize / 2,
    size: Math.random() * 3 + 2,
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
        background: "rgba(255, 255, 255, 0.9)",
        pointerEvents: "none",
        filter: "blur(1px)",
        boxShadow: "0 0 3px rgba(255, 255, 255, 0.8)",
      }}
    />
  ));
};

function BubbleItem({ skill, angle, radius }) {
  const [hovered, setHovered] = useState(false);
  const minSize = 60, maxSize = 90;
  const bubbleSize = ((skill.level - 70) / 25) * (maxSize - minSize) + minSize;
  const bubbleColor = getColorForLevel(skill.level);
  const textColor = "white";
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);

  return (
    <motion.div
      initial={{ x, y, opacity: 0 }}
      animate={{ 
        x, 
        y, 
        y: [y, y - 6, y], 
        opacity: 1 
      }}
      transition={{
        y: {
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
        opacity: {
          duration: 0.8,
        }
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        scale: 1.08,
        backgroundColor: bubbleColor,
        boxShadow: `0 0 15px 5px ${bubbleColor}60`,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      style={{
        position: "absolute",
        left: "42%",
        top: "36%",
        transform: "translate3d(-50%, -50%, 0)",
        width: `${bubbleSize}px`,
        height: `${bubbleSize}px`,
        borderRadius: "50%",
        background: `${bubbleColor}60`,
        border: `2px solid ${bubbleColor}`,
        backdropFilter: "blur(5px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "box-shadow 0.3s ease, background-color 0.2s ease",
      }}
    >
      {hovered && <Sparkles bubbleSize={bubbleSize} />}
      <motion.div
        className="flex flex-col items-center justify-center"
      >
        <motion.span
          whileHover={{
            textShadow: "0 0 10px rgba(255,255,255,0.8)",
            transition: { duration: 0.15, ease: "easeOut" },
          }}
          style={{
            color: textColor,
            fontWeight: "bold",
            fontSize: bubbleSize > 75 ? "0.95rem" : "0.85rem",
            pointerEvents: "none",
            textAlign: "center",
            textShadow: "0 1px 2px rgba(0,0,0,0.5)",
          }}
        >
          {skill.name}
        </motion.span>
        <motion.span
          style={{
            fontSize: "0.7rem",
            color: "rgba(255,255,255,1)",
            marginTop: "2px",
            textShadow: "0 1px 2px rgba(0,0,0,0.4)",
          }}
        >
          {skill.level}%
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

function CenterBubble({ label, size = 110 }) {
  const bubbleColor = "#104c91";
  const textColor = "#FFFFFF";
  return (
    <motion.div
      style={{
        position: "absolute",
        left: "39%",
        top: "31%",
        transform: "translate3d(-50%, -50%, 0)",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #104c91, #4d94db)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: textColor,
        fontWeight: "bold",
        fontSize: "1.1rem",
        boxShadow: `0 4px 20px rgba(16, 76, 145, 0.4)`,
        textShadow: "0 1px 2px rgba(0,0,0,0.4)",
      }}
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {label}
    </motion.div>
  );
}

export default function SkillCluster() {
  const containerRef = useRef(null);
  const [radius, setRadius] = useState(150);

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        if (width < 500) {
          setRadius(80);
        } else if (width < 800) {
          setRadius(120);
        } else {
          setRadius(150);
        }
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const angleStep = (2 * Math.PI) / skills.length;

  return (
    <div 
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "400px",
        overflow: "hidden",
      }}
    >
      <CenterBubble label="Technical Proficiency" size={120} />
      {skills.map((skill, i) => {
        const angle = i * angleStep;
        return (
          <BubbleItem
            key={skill.name}
            skill={skill}
            angle={angle}
            radius={radius}
          />
        );
      })}
    </div>
  );
}
