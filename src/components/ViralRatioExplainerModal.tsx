import React from 'react';
import {
  X,
  Flame,
  Star,
  CheckCircle2,
  Lightbulb,
  Sparkles,
} from 'lucide-react';
import { Logo } from './Logo';

interface ViralRatioExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ViralRatioExplainerModal: React.FC<ViralRatioExplainerModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0a0f1d] border border-purple-900/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100">
        {/* Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-[#0a0f1d] via-purple-950/40 to-[#0a0f1d] border-b border-purple-900/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-md">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Logo size="sm" showSubtitle={false} />
                <span className="text-xs text-purple-300 font-mono">Radar Logic</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                معادلة نسبة التفاعل: [(عدد التعليقات) ÷ عدد الإعجابات &lt; 4]
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5 text-xs sm:text-sm">
          {/* Formula Display */}
          <div className="p-5 rounded-3xl bg-[#060a14] border border-purple-900/30 text-center space-y-2">
            <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block">
              معادلة الفلترة المعتمدة في ShopPulse:
            </span>
            <div className="text-base sm:text-lg font-black text-white bg-[#0e1629] py-3 px-4 rounded-2xl border border-purple-800/40 font-mono text-center" dir="ltr">
              (Comments ÷ Likes) &lt; 4.0
            </div>
            <p className="text-xs text-slate-300">
              تضمن هذه المعادلة استبعاد الحسابات الوهمية والتركيز على الإعلانات الطبيعية الرابحة ذات التفاعل الحقيقي وطلبات الشراء المستمرة.
            </p>
          </div>

          {/* Classification Tiers */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <Star className="w-4 h-4 text-purple-400" />
              <span>معايير دراسة الإعلانات في ShopPulse:</span>
            </h4>

            <div className="space-y-2">
              <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-purple-600 text-white font-black flex items-center justify-center text-xs flex-shrink-0">
                  ✓
                </div>
                <div>
                  <div className="font-black text-purple-200 text-sm">
                    نسبة التعليقات إلى الإعجابات الطبيعية (Comments / Likes &lt; 4)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mt-0.5">
                    الإعلانات الناجحة تجارياً تحقق تفاعلاً متوازناً بين الإعجابات والتعليقات الحقيقية الاستفسارية ("بشحال السعر"، "متوفر توصيل"، "كيفاش نطلب").
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-xs flex-shrink-0">
                  ⭐
                </div>
                <div>
                  <div className="font-black text-cyan-200 text-sm">
                    الإعلانات المفضلة وسرعة الوصول (Favorites System)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mt-0.5">
                    يمكنك تمييز أي إعلان بالنقر على زر القلب لحفظه محلياً وتصفح مفضلاتك بضغطة زر واحدة في أي وقت.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Why comments & shares matter in E-Commerce */}
          <div className="p-4 rounded-2xl bg-[#060a14] border border-purple-900/30 space-y-2">
            <h4 className="font-bold text-cyan-300 text-xs flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-cyan-400" />
              <span>أهمية مؤشرات المشاركات والتعليقات في التجارة الإلكترونية:</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              الإعجاب (Like) مؤشر أولي، لكن <strong>التعليق (Comment)</strong> يمثل نية شراء فعلية واستفساراً عن السعر، و<strong>المشاركة (Share)</strong> تعني اقتراح المنتج للعائلة والأصدقاء، وهو أقوى مؤشر لنجاح حملتك الإعلانية عند إطلاقها (Scaling).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#060a14] border-t border-purple-900/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all"
          >
            فهمت، شكراً لك
          </button>
        </div>
      </div>
    </div>
  );
};
