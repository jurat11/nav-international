import React from 'react';
import Layout from '../components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const Sustainability = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-20">
        {/* Header Section with Blue Gradient */}
        <div className="bg-gradient-to-r from-primary to-secondary py-20 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 right-20 w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-20 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/20 rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
              Sustainability
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Educational Projects Section */}
          <div className="mb-20">
            <div className="text-sm text-muted-foreground mb-4">Educational Projects</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8 leading-tight">
              As a key driver of small and medium business growth, as well as the IT sector in the country,{' '}
              <span className="text-secondary">we actively invest in training entrepreneurs across Uzbekistan</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              — This includes our own programmes like Uzum Academy's Vendor Training Programme, as well as various partnership projects.
            </p>
          </div>

          {/* Training and Support Section */}
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-8">
                Training and Support for Young Professionals
              </h3>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  We have assembled a highly skilled team of specialists and are dedicated to sharing their knowledge and expertise. 
                  Over 100 young professionals from across the country have been trained in the most in-demand IT skills through 
                  Uzum's IT Academy, our own educational platform.
                </p>
                <p>
                  In collaboration with UNDP, we launched a programme on entrepreneurship fundamentals for socially vulnerable groups, 
                  which has already been attended by over 100 beneficiaries.
                </p>
              </div>
              
              {/* Training Milestones */}
              <div className="mt-12">
                <h4 className="text-lg font-semibold text-foreground mb-6">Training Milestones</h4>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-4xl font-bold text-secondary mb-2">&gt; 2,000</div>
                    <div className="text-muted-foreground">entrepreneurs educated</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-secondary mb-2">&gt; 100</div>
                    <div className="text-muted-foreground">IT specialists trained</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=450&fit=crop&crop=center"
                  alt="Training session"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Team Leaders Section */}
          <div className="mb-20">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
              Our Team Leaders regularly deliver lectures and workshops for students, partnering with the country's leading universities. 
              Additionally, Uzum actively supports national teams in their preparation for programming Olympiads and competitions.
            </p>
          </div>

          {/* Visual Showcase */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-card rounded-2xl p-6 shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-1 hover:scale-105 cursor-pointer">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=400&fit=crop&crop=center"
                  alt="Delivery services"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold text-foreground">Delivery Services</h4>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-1 hover:scale-105 cursor-pointer">
              <div className="aspect-square bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop&crop=center"
                  alt="E-commerce"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold text-foreground">E-commerce Platform</h4>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-1 hover:scale-105 cursor-pointer">
              <div className="aspect-square bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400&h=400&fit=crop&crop=center"
                  alt="Financial services"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold text-foreground">Financial Services</h4>
            </div>
          </div>

          {/* Infrastructure for Social Projects */}
          <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl p-12 mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-sm text-muted-foreground mb-4">Infrastructure for Social Projects</div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8 leading-tight">
                  The physical infrastructure we create is also used in the company's social and charitable projects
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    For example, air quality sensors have been installed at Uzum Market's pick-up points across the regions, 
                    allowing both residents and government officials to access real-time and accurate air quality information, 
                    not only in the capital but also in other regions.
                  </p>
                  <p>
                    Uzum's logistics capabilities are actively utilised for charitable projects. Uzum Market regularly delivers 
                    aid across the country to beneficiaries of the ONA Foundation (women in difficult life situations, children and large families).
                  </p>
                </div>
              </div>
              
              <div className="bg-yellow-100 rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 mb-6">
                  <div className="aspect-[4/3] bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-800 mb-2">Real-time Air Quality Map</div>
                      <div className="text-sm text-yellow-700">Uzum Market Locations</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-foreground mb-2">Real-time air quality map for Uzum Market</div>
                    <button className="bg-secondary text-white px-6 py-2 rounded-lg font-medium hover:bg-secondary/90 transition-colors">
                      View on map
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Principles and Reporting */}
          <div className="bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-3xl p-12">
            <div className="text-sm text-muted-foreground mb-4">Principles and Reporting</div>
            <p className="text-xl text-foreground mb-12 leading-relaxed">
              To evaluate Uzum Group's contribution to the country's sustainable development and the effectiveness of its operations, 
              the company adheres to <strong>Global Reporting Initiative (GRI)</strong> standards in the preparation of its ESG reports.
            </p>
            
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:shadow-medium hover:-translate-y-1 hover:scale-105 cursor-pointer">
              <h3 className="text-2xl font-bold text-foreground mb-8">Our ESG Approach</h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">Client-Focused Solutions</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Driving ESG initiatives that not only contribute to societal progress and environmental sustainability 
                    but also deliver meaningful value to Uzum Group's customers.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">Innovation</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Harnessing new technologies and innovative approaches to tackle sustainability challenges.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">Culture and Professionalism</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Leveraging employee expertise and engagement in the implementation of the ESG strategy.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded"></div>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">ESG Policy</div>
                    <div className="text-sm text-muted-foreground">233 Kb</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sustainability;