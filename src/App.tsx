import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Community from './components/Community';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#FDFCF9]">
      <Hero />
      <Features />
      <HowItWorks />
      <Community />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default App;
