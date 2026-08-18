import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Layers,
  Store,
  DollarSign,
  TrendingUp,
  Target,
  Copy,
  Check,
  ExternalLink,
  Flame,
  ShieldCheck,
  Video,
  ShoppingBag,
  Percent,
  RefreshCw,
  MessageSquare,
  Send,
  Zap,
} from 'lucide-react';
import { ProductAd } from '../types';
import { requestAiProductAnalysis } from '../services/geminiService';

interface ProductAnalysisModalProps {
  ad: ProductAd | null;
  isOpen: boolean;
  onClose: () => void;
  activeCurrency: 'USD' | 'DZD' | 'SAR' | 'AED';
}

export const ProductAnalysisModal: React.FC<ProductAnalysisModalProps> = ({
  ad,
  isOpen,
  onClose,
  activeCurrency,
}) => {
  if (!isOpen || !ad) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'profit' | 'angles' | 'ad_copies' | 'suppliers' | 'ai_chat'>('overview');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  // Profit simulator state
  const [customPriceUSD, setCustomPriceUSD] = useState<number>(ad.pricing.suggestedUSD);
  const [customCostUSD, setCustomCostUSD] = useState<number>(ad.deepAnalysis.supplierCostUSD);
  const [estimatedAdCostUSD, setEstimatedAdCostUSD] = useState<number>(8.0);

  // Live AI Consultation
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiConversation, setAiConversation] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: `مرحباً بك! أنا مستشار الذكاء الاصطناعي لمنصة ShopPulse. حللت منتج "${ad.titleAr}" وأرى أنه يملك إمكانات فيروسية ممتازة بنسبة تفاعل ${ad.engagementRatio.toFixed(1)}x مع ${ad.activeAdsCount} إعلان نشط. ما الذي ترغب في استشارته بخصوص الاستهداف، الموردين، أو استراتيجية الإعلانات؟`,
    },
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleAskAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim() || isAiLoading) return;

    const userText = aiQuestion;
    setAiQuestion('');
    setAiConversation((prev) => [...prev, { role: 'user', text: userText }]);
    setIsAiLoading(true);

    try {
      const response = await fetch('/api/gemini/analyze-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: `${ad.titleAr} (${ad.titleEn})`,
          category: ad.category,
          adExcerpt: `${ad.adText} - User Question: ${userText}`,
        }),
      });

      const json = await response.json();
      const answer = json.data?.competitionVerdict || json.data?.marketingAngles?.[0]?.description || 'تحليل الذكاء الاصطناعي مكتمل بنجاح.';

      setAiConversation((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: answer,
        },
      ]);
    } catch (e: any) {
      setAiConversation((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'عذراً، حدث خطأ أثناء الاتصال بنموذج الذكاء الاصطناعي. يرجى المحاولة مرة أخرى.',
        },
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Profit calculation logic
  const netProfitUSD = Math.max(0, customPriceUSD - customCostUSD - estimatedAdCostUSD);
  const profitMarginPercent = customPriceUSD > 0 ? Math.round((netProfitUSD / customPriceUSD) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0f172a] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100">
        {/* Modal Top Header */}
        <div className="relative px-5 py-4 bg-[#1e293b] border-b border-slate-700 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>تحليل المنتج بالذكاء الاصطناعي</span>
              </span>

              {ad.tier === 'فئة عليا' && (
                <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-amber-950 text-xs font-black flex items-center gap-1 shadow-sm">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>فئة عليا • Ratio {ad.engagementRatio.toFixed(2)}x</span>
                </span>
              )}

              <span className="text-[11px] text-slate-400 font-mono">
                Mouhcen e-commerce pro
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {ad.titleAr}
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5" dir="ltr">
              {ad.titleEn}
            </p>
          </div>

          <button
            id="btn-close-analysis-modal"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Highlight Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-900/90 border-b border-slate-800">
          {/* 1. Active Ads Count */}
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 flex items-center gap-1 mb-0.5">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>الإعلانات النشطة:</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-white flex items-center gap-1 font-mono">
              <span>{ad.activeAdsCount}</span>
              <span className="text-[10px] font-normal text-sky-300">حملة</span>
            </div>
          </div>

          {/* 2. Number of Ad Accounts / Competitors */}
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 flex items-center gap-1 mb-0.5">
              <Store className="w-3.5 h-3.5 text-indigo-400" />
              <span>الحسابات المعلنة:</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-white flex items-center gap-1 font-mono">
              <span>{ad.activeAdAccountsCount}</span>
              <span className="text-[10px] font-normal text-indigo-300">متاجر</span>
            </div>
          </div>

          {/* 3. Suggested Selling Price Range */}
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 flex items-center gap-1 mb-0.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>سعر البيع المقترح:</span>
            </div>
            <div className="text-sm sm:text-base font-bold text-emerald-400 truncate font-mono">
              {activeCurrency === 'DZD'
                ? `${ad.pricing.suggestedDZD.toLocaleString()} د.ج`
                : activeCurrency === 'SAR'
                ? `${ad.pricing.suggestedSAR} ر.س`
                : activeCurrency === 'AED'
                ? `${ad.pricing.suggestedAED} د.إ`
                : `$${ad.pricing.suggestedUSD}`}
            </div>
          </div>

          {/* 4. Profit Margin */}
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 flex items-center gap-1 mb-0.5">
              <Percent className="w-3.5 h-3.5 text-amber-400" />
              <span>هامش الربح المتوقع:</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-amber-400 font-mono">
              {ad.deepAnalysis.targetProfitMargin}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-[#0f172a] border-b border-slate-800 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'نظرة عامة والجمهور', icon: Target },
            { id: 'angles', label: 'زوايا التسويق والخطافات', icon: Zap },
            { id: 'ad_copies', label: 'نصوص إعلانية جاهزة', icon: Copy },
            { id: 'profit', label: 'حاسبة الأرباح والتكلفة', icon: TrendingUp },
            { id: 'suppliers', label: 'روابط الموردين والشحن', icon: ShoppingBag },
            { id: 'ai_chat', label: 'مستشار AI التفاعلي', icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-sm">
          {/* TAB 1: OVERVIEW & AUDIENCE */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Currency Pricing Table */}
              <div className="bg-slate-950 p-4 sm:p-5 rounded-3xl border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>نطاق أسعار البيع المقترحة حسب الأسواق (من - إلى):</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 block mb-1">الجزائر (DZD د.ج):</span>
                    <div className="font-bold text-emerald-400 text-sm">
                      {ad.pricing.minDZD.toLocaleString()} - {ad.pricing.maxDZD.toLocaleString()} د.ج
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      الموصى به: {ad.pricing.suggestedDZD.toLocaleString()} د.ج
                    </div>
                  </div>

                  <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 block mb-1">السعودية (SAR ر.س):</span>
                    <div className="font-bold text-emerald-400 text-sm">
                      {ad.pricing.minSAR} - {ad.pricing.maxSAR} ر.س
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      الموصى به: {ad.pricing.suggestedSAR} ر.س
                    </div>
                  </div>

                  <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 block mb-1">الإمارات (AED د.إ):</span>
                    <div className="font-bold text-emerald-400 text-sm">
                      {ad.pricing.minAED} - {ad.pricing.maxAED} د.إ
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      الموصى به: {ad.pricing.suggestedAED} د.إ
                    </div>
                  </div>

                  <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 block mb-1">عالمي (USD $):</span>
                    <div className="font-bold text-emerald-400 text-sm">
                      ${ad.pricing.minUSD} - ${ad.pricing.maxUSD}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      الموصى به: ${ad.pricing.suggestedUSD}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Overview & Saturation */}
              <div className="bg-slate-950 p-4 sm:p-5 rounded-3xl border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>تقييم قابلية النجاح والتشبع الإعلاني:</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {ad.deepAnalysis.productOverview}
                </p>
              </div>

              {/* Target Audience Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 sm:p-5 rounded-3xl border border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
                    <Target className="w-4 h-4 text-indigo-400" />
                    <span>الجمهور المستهدف والفئة العمرية:</span>
                  </h4>
                  <div className="text-xs space-y-2">
                    <div className="flex justify-between py-1.5 border-b border-slate-800">
                      <span className="text-slate-400">الجنس:</span>
                      <span className="font-bold text-white">{ad.deepAnalysis.targetAudience.gender}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800">
                      <span className="text-slate-400">الفئة العمرية الأفضل:</span>
                      <span className="font-bold text-white">{ad.deepAnalysis.targetAudience.ageRange}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-400 block mb-2">
                      أبرز اهتمامات Facebook Ads للاستهداف المباشر:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {ad.deepAnalysis.targetAudience.topInterests.map((interest, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-xl bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-[11px]"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 sm:p-5 rounded-3xl border border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-rose-400" />
                    <span>نقاط الألم الرئيسية (Pain Points) لإقناع العميل:</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {ad.deepAnalysis.targetAudience.mainPainPoints.map((pain, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0"></span>
                        <span>{pain}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MARKETING ANGLES & VIDEO SCRIPT */}
          {activeTab === 'angles' && (
            <div className="space-y-6">
              {/* Marketing Angles */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>زوايا التسويق المقترحة (Winning Angles):</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ad.deepAnalysis.marketingAngles.map((angle, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950 p-4 rounded-3xl border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-amber-400">{angle.title}</span>
                        <button
                          onClick={() => handleCopy(angle.hook, `hook-${idx}`)}
                          className="text-slate-400 hover:text-white"
                          title="نسخ الخطاف"
                        >
                          {copiedIndex === `hook-${idx}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 text-xs font-semibold text-white border border-slate-800">
                        "{angle.hook}"
                      </div>
                      <p className="text-xs text-slate-400">{angle.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Script Framework (0-30s) */}
              <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Video className="w-4 h-4 text-blue-400" />
                    <span>سيناريو الفيديو الإعلاني الموصى به (Video Ad Script):</span>
                  </h4>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded-lg bg-blue-500/20 text-blue-400 font-mono font-bold flex-shrink-0">
                      0:00 - 0:03
                    </span>
                    <div>
                      <span className="font-bold text-white block mb-0.5">الخطاف البصري (Scroll Stopper Hook):</span>
                      <p className="text-slate-300">{ad.deepAnalysis.videoScript.hook}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded-lg bg-rose-500/20 text-rose-400 font-mono font-bold flex-shrink-0">
                      0:03 - 0:10
                    </span>
                    <div>
                      <span className="font-bold text-white block mb-0.5">إبراز المشكلة والمعاناة (Agitate Pain):</span>
                      <p className="text-slate-300">{ad.deepAnalysis.videoScript.problem}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold flex-shrink-0">
                      0:10 - 0:20
                    </span>
                    <div>
                      <span className="font-bold text-white block mb-0.5">تقديم المنتج كحل سحري (Solution):</span>
                      <p className="text-slate-300">{ad.deepAnalysis.videoScript.solution}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold flex-shrink-0">
                      0:20 - 0:30
                    </span>
                    <div>
                      <span className="font-bold text-white block mb-0.5">العرض الحصري والدعوة للشراء (Offer & CTA):</span>
                      <p className="text-slate-300">{ad.deepAnalysis.videoScript.cta}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: READY-TO-COPY AD COPIES */}
          {activeTab === 'ad_copies' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Copy className="w-4 h-4 text-cyan-400" />
                <span>نصوص إعلانية احترافية جاهزة للنسخ (Ad Copies):</span>
              </h4>

              {ad.deepAnalysis.adCopies.map((copy, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-xl bg-slate-800 text-xs font-bold text-cyan-300">
                      {copy.dialect}
                    </span>
                    <button
                      onClick={() => handleCopy(`${copy.headline}\n\n${copy.primaryText}`, `copy-${idx}`)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all"
                    >
                      {copiedIndex === `copy-${idx}` ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>تم النسخ بنجاح!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>نسخ النص كاملاً</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="font-bold text-white text-sm">
                    {copy.headline}
                  </div>

                  <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
                    {copy.primaryText}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: PROFIT CALCULATOR */}
          {activeTab === 'profit' && (
            <div className="space-y-6">
              <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>محاكي هوامش الربح والتكاليف (Dropshipping & COD Profit Calculator):</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Selling Price */}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                      سعر بيع المنتج للعميل ($):
                    </label>
                    <input
                      type="number"
                      value={customPriceUSD}
                      onChange={(e) => setCustomPriceUSD(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3 text-sm text-white font-bold"
                    />
                  </div>

                  {/* Supplier Cost */}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                      تكلفة الشراء من المورد ($):
                    </label>
                    <input
                      type="number"
                      value={customCostUSD}
                      onChange={(e) => setCustomCostUSD(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3 text-sm text-white font-bold"
                    />
                  </div>

                  {/* Ad Cost Per Purchase */}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                      تكلفة الإعلانات والشحن للطلب ($):
                    </label>
                    <input
                      type="number"
                      value={estimatedAdCostUSD}
                      onChange={(e) => setEstimatedAdCostUSD(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3 text-sm text-white font-bold"
                    />
                  </div>
                </div>

                {/* Calculation Outcome Result */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">صافي الربح المتوقع لكل مبيعة:</span>
                    <span className="text-2xl font-black text-emerald-400">
                      ${netProfitUSD.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">نسبة هامش الربح:</span>
                    <span className="text-2xl font-black text-cyan-400">
                      {profitMarginPercent}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SUPPLIER LINKS */}
          {activeTab === 'suppliers' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-indigo-400" />
                <span>روابط البحث المباشر في منصات التوريد والمصانع:</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ad.deepAnalysis.supplierLinks.map((sup, idx) => (
                  <a
                    key={idx}
                    href={sup.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-3xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-400 mb-1">{sup.platform}</div>
                      <div className="text-sm font-extrabold text-white group-hover:text-blue-300 transition-colors">
                        {sup.label}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-blue-400 mt-4">
                      <span>فتح في نافذة جديدة</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: LIVE AI CONSULTATION WITH GEMINI */}
          {activeTab === 'ai_chat' && (
            <div className="space-y-4">
              <div className="h-64 sm:h-80 overflow-y-auto space-y-3 p-4 rounded-3xl bg-slate-950 border border-slate-800 text-xs">
                {aiConversation.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isAiLoading && (
                  <div className="flex justify-end">
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 flex items-center gap-2">
                      <span className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></span>
                      <span>جاري تحليل استراتيجيتك بواسطة الذكاء الاصطناعي...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleAskAi} className="flex items-center gap-2">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="اسأل الذكاء الاصطناعي عن أفضل ميزانية، زوايا الإعلانات، أو طرق تقليل تكلفة الاكتساب..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={isAiLoading || !aiQuestion.trim()}
                  className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Modal Footer with External Direct Link */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>بيانات محدثة من Meta Ads Library & Intelligence Engine</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={ad.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <span>مشاهدة الإعلان على المنصة</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-all"
            >
              تم وإغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
