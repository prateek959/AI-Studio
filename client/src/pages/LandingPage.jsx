import Navbar from "../components/common/Navbar";
import Hero from "../components/landing/Hero";
import FeatureSection from "../components/landing/FeatureSection";
import CTA from "../components/landing/CTA";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#030712] text-white">

      <Navbar />

      <Hero />

      <FeatureSection />

      <CTA />

    </div>
  );
};

export default LandingPage;