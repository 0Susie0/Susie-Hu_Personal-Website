import React, { useEffect } from 'react';
import DownloadCVButton from "./DownloadCVButton";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Contact() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js";
    script.async = true;
    script.onload = () => window.AOS.init();
    document.body.appendChild(script);
  }, []);

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2>Contact Me</h2>
        <DownloadCVButton />
        <p style={{ marginTop: '1rem' }} text-align="center">
          Thank you for visiting my website! You can reach me via email at{' '}
          <a href="mailto:SusieHu98@outlook.com"><strong>SusieHu98@outlook.com</strong></a> or call at{' '}
          <a href="tel:+61 483 215 631"><strong>+61 483 215 631</strong></a>.
        </p>
        <div className="social-icons" data-aos="fade-up">
          <a href="https://www.linkedin.com/in/susie-hu-101b5b246/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://github.com/0Susie0" target="_blank" rel="noreferrer" aria-label="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.facebook.com/xinyue.hu.7798" target="_blank" rel="noreferrer" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/susie_hu02/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        
      </div>
    </section>
  );
}

export default Contact;