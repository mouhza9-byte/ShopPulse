import React, { useState } from 'react';
import {
  ExternalLink,
  Play,
  Star,
  Sparkles,
  CheckCircle,
  Heart,
  MessageCircle,
  ThumbsUp,
  Share2,
} from 'lucide-react';
import { ProductAd } from '../types';

interface ProductAdCardProps {
  ad: ProductAd;
  activeCurrency: 'USD' | 'DZD' | 'SAR' | 'AED';
  onDiscoverMore: (ad: ProductAd) => void;
  isSelected?: boolean;
  onSelect?: (ad: ProductAd) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (ad: ProductAd) => void;
}

export const ProductAdCard: React.FC<ProductAdCardProps> = ({
  ad,
  activeCurrency,
  onDiscoverMore,
  isSelected,
  onSelect,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const [isPlayingVideoMock, setIsPlayingVideoMock] = useState(false);

  // Format currency
  const getFormattedPrice = () => {
    switch (activeCurrency) {
      case 'DZD':
        return `${ad.pricing.suggestedDZD.toLocaleString()} د.ج`;
      case 'SAR':
        return `${ad.pricing.suggestedSAR} ر.س`;
      case 'AED':
        return `${ad.pricing.suggestedAED} د.إ`;
      case 'USD':
      default:
        return `$${ad.pricing.suggestedUSD}`;
    }
  };

  const isTopTier = ad.engagementRatio >= 2.0 || ad.tier === 'فئة عليا';
  const ratioUnder4 = (ad.commentsLikesRatio || Number((ad.comments / Math.max(1, ad.likes)).toFixed(2))) < 4.0;

  return (
    <div
      onClick={() => onSelect?.(ad)}
      className={`bg-[#0e1629] border rounded-xl overflow-hidden flex flex-col relative transition-all duration-200 cursor-pointer text-slate-200 ${
        isSelected
          ? 'border-purple-400 ring-2 ring-purple-500/40 shadow-xl shadow-purple-900/30'
          : isTopTier
          ? 'border-purple-800/60 hover:border-purple-500/80 shadow-md shadow-purple-950/20'
          : 'border-slate-800 hover:border-slate-700 shadow-sm'
      }`}
    >
      {/* Top Floating Badges */}
      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-20">
        {/* Tier Badge */}
        {isTopTier && (
          <div className="bg-amber-500 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded shadow uppercase flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            <span>فئة عليا</span>
          </div>
        )}

        {/* Ratio < 4 Badge */}
        {ratioUnder4 && (
          <div className="bg-purple-950/90 border border-purple-500/40 text-purple-200 text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
            (C/L) &lt; 4
          </div>
        )}
      </div>

      {/* Favorite Button Top Right (above image) */}
      <button
        id={`btn-fav-${ad.id}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite?.(ad);
        }}
        className={`absolute top-2.5 right-2.5 p-1.5 rounded-full z-20 transition-all ${
          isFavorite
            ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/50 scale-110'
            : 'bg-black/60 hover:bg-black/80 text-slate-300 hover:text-rose-400'
        }`}
        title={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
      >
        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
      </button>

      {/* Media Video/Image Container */}
      <div className="h-44 sm:h-48 bg-slate-900 flex items-center justify-center relative group overflow-hidden shrink-0">
        <img
          src={ad.thumbnailUrl}
          alt={ad.titleAr}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1629] via-slate-950/30 to-transparent"></div>

        {/* Video Play Mockup Overlay */}
        {ad.hasVideo && !isPlayingVideoMock && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPlayingVideoMock(true);
            }}
            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors group/btn"
            title="معاينة زاوية فيديو الإعلان"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 group-hover/btn:from-purple-500 group-hover/btn:to-indigo-500 text-white flex items-center justify-center shadow-lg transition-transform group-hover/btn:scale-110">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
          </button>
        )}

        {/* Video simulation active state */}
        {isPlayingVideoMock && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 bg-[#070b14]/95 flex flex-col items-center justify-center p-3 text-center z-20"
          >
            <p className="text-[11px] font-bold text-purple-300 mb-1">فيديو الإعلان الممول (Meta Ads)</p>
            <p className="text-[10px] text-slate-300 mb-2 line-clamp-2">{ad.deepAnalysis.videoScript.hook}</p>
            <div className="flex items-center gap-2">
              <a
                href={ad.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-medium rounded"
              >
                فتح المنشور الأصلي
              </a>
              <button
                onClick={() => setIsPlayingVideoMock(false)}
                className="px-2.5 py-1 bg-slate-800 text-slate-300 text-[11px] rounded hover:bg-slate-700"
              >
                إغلاق
              </button>
            </div>
          </div>
        )}

        {/* Page Identity Pill at bottom of image */}
        <div className="absolute bottom-2 inset-x-2.5 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 bg-[#0a0f1d]/90 backdrop-blur-sm px-2 py-1 rounded-md border border-purple-900/40 max-w-[70%]">
            <img
              src={ad.pageAvatar}
              alt={ad.pageName}
              referrerPolicy="no-referrer"
              className="w-4 h-4 rounded-full object-cover"
            />
            <span className="text-[11px] font-medium text-white truncate">{ad.pageName}</span>
            {ad.isVerifiedPage && <CheckCircle className="w-3 h-3 text-cyan-400 shrink-0" />}
          </div>

          <span className="text-[10px] text-cyan-300 bg-[#0a0f1d]/90 px-1.5 py-0.5 rounded border border-purple-900/40 font-mono">
            {ad.activeDays}d active
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Strict Ratio Badge */}
          <div className="flex justify-between items-start gap-2 mb-1.5">
            <h3 className="font-bold text-white text-xs sm:text-sm line-clamp-1 leading-snug">
              {ad.titleAr}
            </h3>
            <span className="text-purple-300 font-mono text-[11px] font-bold whitespace-nowrap bg-purple-950/80 border border-purple-800/50 px-1.5 py-0.5 rounded">
              C/L: {((ad.comments / Math.max(1, ad.likes))).toFixed(2)}x
            </span>
          </div>

          {/* Ad text snippet */}
          <p className="text-[11px] text-slate-300 leading-relaxed mb-2.5 line-clamp-2">
            {ad.adText}
          </p>

          {/* 3-Column Engagement Stats Grid */}
          <div className="grid grid-cols-3 gap-1.5 mb-2.5 text-[10px] text-slate-400">
            <div className="bg-[#080d18] p-1.5 rounded text-center border border-slate-800">
              <div className="text-white font-bold text-xs">{ad.likes.toLocaleString()}</div>
              <span>إعجاب</span>
            </div>
            <div className="bg-[#080d18] p-1.5 rounded text-center border border-purple-900/30">
              <div className="text-purple-300 font-bold text-xs">{ad.comments.toLocaleString()}</div>
              <span>تعليق</span>
            </div>
            <div className="bg-[#080d18] p-1.5 rounded text-center border border-slate-800">
              <div className="text-cyan-300 font-bold text-xs">{ad.shares.toLocaleString()}</div>
              <span>مشاركة</span>
            </div>
          </div>

          {/* Quick Metrics Bar: Price & Competitors */}
          <div className="flex items-center justify-between text-[11px] bg-[#080d18] px-2.5 py-1.5 rounded-md border border-purple-900/30 mb-2.5">
            <div className="flex items-center gap-1 text-slate-400">
              <span>المنافسين:</span>
              <span className="text-white font-bold font-mono">{ad.activeAdAccountsCount} متاجر</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-slate-400">سعر البيع:</span>
              <span className="text-emerald-400 font-bold font-mono">{getFormattedPrice()}</span>
            </div>
          </div>
        </div>

        {/* Dual High-Density Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-purple-900/30 mt-auto">
          <a
            href={ad.postUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs py-2 rounded-lg font-medium text-center flex items-center justify-center gap-1 transition-colors shadow-sm"
          >
            <span>زيارة المنشور</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDiscoverMore(ad);
            }}
            className="flex-1 bg-[#1a233a] hover:bg-[#232f4e] text-purple-200 text-xs py-2 rounded-lg font-medium flex items-center justify-center gap-1 transition-colors border border-purple-900/40"
          >
            <Sparkles className="w-3 h-3 text-cyan-300" />
            <span>إكتشف المزيد</span>
          </button>
        </div>
      </div>
    </div>
  );
};
