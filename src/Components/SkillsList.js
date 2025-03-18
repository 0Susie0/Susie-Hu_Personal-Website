import React from "react";

export default function SkillsList() {
  // Focused blue palette for lake theme
  const skillCategories = [
    {
      id: 1,
      title: "Programming Languages",
      icon: "💻",
      items: ["Java", "Python", "SQL", "JavaScript", "C", "HTML", "CSS"],
      color: "#1a6fc7"  // Medium blue
    },
    {
      id: 2,
      title: "Frameworks & Libraries",
      icon: "🔌",
      items: ["React", "Spring Boot", "Tailwind CSS", "Bootstrap"],
      color: "#4d94db"  // Blue
    },
    {
      id: 3,
      title: "Tools & Platforms",
      icon: "🛠️",
      items: ["Git", "Linux", "Firebase", "AWS", "Docker"],
      color: "#6c9dc6"  // Light blue
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {skillCategories.map((category) => (
        <div 
          key={category.id} 
          className="flex flex-col items-start bg-white/75 shadow-md rounded-lg p-5 border-l-4 backdrop-blur-md transition-all duration-300 hover:shadow-lg"
          style={{ 
            borderLeftColor: category.color,
            boxShadow: `0 4px 12px rgba(16, 76, 145, 0.06)`
          }}
        >
          <div className="flex items-center w-full mb-3">
            <div 
              className="mr-3 w-10 h-10 flex items-center justify-center rounded-full text-xl"
              style={{ 
                background: `${category.color}15`, 
                color: category.color,
                boxShadow: `0 2px 8px ${category.color}20`
              }}
            >
              {category.icon}
            </div>
            
            <h3 
              className="text-lg font-semibold"
              style={{ color: "#104c91" }}
            >
              {category.title}
            </h3>
            
            <div 
              className="ml-auto px-3 py-1 rounded-full text-sm font-semibold"
              style={{
                background: `${category.color}15`,
                color: category.color
              }}
            >
              {category.items.length}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 w-full">
            {category.items.map((skill, index) => (
              <span 
                key={index} 
                className="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
                style={{ 
                  background: `${category.color}10`,
                  color: category.color,
                  border: `1px solid ${category.color}30`,
                  boxShadow: `0 2px 4px rgba(0, 0, 0, 0.03)`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
