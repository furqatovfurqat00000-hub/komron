
import React, { useState } from 'react';
import { CategoryType, Ad } from '../types';
import { CITIES } from '../constants';
import { generateAdDescription } from '../services/geminiService';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ad: Partial<Ad>) => void;
}

const AdModal: React.FC<AdModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: CategoryType.OTHER,
    city: CITIES[0],
    description: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerateAI = async () => {
    if (!formData.title) return alert("Введите заголовок для генерации описания");
    setIsGenerating(true);
    const desc = await generateAdDescription(formData.title, formData.category);
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
      createdAt: 'Только что',
      imageUrl: `https://picsum.photos/seed/${Math.random()}/400/300`
    });
    setFormData({ title: '', price: '', category: CategoryType.OTHER, city: CITIES[0], description: '' });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Подать объявление</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Заголовок</label>
            <input 
              required
              type="text" 
              className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="Напр. iPhone 15 Pro"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
              <select 
                className="w-full border p-2.5 rounded-lg outline-none"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as CategoryType})}
              >
                {Object.values(CategoryType).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Город</label>
              <select 
                className="w-full border p-2.5 rounded-lg outline-none"
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
              >
                {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Цена (TJS)</label>
            <input 
              required
              type="number" 
              className="w-full border p-2.5 rounded-lg outline-none" 
              placeholder="0"
              value={formData.price}
              onChange={e => setFormData({...formData, price: e.target.value})}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">Описание</label>
              <button 
                type="button"
                onClick={handleGenerateAI}
                disabled={isGenerating}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center disabled:opacity-50"
              >
                <svg className={`w-3.5 h-3.5 mr-1 ${isGenerating ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                {isGenerating ? 'Генерирую...' : 'AI Помощник'}
              </button>
            </div>
            <textarea 
              rows={4}
              className="w-full border p-2.5 rounded-lg outline-none resize-none" 
              placeholder="Опишите ваш товар или услугу..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
          >
            Опубликовать
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdModal;
