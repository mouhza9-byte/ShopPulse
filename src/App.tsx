import React, { useState, useMemo, useEffect } from 'react';
import {
  Sparkles,
  TrendingUp,
  Star,
  Layers,
  RefreshCw,
  HelpCircle,
  SlidersHorizontal,
  ExternalLink,
  CheckCircle,
  Heart,
  Search,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { AuthorizedUser, FilterOptions, ProductAd } from './types';
import { generateCatalog, INITIAL_CATALOG } from './data/adsCatalogEngine';
import { PRODUCT_CATEGORIES } from './data/mockWinningAds';
import { getSyncedUsersList } from './services/sheetsService';
import { Navbar } from './components/Navbar';
import { CategoryFilter } from './components/CategoryFilter';
import { FilterBar } from './components/FilterBar';
import { ProductAdCard } from './components/ProductAdCard';
import { ProductAnalysisModal } from './components/ProductAnalysisModal';
import { AuthModal } from './components/AuthModal';
import { GeminiAiScannerModal } from './components/GeminiAiScannerModal';
import { AdminSheetSyncModal } from './components/AdminSheetSyncModal';
import { ViralRatioExplainerModal } from './components/ViralRatioExplainerModal';
import { Logo } from './components/Logo';

export default function App() {
  // Current user state from localStorage
  const [currentUser, setCurrentUser] = useState<AuthorizedUser | null>(() => {
    try {
      const saved = localStorage.getItem('shoppulse_auth_user') || localStorage.getItem('mouhcen_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Total synced users count from Google Sheets
  const [syncedUsersCount, setSyncedUsersCount] = useState<number>(() => getSyncedUsersList().length);

  // Active currency
  const [activeCurrency, setActiveCurrency] = useState<'USD' | 'DZD' | 'SAR' | 'AED'>('DZD');

  // Selected category
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Search Seed for continuous dynamic refresh with hundreds of ads
  const [searchSeed, setSearchSeed] = useState<number>(1);

  // Dynamic Catalog of ads
  const [catalogAds, setCatalogAds] = useState<ProductAd[]>(INITIAL_CATALOG);

  // Favorites Set in localStorage
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('shoppulse_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filters State - Default with (Comments/Likes) < 4 strictly active
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    minRatio: 0,
    searchQuery: '',
    sortBy: 'ratio_desc',
    tierOnly: false,
    favoritesOnly: false,
    filterRatioUnder4: true, // Requested: Show ads with (Comments / Likes) < 4
    market: 'all',
    platform: 'all',
  });

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminSheetOpen, setIsAdminSheetOpen] = useState(false);
  const [isAiScannerOpen, setIsAiScannerOpen] = useState(false);
  const [isRatioExplainerOpen, setIsRatioExplainerOpen] = useState(false);
  const [selectedProductForAnalysis, setSelectedProductForAnalysis] = useState<ProductAd | null>(null);

  // Selected product for live inspector side panel
  const [selectedAdForInspector, setSelectedAdForInspector] = useState<ProductAd>(() => catalogAds[0]);

  // Persist favorites
  const handleToggleFavorite = (ad: ProductAd) => {
    setFavoriteIds((prev) => {
      let updated: string[];
      if (prev.includes(ad.id)) {
        updated = prev.filter((id) => id !== ad.id);
      } else {
        updated = [...prev, ad.id];
      }
      try {
        localStorage.setItem('shoppulse_favorites', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Re-generate fresh batch of ads on search / category change / manual refresh
  const handleRefreshCatalog = () => {
    const nextSeed = searchSeed + 1;
    setSearchSeed(nextSeed);
    const fresh = generateCatalog(nextSeed, filters.searchQuery);
    setCatalogAds(fresh);
  };

  // When search query changes, update catalog
  useEffect(() => {
    const fresh = generateCatalog(searchSeed, filters.searchQuery);
    setCatalogAds(fresh);
  }, [filters.searchQuery, searchSeed]);

  // Filter & Sort Logic
  const filteredAds = useMemo(() => {
    return catalogAds.filter((ad) => {
      const isFav = favoriteIds.includes(ad.id);

      // Favorites only filter
      if (filters.favoritesOnly && !isFav) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && ad.category !== selectedCategory) {
        return false;
      }

      // Strict User Constraint: [(عدد التعليقات) ÷ عدد الإعجابات] < 4
      const commentsLikesRatio = ad.commentsLikesRatio || Number((ad.comments / Math.max(1, ad.likes)).toFixed(2));
      if (filters.filterRatioUnder4 && commentsLikesRatio >= 4.0) {
        return false;
      }

      // Ratio filter
      if (ad.engagementRatio < filters.minRatio) {
        return false;
      }

      // Tier only filter (فئة عليا)
      if (filters.tierOnly && ad.tier !== 'فئة عليا' && ad.engagementRatio < 2.0) {
        return false;
      }

      // Platform filter
      if (filters.platform !== 'all') {
        if (filters.platform === 'facebook' && ad.platform === 'instagram') return false;
        if (filters.platform === 'instagram' && ad.platform === 'facebook') return false;
      }

      // Market filter
      if (filters.market !== 'all') {
        if (filters.market === 'dz' && !ad.targetMarkets.includes('الجزائر')) return false;
        if (filters.market === 'gcc' && !ad.targetMarkets.includes('السعودية') && !ad.targetMarkets.includes('الإمارات')) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'ratio_desc') {
        return b.engagementRatio - a.engagementRatio;
      }
      if (filters.sortBy === 'ratio_asc') {
        return a.engagementRatio - b.engagementRatio;
      }
      if (filters.sortBy === 'active_ads_desc') {
        return b.activeAdsCount - a.activeAdsCount;
      }
      if (filters.sortBy === 'shares_desc') {
        return b.shares - a.shares;
      }
      if (filters.sortBy === 'comments_desc') {
        return b.comments - a.comments;
      }
      if (filters.sortBy === 'newest') {
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      }
      return 0;
    });
  }, [catalogAds, selectedCategory, filters, favoriteIds]);

  // Keep inspector in sync
  const currentInspectorAd = useMemo(() => {
    if (filteredAds.find((a) => a.id === selectedAdForInspector?.id)) {
      return selectedAdForInspector;
    }
    return filteredAds[0] || catalogAds[0];
  }, [filteredAds, selectedAdForInspector, catalogAds]);

  const topTierCount = catalogAds.filter((a) => a.engagementRatio >= 2.0 || a.tier === 'فئة عليا').length;

  const handleLoginSuccess = (user: AuthorizedUser) => {
    setCurrentUser(user);
    localStorage.setItem('shoppulse_auth_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('shoppulse_auth_user');
  };

  const handleUsersUpdated = () => {
    setSyncedUsersCount(getSyncedUsersList().length);
  };

  const handleDiscoverMore = (ad: ProductAd) => {
    setSelectedProductForAnalysis(ad);
  };

  const getInspectorPrice = () => {
    if (!currentInspectorAd) return '';
    switch (activeCurrency) {
      case 'DZD':
        return `${currentInspectorAd.pricing.suggestedDZD.toLocaleString()} د.ج`;
      case 'SAR':
        return `${currentInspectorAd.pricing.suggestedSAR} ر.س`;
      case 'AED':
        return `${currentInspectorAd.pricing.suggestedAED} د.إ`;
      case 'USD':
      default:
        return `$${currentInspectorAd.pricing.suggestedUSD}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-['Cairo',sans-serif] selection:bg-purple-600 selection:text-white">
      {/* Top ShopPulse Header */}
      <Navbar
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenAdminSheet={() => setIsAdminSheetOpen(true)}
        onOpenAiScanner={() => setIsAiScannerOpen(true)}
        activeCurrency={activeCurrency}
        onChangeCurrency={setActiveCurrency}
        totalSyncedUsers={syncedUsersCount}
        favoritesCount={favoriteIds.length}
        isFavoritesOnly={filters.favoritesOnly}
        onToggleFavoritesOnly={() => setFilters((prev) => ({ ...prev, favoritesOnly: !prev.favoritesOnly }))}
        onRefreshCatalog={handleRefreshCatalog}
      />

      {/* Main High-Density Workspace */}
      <div className="flex-1 max-w-[1700px] w-full mx-auto p-3 sm:p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Categories & Meta Radar (3 cols) */}
        <aside className="lg:col-span-3 space-y-3">
          {/* Quick Metrics Overview Panel */}
          <div className="bg-[#0e1629] border border-purple-900/30 rounded-xl p-3.5 space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-purple-300 font-bold block">
                رادار ShopPulse Meta Ads
              </span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#070b14] p-2.5 rounded-lg border border-purple-900/40 text-center">
                <div className="text-amber-400 font-bold text-base flex items-center justify-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{topTierCount}</span>
                </div>
                <div className="text-[10px] text-slate-300 font-medium">فئة عليا نشطة</div>
              </div>

              <div className="bg-[#070b14] p-2.5 rounded-lg border border-purple-900/40 text-center">
                <div className="text-cyan-300 font-bold text-base">
                  +{catalogAds.length}
                </div>
                <div className="text-[10px] text-slate-300 font-medium">إعلانات متجددة</div>
              </div>
            </div>

            {/* Quick Favorites shortcut */}
            <button
              onClick={() => setFilters((prev) => ({ ...prev, favoritesOnly: !prev.favoritesOnly }))}
              className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-between transition-all border ${
                filters.favoritesOnly
                  ? 'bg-rose-600 text-white border-rose-400 shadow-md shadow-rose-600/30'
                  : 'bg-[#131b2e] hover:bg-[#1a253f] text-slate-200 border-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Heart className={`w-3.5 h-3.5 ${filters.favoritesOnly ? 'fill-current' : 'text-rose-400'}`} />
                <span>الإعلانات المفضلة المحفوظة</span>
              </div>
              <span className="font-mono font-bold text-[11px] bg-black/40 px-2 py-0.5 rounded">
                {favoriteIds.length}
              </span>
            </button>

            <button
              onClick={() => setIsRatioExplainerOpen(true)}
              className="w-full py-2 px-3 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
              <span>معادلة [(التعليقات) ÷ الإعجابات &lt; 4]</span>
            </button>
          </div>

          {/* Categories List */}
          <div className="bg-[#0e1629] border border-purple-900/30 rounded-xl p-3.5 space-y-2 shadow-md">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={(catId) => setSelectedCategory(catId)}
            />
          </div>

          {/* Google Sheets Status */}
          <div className="bg-[#0e1629] border border-purple-900/30 rounded-xl p-3.5 space-y-1.5 shadow-md">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold text-white">حالة التحقق (Google Sheets)</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {currentUser ? (
                <>تمت مطابقة حسابك <strong className="text-cyan-300">{currentUser.fullName}</strong> مع قاعدة بيانات Google Sheets بنجاح.</>
              ) : (
                <>مرتبط بجدول Google Sheets مع <strong className="text-emerald-400 font-bold font-mono">{syncedUsersCount}</strong> حساب معتمد.</>
              )}
            </p>
            <div className="pt-1 flex gap-2">
              <button
                onClick={() => setIsAdminSheetOpen(true)}
                className="text-[11px] text-purple-300 hover:text-purple-200 font-medium underline"
              >
                مزامنة Sheets
              </button>
              <span className="text-slate-600">•</span>
              <button
                onClick={() => setIsAiScannerOpen(true)}
                className="text-[11px] text-cyan-300 hover:text-cyan-200 font-medium underline"
              >
                فاحص AI
              </button>
            </div>
          </div>
        </aside>

        {/* Center: Filter Bar & Product Ads Grid (6 cols) */}
        <section className="lg:col-span-6 space-y-3">
          {/* Filter Bar */}
          <FilterBar
            filters={filters}
            onChangeFilters={(newFilters) => setFilters((prev) => ({ ...prev, ...newFilters }))}
            onOpenRatioExplainer={() => setIsRatioExplainerOpen(true)}
            totalFilteredCount={filteredAds.length}
            favoritesCount={favoriteIds.length}
            onTriggerSearchRefresh={handleRefreshCatalog}
          />

          {/* Continuous dynamic results header */}
          <div className="flex items-center justify-between px-1 text-xs text-slate-400">
            <span>
              عرض {filteredAds.length} من أصل {catalogAds.length} إعلان رابح
              {filters.filterRatioUnder4 && ' • مفلترة بـ (التعليقات ÷ الإعجابات < 4)'}
              {filters.favoritesOnly && ' • الإعلانات المفضلة فقط'}
            </span>
            <button
              onClick={handleRefreshCatalog}
              className="text-cyan-300 hover:text-cyan-200 flex items-center gap-1 font-semibold transition-colors"
              title="توليد وتحديث دفعة إعلانات جديدة"
            >
              <RefreshCw className="w-3 h-3 text-cyan-400" />
              <span>توليد إعلانات إضافية</span>
            </button>
          </div>

          {/* Ads Cards Grid */}
          {filteredAds.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredAds.map((ad) => (
                <ProductAdCard
                  key={ad.id}
                  ad={ad}
                  activeCurrency={activeCurrency}
                  onDiscoverMore={handleDiscoverMore}
                  isSelected={currentInspectorAd?.id === ad.id}
                  onSelect={(selected) => setSelectedAdForInspector(selected)}
                  isFavorite={favoriteIds.includes(ad.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="bg-[#0e1629] border border-purple-900/30 rounded-xl p-8 text-center space-y-3 shadow-md">
              <div className="w-12 h-12 rounded-full bg-purple-950/60 border border-purple-900/50 flex items-center justify-center mx-auto text-purple-300">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-white">لا توجد إعلانات مطابقة لمعايير الفلترة الحالية</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {filters.favoritesOnly
                  ? 'لم تقم بحفظ أي إعلانات في المفضلة بعد. انقر على أيقونة القلب على أي إعلان لإضافته.'
                  : 'جرب تقليل شروط الفلترة أو مسح نص البحث لعرض كافة الإعلانات المتجددة.'}
              </p>
              <div className="flex justify-center gap-2 pt-2">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setFilters({
                      category: 'all',
                      minRatio: 0,
                      searchQuery: '',
                      sortBy: 'ratio_desc',
                      tierOnly: false,
                      favoritesOnly: false,
                      filterRatioUnder4: true,
                      market: 'all',
                      platform: 'all',
                    });
                  }}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>إعادة ضبط الفلاتر</span>
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Right Column: Live Product Inspector (3 cols) */}
        <aside className="lg:col-span-3 space-y-3">
          <div className="bg-[#0e1629] border border-purple-900/30 rounded-xl p-4 sticky top-20 space-y-3.5 shadow-md">
            <div className="flex items-center justify-between border-b border-purple-900/30 pb-2.5">
              <span className="text-[10px] uppercase tracking-widest text-purple-300 font-bold block">
                فاحص المنتج السريع (Live Inspector)
              </span>
              {currentInspectorAd && (
                <button
                  onClick={() => handleToggleFavorite(currentInspectorAd)}
                  className="p-1 rounded text-rose-400 hover:text-rose-300"
                >
                  <Heart className={`w-4 h-4 ${favoriteIds.includes(currentInspectorAd.id) ? 'fill-current' : ''}`} />
                </button>
              )}
            </div>

            {currentInspectorAd ? (
              <div className="space-y-3">
                {/* Product mini header */}
                <div className="flex items-center gap-2.5">
                  <img
                    src={currentInspectorAd.thumbnailUrl}
                    alt={currentInspectorAd.titleAr}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-lg object-cover border border-purple-900/40 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate leading-snug">
                      {currentInspectorAd.titleAr}
                    </h4>
                    <p className="text-[10px] text-slate-400 truncate">{currentInspectorAd.pageName}</p>
                    <span className="text-cyan-300 font-mono text-[11px] font-bold">
                      C/L: {((currentInspectorAd.comments / Math.max(1, currentInspectorAd.likes))).toFixed(2)}x
                    </span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="space-y-2 text-xs">
                  <div className="bg-[#070b14] p-2.5 rounded-lg border border-purple-900/30 flex justify-between items-center">
                    <span className="text-slate-400">حملات إعلانية نشطة:</span>
                    <span className="text-white font-bold font-mono">{currentInspectorAd.activeAdsCount} حملة</span>
                  </div>

                  <div className="bg-[#070b14] p-2.5 rounded-lg border border-purple-900/30 flex justify-between items-center">
                    <span className="text-slate-400">المتاجر المنافسة:</span>
                    <span className="text-white font-bold font-mono">{currentInspectorAd.activeAdAccountsCount} حساب</span>
                  </div>

                  <div className="bg-[#070b14] p-2.5 rounded-lg border border-purple-900/30 flex justify-between items-center">
                    <span className="text-slate-400">سعر البيع المقترح:</span>
                    <span className="text-emerald-400 font-bold font-mono">{getInspectorPrice()}</span>
                  </div>
                </div>

                {/* Market Demand Meter */}
                <div className="bg-[#070b14] p-2.5 rounded-lg border border-purple-900/30 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-400">مستوى الطلب المتوقع:</span>
                    <span className="text-purple-300 font-bold">عالي جداً (94%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full w-[94%]"></div>
                  </div>
                </div>

                {/* Ad Angle / Hook Preview */}
                <div className="bg-[#070b14] p-2.5 rounded-lg border border-purple-900/30 space-y-1 text-xs">
                  <span className="text-[10px] text-purple-300 font-bold">خطاف الإعلان (Hook):</span>
                  <p className="text-[11px] text-slate-200 leading-relaxed line-clamp-3">
                    {currentInspectorAd.deepAnalysis.videoScript.hook}
                  </p>
                </div>

                {/* Inspector Actions */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => handleDiscoverMore(currentInspectorAd)}
                    className="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-purple-600/30"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                    <span>فتح دراسة الجدوى والـ AI الشاملة</span>
                  </button>

                  <a
                    href={currentInspectorAd.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-lg bg-[#131b2e] hover:bg-[#1a253f] text-slate-200 hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors border border-purple-900/40"
                  >
                    <span>فتح الإعلان في Meta Ads</span>
                    <ExternalLink className="w-3 h-3 text-purple-300" />
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="bg-[#0a0f1d] border-t border-purple-900/40 text-slate-400 py-4 px-4 sm:px-6 text-xs mt-auto">
        <div className="max-w-[1700px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span className="text-slate-500 text-[11px]">| منصة استكشاف وتحليل إعلانات Meta Ads بالذكاء الاصطناعي</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <button onClick={() => setIsRatioExplainerOpen(true)} className="hover:text-purple-300">
              معادلة الفلترة &lt; 4
            </button>
            <span>•</span>
            <button onClick={() => setIsAdminSheetOpen(true)} className="hover:text-emerald-400">
              Google Sheets ({syncedUsersCount})
            </button>
            <span>•</span>
            <button onClick={() => setIsAiScannerOpen(true)} className="hover:text-cyan-300">
              فاحص AI
            </button>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <ProductAnalysisModal
        ad={selectedProductForAnalysis}
        isOpen={!!selectedProductForAnalysis}
        onClose={() => setSelectedProductForAnalysis(null)}
        activeCurrency={activeCurrency}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onOpenAdminSheet={() => {
          setIsAuthOpen(false);
          setIsAdminSheetOpen(true);
        }}
      />

      <GeminiAiScannerModal
        isOpen={isAiScannerOpen}
        onClose={() => setIsAiScannerOpen(false)}
        activeCurrency={activeCurrency}
      />

      <AdminSheetSyncModal
        isOpen={isAdminSheetOpen}
        onClose={() => setIsAdminSheetOpen(false)}
        currentUser={currentUser}
        onUsersUpdated={handleUsersUpdated}
      />

      <ViralRatioExplainerModal
        isOpen={isRatioExplainerOpen}
        onClose={() => setIsRatioExplainerOpen(false)}
      />
    </div>
  );
}
