import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useManagementTeam } from '@/hooks/useManagementTeam';
import { cn } from '@/lib/utils';

const Governance = () => {
  const { t } = useLanguage();
  const { members: managementTeam, loading, error } = useManagementTeam();

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
              Management
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* CEO Section */}
          <div className="mb-20">
            <div className="bg-card rounded-3xl overflow-hidden shadow-strong">
              <div className="grid lg:grid-cols-2 min-h-[500px]">
                {/* CEO Image */}
                <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=500&fit=crop&crop=face"
                    alt="Djasur Djumaev"
                    className="w-full h-full object-cover"
                  />
                  {/* Decorative elements */}
                  <div className="absolute top-6 right-6 w-24 h-24 bg-accent/30 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-6 left-6 w-32 h-32 bg-primary/30 rounded-full blur-2xl"></div>
                </div>
                
                {/* CEO Info */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-12 flex flex-col justify-center">
                  <h2 className="text-4xl font-bold text-foreground mb-4">
                    Djasur Djumaev
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    CEO and founder of the Uzum ecosystem
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Management Team Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Management Team
            </h2>
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-lg text-muted-foreground">Loading management team...</div>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-lg text-red-500">Error loading management team: {error}</div>
              </div>
            ) : managementTeam.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                {managementTeam
                  .sort((a, b) => a.order_index - b.order_index)
                  .map((member) => (
                  <div
                    key={member.id}
                    className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-2 group"
                  >
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img
                        src={member.image_url || 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=500&fit=crop&crop=face'}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=500&fit=crop&crop=face';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {member.name}
                      </h3>
                      <p className="text-sm font-medium text-secondary mb-2">
                        {member.role}
                      </p>
                      {member.experience && (
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {member.experience}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center py-20">
                <div className="text-lg text-muted-foreground">No management team members found.</div>
              </div>
            )}
          </div>

          {/* Corporate Governance Section */}
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">
              Corporate Governance
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-4xl mx-auto mb-12">
              NAV is committed to maintaining the highest standards of corporate governance, 
              ensuring transparency, accountability, and sustainable growth for all stakeholders.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-white rounded-lg"></div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Transparency</h3>
                <p className="text-muted-foreground">Open and transparent operations with regular reporting to stakeholders</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-white rounded-lg"></div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Accountability</h3>
                <p className="text-muted-foreground">Clear responsibility and accountability at all levels of the organization</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-white rounded-lg"></div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Ethics</h3>
                <p className="text-muted-foreground">Strong ethical foundation guiding all business decisions and operations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Governance;