import React from 'react';
import Layout from '../components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const Contacts = () => {
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
              Contacts
            </h1>
          </div>
        </div>

        {/* Contact Information */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Office Locations */}
          <div className="mb-16">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Uzum Central Office */}
              <div className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-2xl p-8 shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-1 hover:scale-105 cursor-pointer border border-secondary/20">
                <h3 className="text-xl font-bold text-foreground mb-6">Uzum Central Office</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-secondary rounded-full flex-shrink-0 mt-1"></div>
                    <div>
                      <p className="text-foreground font-medium">Tashkent, 30 Fidokor Street</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-secondary rounded-full flex-shrink-0 mt-1"></div>
                    <div>
                      <p className="text-foreground font-medium">Abu Dhabi, 3402, 34 Al Maqam Tower, Regus ADGM Square, Al Maryah Island</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Uzum E-commerce Office */}
              <div className="bg-card rounded-2xl p-8 shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-1 hover:scale-105 cursor-pointer">
                <h3 className="text-xl font-bold text-foreground mb-6">Uzum E-commerce Office</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-secondary rounded-full flex-shrink-0 mt-1"></div>
                    <div>
                      <p className="text-foreground font-medium">Tashkent, 132 Kichik Beshagach</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Uzum Fintech Office */}
              <div className="bg-card rounded-2xl p-8 shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-1 hover:scale-105 cursor-pointer">
                <h3 className="text-xl font-bold text-foreground mb-6">Uzum Fintech Office</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-secondary rounded-full flex-shrink-0 mt-1"></div>
                    <div>
                      <p className="text-foreground font-medium">Tashkent, 1st Mustaqillik Passage, Building 8</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Relations Contacts */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Investor Relations */}
            <div className="bg-card rounded-2xl p-8 shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-1 hover:scale-105 cursor-pointer">
              <h3 className="text-xl font-bold text-foreground mb-6">Investor Relations</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-lg font-semibold text-foreground">Nikolay Seleznev</p>
                  <p className="text-muted-foreground">Chief Strategy and Business Development Officer</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-secondary rounded-full flex-shrink-0"></div>
                  <p className="text-foreground font-medium">ir@uzum.com</p>
                </div>
              </div>
            </div>

            {/* Media/Public Relations */}
            <div className="bg-card rounded-2xl p-8 shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-1 hover:scale-105 cursor-pointer">
              <h3 className="text-xl font-bold text-foreground mb-6">Media/Public Relations</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-lg font-semibold text-foreground">Maria Skorik</p>
                  <p className="text-muted-foreground">Head of Communications and Social Projects</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-secondary rounded-full flex-shrink-0"></div>
                  <p className="text-foreground font-medium">pr@uzum.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contacts;