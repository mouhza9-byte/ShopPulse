import React from 'react';
import {
  Search,
  Flame,
  Star,
  Globe,
  Share2,
  HelpCircle,
  TrendingUp,
  Heart,
  CheckCircle2,
  SlidersHorizontal,
  RefreshCw,
} from 'lucide-react';
import { FilterOptions } from '../types';

interface FilterBarProps {
  filters: FilterOptions;
  onChangeFilters: (newFilters: Partial<FilterOptions>) => void;
  onOpenRatioExplainer: () => void;
  totalFilteredCount: number;
  favoritesCount: number;
  onTriggerSearchRefresh?: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChangeFilters,
  onOpenRatioExplainer,
  totalFilteredCount,
  favoritesCount,
  onTriggerSearchRefresh,
}) => {
  return (
    <div className="w-full bg-[#0d1424] border border-purple-900/30 rounded-xl p-3 sm:p-4 shadow-md space-y-3">
      {/* Top row: Search Bar & Ratio Explainer */}
      <div className="flex flex-col md:flex-row items-center gap-2 sm:gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <Search className="absolute right-3.5 top-2.5 w-4 h-4 text-purple-400" />
          <input
            type="text"
            id="input-product-search"
            value={filters.searchQuery}
            onChange={(e) => onChangeFilters({ searchQuery: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && onTriggerSearchRefresh) {
                onTriggerSearchRefresh();
              }
            }}
            placeholder="ابحث بين مئات المنتجات الرابحة (مثال: غسيل، ليزر، مصفف، شاحن، مساج)..."
            className="w-full bg-[#070b14] border border-purple-900/40 rounded-lg pr-9 pl-16 py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 shadow-inner"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onChangeFilters({ searchQuery: '' })}
              className="absolute left-2.5 top-2 text-[11px] text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded transition-colors"
            >
              مسح
            </button>
          )}
        </div>

        {/* Ratio Explainer Button */}
        <button
          id="btn-open-ratio-explainer"
          onClick={onOpenRatioExplainer}
          className="w-full md:w-auto flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold whitespace-nowrap transition-all"
        >
          <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
          <span>شرح معادلة [(التعليقات) ÷ الإعجابات &lt; 4]</span>
        </button>
      </div>

      {/* Middle row: Key requested filters */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-purple-900/20">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* 1. Strictly Filter (Comments / Likes) < 4 */}
          <button
            id="btn-filter-ratio-under-4"
            onClick={() => onChangeFilters({ filterRatioUnder4: !filters.filterRatioUnder4 })}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all border ${
              filters.filterRatioUnder4
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-md shadow-purple-600/30'
                : 'bg-[#131b2e] border-slate-700 text-slate-300 hover:bg-[#1a253f]'
            }`}
            title="تصفية الإعلانات التي تحقق: (عدد التعليقات ÷ عدد الإعجابات) أقل من 4"
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${filters.filterRatioUnder4 ? 'text-cyan-300' : 'text-slate-500'}`} />
            <span>[(التعليقات ÷ الإعجابات) &lt; 4]</span>
          </button>

          {/* 2. Favorites only toggle */}
          <button
            id="btn-filter-favorites-toggle"
            onClick={() => onChangeFilters({ favoritesOnly: !filters.favoritesOnly })}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all border ${
              filters.favoritesOnly
                ? 'bg-rose-600 text-white border-rose-400 shadow-md shadow-rose-600/30'
                : 'bg-[#131b2e] border-slate-700 text-slate-300 hover:bg-[#1a253f]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${filters.favoritesOnly ? 'fill-current text-white' : 'text-rose-400'}`} />
            <span>الإعلانات المفضلة ({favoritesCount})</span>
          </button>

          {/* 3. Top Tier quick filter */}
          <button
            onClick={() => onChangeFilters({ tierOnly: !filters.tierOnly })}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all border ${
              filters.tierOnly
                ? 'bg-amber-500 text-amber-950 font-bold border-amber-400 shadow-sm'
                : 'bg-[#131b2e] border-slate-700 text-amber-300 hover:bg-[#1a253f]'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
            <span>فئة عليا فقط</span>
          </button>
        </div>

        {/* Results count badge */}
        <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>المعروض:</span>
          <span className="text-cyan-300 font-bold font-mono px-2 py-0.5 rounded bg-[#070b14] border border-purple-900/40">
            {totalFilteredCount}
          </span>
          <span className="text-slate-400">إعلان ممول</span>
        </div>
      </div>

      {/* Bottom row: Market, Platform, and Sorting dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-purple-900/20 text-xs">
        {/* Market Filter */}
        <div className="flex items-center gap-1.5 bg-[#070b14] px-2.5 py-1.5 rounded-lg border border-purple-900/30">
          <Globe className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span className="text-slate-400 font-medium whitespace-nowrap">السوق:</span>
          <select
            value={filters.market}
            onChange={(e) => onChangeFilters({ market: e.target.value as any })}
            className="w-full bg-transparent text-white font-medium focus:outline-none cursor-pointer text-xs"
          >
            <option value="all" className="bg-[#070b14] text-white">جميع الأسواق</option>
            <option value="dz" className="bg-[#070b14] text-white">الجزائر (DZD)</option>
            <option value="gcc" className="bg-[#070b14] text-white">الخليج العربي (SAR/AED)</option>
            <option value="global" className="bg-[#070b14] text-white">عالمي (USD)</option>
          </select>
        </div>

        {/* Platform Filter */}
        <div className="flex items-center gap-1.5 bg-[#070b14] px-2.5 py-1.5 rounded-lg border border-purple-900/30">
          <Share2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="text-slate-400 font-medium whitespace-nowrap">المنصة:</span>
          <select
            value={filters.platform}
            onChange={(e) => onChangeFilters({ platform: e.target.value as any })}
            className="w-full bg-transparent text-white font-medium focus:outline-none cursor-pointer text-xs"
          >
            <option value="all" className="bg-[#070b14] text-white">فيسبوك وانستغرام</option>
            <option value="facebook" className="bg-[#070b14] text-white">Facebook Ads فقط</option>
            <option value="instagram" className="bg-[#070b14] text-white">Instagram Ads فقط</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="flex items-center gap-1.5 bg-[#070b14] px-2.5 py-1.5 rounded-lg border border-purple-900/30">
          <TrendingUp className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="text-slate-400 font-medium whitespace-nowrap">الترتيب:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => onChangeFilters({ sortBy: e.target.value as any })}
            className="w-full bg-transparent text-white font-medium focus:outline-none cursor-pointer text-xs"
          >
            <option value="ratio_desc" className="bg-[#070b14] text-white">أعلى نسبة تفاعل (Ratio)</option>
            <option value="ratio_asc" className="bg-[#070b14] text-white">أقل نسبة تفاعل تصاعدياً</option>
            <option value="active_ads_desc" className="bg-[#070b14] text-white">الأكثر حملات إعلانية نشطة</option>
            <option value="shares_desc" className="bg-[#070b14] text-white">الأكثر مشاركة (Shares)</option>
            <option value="comments_desc" className="bg-[#070b14] text-white">الأكثر تعليقاً (Comments)</option>
            <option value="newest" className="bg-[#070b14] text-white">أحدث الإعلانات</option>
          </select>
        </div>
      </div>
    </div>
  );
};
