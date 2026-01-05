
import React from 'react';

export enum CategoryType {
  REAL_ESTATE = 'REAL_ESTATE',
  AUTO = 'AUTO',
  JOBS = 'JOBS',
  SERVICES = 'SERVICES',
  ELECTRONICS = 'ELECTRONICS',
  CLOTHING = 'CLOTHING',
  ANIMALS = 'ANIMALS',
  FREE = 'FREE',
  OTHER = 'OTHER'
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
  phone: string;
  whatsapp?: string;
  isVip?: boolean;
}

export interface CategoryItem {
  type: CategoryType;
  icon: React.ReactNode;
  color: string;
}
