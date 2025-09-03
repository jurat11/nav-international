import React from 'react';
import { Trophy, PieChart, Building2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const StatsSection = () => {
  const { t } = useLanguage();

  const achievements = [
    {
      icon: Trophy,
      title: t('stats.innovation'),
      bgColor: 'bg-secondary'
    },
    {
      icon: PieChart,
      title: t('stats.market'),
      bgColor: 'bg-secondary-accent'
    },
    {
      icon: Building2,
      title: t('stats.employees'),
      bgColor: 'bg-accent-bright'
    }
  ];

  return (
    <section id="stats" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16 animate-fadeInUp">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="text-gradient">{t('stats.title')}</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            {t('stats.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className={`stat-card animate-fadeInUp delay-${(index + 1) * 100}`}
            >
              <div className={`icon-container ${achievement.bgColor} mx-auto mb-4`}>
                <achievement.icon className="w-8 h-8" />
              </div>
              <p className="text-lg font-medium leading-relaxed">{achievement.title}</p>
            </div>
          ))}
        </div>

        {/* Large Highlight Card */}
        <div className="bg-gradient-to-r from-primary to-secondary-accent rounded-3xl p-8 lg:p-12 text-center shadow-strong animate-fadeInUp delay-400">
          <div className="space-y-4">
            <h3 className="text-2xl lg:text-3xl font-bold text-primary-foreground">
              Leading Digital Innovation in Central Asia
            </h3>
            <p className="text-lg text-primary-foreground/90 max-w-3xl mx-auto">
              NAV has become the cornerstone of Uzbekistan's digital transformation, 
              connecting entrepreneurs, investors, and innovators in an unprecedented ecosystem of growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;