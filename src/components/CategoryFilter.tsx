import React from 'react';
import {
  Sparkles,
  Zap,
  Heart,
  Home,
  Activity,
  Car,
  Smile,
  Smartphone,
  Layers,
  ShoppingBag,
  Watch,
  Briefcase,
  Wrench,
  Flame,
} from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/mockWinningAds';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Zap':
      return <Zap className="w-3.5 h-3.5" />;
    case 'Heart':
      return <Heart className="w-3.5 h-3.5" />;
    case 'Home':
      return <Home className="w-3.5 h-3.5" />;
    case 'Activity':
      return <Activity className="w-3.5 h-3.5" />;
    case 'Car':
      return <Car className="w-3.5 h-3.5" />;
    case 'Smile':
      return <Smile className="w-3.5 h-3.5" />;
    case 'Smartphone':
      return <Smartphone className="w-3.5 h-3.5" />;
    case 'ShoppingBag':
      return <ShoppingBag className="w-3.5 h-3.5" />;
    case 'Watch':
      return <Watch className="w-3.5 h-3.5" />;
    case 'Briefcase':
      return <Briefcase className="w-3.5 h-3.5" />;
    case 'Wrench':
      return <Wrench className="w-3.5 h-3.5" />;
    case 'PawPrint':
      return <Flame className="w-3.5 h-3.5 text-amber-400" />;
    case 'Sparkles':
    default:
      return <Sparkles className="w-3.5 h-3.5" />;
  }
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-purple-400" />
          <h3 className="text-xs font-bold text-white">فئات المنتجات الرابحة:</h3>
        </div>
        <span className="text-[10px] text-purple-300 font-mono bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-800/40">
          +320 إعلان نشط
        </span>
      </div>

      <div className="flex flex-col gap-1 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-purple-900/60">
        {PRODUCT_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`cat-filter-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all text-right ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-md shadow-purple-600/25 border border-purple-400/30'
                  : 'bg-[#131b2e] hover:bg-[#1a253f] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span className={isSelected ? 'text-cyan-200' : 'text-purple-400'}>
                  {getCategoryIcon(cat.iconName)}
                </span>
                <span className="truncate">{cat.name}</span>
              </div>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 ${
                  isSelected ? 'bg-white/20 text-white font-bold' : 'bg-slate-900 text-slate-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
