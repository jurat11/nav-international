import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useHistory } from '@/hooks/useHistory';
import { cn } from '@/lib/utils';

const History = () => {
  const { t } = useLanguage();
  const { years, loading, error } = useHistory();
  const [selectedYear, setSelectedYear] = useState('2025');

  // Show all available years
  const availableYears = years.sort((a, b) => b.year - a.year); // Sort by year descending
  const currentYearData = availableYears.find(year => year.year.toString() === selectedYear);

  // Set the selected year to the most recent year when data loads
  useEffect(() => {
    if (availableYears.length > 0 && !currentYearData) {
      setSelectedYear(availableYears[0].year.toString());
    }
  }, [availableYears, currentYearData]);

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
              History
            </h1>
          </div>
        </div>

        {/* Year Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center space-x-12 mb-16">
            {availableYears.map((year) => (
              <button
                key={year.year}
                onClick={() => setSelectedYear(year.year.toString())}
                className={cn(
                  "text-3xl font-bold transition-all duration-300 pb-3 border-b-4 relative group",
                  selectedYear === year.year.toString()
                    ? "text-secondary border-secondary"
                    : "text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground/50"
                )}
              >
                {year.year}
                {selectedYear === year.year.toString() && (
                  <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Content Area */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-lg text-muted-foreground">Loading history data...</div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-lg text-red-500">Error loading history data: {error}</div>
            </div>
          ) : currentYearData ? (
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Image Section */}
              <div className="order-2 lg:order-1">
                <div className="relative group">
                  <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl overflow-hidden shadow-strong">
                    <img
                      src={currentYearData.image_url || 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=1000&fit=crop&crop=center'}
                      alt={`${selectedYear} milestone`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback to a working image if the current one fails
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=1000&fit=crop&crop=center';
                      }}
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/30 rounded-full blur-2xl animate-pulse"></div>
                  <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
                  <div className="absolute top-1/2 -right-8 w-20 h-20 bg-secondary/40 rounded-full blur-xl"></div>
                </div>
              </div>

              {/* Events Section */}
              <div className="order-1 lg:order-2">
                <h2 className="text-5xl font-bold text-secondary mb-12 tracking-tight">
                  {selectedYear}
                </h2>
                
                <div className="space-y-8">
                  {currentYearData.events
                    .sort((a, b) => a.order_index - b.order_index)
                    .map((event, index) => (
                    <div
                      key={event.id}
                      className="bg-card border border-border/50 rounded-3xl p-8 shadow-soft hover:shadow-strong transition-all duration-500 hover:-translate-y-2 group"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full mt-2"></div>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                            {event.month}
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-secondary transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed text-lg">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center py-20">
              <div className="text-lg text-muted-foreground">No history data available for {selectedYear}</div>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 py-16 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Building the Future Together
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Our journey continues as we expand our ecosystem and empower entrepreneurs 
              across Central Asia and beyond. Join us in shaping the future of innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-secondary hover:bg-secondary/90 text-white rounded-xl font-semibold transition-all duration-300 shadow-medium hover:shadow-strong hover:-translate-y-1">
                Join Our Ecosystem
              </button>
              <button className="px-8 py-4 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default History;