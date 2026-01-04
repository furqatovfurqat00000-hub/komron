
import React from 'react';
import { Ad } from '../types';

interface AdCardProps {
  ad: Ad;
}

const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition group cursor-pointer relative ${ad.isVip ? 'border-yellow-400' : 'border-gray-200'}`}>
      {ad.isVip && (
        <div className="absolute top-2 left-2 bg-yellow-400 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider z-10">
          VIP
        </div>
      )}
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img 
          src={ad.imageUrl} 
          alt={ad.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="text-xl font-bold text-blue-600 mb-1">
          {ad.price > 0 ? `${ad.price.toLocaleString()} ${ad.currency}` : 'Бесплатно'}
        </div>
        <h3 className="text-gray-800 font-medium line-clamp-2 mb-2 min-h-[3rem]">
          {ad.title}
        </h3>
        <div className="flex flex-col space-y-1 text-xs text-gray-500">
          <div className="flex items-center">
            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {ad.city}
          </div>
          <div className="flex items-center">
             <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {ad.createdAt}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
