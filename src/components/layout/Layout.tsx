import React from 'react';
import Navbar from './Navbar';
import Footer from '../sections/Footer';
import SideNavigation from './SideNavigation';

interface LayoutProps {
  children: React.ReactNode;
  showSideNav?: boolean;
  sideNavSections?: Array<{
    id: string;
    label: string;
  }>;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showSideNav = false, 
  sideNavSections = [] 
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {showSideNav && sideNavSections.length > 0 && (
        <SideNavigation sections={sideNavSections} />
      )}
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;