import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import ProblemSection from './sections/ProblemSection';
import SolutionSection from './sections/SolutionSection';
import FlowSection from './sections/FlowSection';
import MapSection from './sections/MapSection';
import FormulaSection from './sections/FormulaSection';
import ScenarioSection from './sections/ScenarioSection';
import ImpactSection from './sections/ImpactSection';
import InnovationSection from './sections/InnovationSection';
import TechSection from './sections/TechSection';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <div className="divider" />
        <ProblemSection />
        <div className="divider" />
        <SolutionSection />
        <div className="divider" />
        <FlowSection />
        <div className="divider" />
        <MapSection />
        <div className="divider" />
        <FormulaSection />
        <div className="divider" />
        <ScenarioSection />
        <div className="divider" />
        <ImpactSection />
        <div className="divider" />
        <InnovationSection />
        <div className="divider" />
        <TechSection />
        <Footer />
      </main>
    </div>
  );
}

export default App;
