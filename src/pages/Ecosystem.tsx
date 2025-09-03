import React from 'react';
import Layout from '../components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const Ecosystem = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-20">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary to-secondary py-20 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 right-20 w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-20 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/20 rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
              Overview
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Main Description */}
          <div className="text-center mb-16">
            <p className="text-2xl lg:text-3xl text-foreground leading-relaxed max-w-5xl mx-auto">
              Through the synergy of our services, Uzum creates a{' '}
              <span className="text-secondary font-semibold">unique user experience</span>{' '}
              while maintaining{' '}
              <span className="text-secondary font-semibold">maximum efficiency across all units during rapid growth</span>.
            </p>
          </div>

          {/* Supporting Paragraphs */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="text-lg text-muted-foreground leading-relaxed">
              <p>
                Millions of Uzbeks come to us for great deals, and thanks to our convenient payment services 
                and instalment options, they seamlessly transition into users of our fintech products.
              </p>
            </div>
            <div className="text-lg text-muted-foreground leading-relaxed">
              <p>
                This approach fosters loyalty and increases the overall value we offer to our users and partners.
              </p>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="grid md:grid-cols-3 gap-12 mb-20">
            {/* First Statistic */}
            <div className="text-center">
              <div className="text-6xl font-bold text-secondary mb-4">
                &gt; 48%
              </div>
              <div className="text-lg text-muted-foreground mb-6">
                of purchases (GMV) are paid with Nasiya BNPL solution
              </div>
              <div className="flex justify-center space-x-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Second Statistic */}
            <div className="text-center">
              <div className="text-6xl font-bold text-secondary mb-4">
                25%
              </div>
              <div className="text-lg text-muted-foreground mb-6">
                of Tezkor's GMV generated via Uzum Market's app
              </div>
              <div className="flex justify-center space-x-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Business Units Card */}
            <div className="bg-card rounded-2xl p-8 shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-1 hover:scale-105 cursor-pointer">
              <h3 className="text-2xl font-bold text-foreground mb-4">Business Units</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our ecosystem brings together newly established businesses created by Uzum, such as Uzbekistan's 
                largest marketplace, Uzum Market, alongside mature businesses that are leaders in their respective markets.
              </p>
            </div>
          </div>

          {/* Uzbekistan Economy Section */}
          <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl p-12 mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-8 text-center">
              Uzbekistan today is one of the most promising economies in the world among emerging countries
            </h2>
            <p className="text-xl text-muted-foreground text-center max-w-4xl mx-auto mb-12 leading-relaxed">
              As the most populous country in the region, Uzbekistan is strategically located at the crossroads 
              of Europe and Asia, making it a key hub for trade and economic cooperation. The country's young 
              population is driving strong consumer demand, particularly in the digital services sector.
            </p>

            {/* Key Statistics */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-background rounded-2xl p-8 text-center shadow-soft">
                <div className="text-4xl font-bold text-secondary mb-2">8%</div>
                <div className="text-sm text-muted-foreground mb-2">2023 – 2026</div>
                <div className="text-lg font-semibold text-foreground">Projected CAGR of GDP</div>
              </div>
              <div className="bg-background rounded-2xl p-8 text-center shadow-soft">
                <div className="text-4xl font-bold text-secondary mb-2">&gt; 50%</div>
                <div className="text-lg font-semibold text-foreground">of the population is under the age of 30</div>
              </div>
              <div className="bg-background rounded-2xl p-8 text-center shadow-soft">
                <div className="text-4xl font-bold text-secondary mb-2">~80%</div>
                <div className="text-lg font-semibold text-foreground">internet penetration rate</div>
              </div>
            </div>

            {/* Bottom Statistics */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-background rounded-2xl p-8 text-center shadow-soft">
                <div className="text-4xl font-bold text-primary mb-2">$87</div>
                <div className="text-lg font-semibold text-foreground">billion GDP in 2023</div>
              </div>
              <div className="bg-background rounded-2xl p-8 text-center shadow-soft">
                <div className="text-4xl font-bold text-primary mb-2">Up to 1/3</div>
                <div className="text-lg font-semibold text-foreground">of GDP will come from cashless payments by 2027</div>
              </div>
            </div>
          </div>

          {/* Digital Economy Section */}
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-12">
            <div className="text-center mb-8">
              <p className="text-lg text-muted-foreground mb-8 max-w-4xl mx-auto">
                Uzbekistan is already undergoing a digital transformation. According to KPMG, the e-commerce 
                market is the fastest-growing in the region, alongside the expanding market for cashless payments.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-1 hover:scale-105 cursor-pointer">
              <h3 className="text-3xl font-bold text-foreground mb-8 text-center">Expanding Digital Economy</h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-4">E-commerce</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Expected to grow sevenfold compared to 2022 levels, as more people shift to online shopping.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-4">Fintech</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    With over 56% of the population unbanked, Uzbekistan presents substantial potential for 
                    financial inclusion through digital banking and fintech solutions. Furthermore, the share 
                    of cashless payments is expected to rise significantly.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-4">Government Support</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    A key driver of economic growth and digitalisation is the comprehensive government support 
                    for entrepreneurs in the IT and e-commerce sectors, along with the government's focused 
                    efforts to attract international investments into the country.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Ecosystem;