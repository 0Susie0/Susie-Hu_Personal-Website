
export default function SkillsList() {
  const skills = [
    {
      id: 1,
      title: "Languages",
      items: ["Java", "Python", "SQL", "JavaScript", "C", "HTML", "CSS"],
    },
    {
      id: 2,
      title: "Frameworks",
      items: ["React", "Spring Boot"],
    },
    {
      id: 3,
      title: "Tools",
      items: ["Git", "Linux", "Firebase"],
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-8 p-6">
      {skills.map((category) => (
        <div key={category.id} className="flex flex-col items-center bg-white/75 shadow-md rounded-lg p-4 w-60 border border-gray-300">
          {/* Numbered box */}
          <div className="bg-sky-100 text-blue-900 font-bold px-3 py-1 rounded-lg text-lg mb-2">
            {category.id}
          </div>
          
          {/* Skill Category */}
          <h3 className="text-lg font-bold mb-2 text-center">{category.title}</h3>
          <p className="text-gray-700 text-center">
            {category.items.join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
}
