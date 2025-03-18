import React from 'react';

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2>About Me</h2>
        <img src="/ProfilePhoto2.jpg" alt="Susie Hu" className="profile-photo" />
        
        <div className="intro-sections-container">
          <div className="intro-section">
            <h3><span className="emoji">👩🏻‍💻</span> Tech for Good</h3>
            <p>
              I'm a programmer skilled in Java, Python, and SQL, with experience creating personalised nutrition and social apps that assist vulnerable communities. My goal is developing human-centred technology that positively impacts lives.
            </p>
          </div>

          <div className="intro-section">
            <h3><span className="emoji">🎶</span> Music Meets Tech</h3>
            <p>
              Outside work, I enjoy playing piano and singing. I'm particularly fascinated by sound and music computing, exploring how technology can reshape creative expression.
            </p>
          </div>

          <div className="intro-section">
            <h3><span className="emoji">🌱</span> Passionate about Education</h3>
            <p>
              I'm passionate about supporting young people's development. I strongly believe education empowers the next generation and lays the foundation for a brighter future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About; 