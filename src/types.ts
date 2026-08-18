export interface ProductDeepAnalysis {
  productOverview: string;
  supplierCostUSD: number;
  marketSaturation: 'منخفض' | 'متوسط' | 'مرتفع' | 'فيروسي رابح';
  winningScore: number; // 0 - 100
  targetAudience: {
    gender: string;
    ageRange: string;
    topInterests: string[];
    mainPainPoints: string[];
  };
  marketingAngles: Array<{
    title: string;
    hook: string;
    description: string;
  }>;
  adCopies: Array<{
    dialect: string;
    primaryText: string;
    headline: string;
  }>;
  videoScript: {
    hook: string;
    problem: string;
    solution: string;
    cta: string;
  };
  supplierLinks: Array<{
    platform: 'AliExpress' | 'CJ Dropshipping' | '1688' | 'Taobao';
    url: string;
    label: string;
  }>;
}

export interface ProductAd {
  id: string;
  titleAr: string;
  titleEn: string;
  category: string;
  pageName: string;
  pageAvatar: string;
  pageFollowers: string;
  isVerifiedPage: boolean;
  platform: 'facebook' | 'instagram' | 'both';
  postUrl: string;
  metaAdLibraryUrl: string;
  thumbnailUrl: string;
  videoUrl?: string;
  hasVideo: boolean;
  adText: string;
  activeDays: number;
  startDate: string;
  likes: number;
  comments: number;
  shares: number;
  views?: number;
  // Strict Ratio: (Comments / Likes) as requested by user
  commentsLikesRatio: number;
  // General viral ratio
  engagementRatio: number;
  tier: 'فئة عليا' | 'عادي' | 'صاعد';
  isFavorite?: boolean;
  activeAdsCount: number; // عدد الإعلانات الممولة النشطة عنه
  activeAdAccountsCount: number; // كم حساب إعلاني ممول ينشر عنه
  pricing: {
    minUSD: number;
    maxUSD: number;
    suggestedUSD: number;
    minDZD: number;
    maxDZD: number;
    suggestedDZD: number;
    minSAR: number;
    maxSAR: number;
    suggestedSAR: number;
    minAED: number;
    maxAED: number;
    suggestedAED: number;
  };
  estimatedProfitMargin: number;
  targetMarkets: string[];
  deepAnalysis: ProductDeepAnalysis;
}

export interface AuthorizedUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  password?: string;
  status: 'active' | 'suspended' | 'expired';
  role: 'admin' | 'pro_subscriber' | 'vip_member';
  expiryDate?: string;
  addedDate?: string;
  notes?: string;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  count: number;
  description: string;
}

export interface FilterOptions {
  category: string;
  searchQuery: string;
  market: 'all' | 'dz' | 'gcc' | 'global';
  platform: 'all' | 'facebook' | 'instagram';
  minRatio: number;
  tierOnly: boolean;
  favoritesOnly: boolean; // Show only favorited ads
  filterRatioUnder4: boolean; // (Comments / Likes) < 4 strictly
  sortBy: 'ratio_desc' | 'ratio_asc' | 'active_ads_desc' | 'shares_desc' | 'comments_desc' | 'newest';
}

export interface SheetConfig {
  sheetId: string;
  sheetName: string;
  publishedUrl?: string;
  lastSyncedAt?: string;
  syncStatus: 'idle' | 'syncing' | 'connected' | 'error';
  errorMessage?: string;
  totalSyncedUsers: number;
}

export interface AuthSession {
  isAuthenticated: boolean;
  user: AuthorizedUser | null;
  token?: string | null;
  sheetSource?: string;
}
