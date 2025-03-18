import React, { useEffect, useState } from 'react';
import AOS from 'aos';                // 1) Install with `npm install aos`
import 'aos/dist/aos.css';            // 2) Import AOS core styles
import './EducationTimeline.css';  // 3) Our custom CSS

function EducationIconTimeline() {
  const [activeIndex, setActiveIndex] = useState(null);

  // Initialize AOS once when the component mounts
  useEffect(() => {
    AOS.init({ 
      duration: 800,
      once: true,
      offset: 120,
      easing: 'ease-out-cubic'
    });
  }, []);

  // Each "milestone" in your education timeline
  const milestones = [
    {
      number: '01',
      title: 'Pingxiang High School',
      subtitle: 'Art Student (History & Geography)',
      description: 'Focused on art while developing a strong interest in History and Geography, building a broad cultural perspective.',
      color: '#1a6fc7',
      icon: '/PXHS.png',
      year: '2013-2016',
      achievements: ['Art Excellence Award', 'History Competition Winner']
    },
    {
      number: '02',
      title: "Jiangxi Normal University",
      subtitle: 'Bachelor of Software Engineering (Big Data Technology)',
      description: 'Learned large-scale data processing, algorithms, and advanced software engineering. Participated in various coding competitions.',
      color: '#4d94db',
      icon: '/JXNU.png',
      year: '2016-2020',
      achievements: ["Dean's List", 'Technical Project Excellence']
    },
    {
      number: '03',
      title: 'Awards & Achievements',
      subtitle: 'National Scholarship, Academic Excellence',
      description: 'Earned second prize in the 9th Blue Bridge Cup National Software & IT competition for the Yunxue Online Math Learning Platform.',
      color: '#3a7ca5',
      icon: '/BlueCup.png',
      year: '2017-2020',
      achievements: ['National Scholarship', 'Blue Bridge Cup Second Prize']
    },
    {
      number: '04',
      title: 'Australian National University',
      subtitle: 'Master of Computing',
      description: 'Completed the WeTok (a social app supporting vulnerable groups) project with high distinction, and excelled in Sound & Music Computing.',
      color: '#0d3b76',
      icon: '/ANU.png',
      year: '2021-2023',
      achievements: ['High Distinction', 'Research Excellence']
    },
  ];

  const handleItemFocus = (index) => {
    setActiveIndex(index);
  };

  const handleItemBlur = () => {
    setActiveIndex(null);
  };

  return (
    <section className="section" id="education-timeline">
      <h2>Education & Experience</h2>
      <p className="section-subtitle">My academic journey and key achievements</p>

      <div className="vertical-line" aria-hidden="true" />

      {milestones.map((milestone, index) => (
        <div 
          key={index} 
          className={`timeline-item ${activeIndex === index ? 'active-item' : ''}`}
          data-aos="fade-up"
          data-aos-delay={index * 100}
          onMouseEnter={() => handleItemFocus(index)}
          onMouseLeave={handleItemBlur}
          onFocus={() => handleItemFocus(index)}
          onBlur={handleItemBlur}
          tabIndex={0}
          role="article"
          aria-label={`Timeline entry: ${milestone.title}, ${milestone.year}`}
        >
          {/* Colored circle with an icon */}
          <div 
            className="icon-circle" 
            style={{ borderColor: milestone.color }}
            aria-hidden="true"
          >
            <img src={milestone.icon} alt="" />
          </div>

          {/* Text bubble with title, subtitle, description */}
          <div className="text-bubble">
            <div className="timeline-header">
              <h4>{milestone.title}</h4>
              <span className="year">{milestone.year}</span>
            </div>
            <span className="subtitle">{milestone.subtitle}</span>
            <p>{milestone.description}</p>
            {milestone.achievements && milestone.achievements.length > 0 && (
              <>
                <h5 className="achievements-title">Key Achievements:</h5>
                <ul className="achievements-list" aria-label="Achievements">
                  {milestone.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}

export default EducationIconTimeline;
