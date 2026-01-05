
import React, { useState, useEffect } from 'react';
import { CATEGORIES, CATEGORY_LABELS } from '../constants';
import { CategoryType } from '../types';
import { Language, translations } from '../translations';

interface HeroProps {
  onSelectCategory: (category: CategoryType | null) => void;
  onSearch: (query: string) => void;
  activeCategory: CategoryType | null;
  lang: Language;
  searchHistory: string[];
  onClearHistory: () => void;
  currentQuery: string;
}

const Hero: React.FC<HeroProps> = ({ 
  onSelectCategory, onSearch, activeCategory, lang, searchHistory, onClearHistory, currentQuery 
}) => {
  const t = translations[lang];
  const [inputValue, setInputValue] = useState(currentQuery);

  useEffect(() => {
    setInputValue(currentQuery);
  }, [currentQuery]);

  const titleWords = t.heroTitle.split(' ');
  const accent = titleWords.slice(0, 3).join(' ');
  const remainder = titleWords.slice(3).join(' ');

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(inputValue);
    }
  };

  const handleHistoryClick = (query: string) => {
    setInputValue(query);
    onSearch(query);
  };

  return (
    <div className="living-bg py-24 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden min-h-[650px] flex flex-col justify-center">
      {/* Mesh Layer with Liquid Gooey Effect */}
      <div className="mesh-container">
        <div className="blob bg-blue-600 w-[550px] h-[550px] top-[-10%] left-[-10%]" style={{ animationDuration: '30s' }}></div>
        <div className="blob bg-indigo-700 w-[650px] h-[650px] bottom-[-20%] right-[-10%]" style={{ animationDuration: '35s', animationDelay: '-5s' }}></div>
        <div className="blob bg-violet-600 w-[450px] h-[450px] top-[30%] right-[10%]" style={{ animationDuration: '28s', animationDelay: '-12s' }}></div>
        <div className="blob bg-emerald-500 w-[400px] h-[400px] bottom-[15%] left-[15%]" style={{ animationDuration: '44s', animationDelay: '-18s', opacity: 0.3 }}></div>
        <div className="blob bg-fuchsia-600 w-[300px] h-[300px] top-[15%] left-[45%]" style={{ animationDuration: '22s', animationDelay: '-4s', opacity: 0.25 }}></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
        <div className="inline-block mb-6 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl animate-pulse cursor-default hover:bg-white/10 transition-colors duration-500">
          <span className="font-heading text-[10px] font-black tracking-[0.4em] text-blue-400 uppercase">Premium Tajik Marketplace</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-7xl font-black mb-10 tracking-tighter leading-[0.85] animate-in fade-in slide-in-from-top-12 duration-1000">
          <span 
            className="text-glitch text-gradient-animate block mb-5" 
            data-text={accent}
          >
            {accent}
          </span>
          <span className="text-white drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] block hover:scale-[1.02] transition-transform duration-700 cursor-default">
            {remainder}
          </span>
        </h1>
        
        <div className="relative max-w-2xl mx-auto mb-10 group/search">
          <div className="absolute inset-0 bg-blue-600/25 blur-[120px] group-hover/search:bg-blue-600/40 transition-all duration-700 rounded-full"></div>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-10 py-7 rounded-[35px] bg-white/10 backdrop-blur-3xl border border-white/20 text-white text-lg focus:outline-none focus:bg-white/15 focus:border-blue-400/30 focus:ring-[15px] focus:ring-blue-500/5 transition-all duration-500 placeholder:text-gray-400/80 font-medium shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
            />
            <button 
              onClick={() => onSearch(inputValue)}
              className="btn-shimmer absolute right-5 top-4 bg-white text-blue-900 p-5 rounded-3xl transition-all duration-500 shadow-2xl active:scale-90 hover:scale-110 hover:shadow-white/20 group/btn"
            >
               <span className="text-2xl leading-none block group-hover/btn:rotate-12 transition-transform duration-500">⚡</span>
            </button>
          </div>

          {/* Search History Chips - Medium Text Size */}
          {searchHistory.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-top-6 duration-700">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/25 mr-1">{t.recentSearches}</span>
              {searchHistory.map((query, idx) => (
                <button
                  key={idx}
                  onClick={() => handleHistoryClick(query)}
                  className="px-6 py-3 bg-white/5 hover:bg-white/20 border border-white/10 rounded-[20px] text-sm font-bold transition-all duration-500 hover:scale-110 active:scale-95 hover:border-blue-400/40 backdrop-blur-xl shadow-lg hover:shadow-blue-500/10"
                >
                  {query}
                </button>
              ))}
              <button 
                onClick={onClearHistory}
                className="ml-4 text-[10px] font-black uppercase tracking-[0.4em] text-red-400/50 hover:text-red-400 transition-all duration-500 hover:scale-105"
              >
                ✕ {t.clearHistory}
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-4 sm:gap-6 mt-20 px-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.type}
              onClick={() => onSelectCategory(activeCategory === cat.type ? null : cat.type)}
              className={`flex flex-col items-center group transition-all duration-700 ${activeCategory === cat.type ? 'scale-115 -translate-y-2' : 'hover:scale-110 hover:-translate-y-4'}`}
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-[24px] mb-4 shadow-2xl transition-all duration-700 border border-white/10 ${activeCategory === cat.type ? 'bg-white border-white rotate-12 shadow-[0_0_60px_rgba(255,255,255,0.6)]' : 'bg-white/10 backdrop-blur-2xl hover:bg-white/20 hover:shadow-white/5'}`}>
                <div className={`transition-transform duration-700 ${activeCategory === cat.type ? 'scale-125' : 'group-hover:scale-125 group-hover:rotate-[20deg]'}`}>
                  {cat.icon}
                </div>
              </div>
              <span className={`font-heading text-[8.5px] font-bold uppercase tracking-[0.25em] transition-all duration-500 ${activeCategory === cat.type ? 'text-white scale-110 opacity-100' : 'text-white/40 group-hover:text-white/100 group-hover:translate-y-1'}`}>
                {CATEGORY_LABELS[cat.type][lang]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
