// Header.js
import React from 'react';

function Header() {
  return (
    <header className="header-footer-container header" role="banner">
      <div className="header-footer-inner">
        <h1 className="header-title">Susie Hu</h1>
        <nav aria-label="Main Navigation">
          <ul className="header-nav-list">
            <li><a href="#about">About</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#education-timeline">Education & Experience</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
