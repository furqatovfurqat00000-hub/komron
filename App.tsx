
import React, { useState, useMemo, useEffect } from 'react';
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

  const [ads, setAds] = useState<Ad[]>(() => {
    const saved = localStorage.getItem('marketplace_ads');
    return saved ? JSON.parse(saved) : INITIAL_ADS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('marketplace_search_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>(t.allCities);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');
  
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<string | null>(localStorage.getItem('userPhone'));
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    localStorage.setItem('marketplace_ads', JSON.stringify(ads));
  }, [ads]);

  useEffect(() => {
    localStorage.setItem('marketplace_search_history', JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    if (selectedCity === translations[lang].allCities) {
      setSelectedCity(translations[newLang].allCities);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setSearchHistory(prev => {
        const filtered = prev.filter(item => item.toLowerCase() !== query.toLowerCase());
        return [query, ...filtered].slice(0, 5);
      });
    }
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
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
    const newAd = {
      ...newAdData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    } as Ad;
    
    setAds([newAd, ...ads]);
    setIsAdModalOpen(false);
    setToast({ message: t.adSuccess, type: 'success' });
  };

  const handleLoginSuccess = (phone: string) => {
    setUser(phone);
    localStorage.setItem('userPhone', phone);
    setIsAuthModalOpen(false);
    setToast({ message: t.loginSuccess, type: 'success' });
  };

  const handleDeleteAd = (id: string) => {
    setAds(ads.filter(ad => ad.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfd] selection:bg-blue-100 selection:text-blue-600">
      <Header 
        onPostAd={() => user ? setIsAdModalOpen(true) : setIsAuthModalOpen(true)} 
        onSearch={handleSearch}
        onLoginClick={() => setIsAuthModalOpen(true)}
        user={user}
        onLogout={() => { setUser(null); localStorage.removeItem('userPhone'); }}
        lang={lang}
        setLang={handleSetLang}
      />
      
      <Hero 
        onSelectCategory={setSelectedCategory} 
        onSearch={handleSearch}
        activeCategory={selectedCategory}
        lang={lang}
        searchHistory={searchHistory}
        onClearHistory={clearSearchHistory}
        currentQuery={searchQuery}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-l-4 border-blue-600 pl-6">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-gray-900 tracking-tighter uppercase">
              {selectedCategory ? CATEGORY_LABELS[selectedCategory][lang] : t.allAds}
            </h2>
            <p className="text-gray-400 font-bold text-[10px] tracking-[0.3em] uppercase mt-2">
              {t.foundResults.replace('{count}', filteredAds.length.toString())}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative group">
               <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}
                className="appearance-none bg-gray-100 font-bold text-[11px] uppercase tracking-widest px-6 py-4 rounded-2xl outline-none hover:bg-gray-200 transition-colors pr-12">
                <option>{t.allCities}</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 text-[10px]">▼</span>
            </div>

            <div className="relative group">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-gray-100 font-bold text-[11px] uppercase tracking-widest px-6 py-4 rounded-2xl outline-none hover:bg-gray-200 transition-colors pr-12">
                <option value="newest">{t.sortNew}</option>
                <option value="price-asc">{t.sortCheap}</option>
                <option value="price-desc">{t.sortExpensive}</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 text-[10px]">▼</span>
            </div>
          </div>
        </div>

        {filteredAds.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredAds.map((ad) => (
              <div key={ad.id} className="relative group">
                <AdCard ad={ad} />
                {user && (ad.phone.includes(user.replace(/\D/g, '')) || ad.id.length > 10) && (
                   <button 
                    onClick={() => handleDeleteAd(ad.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-red-500 text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-all shadow-xl flex items-center justify-center hover:scale-110 active:scale-90 z-20"
                    title={t.deleteAd}
                   >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                   </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-gray-50/50 rounded-[40px] border-2 border-dashed border-gray-100">
            <div className="text-6xl mb-6">🏜️</div>
            <h3 className="font-heading text-xl font-bold text-gray-900 mb-2 uppercase tracking-tight">{t.nothingFound}</h3>
            <button onClick={() => {handleSearch(''); setSelectedCategory(null); setSelectedCity(t.allCities);}} 
              className="text-blue-600 font-bold text-xs uppercase tracking-widest hover:underline mt-4">Сбросить все фильтры</button>
          </div>
        )}
      </main>

      <Footer lang={lang} />

      {/* Unusual Dynamic Toast Notification */}
      {toast && (
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-8 py-4 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.2)] text-white font-black text-xs uppercase tracking-[0.2em] flex items-center space-x-4 z-[100] animate-in slide-in-from-bottom-10 duration-500 backdrop-blur-xl ${toast.type === 'success' ? 'bg-green-500/90' : 'bg-red-500/90'}`}>
          <span className="text-xl">🔔</span>
          <span>{toast.message}</span>
        </div>
      )}

      <AdModal isOpen={isAdModalOpen} onClose={() => setIsAdModalOpen(false)} onSubmit={handleAddAd} lang={lang} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onSuccess={handleLoginSuccess} lang={lang} />
    </div>
  );
};

export default App;
