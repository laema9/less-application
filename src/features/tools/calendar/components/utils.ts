// utils.ts
import { Calendar as CalendarIcon, TrendingUp, Globe, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react'; 

export interface Event {
  id: number;
  type: 'Macro' | 'Crypto' | 'Politics';
  country: string;
  name: string;
  date: string;
  desc: string;
}

export const initialEvents: Event[] = [
  { id: 1, type: 'Macro', country: 'USA', name: 'US Inflation Rate', date: '15/06', desc: 'Forecast: 2.4%' },
  { id: 2, type: 'Crypto', country: 'World', name: 'Bitcoin Halving', date: '18/06', desc: '7th Bitcoin halving' },
  { id: 3, type: 'Macro', country: 'USA', name: 'US Inflation Rate', date: '22/06', desc: 'Forecast: 2.4%' },
  { id: 4, type: 'Politics', country: 'USA', name: 'Trump VS Joe Biden FFA', date: '27/06', desc: 'Prediction: Joe Wins' },
];

export const getEventTypeVariant = (type: string) => {
  switch (type) {
    case 'Macro': return 'default';
    case 'Crypto': return 'secondary';
    case 'Politics': return 'outline';
    default: return 'default';
  }
};

export const getEventIcon = (type: string): LucideIcon => {
  switch (type) {
    case 'Macro': return TrendingUp;
    case 'Crypto': return Globe;
    case 'Politics': return Users;
    default: return CalendarIcon;
  }
};

export const getCountryFlag = (country: string) => {
  switch (country) {
    case 'USA': return '🇺🇸';
    case 'World': return '🌍';
    default: return '🏳️';
  }
};
