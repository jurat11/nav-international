import React from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, DollarSign, Users, Target, 
  Rocket, Building2, Globe, Award
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Investments = () => {
  const { t } = useLanguage();

  const investmentFocus = [
    {
      icon: Rocket,
      title: 'Early Stage Startups',
      description: 'Seed and Series A funding for innovative technology companies',
      range: '$50K - $2M',
      bgColor: 'bg-secondary'
    },
    {
      icon: Building2,
      title: 'Growth Companies',
      description: 'Series B+ funding for scaling businesses with proven models',
      range: '$2M - $20M',
      bgColor: 'bg-secondary-accent'
    },
    {
      icon: Globe,
      title: 'International Expansion',
      description: 'Supporting Uzbek companies entering global markets',
      range: '$500K - $10M',
      bgColor: 'bg-accent-bright'
    },
    {
      icon: Award,
      title: 'Strategic Partnerships',
      description: 'Joint ventures and strategic investments in key sectors',
      range: '$1M - $50M',
      bgColor: 'bg-secondary'
    }
  ];

  const portfolioStats = [
    { number: '$800M+', label: 'Assets Under Management', icon: DollarSign },
    { number: '150+', label: 'Portfolio Companies', icon: Building2 },
    { number: '8.5x', label: 'Average Return Multiple', icon: TrendingUp },
    { number: '85%', label: 'Success Rate', icon: Target }
  ];

  const sectors = [
    'FinTech & Digital Banking',
    'E-commerce & Marketplace',
    'HealthTech & MedTech',
    'EdTech & Learning',
    'AgriTech & Food',
    'CleanTech & Energy',
    'Mobility & Logistics',
    'Enterprise Software'
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 animate-fadeInUp">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              {t('nav.investments')}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
              Fueling innovation and growth in Uzbekistan's startup ecosystem. We invest in 
              visionary entrepreneurs building tomorrow's leading companies.
            </p>
          </div>
        </div>
      </section>

      {/* Investment Focus */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              <span className="text-gradient">Investment Focus</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We partner with exceptional founders across multiple stages and sectors, 
              providing capital and expertise to drive sustainable growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {investmentFocus.map((focus, index) => (
              <div 
                key={index}
                className={`service-card animate-fadeInUp delay-${(index + 1) * 100}`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`icon-container ${focus.bgColor} flex-shrink-0`}>
                    <focus.icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold">{focus.title}</h3>
                      <span className="text-sm font-medium text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                        {focus.range}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{focus.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Stats */}
      <section className="py-24 section-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              <span className="text-gradient">Portfolio Performance</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our track record demonstrates consistent value creation and strong returns 
              for our investors and portfolio companies.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {portfolioStats.map((stat, index) => (
              <div 
                key={index}
                className={`stat-card animate-fadeInUp delay-${(index + 1) * 100}`}
              >
                <div className="icon-container bg-secondary mx-auto mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              <span className="text-gradient">Investment Sectors</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We focus on high-growth sectors that are transforming Uzbekistan's economy 
              and creating value for consumers and businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {sectors.map((sector, index) => (
              <div 
                key={index}
                className={`bg-card border border-border rounded-xl p-6 text-center transition-all duration-300 hover:shadow-medium hover:-translate-y-1 hover:scale-105 cursor-pointer animate-fadeInUp delay-${(index + 1) * 50}`}
              >
                <div className="font-medium text-foreground">{sector}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section className="py-24 dark-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              Investment Process
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Our streamlined process ensures quick decisions while maintaining 
              rigorous due diligence standards.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Initial Review', description: '48-hour response to applications' },
              { step: '02', title: 'Due Diligence', description: 'Comprehensive evaluation process' },
              { step: '03', title: 'Investment Committee', description: 'Final approval and terms' },
              { step: '04', title: 'Partnership', description: 'Ongoing support and guidance' }
            ].map((process, index) => (
              <div 
                key={index}
                className={`text-center animate-fadeInUp delay-${(index + 1) * 100}`}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4">
                  <div className="text-3xl font-bold text-accent-bright mb-3">{process.step}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{process.title}</h3>
                  <p className="text-white/70 text-sm">{process.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="text-gradient">Ready to Scale Your Business?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Whether you're raising your first round or planning international expansion, 
            we're here to provide the capital and expertise you need to succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90">
              Submit Your Proposal
            </Button>
            <Button variant="outline" size="lg">
              Schedule a Meeting
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Investments;