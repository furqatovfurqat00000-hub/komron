
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AdCard from './components/AdCard';
import AdModal from './components/AdModal';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import { INITIAL_ADS, CITIES, CATEGORY_LABELS } from './constants';
import { Ad, CategoryType } from './types';
import { Language, translations } from './translations';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>((localStorage.getItem('lang') as Language) || 'ru');
  const t = translations[lang];

  const [ads, setAds] = useState<Ad[]>(INITIAL_ADS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>(t.allCities);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');
  
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<string | null>(localStorage.getItem('userPhone'));

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const filteredAds = useMemo(() => {
    let result = ads.filter(ad => {
      const matchesSearch = ad.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ad.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? ad.category === selectedCategory : true;
      const matchesCity = (selectedCity === 'Все города' || selectedCity === 'Ҳамаи шаҳрҳо') ? true : ad.city === selectedCity;
      return matchesSearch && matchesCategory && matchesCity;
    });

    return result.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [ads, searchQuery, selectedCategory, selectedCity, sortBy, lang]);

  const handleAddAd = (newAdData: Partial<Ad>) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    const newAd = newAdData as Ad;
    setAds([newAd, ...ads]);
    setIsAdModalOpen(false);
  };

  const handleLoginSuccess = (phone: string) => {
    setUser(phone);
    localStorage.setItem('userPhone', phone);
    setIsAuthModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onPostAd={() => user ? setIsAdModalOpen(true) : setIsAuthModalOpen(true)} 
        onSearch={setSearchQuery}
        onLoginClick={() => setIsAuthModalOpen(true)}
        user={user}
        onLogout={() => { setUser(null); localStorage.removeItem('userPhone'); }}
        lang={lang}
        setLang={handleSetLang}
      />
      
      <Hero 
        onSelectCategory={setSelectedCategory} 
        onSearch={setSearchQuery}
        activeCategory={selectedCategory}
        lang={lang}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory ? `${t.allAds}: ${CATEGORY_LABELS[selectedCategory][lang]}` : t.allAds}
            </h2>
            <p className="text-gray-500 text-sm">
              {t.foundResults.replace('{count}', filteredAds.length.toString())}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-white border rounded-lg px-3 py-2 text-sm outline-none shadow-sm focus:ring-2 focus:ring-blue-500">
              <option>{t.allCities}</option>
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border rounded-lg px-3 py-2 text-sm outline-none shadow-sm focus:ring-2 focus:ring-blue-500">
              <option value="newest">{t.sortNew}</option>
              <option value="price-asc">{t.sortCheap}</option>
              <option value="price-desc">{t.sortExpensive}</option>
            </select>
          </div>
        </div>

        {filteredAds.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAds.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{t.nothingFound}</h3>
          </div>
        )}
      </main>

      <Footer lang={lang} />

      <AdModal isOpen={isAdModalOpen} onClose={() => setIsAdModalOpen(false)} onSubmit={handleAddAd} lang={lang} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onSuccess={handleLoginSuccess} lang={lang} />
    </div>
  );
};

export default App;
