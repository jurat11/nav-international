import React from 'react';
import { Award, Users2, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutSection = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Award,
      title: t('about.stat1.title'),
      subtitle: t('about.stat1.subtitle'),
      bgColor: 'bg-secondary'
    },
    {
      icon: Users2,
      title: t('about.stat2.title'),
      subtitle: t('about.stat2.subtitle'),
      bgColor: 'bg-secondary-accent'
    },
    {
      icon: Target,
      title: t('about.stat3.title'),
      subtitle: t('about.stat3.subtitle'),
      bgColor: 'bg-accent-bright'
    }
  ];

  return (
    <section id="about" className="py-24 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16 animate-fadeInUp">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="text-gradient">{t('about.title')}</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t('about.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`stat-card animate-fadeInUp delay-${(index + 1) * 100}`}
            >
              <div className={`icon-container ${stat.bgColor} mx-auto mb-4`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{stat.title}</h3>
              <p className="text-muted-foreground">{stat.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Visual Separator */}
        <div className="mt-24 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-background px-8">
              <div className="w-16 h-1 bg-gradient-to-r from-primary-accent to-secondary-accent rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;