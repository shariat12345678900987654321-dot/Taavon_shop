import React from 'react';
import { useStore } from '../context/StoreContext';
import { Category } from '../types';
import { 
  ShoppingBag, 
  Cookie, 
  Droplet, 
  Wheat, 
  Milk, 
  UtensilsCrossed, 
  Coffee, 
  Sparkles, 
  Layers 
} from 'lucide-react';

const CATEGORIES: { label: Category; icon: React.FC<{ className?: string }> }[] = [
  { label: 'همه', icon: ShoppingBag },
  { label: 'شیرینی و تنقلات', icon: Cookie },
  { label: 'برنج و حبوبات', icon: Wheat },
  { label: 'روغن و چربی‌ها', icon: Droplet },
  { label: 'لبنیات تازه', icon: Milk },
  { label: 'ماکارونی و پاستا', icon: UtensilsCrossed },
  { label: 'نوشیدنی', icon: Coffee },
  { label: 'شوینده و بهداشتی', icon: Sparkles },
  { label: 'کنسرو و چاشنی', icon: Layers },
];

export const CategoryFilter: React.FC = () => {
  const { selectedCategory, setSelectedCategory, products } = useStore();

  const getCategoryCount = (category: Category) => {
    if (category === 'همه') return products.length;
    return products.filter((p) => p.category === category).length;
  };

  return (
    <div className="bg-white border-b border-stone-200 py-3 px-4 shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map(({ label, icon: Icon }) => {
          const isSelected = selectedCategory === label;
          const count = getCategoryCount(label);

          return (
            <button
              key={label}
              onClick={() => setSelectedCategory(label)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-700 text-white shadow-xs scale-102'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80 hover:text-stone-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-300' : 'text-stone-500'}`} />
              <span>{label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                  isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-stone-200 text-stone-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
