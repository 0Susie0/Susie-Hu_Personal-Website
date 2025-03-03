import React from 'react';
import './App.css';
import Header from './Components/Header';
import About from './Components/About';
import SkillsSectionTabs from './Components/SkillsSectionTabs';
import Portfolio from './Components/Portfolio';
import Contact from './Components/Contact';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <About />
        <SkillsSectionTabs />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
