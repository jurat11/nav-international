import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import EcosystemSection from '../components/sections/EcosystemSection';
import StatsSection from '../components/sections/StatsSection';

const Index = () => {
  return (
    <Layout showSideNav={false}>
      <div className="overflow-hidden">
        <HeroSection />
        <AboutSection />
        <EcosystemSection />
        <StatsSection />
      </div>
    </Layout>
  );
};

export default Index;
