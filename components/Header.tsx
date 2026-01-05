
import React, { useState } from 'react';
import { Language, translations } from '../translations';

interface HeaderProps {
  onPostAd: () => void;
  onSearch: (query: string) => void;
  onLoginClick: () => void;
  user: string | null;
  onLogout: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onPostAd, onSearch, onLoginClick, user, onLogout, lang, setLang 
}) => {
  const t = translations[lang];

  return (
    <header className="bg-white/80 backdrop-blur-2xl border-b border-gray-100/50 sticky top-0 z-50 transition-all duration-500 hover:bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => window.location.reload()}>
            <span className="font-heading text-xl font-black text-blue-600 tracking-tighter transition-all duration-500 group-hover:tracking-normal group-hover:scale-105 inline-block">MARKET</span>
            <span className="font-heading text-xl font-black text-green-500 tracking-tighter ml-0.5 transition-all duration-500 group-hover:scale-105 inline-block">PRO</span>
            <span className="ml-2 text-2xl transition-all duration-500 group-hover:rotate-[25deg] group-hover:scale-125 float-anim">💎</span>
          </div>

          <div className="hidden lg:flex flex-1 max-w-md relative group">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-4 py-3 bg-gray-100/50 border border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-200 transition-all duration-300 font-medium text-sm placeholder:text-gray-400"
              onChange={(e) => onSearch(e.target.value)}
            />
            <div className="absolute left-4 top-3.5 opacity-40 group-focus-within:opacity-100 group-focus-within:scale-110 transition-all duration-300">
              <span className="text-lg">🔎</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-gray-100/80 rounded-2xl p-1 border border-gray-200/30 backdrop-blur-md">
              <button 
                onClick={() => setLang('ru')}
                className={`px-3 py-1.5 text-[10px] font-black rounded-xl transition-all duration-300 ${lang === 'ru' ? 'bg-white shadow-md text-blue-600 scale-105' : 'text-gray-400 hover:text-gray-600 hover:bg-white/40'}`}
              >
                RU
              </button>
              <button 
                onClick={() => setLang('tg')}
                className={`px-3 py-1.5 text-[10px] font-black rounded-xl transition-all duration-300 ${lang === 'tg' ? 'bg-white shadow-md text-blue-600 scale-105' : 'text-gray-400 hover:text-gray-600 hover:bg-white/40'}`}
              >
                TJ
              </button>
            </div>

            {user ? (
              <div className="flex items-center space-x-2 bg-blue-50/50 px-3 py-1.5 rounded-2xl border border-blue-100/50 hover:bg-blue-100/50 transition-colors duration-300 cursor-pointer">
                <div className="hidden sm:flex flex-col items-end leading-none">
                  <span className="font-heading text-[8px] text-blue-400 uppercase font-black tracking-widest mb-0.5">{t.myAccount}</span>
                  <span className="text-xs font-bold text-blue-900">{user}</span>
                </div>
                <button onClick={onLogout} className="text-xl p-1.5 rounded-xl hover:bg-white hover:rotate-12 transition-all active:scale-90">
                  🚪
                </button>
              </div>
            ) : (
              <button onClick={onLoginClick} className="font-heading text-[11px] uppercase tracking-wider text-gray-500 hover:text-blue-600 hover:bg-blue-50 font-black px-4 py-2.5 rounded-2xl transition-all duration-300 active:scale-95">
                {t.login}
              </button>
            )}
            
            <button 
                onClick={onPostAd} 
                className="btn-shimmer font-heading bg-gradient-to-tr from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-2xl font-black transition-all duration-300 active:scale-95 hover:scale-105 hover:shadow-[0_20px_40px_rgba(37,99,235,0.4)] flex items-center text-[11px] uppercase tracking-wider group"
            >
              <span className="text-lg mr-2 leading-none group-hover:rotate-[15deg] group-hover:scale-125 transition-transform duration-500">✨</span>
              {t.postAd}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
