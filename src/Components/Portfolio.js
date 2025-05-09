import React, { useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Portfolio3D.css';

const defaultProjects = [
  { id: 1, image: '/FoodGI.jpg', title: 'Project 1', description: 'Description for Project 1' },
  { id: 2, image: '/Personalised Nutrition.jpg', title: 'Project 2', description: 'Description for Project 2' },
  { id: 3, image: '/WeTok.png', title: 'Project 3', description: 'Description for Project 3' },
  { id: 4, image: '/Wandering Satellite.png', title: 'Project 4', description: 'Description for Project 4' },
  { id: 5, image: '/Perish.png', title: 'Project 5', description: 'Description for Project 5' },
];

function Portfolio({ projects = defaultProjects }) {
  const sliderRef = useRef(null);
  const leftTimerRef = useRef(null);
  const rightTimerRef = useRef(null);

  const settings = {
    infinite: true,
    centerMode: true,
    centerPadding: '20%',
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    dots: false,
    cssEase: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  };

  const handleLeftMouseEnter = () => {
    leftTimerRef.current = setTimeout(() => {
      sliderRef.current.slickPrev();
    }, 1000);
  };
  const handleLeftMouseLeave = () => {
    if (leftTimerRef.current) clearTimeout(leftTimerRef.current);
  };

  const handleRightMouseEnter = () => {
    rightTimerRef.current = setTimeout(() => {
      sliderRef.current.slickNext();
    }, 1000);
  };
  const handleRightMouseLeave = () => {
    if (rightTimerRef.current) clearTimeout(rightTimerRef.current);
  };

  return (
    <section id="portfolio" className="section" style={{ padding: '2rem 0' }}>
      <div className="container">
        <h2>Portfolio</h2>
        <div style={{ position: 'relative' }}>
          <Slider ref={sliderRef} {...settings}>
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <img src={project.image} alt={project.title} className="project-image" />
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            ))}
          </Slider>
          {/* Left navigation overlay */}
          <div 
            className="nav-left" 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '20%',
              height: '100%',
              cursor: 'pointer',
              zIndex: 10,
            }}
            onMouseEnter={handleLeftMouseEnter}
            onMouseLeave={handleLeftMouseLeave}
          ></div>
          {/* Right navigation overlay */}
          <div 
            className="nav-right" 
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '20%',
              height: '100%',
              cursor: 'pointer',
              zIndex: 10,
            }}
            onMouseEnter={handleRightMouseEnter}
            onMouseLeave={handleRightMouseLeave}
          ></div>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
