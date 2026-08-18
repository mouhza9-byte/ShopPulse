import { ProductDeepAnalysis } from '../types';

export interface ScanResult {
  searchSummary: string;
  recommendedProducts: Array<{
    id: string;
    title: string;
    titleEn: string;
    category: string;
    engagementRatio: number;
    tier: 'فئة عليا' | 'عادي' | 'صاعد';
    estimatedActiveAds: number;
    estimatedAdvertisers: number;
    priceRange: {
      usd: string;
      dzd: string;
      sar: string;
    };
    whyItWins: string;
    suggestedHook: string;
    platform: string;
  }>;
  marketAdvice: string;
}

export const requestAiProductAnalysis = async (params: {
  productName: string;
  category?: string;
  market?: string;
  adExcerpt?: string;
}): Promise<ProductDeepAnalysis> => {
  const response = await fetch('/api/gemini/analyze-product', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `Failed with status ${response.status}`);
  }

  const data = await response.json();
  const raw = data.data;

  const deepAnalysis: ProductDeepAnalysis = {
    productOverview: raw.competitionVerdict || raw.productNameAr || 'تحليل ذكي شامل للمنتج',
    supplierCostUSD: raw.estimatedSupplierCostUSD || 9.5,
    marketSaturation: raw.saturationLevel?.includes('عليا') || raw.saturationLevel?.includes('فيروسي')
      ? 'فيروسي رابح'
      : raw.saturationLevel?.includes('منخفض')
      ? 'منخفض'
      : raw.saturationLevel?.includes('مرتفع')
      ? 'مرتفع'
      : 'متوسط',
    winningScore: raw.estimatedProfitMarginPercent || 85,
    targetAudience: {
      gender: raw.targetAudience?.gender || 'الجميع',
      ageRange: raw.targetAudience?.ageRange || '24-50 سنة',
      topInterests: raw.targetAudience?.interests || [
        'التسوق عبر الإنترنت',
        'منتجات المنزل والمطبخ',
        'العروض والتخفيضات',
      ],
      mainPainPoints: raw.targetAudience?.painPoints || [
        'صعوبة الاستخدام في الحلول التقليدية',
        'الرغبة في توفير الوقت والجهد',
      ],
    },
    marketingAngles: raw.marketingAngles || [
      {
        title: 'زاوية حل المشكلة الفوري',
        hook: 'توقف عن إضاعة وقتك! شاهد كيف يحل هذا المنتج مشكلتك في ثوانٍ.',
        description: 'التركيز على النتيجة الفورية بدون تعب أو مجهود إضافي.',
      },
    ],
    adCopies: raw.adCopies || [
      {
        dialect: 'اللهجة الجزائرية',
        primaryText: 'جبتلك الحل النهائي والأصلي! التوصيل مجاني لـ 58 ولاية والدفع عند الاستلام.',
        headline: 'العرض الأقوى هذا الأسبوع لا تفوت الفرصة!',
      },
      {
        dialect: 'اللهجة الخليجية',
        primaryText: 'وفر على نفسك العناء! اطلب الآن مع التوصيل السريع والدفع عند الاستلام.',
        headline: 'المنتج الأكثر طلباً لهذا الموسم!',
      },
    ],
    videoScript: raw.videoScript || {
      hook: 'لقطة توقف المشاهد خلال أول 3 ثواني مع صوت واضح للمشكلة',
      problem: 'توضيح المعاناة اليومية بدون هذا المنتج',
      solution: 'عرض طريقة عمل المنتج بكل سهولة مع النتيجة المبهرة',
      cta: 'اطلب الآن قبل نفاد الكمية واستفد من الخصم والتوصيل السريع',
    },
    supplierLinks: [
      {
        platform: 'AliExpress',
        url: `https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(
          raw.productNameEn || params.productName
        )}`,
        label: 'بحث فوري في AliExpress',
      },
      {
        platform: 'CJ Dropshipping',
        url: `https://cjdropshipping.com/search/${encodeURIComponent(
          raw.productNameEn || params.productName
        )}.html`,
        label: 'بحث في CJ Dropshipping',
      },
      {
        platform: '1688',
        url: `https://s.1688.com/youyuan/index.htm?tab=imageSearch&keywords=${encodeURIComponent(
          raw.productNameEn || params.productName
        )}`,
        label: 'بحث أسعار المصانع 1688',
      },
    ],
  };

  return deepAnalysis;
};

export const requestAiInstantScan = async (params: {
  query: string;
  niche?: string;
  market?: string;
}): Promise<ScanResult> => {
  const response = await fetch('/api/gemini/instant-scan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `Scan failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.data;
};
