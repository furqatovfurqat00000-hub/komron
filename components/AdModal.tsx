
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
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
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
      createdAt: lang === 'ru' ? 'Только что' : 'Ҳамин ҳоло',
      imageUrl: previewImage || `https://picsum.photos/seed/${Math.random()}/400/300`
    });
    resetForm();
  };

  const resetForm = () => {
    setFormData({ title: '', price: '', category: CategoryType.OTHER, city: CITIES[0], description: '', phone: '', whatsapp: '' });
    setPreviewImage(null);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">{t.modalTitle}</h2>
          <button onClick={() => { onClose(); resetForm(); }} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.modalPhoto}</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative w-full h-40 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all overflow-hidden"
            >
              {previewImage ? (
                <img src={previewImage} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <div className="text-center text-gray-400">
                  <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span className="text-sm font-medium">{t.modalPhoto}</span>
                </div>
              )}
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.modalAdTitle}</label>
            <input required type="text" className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.modalCategory}</label>
              <select className="w-full border p-2.5 rounded-lg outline-none" value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as CategoryType})}>
                {Object.values(CategoryType).map(cat => <option key={cat} value={cat}>{CATEGORY_LABELS[cat][lang]}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.modalCity}</label>
              <select className="w-full border p-2.5 rounded-lg outline-none" value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}>
                {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.modalPrice}</label>
              <input required type="number" className="w-full border p-2.5 rounded-lg outline-none" 
                value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.modalPhone}</label>
              <input required type="tel" placeholder="900000000" className="w-full border p-2.5 rounded-lg outline-none" 
                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.modalWhatsapp}</label>
            <input type="tel" placeholder="900000000" className="w-full border p-2.5 rounded-lg outline-none border-green-200 focus:ring-green-500" 
              value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value.replace(/\D/g, '')})} />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">{t.modalDesc}</label>
              <button type="button" onClick={handleGenerateAI} disabled={isGenerating}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center disabled:opacity-50">
                <svg className={`w-3.5 h-3.5 mr-1 ${isGenerating ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                {isGenerating ? t.generating : t.modalAiBtn}
              </button>
            </div>
            <textarea rows={3} className="w-full border p-2.5 rounded-lg outline-none resize-none" 
              value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg">{t.modalSubmit}</button>
        </form>
      </div>
    </div>
  );
};

export default AdModal;
