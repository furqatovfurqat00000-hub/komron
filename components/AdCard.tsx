
import React, { useRef, useState } from 'react';
import { Ad } from '../types';
import { Language, translations } from '../translations';

interface AdCardProps {
  ad: Ad;
}

const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  const lang = (localStorage.getItem('lang') as Language) || 'ru';
  const t = translations[lang];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:+992${ad.phone}`;
  };

  const handleWhatsapp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const waPhone = ad.whatsapp || ad.phone;
    window.open(`https://wa.me/992${waPhone}`, '_blank');
  };

  const formatTime = (dateStr: string) => {
    if (!dateStr || !dateStr.includes('-')) return dateStr;
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
      if (diffInMinutes < 1) return lang === 'ru' ? 'Только что' : 'Ҳамин ҳоло';
      if (diffInMinutes < 60) return `${diffInMinutes} мин. назад`;
      return date.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'tg-TG', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch { return dateStr; }
  };

  const onMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Video auto-play blocked"));
    }
  };

  const onMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`bg-white rounded-[40px] shadow-[0_15px_50px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden hover:shadow-[0_50px_100px_rgba(37,99,235,0.18)] hover:-translate-y-2.5 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group cursor-pointer relative flex flex-col h-full ${ad.isVip ? 'ring-2 ring-yellow-400/20 shadow-[0_15px_40px_rgba(250,204,21,0.1)]' : ''}`}
    >
      {/* Badges Overlay */}
      <div className="absolute top-5 left-5 flex flex-col space-y-2 z-20">
        {ad.isVip && (
          <div className="bg-gradient-to-tr from-yellow-400 to-amber-300 text-white text-[9px] font-black px-4 py-2 rounded-2xl uppercase tracking-[0.2em] shadow-xl border border-white/20 animate-pulse group-hover:scale-110 transition-transform duration-500">
            VIP
          </div>
        )}
        {ad.videoUrl && (
          <div className="bg-white/90 backdrop-blur-md text-gray-900 text-[9px] font-black px-4 py-2 rounded-2xl uppercase tracking-[0.2em] shadow-xl border border-gray-200/30 flex items-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
            <span className="mr-1.5">▶</span> Video
          </div>
        )}
      </div>
      
      {/* Media Layer */}
      <div className="aspect-[1/1] overflow-hidden bg-gray-50 relative">
        {/* Still Image */}
        <img 
          src={ad.imageUrl} 
          alt={ad.title} 
          className={`w-full h-full object-cover transition-all duration-[1.5s] ease-out ${ad.videoUrl && isHovered ? 'opacity-0 scale-110 blur-xl' : 'opacity-100 scale-100 group-hover:scale-115'}`} 
          loading="lazy"
        />
        
        {/* Video Hover Layer */}
        {ad.videoUrl && (
          <video
            ref={videoRef}
            src={ad.videoUrl}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      <div className="p-8 flex-1 flex flex-col relative z-10">
        <div className="font-heading text-2xl font-black text-blue-600 mb-3 tracking-tight group-hover:translate-x-1 transition-transform duration-500 origin-left">
          {ad.price > 0 ? (
            <span className="flex items-baseline drop-shadow-sm group-hover:text-indigo-600 transition-colors duration-500">
              {ad.price.toLocaleString()}
              <span className="text-[10px] ml-1.5 opacity-50 font-medium tracking-widest uppercase">{ad.currency}</span>
            </span>
          ) : (
            <span className="text-green-500 uppercase text-lg tracking-[0.2em]">{t.free}</span>
          )}
        </div>
        
        <h3 className="text-gray-900 font-bold line-clamp-2 mb-4 min-h-[3.5rem] group-hover:text-blue-600 transition-colors duration-500 text-lg leading-tight tracking-tight">
          {ad.title}
        </h3>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center bg-gray-50/80 px-3 py-2.5 rounded-2xl border border-gray-100/50 group-hover:bg-white transition-colors duration-500">
            <span className="mr-2 text-lg filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500">📍</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate group-hover:text-gray-600 transition-colors duration-500">{ad.city}</span>
          </div>
          <div className="flex items-center bg-gray-50/80 px-3 py-2.5 rounded-2xl border border-gray-100/50 group-hover:bg-white transition-colors duration-500">
             <span className="mr-2 text-lg filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500">⏱️</span>
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate group-hover:text-gray-600 transition-colors duration-500">{formatTime(ad.createdAt)}</span>
          </div>
        </div>

        {/* Detailed Contact Information Section */}
        <div className="space-y-2 mb-8">
          <div 
            onClick={handleCall}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-500 group/phone"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm mr-3 group-hover/phone:scale-110 group-hover/phone:rotate-12 transition-all duration-500">
                <span className="text-sm">📞</span>
              </div>
              <span className="text-xs font-black text-gray-600 group-hover/phone:text-blue-700 transition-colors tracking-tight">+992 {ad.phone}</span>
            </div>
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-blue-400 opacity-0 group-hover/phone:opacity-100 transition-all duration-500 translate-x-2 group-hover/phone:translate-x-0">{t.call}</span>
          </div>

          <div 
            onClick={handleWhatsapp}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-green-300 hover:bg-green-50/50 hover:shadow-lg hover:shadow-green-500/5 transition-all duration-500 group/wa"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm mr-3 group-hover/wa:scale-110 group-hover/wa:-rotate-12 transition-all duration-500">
                <span className="text-sm">💬</span>
              </div>
              <span className="text-xs font-black text-gray-600 group-hover/wa:text-green-700 transition-colors tracking-tight">+992 {ad.whatsapp || ad.phone}</span>
            </div>
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-green-500 opacity-0 group-hover/wa:opacity-100 transition-all duration-500 translate-x-2 group-hover/wa:translate-x-0">WhatsApp</span>
          </div>
        </div>

        {/* Dynamic Buttons */}
        <div className="flex items-center space-x-2 mt-auto">
          <button 
            onClick={handleCall}
            className="btn-shimmer flex-1 flex items-center justify-center bg-gray-900 text-white py-4 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all duration-500 shadow-xl group/btn"
          >
            <span className="group-hover/btn:scale-110 group-hover/btn:tracking-[0.3em] transition-all duration-500">{t.call}</span>
          </button>
          <button 
            onClick={handleWhatsapp}
            className="w-16 flex items-center justify-center bg-green-500 text-white py-4 rounded-3xl text-xl hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/20 active:scale-95 transition-all duration-500 shadow-xl group/wa"
          >
            <span className="group-hover/wa:rotate-[20deg] group-hover/wa:scale-125 transition-transform duration-500">💬</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
