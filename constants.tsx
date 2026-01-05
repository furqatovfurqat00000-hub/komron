
import React from 'react';
import { CategoryType, CategoryItem, Ad } from './types';

export const CITIES = [
  'Душанбе', 'Худжанд', 'Бохтар', 'Куляб', 'Истаравшан', 'Турсунзаде', 'Канибадам', 'Исфара'
];

export const CATEGORIES: CategoryItem[] = [
  { type: CategoryType.REAL_ESTATE, color: 'bg-blue-100 text-blue-600 shadow-blue-100', icon: (
    <span className="text-2xl">🏢</span>
  )},
  { type: CategoryType.AUTO, color: 'bg-red-100 text-red-600 shadow-red-100', icon: (
    <span className="text-2xl">🏎️</span>
  )},
  { type: CategoryType.JOBS, color: 'bg-purple-100 text-purple-600 shadow-purple-100', icon: (
    <span className="text-2xl">💼</span>
  )},
  { type: CategoryType.SERVICES, color: 'bg-yellow-100 text-yellow-600 shadow-yellow-100', icon: (
    <span className="text-2xl">🛠️</span>
  )},
  { type: CategoryType.ELECTRONICS, color: 'bg-cyan-100 text-cyan-600 shadow-cyan-100', icon: (
    <span className="text-2xl">📱</span>
  )},
  { type: CategoryType.CLOTHING, color: 'bg-pink-100 text-pink-600 shadow-pink-100', icon: (
    <span className="text-2xl">👕</span>
  )},
  { type: CategoryType.ANIMALS, color: 'bg-orange-100 text-orange-600 shadow-orange-100', icon: (
    <span className="text-2xl">🐶</span>
  )},
  { type: CategoryType.FREE, color: 'bg-green-100 text-green-600 shadow-green-100', icon: (
    <span className="text-2xl">🎁</span>
  )},
  { type: CategoryType.OTHER, color: 'bg-gray-100 text-gray-600 shadow-gray-100', icon: (
    <span className="text-2xl">📦</span>
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
