import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const brandShades = [
  "#394563", 
  "#3F5B85", 
  "#5C81AA", 
  "#5E8EB4", 
  "#8ABAD0", 
  "#B0CED8" 
];

// Mapping of shades depending on skill level (70-95):
// Higher level => Appear in the front with darker colour；Lower level => Left behind with lighter colour。
function getColorForLevel(level) {
  const minLevel = 70, maxLevel = 95;
  const colorCount = brandShades.length;
  // Calculate the index between 0 and (colorCount-1)
  const ratio = 1 - (level - minLevel) / (maxLevel - minLevel); // Invert so that higher levels correspond to darker colors
  const index = Math.round(ratio * (colorCount - 1));
  return brandShades[Math.max(0, Math.min(index, colorCount - 1))];
}


// Skill set with levels.
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

// Sparkle effect while hovering.
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

// Skill Bubble Item
function BubbleItem({ skill, angle, radius }) {
  const [hovered, setHovered] = useState(false);

  // Bubble size match the skill level.
  const minSize = 60, maxSize = 90;
  const bubbleSize = ((skill.level - 70) / 25) * (maxSize - minSize) + minSize;

  // Colour reflection：level -> brandShades
  const bubbleColor = getColorForLevel(skill.level);
  const textColor = "#FFFFFF";

  // 极坐标 -> 笛卡尔坐标
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);

  return (
    <motion.div
      initial={{ x, y }}
      animate={{ y: [y, y - 5, y] }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        scale: 1.1,
        backgroundColor: bubbleColor,
        boxShadow: `0 0 20px 6px rgba(255,255,255,1.5)`,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      style={{
        position: "absolute",
        left: "45%",
        top: "40%",
        transform: "translate3d(-50%, -50%, 0)",
        width: `${bubbleSize}px`,
        height: `${bubbleSize}px`,
        borderRadius: "50%",
        // Set transparent as the default background colour for skill bubbles + frame
        background: "transparent",
        border: `3px solid ${bubbleColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "box-shadow 0.3s ease, background-color 0.2s ease",
      }}
    >
      {/* Sparkle effect */}
      {hovered && <Sparkles bubbleSize={bubbleSize} />}
      <motion.span
        whileHover={{
          textShadow: "0 0 12px rgba(255,255,255,0.8)",
          transition: { duration: 0.15, ease: "easeOut" },
        }}
        style={{
          color: textColor,
          fontWeight: "bold",
          pointerEvents: "none",
          textAlign: "center",
          textShadow: "0 0 2px rgba(0,0,0,0.4)",
        }}
      >
        {skill.name}
      </motion.span>
    </motion.div>
  );
}

// Center bubble.
function CenterBubble({ label, size = 110 }) {
  // Use the darkest colour for the center bubble.
  const bubbleColor = brandShades[0];
  const textColor = "#FFFFFF";
  return (
    <motion.div
      style={{
        position: "absolute",
        left: "42%",
        top: "35%",
        transform: "translate3d(-50%, -50%, 0)",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: bubbleColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: textColor,
        fontWeight: "bold",
        fontSize: "1.1rem",
        boxShadow: `0 0 30px 10px rgba(0,0,0,0.2)`,
      }}
      animate={{ y: [0, -5, 0] }}
      transition={{
        duration: 3,
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

  // Surrounded by skills.
  const angleStep = (2 * Math.PI) / skills.length;

  return (
    <section id="skills" className="section" style={{ textAlign: "center" }}>
      <h2>Skills</h2>
      <div
        ref={containerRef}
        style={{
          margin: "0 auto",
          position: "relative",
          width: "100%",
          maxWidth: "800px",
          minHeight: "500px",
          overflow: "hidden",
        }}
      >
        {/* Center Bubble */}
        <CenterBubble label="Technical" size={120} />

        {/* Surrounding skill bubbles */}
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
    </section>
  );
}
