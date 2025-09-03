import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBlogs } from '../hooks/useBlogs';
import { cn } from '@/lib/utils';
import { Button } from '../components/ui/button';

const Press = () => {
  const { t } = useLanguage();
  const { blogs, loading, error } = useBlogs();
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading news...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading news: {error}</p>
            <p className="text-muted-foreground">Please try again later.</p>
          </div>
        </div>
      </Layout>
    );
  }

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
              News and Press Releases
            </h1>
          </div>
        </div>

        {/* News Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {blogs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No news articles available.</p>
              <p className="text-muted-foreground">Check back later for updates.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
              <div
                key={blog.id}
                className="group cursor-pointer rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-500 hover:-translate-y-2 bg-card"
                onClick={() => setSelectedArticle(blog.id)}
              >
                {/* Image */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop&crop=center';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                {/* Content */}
                <div className="p-6">
                  <div className="text-sm mb-3 text-muted-foreground">
                    {formatDate(blog.date)}
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-4 leading-tight transition-transform duration-300 group-hover:-translate-y-1 text-foreground">
                    {blog.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed opacity-0 max-h-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-h-20 text-muted-foreground">
                    {blog.excerpt}
                  </p>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>

                {/* Article Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
            {(() => {
              const article = blogs.find(a => a.id === selectedArticle);
              if (!article) return null;
              
              return (
                <div className="min-h-screen">
                  {/* Article Header */}
                  <div className="bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 py-20 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-10 right-20 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
                      <div className="absolute bottom-10 left-20 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent rounded-full blur-3xl"></div>
          </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-4">
                          <span className="text-white/80">🏠</span>
                          <button
                            onClick={() => setSelectedArticle(null)}
                            className="text-white/80 hover:text-white transition-colors"
                          >
                            ← Back to list
                          </button>
                        </div>
                        <button
                          onClick={() => setSelectedArticle(null)}
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                      
                      <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                        {article.title}
                      </h1>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {/* News Tag and Date */}
                    <div className="mb-8">
                      <div className="inline-block bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm font-medium mb-4">
                        News
                      </div>
                      <div className="text-muted-foreground text-lg">
                        {formatDate(article.date)}
                      </div>
                </div>

                                        {/* Article Body */}
                    <div className="prose prose-lg max-w-none">
                      <div 
                        className="text-foreground leading-relaxed text-lg"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                      />
                    </div>
        </div>



                  {/* Navigation Footer */}
                  <div className="bg-background border-t border-border py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="flex items-center justify-center">
                        <Button
                          onClick={() => setSelectedArticle(null)}
                          variant="outline"
                          className="border-secondary text-secondary hover:bg-secondary hover:text-white"
                        >
                          ← Back to News
                        </Button>
                      </div>
        </div>
            </div>
            </div>
              );
            })()}
          </div>
        )}
        </div>
    </Layout>
  );
};

export default Press;