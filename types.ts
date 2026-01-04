
import React from 'react';

export enum CategoryType {
  REAL_ESTATE = 'Недвижимость',
  AUTO = 'Авто',
  JOBS = 'Работа',
  SERVICES = 'Услуги',
  ELECTRONICS = 'Электроника',
  CLOTHING = 'Вещи',
  ANIMALS = 'Животные',
  FREE = 'Бесплатные',
  OTHER = 'Прочее'
}

export interface Ad {
  id: string;
  title: string;
  price: number;
  currency: string;
  description: string;
  category: CategoryType;
  city: string;
  imageUrl: string;
  createdAt: string;
  isVip?: boolean;
}

export interface CategoryItem {
  type: CategoryType;
  icon: React.ReactNode;
  color: string;
}
