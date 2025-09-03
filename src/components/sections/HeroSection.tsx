import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, TrendingUp, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import heroNetworkImage from '@/assets/hero-network.jpg';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden pt-16">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-secondary/10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary)/0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, hsl(var(--secondary)/0.1) 0%, transparent 50%),
                           radial-gradient(circle at 40% 80%, hsl(var(--accent)/0.1) 0%, transparent 50%)`
        }} />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full animate-float blur-sm" />
        <div className="absolute top-40 left-10 w-16 h-16 bg-gradient-to-br from-secondary/30 to-accent/30 rounded-full animate-float delay-200 blur-sm" />
        <div className="absolute bottom-40 right-40 w-24 h-24 bg-gradient-to-br from-primary/25 to-secondary/25 rounded-full animate-float delay-300 blur-sm" />
        <div className="absolute top-60 left-1/3 w-20 h-20 bg-gradient-to-br from-accent-bright/20 to-primary/20 rounded-full animate-float delay-100 blur-sm" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8 animate-fadeInUp relative z-10">
          <div className="space-y-6">
            {/* Brand badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-soft border border-primary/10">
              <div className="w-2 h-2 bg-accent-bright rounded-full mr-2 animate-pulse" />
              <span className="text-sm font-medium text-primary">Uzbekistan's #1 Startup Ecosystem</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
              <span className="block text-gradient mb-2">{t('hero.title').split(':')[0]}:</span>
              <span className="block text-foreground leading-tight">
                {t('hero.title').split(':').slice(1).join(':')}
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {t('hero.description')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-gradient-to-r from-secondary to-accent-bright hover:from-secondary/90 hover:to-accent-bright/90 text-white group shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-105 px-8 py-4 text-lg">
              {t('hero.cta')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="outline" size="lg" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white px-8 py-4 text-lg transition-all duration-300 hover:scale-105">
              Learn More
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6 pt-8">
            <div className="flex items-center space-x-2">
              <div className="icon-container bg-accent-bright">
                <Users className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <div className="font-semibold">10M+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="icon-container bg-secondary-accent">
                <TrendingUp className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <div className="font-semibold">$800M+</div>
                <div className="text-sm text-muted-foreground">Ecosystem Value</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="icon-container bg-secondary">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold">Global</div>
                <div className="text-sm text-muted-foreground">Reach</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Enhanced Hero Visual */}
        <div className="relative animate-slideInRight">
          <div className="relative w-full max-w-md lg:max-w-lg mx-auto">
            {/* Main Hero Visual */}
            <div className="relative overflow-hidden rounded-3xl shadow-strong bg-gradient-to-br from-white via-primary/5 to-secondary/10 backdrop-blur-sm border border-white/20">
              <img 
                src={heroNetworkImage}
                alt="NAV startup ecosystem network visualization"
                className="w-full h-auto object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-secondary/20"></div>
              
              {/* Enhanced Floating Stats */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-strong animate-float border border-primary/10">
                <div className="text-center">
                  <div className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">10M+</div>
                  <div className="text-xs text-muted-foreground font-medium">Active Users</div>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-strong animate-float delay-200 border border-secondary/10">
                <div className="text-center">
                  <div className="text-xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">$800M</div>
                  <div className="text-xs text-muted-foreground font-medium">Ecosystem Value</div>
                </div>
              </div>

              {/* New floating element */}
              <div className="absolute top-1/2 -right-3 bg-gradient-to-r from-accent-bright to-primary p-3 rounded-full shadow-strong animate-float delay-100">
                <Globe className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Enhanced Decorative Background Shapes */}
            <div className="absolute -z-10 top-4 right-4 w-full h-full bg-gradient-to-br from-secondary/20 via-primary/20 to-accent/20 rounded-3xl rotate-3 blur-sm" />
            <div className="absolute -z-20 top-8 right-8 w-full h-full bg-gradient-to-br from-accent/15 via-secondary/15 to-primary/15 rounded-3xl -rotate-3 blur-md" />
            
            {/* Additional decorative elements */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-sm animate-float delay-300" />
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br from-secondary/25 to-primary/25 rounded-full blur-sm animate-float delay-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;