
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AdCard from './components/AdCard';
import AdModal from './components/AdModal';
import Footer from './components/Footer';
import { INITIAL_ADS, CITIES } from './constants';
import { Ad, CategoryType } from './types';

const App: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>(INITIAL_ADS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('Все города');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter and sort ads
  const filteredAds = useMemo(() => {
    let result = ads.filter(ad => {
      const matchesSearch = ad.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ad.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? ad.category === selectedCategory : true;
      const matchesCity = selectedCity === 'Все города' ? true : ad.city === selectedCity;
      return matchesSearch && matchesCategory && matchesCity;
    });

    // Simple sorting
    return result.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0; // "newest" is default (initial order)
    });
  }, [ads, searchQuery, selectedCategory, selectedCity, sortBy]);

  const handleAddAd = (newAdData: Partial<Ad>) => {
    const newAd = newAdData as Ad;
    setAds([newAd, ...ads]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onPostAd={() => setIsModalOpen(true)} 
        onSearch={setSearchQuery} 
      />
      
      <Hero 
        onSelectCategory={setSelectedCategory} 
        onSearch={setSearchQuery}
        activeCategory={selectedCategory}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Filters & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory ? `Категория: ${selectedCategory}` : 'Все объявления'}
            </h2>
            <p className="text-gray-500 text-sm">Найдено {filteredAds.length} результатов</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select 
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-white border rounded-lg px-3 py-2 text-sm outline-none shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option>Все города</option>
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border rounded-lg px-3 py-2 text-sm outline-none shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Сначала новые</option>
              <option value="price-asc">Дешевле</option>
              <option value="price-desc">Дороже</option>
            </select>
            
            {(selectedCategory || selectedCity !== 'Все города' || searchQuery) && (
              <button 
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedCity('Все города');
                  setSearchQuery('');
                }}
                className="text-xs text-red-500 font-semibold hover:underline"
              >
                Сбросить фильтры
              </button>
            )}
          </div>
        </div>

        {/* Ad Grid */}
        {filteredAds.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAds.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="text-gray-400 mb-4 flex justify-center">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Ничего не найдено</h3>
            <p className="text-gray-500">Попробуйте изменить параметры поиска или фильтры</p>
          </div>
        )}

        {/* Featured Section (Mock Popular Cities) */}
        <div className="mt-20">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Популярные города</h3>
          <div className="flex flex-wrap gap-2">
            {CITIES.map(city => (
              <button 
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 rounded-full border text-sm transition ${selectedCity === city ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white text-gray-600 hover:border-blue-300'}`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      <AdModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddAd}
      />
    </div>
  );
};

export default App;
