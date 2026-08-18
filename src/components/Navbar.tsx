import React from 'react';
import {
  TrendingUp,
  Sheet,
  UserCheck,
  LogOut,
  Sparkles,
  DollarSign,
  Heart,
  RefreshCw,
} from 'lucide-react';
import { AuthorizedUser } from '../types';
import { Logo } from './Logo';

interface NavbarProps {
  currentUser: AuthorizedUser | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenAdminSheet: () => void;
  onOpenAiScanner: () => void;
  activeCurrency: 'USD' | 'DZD' | 'SAR' | 'AED';
  onChangeCurrency: (curr: 'USD' | 'DZD' | 'SAR' | 'AED') => void;
  totalSyncedUsers: number;
  favoritesCount?: number;
  isFavoritesOnly?: boolean;
  onToggleFavoritesOnly?: () => void;
  onRefreshCatalog?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenAdminSheet,
  onOpenAiScanner,
  activeCurrency,
  onChangeCurrency,
  totalSyncedUsers,
  favoritesCount = 0,
  isFavoritesOnly = false,
  onToggleFavoritesOnly,
  onRefreshCatalog,
}) => {
  return (
    <header className="sticky top-0 z-40 h-16 bg-[#0a0f1d] border-b border-purple-900/40 text-slate-200 shadow-lg shadow-purple-950/20 backdrop-blur-md">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 h-full">
        <div className="flex items-center justify-between h-full gap-3 sm:gap-4">
          {/* ShopPulse Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <Logo size="md" />
            <span className="hidden xl:inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
              Meta Ads AI Radar
            </span>
          </div>

          {/* Center & Right Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Favorites Toggle Button */}
            {onToggleFavoritesOnly && (
              <button
                id="btn-nav-favorites-toggle"
                onClick={onToggleFavoritesOnly}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  isFavoritesOnly
                    ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/30'
                    : 'bg-[#131b2e] hover:bg-[#1a253f] text-slate-300 hover:text-rose-300 border-slate-700'
                }`}
                title="عرض الإعلانات المفضلة فقط"
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    isFavoritesOnly ? 'fill-current text-white' : favoritesCount > 0 ? 'text-rose-400 fill-rose-400/40' : 'text-slate-400'
                  }`}
                />
                <span className="hidden sm:inline">المفضلة</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                    isFavoritesOnly
                      ? 'bg-white/25 text-white'
                      : favoritesCount > 0
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {favoritesCount}
                </span>
              </button>
            )}

            {/* Live Refresh Catalog */}
            {onRefreshCatalog && (
              <button
                id="btn-nav-refresh"
                onClick={onRefreshCatalog}
                className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#131b2e] hover:bg-[#1a253f] border border-slate-700 text-slate-300 hover:text-cyan-300 text-xs font-medium transition-all"
                title="تحديث واستكشاف مئات الإعلانات الجديدة"
              >
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                <span>تحديث الإعلانات</span>
              </button>
            )}

            {/* Currency Selector */}
            <div className="flex items-center bg-[#131b2e] border border-slate-700 rounded-lg p-0.5 text-xs">
              <DollarSign className="w-3.5 h-3.5 text-purple-400 mx-1 hidden sm:block" />
              {(['USD', 'DZD', 'SAR', 'AED'] as const).map((curr) => (
                <button
                  key={curr}
                  id={`btn-curr-${curr}`}
                  onClick={() => onChangeCurrency(curr)}
                  className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                    activeCurrency === curr
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {curr === 'DZD' ? 'د.ج' : curr === 'SAR' ? 'ر.س' : curr === 'AED' ? 'د.إ' : '$'}
                </button>
              ))}
            </div>

            {/* AI Scanner Button */}
            <button
              id="btn-nav-ai-scanner"
              onClick={onOpenAiScanner}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-medium shadow-md shadow-purple-600/30 transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span className="hidden sm:inline">فاحص بالـ AI</span>
              <span className="sm:hidden">AI</span>
            </button>

            {/* Google Sheets Sync Pill / Admin */}
            <button
              id="btn-nav-google-sheets"
              onClick={onOpenAdminSheet}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131b2e] hover:bg-[#1a253f] border border-slate-700 text-slate-300 hover:text-emerald-400 text-xs font-medium transition-all"
              title="إدارة وتحديث جدول Google Sheets للمستخدمين المصرح بهم"
            >
              <Sheet className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden lg:inline">Google Sheets ({totalSyncedUsers})</span>
              <span className="lg:hidden inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Sheets</span>
              </span>
            </button>

            {/* User Account / Login State */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-[#131b2e] border border-purple-500/30 rounded-lg px-2.5 py-1">
                <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full border border-purple-400/40 flex items-center justify-center text-white text-xs font-bold">
                  {currentUser.fullName.charAt(0)}
                </div>
                <div className="hidden md:flex flex-col items-end text-right">
                  <span className="text-[10px] text-purple-300">مستخدم نشط</span>
                  <span className="text-xs font-medium text-white truncate max-w-[130px]">
                    {currentUser.fullName}
                  </span>
                </div>
                <button
                  id="btn-logout"
                  onClick={onLogout}
                  className="text-slate-400 hover:text-rose-400 p-1 transition-colors"
                  title="تسجيل الخروج"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                id="btn-login-modal"
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/40 text-xs font-medium transition-all"
              >
                <UserCheck className="w-3.5 h-3.5 text-purple-300" />
                <span>دخول الأعضاء</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

