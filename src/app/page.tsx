import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Stack from './components/Stack';
import ExperienceLog from './components/ExperienceLog';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="grid-backdrop min-h-svh">
      <NavBar />
      <main>
        <Hero />
        <Projects />
        <Stack />
        <ExperienceLog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
