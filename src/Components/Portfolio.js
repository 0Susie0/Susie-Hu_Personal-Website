import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Portfolio3D.css';

const defaultProjects = [
  { id: 1, image: '/FoodGI.jpg', title: 'GI Tracker', description: 'A food recognisation and recipe generator for diabetic patients', link: 'https://github.com/0Susie0/GI-Tracker' },
  { id: 2, image: '/Personalised Nutrition.jpg', title: 'Personalised Nutrition', description: 'A personalised health management platform', link: 'https://github.com/0Susie0/Personalised-Nutrition' },
  { id: 3, image: '/WeTok.png', title: 'WeTok', description: 'Wetok is a social media app specifically aimed at person with a strong personality.', link: 'https://github.com/0Susie0/WeTok' },
  { id: 4, image: '/Wandering Satellite.png', title: 'Wandering Satellite', description: 'This music tells a story of a satellite which lost connection with earth wandered in the space. ', link: 'https://github.com/0Susie0/Wandering-Satellite' },
  { id: 5, image: '/Perish.png', title: 'Perish', description: 'Sound and Music Computing Project', link: 'https://github.com/0Susie0/Perish' },
];

function ProjectCard({ project }) {
  return (
    <div className="project-card" style={{ textAlign: 'center' }}>
      <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={project.image} alt={project.title} className="project-image" />
        <h3 style={{ textAlign: 'center' }}>{project.title}</h3>
        <p style={{ textAlign: 'center' }}>{project.description}</p>
      </a>
    </div>
  );
}

function NavOverlay({ direction, onClick, onHover, isHovered, onLeave }) {
  const isLeft = direction === 'left';
  const ArrowIcon = isLeft ? FaChevronLeft : FaChevronRight;
  return (
    <div
      className={`nav-${direction}`}
      style={{
        position: 'absolute',
        top: 0,
        [isLeft ? 'left' : 'right']: 0,
        width: '20%',
        height: '100%',
        cursor: 'pointer',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={isLeft ? 'Previous project' : 'Next project'}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      {isHovered && (
        <ArrowIcon size={48} style={{ color: '#104c91', opacity: 0.85, [isLeft ? 'marginLeft' : 'marginRight']: '10px', background: 'rgba(255,255,255,0.7)', borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
      )}
    </div>
  );
}

function Portfolio({ projects = defaultProjects }) {
  const sliderRef = useRef(null);
  const [hoveredNav, setHoveredNav] = useState(null); // 'left', 'right', or null

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

  return (
    <section id="portfolio" className="section" style={{ padding: '2rem 0' }}>
      <div className="container">
        <h2>Portfolio</h2>
        <div className="slider-wrapper" style={{ position: 'relative' }}>
          <Slider ref={sliderRef} {...settings}>
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </Slider>
          <NavOverlay
            direction="left"
            onClick={() => sliderRef.current.slickPrev()}
            onHover={() => setHoveredNav('left')}
            onLeave={() => setHoveredNav(null)}
            isHovered={hoveredNav === 'left'}
          />
          <NavOverlay
            direction="right"
            onClick={() => sliderRef.current.slickNext()}
            onHover={() => setHoveredNav('right')}
            onLeave={() => setHoveredNav(null)}
            isHovered={hoveredNav === 'right'}
          />
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
