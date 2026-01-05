
import React from 'react';
import { Language, translations } from '../translations';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang];
  const adminPhone = "+992903195454";

  return (
    <footer className="bg-white border-t mt-16 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center group cursor-pointer transition-transform duration-500 hover:scale-105 origin-left">
              <span className="text-2xl font-black text-blue-600 tracking-tighter transition-all duration-500 group-hover:tracking-normal">MARKET</span>
              <span className="text-2xl font-black text-green-500 tracking-tighter ml-0.5">PRO</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{t.footerDesc}</p>
          </div>
          
          <div>
            <h4 className="font-heading text-[10px] uppercase font-black tracking-[0.3em] text-gray-900 mb-8">{t.contactUs}</h4>
            <div className="space-y-4">
              <a href={`tel:${adminPhone}`} className="flex items-center text-gray-500 hover:text-blue-600 transition-all duration-300 text-sm font-bold group">
                <div className="w-10 h-10 bg-gray-50 group-hover:bg-blue-50 rounded-2xl flex items-center justify-center mr-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 border border-transparent group-hover:border-blue-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <span className="group-hover:translate-x-1 transition-transform">+992 90 319 5454</span>
              </a>
              <a href={`https://wa.me/${adminPhone.replace('+', '')}`} target="_blank" rel="noreferrer" className="flex items-center text-gray-500 hover:text-green-600 transition-all duration-300 text-sm font-bold group">
                <div className="w-10 h-10 bg-gray-50 group-hover:bg-green-50 rounded-2xl flex items-center justify-center mr-3 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12 border border-transparent group-hover:border-green-100 text-gray-400 group-hover:text-green-600">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.128l-.904 3.313 3.4-.892c.731.399 1.439.61 2.247.61.001 0 .001 0 0 0 3.182 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.767-5.768-5.767zm3.426 8.21c-.145.408-.84.793-1.173.844-.33.05-.765.074-1.233-.074-.3-.096-.682-.245-1.181-.462-2.113-.918-3.486-3.054-3.591-3.193-.105-.14-1.11-1.472-1.11-2.81 0-1.337.7-1.996.945-2.26.246-.265.539-.331.718-.331.18 0 .359.001.516.008.163.006.383-.062.6.459.219.522.75 1.83.815 1.962.066.132.11.286.022.462-.088.176-.132.286-.264.441-.132.155-.276.347-.394.467-.133.132-.271.276-.118.539.154.264.68 1.117 1.46 1.81.998.89 1.84 1.165 2.104 1.298.264.132.418.11.573-.066.154-.176.66-.771.836-1.035.176-.264.352-.22.595-.132.242.088 1.541.727 1.805.859.264.132.44.198.506.309.067.11.067.639-.078 1.047z"/></svg>
                </div>
                <span className="group-hover:translate-x-1 transition-transform">WhatsApp Chat</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-[10px] uppercase font-black tracking-[0.3em] text-gray-900 mb-8">{t.help}</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-400">
              <li className="hover:text-blue-600 hover:translate-x-2 transition-all duration-300 cursor-pointer inline-block">Правила / Қоидаҳо</li>
              <li className="hover:text-blue-600 hover:translate-x-2 transition-all duration-300 cursor-pointer block">Реклама на сайте</li>
              <li className="hover:text-blue-600 hover:translate-x-2 transition-all duration-300 cursor-pointer block">Частые вопросы</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-[10px] uppercase font-black tracking-[0.3em] text-gray-900 mb-8">{t.subscribe}</h4>
            <div className="flex flex-col space-y-3">
              <div className="flex group">
                <input type="email" placeholder="Email" className="bg-gray-50 border border-gray-100 rounded-l-2xl px-4 py-3 text-sm flex-1 outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-300" />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-r-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/10">OK</button>
              </div>
              <p className="text-[10px] text-gray-300 font-medium">Подпишитесь на лучшие предложения недели.</p>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-10 border-t border-gray-50 text-center flex flex-col items-center space-y-4">
          <div className="flex space-x-6 text-gray-300 text-xl">
             <span className="hover:text-blue-500 hover:scale-125 hover:-rotate-12 transition-all duration-300 cursor-pointer">📱</span>
             <span className="hover:text-pink-500 hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-pointer">📸</span>
             <span className="hover:text-blue-400 hover:scale-125 hover:-rotate-12 transition-all duration-300 cursor-pointer">🐦</span>
          </div>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em]">
            © {new Date().getFullYear()} MarketPlace Pro. Made with ❤️ in Tajikistan.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
