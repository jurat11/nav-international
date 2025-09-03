import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'uz';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.company': 'Company',
    'nav.company.history': 'History',
    'nav.company.governance': 'Corporate Governance',
    'nav.ecosystem': 'Our Ecosystem',
    'nav.sustainability': 'Sustainability',
    'nav.investments': 'Investments',
    'nav.press': 'Press Center',
    'nav.contacts': 'Contacts',
    
    // Hero Section
    'hero.title': 'NAV: Navigating Uzbekistan\'s Thriving Startup Ecosystem',
    'hero.description': 'Empowering entrepreneurs, connecting investors, and fostering innovation across borders to unlock economic potential.',
    'hero.cta': 'Join the Ecosystem',
    
    // About Section
    'about.title': 'Building Tomorrow\'s Innovation Infrastructure',
    'about.description': 'We are forging the infrastructure to ignite startup growth, enhance business opportunities, and improve lives in Uzbekistan and globally. Over 10 million innovators engage with NAV monthly.',
    'about.stat1.title': 'No.1 Startup Hub',
    'about.stat1.subtitle': 'in Uzbekistan',
    'about.stat2.title': '35% of Population',
    'about.stat2.subtitle': 'Engaged with NAV',
    'about.stat3.title': '>8,000 Top-Tier',
    'about.stat3.subtitle': 'Mentors',
    
    // Ecosystem Services
    'ecosystem.title': 'Comprehensive Startup Ecosystem',
    'ecosystem.description': 'NAV integrates startup incubation, fintech tools, and networking services for entrepreneurs and SMEs. Our offerings include a venture marketplace, rapid mentorship, digital funding, BNPL options, a car-sharing platform for business mobility, and an app for scaling ventures.',
    'ecosystem.ventures': 'NAV Ventures',
    'ecosystem.mentor': 'NAV Mentor',
    'ecosystem.fund': 'NAV Fund',
    'ecosystem.scale': 'NAV Scale',
    'ecosystem.mobility': 'NAV Mobility',
    'ecosystem.connect': 'NAV Connect',
    
    // Stats Section
    'stats.title': 'Uzbekistan\'s Premier Startup Ecosystem',
    'stats.subtitle': 'Valued at Over $800 Million',
    'stats.innovation': 'No.1 in Digital Innovation',
    'stats.market': '30% Market Share in Startup Funding',
    'stats.employees': '>9,000 Employees Including Elite Innovators',
    
    // Services
    'services.title': 'Discover Services for Entrepreneurs and Investors',
    'services.ventures.description': 'Marketplace with >800K Opportunities, >12K Investors, 8/10 Founders Know NAV',
    'services.infrastructure': 'Developing nationwide support infrastructure for global scaling.',
    
    // Footer
    'footer.newsletter': 'Stay Updated with NAV',
    'footer.newsletter.placeholder': 'Enter your email',
    'footer.newsletter.button': 'Subscribe',
    'footer.copyright': '© 2024 NAV. All rights reserved.',
  },
  uz: {
    // Navigation - Uzbek translations
    'nav.company': 'Kompaniya',
    'nav.company.history': 'Tarix',
    'nav.company.governance': 'Korporativ Boshqaruv',
    'nav.ecosystem': 'Bizning Ekosistemamiz',
    'nav.sustainability': 'Barqarorlik',
    'nav.investments': 'Investitsiyalar',
    'nav.press': 'Matbuot Markazi',
    'nav.contacts': 'Aloqa',
    
    // Hero Section
    'hero.title': 'NAV: O\'zbekistonning Rivojlanayotgan Startup Ekosistemi',
    'hero.description': 'Tadbirkorlarni qo\'llab-quvvatlash, investorlarni bog\'lash va chegaralardan tashqari innovatsiyalarni rivojlantirish orqali iqtisodiy salohiyatni ochish.',
    'hero.cta': 'Ekosistemaga Qo\'shiling',
    
    // About Section
    'about.title': 'Ertangi Innovatsion Infratuzilmani Qurish',
    'about.description': 'Biz startup o\'sishini kuchaytirish, biznes imkoniyatlarini yaxshilash va O\'zbekiston hamda butun dunyoda hayotni yaxshilash uchun infratuzilmani yaratmoqdamiz. Oyiga 10 milliondan ortiq innovator NAV bilan ishlaydi.',
    'about.stat1.title': '№1 Startup Markazi',
    'about.stat1.subtitle': 'O\'zbekistonda',
    'about.stat2.title': 'Aholining 35%i',
    'about.stat2.subtitle': 'NAV bilan bog\'langan',
    'about.stat3.title': '>8,000 Yuqori Darajali',
    'about.stat3.subtitle': 'Mentorlar',
    
    // Continue with more translations...
    'ecosystem.title': 'Keng qamrovli Startup Ekosistemi',
    'ecosystem.description': 'NAV tadbirkorlar va KO\'B uchun startup inkubatsiyasi, fintech vositalari va tarmoq xizmatlarini birlashtiradi.',
    'ecosystem.ventures': 'NAV Ventures',
    'ecosystem.mentor': 'NAV Mentor',
    'ecosystem.fund': 'NAV Fund',
    'ecosystem.scale': 'NAV Scale',
    'ecosystem.mobility': 'NAV Mobility',
    'ecosystem.connect': 'NAV Connect',
    
    'stats.title': 'O\'zbekistonning Yetakchi Startup Ekosistemi',
    'stats.subtitle': '800 Million Dollardan Ortiq Qiymatga Ega',
    'stats.innovation': 'Raqamli Innovatsiyalarda №1',
    'stats.market': 'Startup Moliyalashda 30% Bozor Ulushi',
    'stats.employees': '>9,000 Xodim, Jumladan Elita Innovatorlar',
    
    'services.title': 'Tadbirkorlar va Investorlar uchun Xizmatlarni Kashf Eting',
    'services.ventures.description': '>800K Imkoniyat, >12K Investor, 10 ta Asoschidan 8 tasi NAVni Biladi',
    'services.infrastructure': 'Global miqyosda qo\'llab-quvvatlash infratuzilmasini ishlab chiqish.',
    
    'footer.newsletter': 'NAV Yangiliklari bilan Tanishing',
    'footer.newsletter.placeholder': 'Emailingizni kiriting',
    'footer.newsletter.button': 'Obuna Bo\'lish',
    'footer.copyright': '© 2024 NAV. Barcha huquqlar himoyalangan.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};