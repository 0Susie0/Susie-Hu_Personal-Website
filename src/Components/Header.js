// Header.js
import React from 'react';

function Header() {
  return (
    <header role="banner">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0' }}>
        <h1 style={{ margin: 0 }}>Susie Hu</h1>
        <nav aria-label="Main Navigation">
          <ul style={{ listStyle: 'none', display: 'flex', gap: '0.5rem', margin: 0, padding: 0 }}>
            <li><a href="#about">About</a></li>
            <li><a href="#Portfolio">Portfolio</a></li>
            <li><a href="#Skills">Skills</a></li>
            <li><a href="#education-timeline">Education & Experience</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
