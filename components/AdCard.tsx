
import React from 'react';
import { Ad } from '../types';
import { Language, translations } from '../translations';

interface AdCardProps {
  ad: Ad;
}

const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  const lang = (localStorage.getItem('lang') as Language) || 'ru';
  const t = translations[lang];

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:+992${ad.phone}`;
  };

  const handleWhatsapp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const waPhone = ad.whatsapp || ad.phone;
    window.open(`https://wa.me/992${waPhone}`, '_blank');
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition group cursor-pointer relative flex flex-col h-full ${ad.isVip ? 'border-yellow-400' : 'border-gray-200'}`}>
      {ad.isVip && (
        <div className="absolute top-2 left-2 bg-yellow-400 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider z-10 shadow-sm">
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

      <div className="p-4 flex-1 flex flex-col">
        <div className="text-xl font-bold text-blue-600 mb-1">
          {ad.price > 0 ? `${ad.price.toLocaleString()} ${ad.currency}` : t.free}
        </div>
        
        <h3 className="text-gray-800 font-medium line-clamp-2 mb-3 min-h-[3rem]">
          {ad.title}
        </h3>

        <div className="flex flex-col space-y-2 text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {ad.city}
          </div>
          <div className="flex items-center">
             <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {ad.createdAt}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <button 
            onClick={handleCall}
            className="flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            {t.call}
          </button>
          <button 
            onClick={handleWhatsapp}
            className="flex items-center justify-center bg-green-500 text-white py-2 rounded-lg font-bold text-sm hover:bg-green-600 transition"
          >
            <svg className="w-4 h-4 mr-1.5 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.128l-.904 3.313 3.4-.892c.731.399 1.439.61 2.247.61.001 0 .001 0 0 0 3.182 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.767-5.768-5.767zm3.426 8.21c-.145.408-.84.793-1.173.844-.33.05-.765.074-1.233-.074-.3-.096-.682-.245-1.181-.462-2.113-.918-3.486-3.054-3.591-3.193-.105-.14-1.11-1.472-1.11-2.81 0-1.337.7-1.996.945-2.26.246-.265.539-.331.718-.331.18 0 .359.001.516.008.163.006.383-.062.6.459.219.522.75 1.83.815 1.962.066.132.11.286.022.462-.088.176-.132.286-.264.441-.132.155-.276.347-.394.467-.133.132-.271.276-.118.539.154.264.68 1.117 1.46 1.81.998.89 1.84 1.165 2.104 1.298.264.132.418.11.573-.066.154-.176.66-.771.836-1.035.176-.264.352-.22.595-.132.242.088 1.541.727 1.805.859.264.132.44.198.506.309.067.11.067.639-.078 1.047z"/></svg>
            {t.whatsapp}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
