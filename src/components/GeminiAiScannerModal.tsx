import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Search,
  Zap,
  TrendingUp,
  DollarSign,
  Star,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Flame,
} from 'lucide-react';
import { requestAiInstantScan, ScanResult } from '../services/geminiService';

interface GeminiAiScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCurrency: 'USD' | 'DZD' | 'SAR' | 'AED';
  onSelectScannedProduct?: (productTitle: string) => void;
}

export const GeminiAiScannerModal: React.FC<GeminiAiScannerModalProps> = ({
  isOpen,
  onClose,
  activeCurrency,
  onSelectScannedProduct,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [niche, setNiche] = useState('جميع الفئات');
  const [market, setMarket] = useState('الجزائر والخليج العربي');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await requestAiInstantScan({
        query: query.trim(),
        niche,
        market,
      });
      setScanResult(res);
    } catch (err: any) {
      setErrorMsg(err.message || 'فشل فحص المنتجات بالذكاء الاصطناعي.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSampleClick = (sample: string) => {
    setQuery(sample);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100">
        {/* Top Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-cyan-300">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-white">فاحص وترشيح المنتجات الفورية بالـ AI</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-500/30">
                  Gemini Flash AI
                </span>
              </div>
              <p className="text-xs text-slate-400">
                ابحث عن أي فكرة منتج لتحليل نشاطه على Meta Ads Library وحساب نسبة التفاعل
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-sm">
          {/* Search Form */}
          <form onSubmit={handleScan} className="space-y-4 bg-slate-950 p-4 sm:p-5 rounded-3xl border border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                أدخل اسم المنتج، كلمة مفتاحية، أو نوع السلعة المراد فحصها:
              </label>
              <div className="relative">
                <Search className="absolute right-4 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="مثلاً: ماكينة حلاقة ذكية، جهاز مساج الرقبة، portable blender، فرشاة فرد الشعر..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl pr-11 pl-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Quick Samples */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-medium">اقتراحات سريعة:</span>
              {[
                'مضخة مياه لاسلكية',
                'مفرمة خضار كهربائية',
                'سيروم تطويل الرموش',
                'إضاءة غروب الشمس',
                'درون 4K بحساسات',
                'منظف المسام المائي',
              ].map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => handleSampleClick(sample)}
                  className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-[11px] transition-colors"
                >
                  {sample}
                </button>
              ))}
            </div>

            {/* Market & Category filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1 font-medium">
                  السوق المستهدف:
                </label>
                <select
                  value={market}
                  onChange={(e) => setMarket(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-2.5 text-xs text-white"
                >
                  <option>الجزائر والخليج العربي</option>
                  <option>سوق الجزائر (COD DZD)</option>
                  <option>سوق الخليج (السعودية والإمارات)</option>
                  <option>عالمي (أمريكا وأوروبا)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1 font-medium">
                  المجال / النيش:
                </label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-2.5 text-xs text-white"
                >
                  <option>جميع الفئات</option>
                  <option>أدوات وترندات مبتكرة</option>
                  <option>تجميل وعناية بالبشرة</option>
                  <option>المنزل والمطبخ</option>
                  <option>السيارات والمحركات</option>
                  <option>ألعاب وأطفال</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>جاري فحص الإعلانات وحساب نسب التفاعل بالذكاء الاصطناعي...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-cyan-200" />
                  <span>بدء الفحص الذكي الفوري</span>
                </>
              )}
            </button>
          </form>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Scan Results */}
          {scanResult && (
            <div className="space-y-5 animate-in fade-in duration-300">
              {/* Summary Box */}
              <div className="bg-slate-950 p-4 sm:p-5 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ملخص نتائج الفحص وتحليل السوق:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {scanResult.searchSummary}
                </p>
                <div className="pt-2 text-xs text-amber-300 bg-amber-500/10 p-3 rounded-2xl border border-amber-500/20">
                  <strong className="block mb-0.5">💡 نصيحة الخبراء للتسويق:</strong>
                  {scanResult.marketAdvice}
                </div>
              </div>

              {/* Recommended Winning Items */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>المنتجات المرشحة بناءً على نسبة التفاعل والإعلانات النشطة:</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {scanResult.recommendedProducts.map((prod, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950 p-4 rounded-3xl border border-slate-800 space-y-3 hover:border-slate-700 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <span className="text-sm font-black text-white">{prod.title}</span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-black whitespace-nowrap ${
                              prod.tier === 'فئة عليا'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            }`}
                          >
                            {prod.tier} ({prod.engagementRatio}x)
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 font-mono" dir="ltr">
                          {prod.titleEn}
                        </div>
                      </div>

                      <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                        <div className="text-slate-400">
                          <strong className="text-white">لماذا يربح هذا المنتج:</strong> {prod.whyItWins}
                        </div>
                        <div className="text-cyan-300">
                          <strong className="text-slate-400">الخطاف التسويقي:</strong> "{prod.suggestedHook}"
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                        <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-slate-400">
                          <span>الإعلانات النشطة:</span>{' '}
                          <strong className="text-white">{prod.estimatedActiveAds}</strong>
                        </div>
                        <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-slate-400">
                          <span>المعلنين:</span>{' '}
                          <strong className="text-white">{prod.estimatedAdvertisers}</strong>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-400">
                          {activeCurrency === 'DZD'
                            ? prod.priceRange.dzd
                            : activeCurrency === 'SAR'
                            ? prod.priceRange.sar
                            : prod.priceRange.usd}
                        </span>

                        <a
                          href={`https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&q=${encodeURIComponent(
                            prod.titleEn || prod.title
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 hover:text-blue-300"
                        >
                          <span>البحث في Meta Ads</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
