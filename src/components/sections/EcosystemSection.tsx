import React from 'react';
import { 
  Rocket, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Car, 
  Network 
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const EcosystemSection = () => {
  const { t } = useLanguage();

  const services = [
    {
      name: t('ecosystem.ventures'),
      icon: Rocket,
      description: 'Startup incubation and venture marketplace',
      bgColor: 'bg-secondary',
      delay: 'delay-100'
    },
    {
      name: t('ecosystem.mentor'),
      icon: Users,
      description: 'Connect with top-tier mentors and advisors',
      bgColor: 'bg-secondary-accent',
      delay: 'delay-200'
    },
    {
      name: t('ecosystem.fund'),
      icon: CreditCard,
      description: 'Digital funding solutions and BNPL options',
      bgColor: 'bg-accent-bright',
      delay: 'delay-300'
    },
    {
      name: t('ecosystem.scale'),
      icon: TrendingUp,
      description: 'Tools and resources for scaling ventures',
      bgColor: 'bg-secondary',
      delay: 'delay-400'
    },
    {
      name: t('ecosystem.mobility'),
      icon: Car,
      description: 'Business mobility and transportation solutions',
      bgColor: 'bg-secondary-accent',
      delay: 'delay-500'
    },
    {
      name: t('ecosystem.connect'),
      icon: Network,
      description: 'Networking platform for entrepreneurs',
      bgColor: 'bg-accent-bright',
      delay: 'delay-600'
    }
  ];

  return (
    <section id="ecosystem" className="py-24 dark-gradient text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-accent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-secondary-accent to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center space-y-6 mb-16 animate-fadeInUp">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            {t('ecosystem.title')}
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            {t('ecosystem.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`service-card bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 animate-fadeInUp ${service.delay}`}
            >
              <div className={`icon-container ${service.bgColor} mb-6`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{service.name}</h3>
              <p className="text-white/70 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fadeInUp delay-200">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <Network className="w-5 h-5 text-accent-bright" />
            <span className="text-white font-medium">Integrated Ecosystem Solutions</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;