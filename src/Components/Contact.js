import React from 'react';

function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <h2>Contact Me</h2>
        <div className="social-icons">
          <a href="https://www.linkedin.com/in/your-linkedin" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://github.com/your-github" target="_blank" rel="noreferrer" aria-label="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.facebook.com/your-facebook" target="_blank" rel="noreferrer" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/your-instagram" target="_blank" rel="noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <p>
          Thank you for visiting my website! You can reach me via email at{' '}
          <a href="mailto:your.email@example.com">your.email@example.com</a> or call at{' '}
          <a href="tel:+1234567890">+1 (234) 567-890</a>.
        </p>
      </div>
    </section>
  );
}

export default Contact;
