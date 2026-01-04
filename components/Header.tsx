
import React from 'react';

interface HeaderProps {
  onPostAd: () => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onPostAd, onSearch }) => {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <span className="text-2xl font-bold text-blue-600">MARKET</span>
            <span className="text-2xl font-bold text-green-500">PRO</span>
          </div>

          {/* Search Bar (Hidden on mobile hero, but here for desktop) */}
          <div className="hidden md:flex flex-1 max-w-lg relative">
            <input
              type="text"
              placeholder="Поиск объявлений..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => onSearch(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-blue-600 font-medium hidden sm:block">
              Войти
            </button>
            <button 
              onClick={onPostAd}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              Подать объявление
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
