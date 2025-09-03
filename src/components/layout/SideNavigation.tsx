import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface NavSection {
  id: string;
  label: string;
}

interface SideNavigationProps {
  sections: NavSection[];
  className?: string;
}

const SideNavigation: React.FC<SideNavigationProps> = ({ sections, className }) => {
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          // Only show sidebar when we reach the "about" section or later
          // Hide sidebar when on hero section or footer
          if (entry.target.id === 'hero' || entry.target.id === 'footer') {
            setIsVisible(false);
          } else if (entry.target.id === 'about' || sections.findIndex(s => s.id === entry.target.id) >= 0) {
            setIsVisible(true);
          }
        }
      });
    }, observerOptions);

    // Observe all sections including hero
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Also observe hero and footer sections
    const heroElement = document.getElementById('hero');
    if (heroElement) {
      observer.observe(heroElement);
    }
    
    const footerElement = document.getElementById('footer');
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Don't render if not visible
  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        "fixed left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col space-y-4",
        "lg:flex hidden", // Ensure it's visible on desktop but hidden on mobile
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background container for better visibility */}
      <div className={cn(
        "backdrop-blur-xl rounded-2xl p-4 transition-all duration-300",
        isHovered ? "bg-background/30 shadow-soft border border-border/30" : "bg-transparent shadow-none border-0"
      )}>
        <div className="flex flex-col space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="flex items-center group relative">
              <button
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "nav-dot mr-4 relative z-10",
                  activeSection === section.id && "nav-dot active"
                )}
                aria-label={`Navigate to ${section.label}`}
              />
              <span className={cn(
                "text-sm font-medium transition-all duration-300 whitespace-nowrap backdrop-blur-md px-3 py-2 rounded-lg ml-2",
                "opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0",
                isHovered ? "bg-card/40 shadow-soft border border-border/30" : "bg-transparent shadow-none border-0",
                activeSection === section.id && "opacity-100 text-white border-white/20 bg-white/10"
              )}>
                {section.label}
              </span>
              
              {/* Connection line */}
              <div className={cn(
                "absolute left-2 top-1/2 w-6 h-0.5 bg-gradient-to-r from-white/50 to-transparent transform -translate-y-1/2 transition-opacity duration-300",
                activeSection === section.id ? "opacity-100" : "opacity-0 group-hover:opacity-50"
              )} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideNavigation;