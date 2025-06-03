import React from 'react';
import HeroSection from '../components/home/HeroSection';
import HowItWorks from '../components/home/HowItWorks';
import PricingSection from '../components/home/PricingSection';
import Testimonials from '../components/home/Testimonials';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <PricingSection />
      <Testimonials />
    </div>
  );
};

export default HomePage;