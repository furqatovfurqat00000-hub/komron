
import React, { useState, useRef } from 'react';
import { CategoryType, Ad } from '../types';
import { CITIES, CATEGORY_LABELS } from '../constants';
import { generateAdDescription } from '../services/geminiService';
import { Language, translations } from '../translations';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ad: Partial<Ad>) => void;
  lang: Language;
}

const AdModal: React.FC<AdModalProps> = ({ isOpen, onClose, onSubmit, lang }) => {
  const t = translations[lang];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: CategoryType.OTHER,
    city: CITIES[0],
    description: '',
    phone: '',
    whatsapp: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 25MB limit
      if (file.size > 25 * 1024 * 1024) {
        alert(t.videoSizeError);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewVideo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateAI = async () => {
    if (!formData.title) return alert(lang === 'ru' ? "Введите заголовок" : "Сарлавҳаро ворид кунед");
    setIsGenerating(true);
    const catLabel = CATEGORY_LABELS[formData.category][lang];
    const desc = await generateAdDescription(formData.title, catLabel, lang);
    setFormData(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: Number(formData.price),
      currency: 'TJS',
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      imageUrl: previewImage || `https://picsum.photos/seed/${Math.random()}/400/300`,
      videoUrl: previewVideo || undefined
    });
    resetForm();
  };

  const resetForm = () => {
    setFormData({ title: '', price: '', category: CategoryType.OTHER, city: CITIES[0], description: '', phone: '', whatsapp: '' });
    setPreviewImage(null);
    setPreviewVideo(null);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center p-8 border-b border-gray-100">
          <h2 className="font-heading text-xl font-black text-gray-900 uppercase tracking-tight">{t.modalTitle}</h2>
          <button onClick={() => { onClose(); resetForm(); }} className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Media Upload Area */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">{t.modalPhoto}</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative aspect-square border-2 border-dashed border-gray-200 rounded-[30px] flex items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/30 transition-all overflow-hidden group"
              >
                {previewImage ? (
                  <img src={previewImage} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <div className="text-center transition-transform group-hover:scale-110">
                    <span className="text-3xl mb-2 block">📸</span>
                  </div>
                )}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">{t.modalVideo}</label>
              <div 
                onClick={() => videoInputRef.current?.click()}
                className="relative aspect-square border-2 border-dashed border-gray-200 rounded-[30px] flex items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/30 transition-all overflow-hidden group"
              >
                {previewVideo ? (
                  <video src={previewVideo} className="w-full h-full object-cover" muted />
                ) : (
                  <div className="text-center transition-transform group-hover:scale-110">
                    <span className="text-3xl mb-2 block">🎥</span>
                  </div>
                )}
                <input type="file" ref={videoInputRef} className="hidden" accept="video/*" onChange={handleVideoChange} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{t.modalAdTitle}</label>
              <input required type="text" className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 p-4 rounded-2xl outline-none transition-all font-bold" 
                value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{t.modalCategory}</label>
                <select className="w-full bg-gray-50 border border-transparent p-4 rounded-2xl outline-none font-bold" value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value as CategoryType})}>
                  {Object.values(CategoryType).map(cat => <option key={cat} value={cat}>{CATEGORY_LABELS[cat][lang]}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{t.modalCity}</label>
                <select className="w-full bg-gray-50 border border-transparent p-4 rounded-2xl outline-none font-bold" value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}>
                  {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{t.modalPrice}</label>
                <input required type="number" className="w-full bg-gray-50 border border-transparent p-4 rounded-2xl outline-none font-bold" 
                  value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{t.modalPhone}</label>
                <input required type="tel" placeholder="900000000" className="w-full bg-gray-50 border border-transparent p-4 rounded-2xl outline-none font-bold" 
                  value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})} />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{t.modalWhatsapp}</label>
              <input type="tel" placeholder="900000000" className="w-full bg-green-50/30 border border-green-100 p-4 rounded-2xl outline-none focus:bg-white focus:border-green-500 transition-all font-bold" 
                value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value.replace(/\D/g, '')})} />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">{t.modalDesc}</label>
                <button type="button" onClick={handleGenerateAI} disabled={isGenerating}
                  className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider hover:bg-blue-100 transition-colors flex items-center disabled:opacity-50">
                  <span className={`mr-1.5 ${isGenerating ? 'animate-spin' : ''}`}>✨</span>
                  {isGenerating ? t.generating : t.modalAiBtn}
                </button>
              </div>
              <textarea rows={4} className="w-full bg-gray-50 border border-transparent p-4 rounded-2xl outline-none focus:bg-white focus:border-blue-500 transition-all resize-none font-medium leading-relaxed" 
                value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
            </div>
          </div>

          <button type="submit" className="w-full bg-gray-900 text-white py-5 rounded-[25px] font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-500/20 active:scale-95 transition-all duration-300">
            {t.modalSubmit}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdModal;
