
import React from 'react';
import { CATEGORIES } from '../constants';
import { CategoryType } from '../types';

interface HeroProps {
  onSelectCategory: (category: CategoryType | null) => void;
  onSearch: (query: string) => void;
  activeCategory: CategoryType | null;
}

const Hero: React.FC<HeroProps> = ({ onSelectCategory, onSearch, activeCategory }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">
          Найдите всё, что вам нужно в Таджикистане
        </h1>
        
        {/* Big Search */}
        <div className="relative max-w-2xl mx-auto mb-10">
          <input
            type="text"
            placeholder="Что вы ищете?"
            className="w-full px-6 py-4 rounded-full text-gray-900 text-lg focus:outline-none shadow-xl"
            onChange={(e) => onSearch(e.target.value)}
          />
          <button className="absolute right-2 top-2 bg-green-500 hover:bg-green-600 p-2 rounded-full transition shadow-lg">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </div>

        {/* Category Icons */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.type}
              onClick={() => onSelectCategory(activeCategory === cat.type ? null : cat.type)}
              className={`flex flex-col items-center group transition-transform hover:scale-105 ${activeCategory === cat.type ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
            >
              <div className={`p-3 rounded-2xl mb-2 shadow-md ${activeCategory === cat.type ? 'bg-white text-blue-600' : 'bg-white/20 text-white'}`}>
                {cat.icon}
              </div>
              <span className="text-xs font-medium truncate w-full text-center">
                {cat.type}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
