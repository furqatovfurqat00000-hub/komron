
import React from 'react';
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
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.location.reload()}>
            <span className="text-2xl font-bold text-blue-600">MARKET</span>
            <span className="text-2xl font-bold text-green-500">PRO</span>
          </div>

          <div className="hidden md:flex flex-1 max-w-lg relative">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              onChange={(e) => onSearch(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button 
                onClick={() => setLang('ru')}
                className={`px-2 py-1 text-xs font-bold rounded ${lang === 'ru' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}
              >
                RU
              </button>
              <button 
                onClick={() => setLang('tg')}
                className={`px-2 py-1 text-xs font-bold rounded ${lang === 'tg' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}
              >
                TJ
              </button>
            </div>

            {user ? (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:flex flex-col items-end leading-tight">
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">{t.myAccount}</span>
                  <span className="text-sm font-semibold text-gray-900">{user}</span>
                </div>
                <button onClick={onLogout} className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                </button>
              </div>
            ) : (
              <button onClick={onLoginClick} className="text-gray-600 hover:text-blue-600 font-bold px-3 py-2 rounded-lg transition text-sm">
                {t.login}
              </button>
            )}
            
            <button onClick={onPostAd} className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold transition flex items-center shadow-md shadow-green-100 text-sm">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              {t.postAd}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
