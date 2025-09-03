import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const companyItems = [
    { title: t('nav.company.history'), href: '/company/history' },
    { title: t('nav.company.governance'), href: '/company/governance' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-strong transition-all duration-300 group-hover:scale-110">
                <Compass className="w-7 h-7 text-white group-hover:rotate-12 transition-all duration-300" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-bright rounded-full opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              NAV
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Company Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-secondary/10 hover:text-secondary transition-all duration-300 hover:scale-105 transform font-semibold">
                    {t('nav.company')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[300px]">
                      {companyItems.map((item) => (
                        <NavigationMenuLink
                          key={item.href}
                          asChild
                          className={cn(
                            "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary/10 hover:text-secondary focus:bg-secondary/10 focus:text-secondary",
                            isActive(item.href) && "bg-secondary text-white"
                          )}
                        >
                          <Link to={item.href}>
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Direct Links */}
                <NavigationMenuItem>
                  <Link 
                    to="/ecosystem" 
                    className={cn(
                      "inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-secondary/10 hover:text-secondary focus:bg-secondary/10 focus:text-secondary focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:scale-105 transform",
                      isActive('/ecosystem') && "bg-gradient-to-r from-primary to-secondary text-white shadow-soft !text-white"
                    )}
                  >
                    {t('nav.ecosystem')}
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link 
                    to="/sustainability" 
                    className={cn(
                      "inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-secondary/10 hover:text-secondary focus:bg-secondary/10 focus:text-secondary focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:scale-105 transform",
                      isActive('/sustainability') && "bg-gradient-to-r from-primary to-secondary text-white shadow-soft !text-white"
                    )}
                  >
                    {t('nav.sustainability')}
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link 
                    to="/investments" 
                    className={cn(
                      "inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-secondary/10 hover:text-secondary focus:bg-secondary/10 focus:text-secondary focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:scale-105 transform",
                      isActive('/investments') && "bg-gradient-to-r from-primary to-secondary text-white shadow-soft !text-white"
                    )}
                  >
                    {t('nav.investments')}
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link 
                    to="/press" 
                    className={cn(
                      "inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-secondary/10 hover:text-secondary focus:bg-secondary/10 focus:text-secondary focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:scale-105 transform",
                      isActive('/press') && "bg-gradient-to-r from-primary to-secondary text-white shadow-soft !text-white"
                    )}
                  >
                    {t('nav.press')}
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link 
                    to="/contacts" 
                    className={cn(
                      "inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-secondary/10 hover:text-secondary focus:bg-secondary/10 focus:text-secondary focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:scale-105 transform",
                      isActive('/contacts') && "bg-gradient-to-r from-primary to-secondary text-white shadow-soft !text-white"
                    )}
                  >
                    {t('nav.contacts')}
                  </Link>
                </NavigationMenuItem>


              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-muted/50 rounded-lg p-1 border border-border/50">
              <button
                onClick={() => setLanguage('en')}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-semibold transition-all duration-300 hover:scale-105 transform",
                  language === 'en' 
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-soft !text-white" 
                    : "text-muted-foreground hover:text-secondary hover:bg-secondary/10"
                )}
              >
                En
              </button>
              <button
                onClick={() => setLanguage('uz')}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-semibold transition-all duration-300 hover:scale-105 transform",
                  language === 'uz' 
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-soft !text-white" 
                    : "text-muted-foreground hover:text-secondary hover:bg-secondary/10"
                )}
              >
                Uz
              </button>
            </div>



            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden hover:scale-110 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/98 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="space-y-1">
                <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                  {t('nav.company')}
                </div>
                {companyItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "block px-6 py-2 text-sm transition-colors hover:bg-muted rounded-lg",
                      isActive(item.href) && "bg-secondary text-white"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              
              <Link
                to="/ecosystem"
                className={cn(
                  "block px-3 py-2 text-sm font-medium transition-colors hover:bg-muted rounded-lg",
                  isActive('/ecosystem') && "bg-secondary text-white"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.ecosystem')}
              </Link>

              <Link
                to="/sustainability"
                className={cn(
                  "block px-3 py-2 text-sm font-medium transition-colors hover:bg-muted rounded-lg",
                  isActive('/sustainability') && "bg-secondary text-white"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.sustainability')}
              </Link>

              <Link
                to="/investments"
                className={cn(
                  "block px-3 py-2 text-sm font-medium transition-colors hover:bg-muted rounded-lg",
                  isActive('/investments') && "bg-secondary text-white"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.investments')}
              </Link>

              <Link
                to="/press"
                className={cn(
                  "block px-3 py-2 text-sm font-medium transition-colors hover:bg-muted rounded-lg",
                  isActive('/press') && "bg-secondary text-white"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.press')}
              </Link>

              <Link
                to="/contacts"
                className={cn(
                  "block px-3 py-2 text-sm font-medium transition-colors hover:bg-muted rounded-lg",
                  isActive('/contacts') && "bg-secondary text-white"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.contacts')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;