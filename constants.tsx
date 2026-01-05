
import React from 'react';
import { CategoryType, CategoryItem, Ad } from './types';

export const CITIES = [
  'Душанбе', 'Худжанд', 'Бохтар', 'Куляб', 'Истаравшан', 'Турсунзаде', 'Канибадам', 'Исфара'
];

export const CATEGORIES: CategoryItem[] = [
  { type: CategoryType.REAL_ESTATE, color: 'bg-blue-100 text-blue-600', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
  )},
  { type: CategoryType.AUTO, color: 'bg-green-100 text-green-600', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
  )},
  { type: CategoryType.JOBS, color: 'bg-purple-100 text-purple-600', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  )},
  { type: CategoryType.SERVICES, color: 'bg-yellow-100 text-yellow-600', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  )},
  { type: CategoryType.ELECTRONICS, color: 'bg-red-100 text-red-600', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
  )},
  { type: CategoryType.CLOTHING, color: 'bg-pink-100 text-pink-600', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
  )},
  { type: CategoryType.ANIMALS, color: 'bg-indigo-100 text-indigo-600', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  )},
  { type: CategoryType.FREE, color: 'bg-orange-100 text-orange-600', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
  )},
  { type: CategoryType.OTHER, color: 'bg-gray-100 text-gray-600', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
  )},
];

export const CATEGORY_LABELS: Record<string, {ru: string, tg: string}> = {
  REAL_ESTATE: { ru: 'Недвижимость', tg: 'Хонаҳо' },
  AUTO: { ru: 'Авто', tg: 'Мошинҳо' },
  JOBS: { ru: 'Работа', tg: 'Кор' },
  SERVICES: { ru: 'Услуги', tg: 'Хизматрасонӣ' },
  ELECTRONICS: { ru: 'Электроника', tg: 'Электроника' },
  CLOTHING: { ru: 'Вещи', tg: 'Либос' },
  ANIMALS: { ru: 'Животные', tg: 'Ҳайвонот' },
  FREE: { ru: 'Бесплатные', tg: 'Ройгон' },
  OTHER: { ru: 'Прочее', tg: 'Дигар' }
};

export const INITIAL_ADS: Ad[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max 256GB',
    price: 12500,
    currency: 'TJS',
    description: 'Новый, запечатанный. Цвет Natural Titanium.',
    category: CategoryType.ELECTRONICS,
    city: 'Душанбе',
    imageUrl: 'https://picsum.photos/seed/iphone/400/300',
    createdAt: 'Сегодня, 10:30',
    phone: '900112233',
    whatsapp: '900112233',
    isVip: true
  },
  {
    id: '2',
    title: 'Toyota Camry 2022',
    price: 340000,
    currency: 'TJS',
    description: 'Идеальное состояние, полная комплектация.',
    category: CategoryType.AUTO,
    city: 'Худжанд',
    imageUrl: 'https://picsum.photos/seed/car/400/300',
    createdAt: 'Сегодня, 09:15',
    phone: '900445566',
    isVip: false
  }
];
