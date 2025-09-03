import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Instagram,
  Youtube 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const footerSections = [
    {
      title: t('nav.company'),
      links: [
        { name: t('nav.company.history'), href: '/company/history' },
        { name: t('nav.company.governance'), href: '/company/governance' },
        { name: 'Leadership', href: '/company/leadership' },
        { name: 'Careers', href: '/careers' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: t('ecosystem.ventures'), href: '/services/ventures' },
        { name: t('ecosystem.mentor'), href: '/services/mentor' },
        { name: t('ecosystem.fund'), href: '/services/fund' },
        { name: t('ecosystem.scale'), href: '/services/scale' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: t('nav.press'), href: '/press' },
        { name: 'Blog', href: '/blog' },
        { name: 'Help Center', href: '/help' },
        { name: 'API Documentation', href: '/docs' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Compliance', href: '/compliance' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/nav_uz', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/nav-uz', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/nav_uz', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/nav-uz', label: 'YouTube' }
  ];

  return (
    <footer id="footer" className="bg-gradient-to-b from-background to-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-12 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="icon-container bg-secondary">
                <Compass className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient">NAV</span>
            </Link>
            
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Navigating Uzbekistan's thriving startup ecosystem. Empowering entrepreneurs, 
              connecting investors, and fostering innovation across borders.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="text-muted-foreground">Tashkent, Uzbekistan</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-secondary" />
                <span className="text-muted-foreground">+998 (71) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-secondary" />
                <span className="text-muted-foreground">hello@nav.uz</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-muted hover:bg-secondary rounded-lg flex items-center justify-center transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="font-semibold text-foreground">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-secondary transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-semibold text-foreground">{t('footer.newsletter')}</h3>
            <p className="text-sm text-muted-foreground">
              Get the latest updates on startup opportunities and ecosystem news.
            </p>
            <div className="space-y-3">
              <Input 
                type="email"
                placeholder={t('footer.newsletter.placeholder')}
                className="bg-background border-border"
              />
              <Button className="w-full bg-secondary hover:bg-secondary/90">
                {t('footer.newsletter.button')}
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            {t('footer.copyright')}
          </p>
          
          <div className="flex items-center space-x-6 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-secondary transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-secondary transition-colors">
              Terms
            </Link>
            <Link to="/cookies" className="text-muted-foreground hover:text-secondary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;