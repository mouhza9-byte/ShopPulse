import { Category, ProductAd, ProductDeepAnalysis } from '../types';

export const PRODUCT_CATEGORIES: Category[] = [
  {
    id: 'all',
    name: 'جميع الفئات',
    iconName: 'Sparkles',
    count: 320,
    description: 'استكشاف جميع المنتجات الفيروسية والإعلانات الممولة النشطة عبر كافة المجالات',
  },
  {
    id: 'gadgets',
    name: 'أدوات ذكية ومبتكرة',
    iconName: 'Zap',
    count: 48,
    description: 'منتجات ذكية تحقق انتشاراً سريعاً وتوقف التمرير على السوشيال ميديا',
  },
  {
    id: 'beauty',
    name: 'تجميل وعناية شخصية',
    iconName: 'Heart',
    count: 52,
    description: 'منتجات العناية بالبشرة، الشعر، وأجهزة التجميل بهوامش ربح مرتفعة',
  },
  {
    id: 'home_kitchen',
    name: 'المنزل والمطبخ',
    iconName: 'Home',
    count: 45,
    description: 'أجهزة وحلول عصرية لتوفير الوقت والجهد في المنزل والمطبخ',
  },
  {
    id: 'fitness_health',
    name: 'الصحة واللياقة',
    iconName: 'Activity',
    count: 38,
    description: 'معدات التدليك، تقويم القوام، والأجهزة الرياضية المنزلية',
  },
  {
    id: 'car',
    name: 'إكسسوارات السيارات',
    iconName: 'Car',
    count: 42,
    description: 'مضخات غسيل، شواحن، كاميرات، وحوامل ذكية للسيارات',
  },
  {
    id: 'fashion_apparel',
    name: 'أزياء وموضة',
    iconName: 'ShoppingBag',
    count: 35,
    description: 'ملابس تنحيف، أحذية مريحة، وحقائب سفر متعددة الاستخدامات',
  },
  {
    id: 'kids_toys',
    name: 'ألعاب وأطفال',
    iconName: 'Smile',
    count: 30,
    description: 'ألعاب تعليمية وترفيهية مطلوبة بكثافة من الأمهات والآباء',
  },
  {
    id: 'electronics',
    name: 'إلكترونيات وأجهزة',
    iconName: 'Smartphone',
    count: 40,
    description: 'شواحن لاسلكية، سماعات إلغاء الضوضاء، ومكبرات صوت محمولة',
  },
  {
    id: 'pets',
    name: 'مستلزمات الحيوانات',
    iconName: 'PawPrint',
    count: 24,
    description: 'أدوات تنظيف الفرو، ألعاب ذكية، وأوعية التغذية التلقائية',
  },
  {
    id: 'jewelry_watches',
    name: 'ساعات ومجوهرات',
    iconName: 'Watch',
    count: 28,
    description: 'ساعات ذكية فاخرة، أساور كلاسيكية، ومجوهرات ذات قيمة عالية',
  },
  {
    id: 'office_productivity',
    name: 'مستلزمات العمل والمكتب',
    iconName: 'Briefcase',
    count: 22,
    description: 'حوامل لابتوب مريحة، وسادات تقويم، ومنظمات مكتبية ذكية',
  },
  {
    id: 'tools_diy',
    name: 'عدد وأدوات الصيانة',
    iconName: 'Wrench',
    count: 26,
    description: 'مفكات كهربائية دقيقة، أدوات لحام، وأطقم إصلاح منزلية متكاملة',
  },
];

// Product Templates for high volume dynamic generation
interface ProductTemplate {
  titleAr: string;
  titleEn: string;
  category: string;
  pageName: string;
  image: string;
  adText: string;
  supplierCost: number;
  suggestedUSD: number;
  suggestedDZD: number;
  suggestedSAR: number;
  suggestedAED: number;
  margin: number;
  likes: number;
  comments: number;
  shares: number;
  activeAds: number;
  activeAccounts: number;
  hook: string;
  problem: string;
  solution: string;
  cta: string;
  targetGender: string;
  targetAge: string;
  keywords: string[];
}

export const BASE_PRODUCT_TEMPLATES: ProductTemplate[] = [
  // 1. Car - Washer Gun
  {
    titleAr: 'مضخة غسيل وتنظيف السيارات اللاسلكية ذات الضغط العالي 300 بار',
    titleEn: 'High Pressure Cordless Car Washer Gun 300 Bar',
    category: 'car',
    pageName: 'AutoPulse E-Shop DZ & GCC',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&auto=format&fit=crop&q=80',
    adText: '🚨 وداعاً لمصاريف محطات غسيل السيارات! مضخة الغسيل اللاسلكية الأصلية بضغط هيدروليكي قوي وبطارية ليثيوم 48V. اغسل سيارتك، دراجتك، حديقتك في أي مكان بدون أسلاك أو حنفية ماء. التوصيل متوفر 58 ولاية والدفع عند الاستلام.',
    supplierCost: 11.5,
    suggestedUSD: 49.99,
    suggestedDZD: 7900,
    suggestedSAR: 189,
    suggestedAED: 179,
    margin: 68,
    likes: 3200,
    comments: 4800, // Comments / Likes = 1.5 (< 4)
    shares: 2100,
    activeAds: 42,
    activeAccounts: 14,
    hook: 'كم تصرف شهرياً في محطات الغسيل؟ وفر كل تلك الأموال بضغطة زر واحدة!',
    problem: 'إهدار مبالغ طائلة وضياع وقت طويل في طوابير محطات الغسيل.',
    solution: 'مضخة لاسلكية بضغط عالي تعمل من أي سطل ماء وتوفر تنظيفاً عميقاً خلال 5 دقائق.',
    cta: 'اضغط على زر الطلب الآن واستفد من خصم 35% مع توصيل سريع حتى باب دارك!',
    targetGender: 'رجال (88%)',
    targetAge: '24 - 55 سنة',
    keywords: ['غسيل', 'سيارة', 'مضخة', 'car', 'pressure', 'washer', 'سيارات', 'تنظيف'],
  },
  // 2. Beauty - Hair Styler
  {
    titleAr: 'مصفف ومجفف الشعر الاحترافي 5 في 1 بتقنية الهواء الأيوني الساخن',
    titleEn: '5-in-1 Professional Hot Air Styler & Hair Dryer',
    category: 'beauty',
    pageName: 'GlowPulse Beauty Official',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
    adText: '✨ احصلي على تسريحة صالون فاخرة في بيتك خلال 10 دقائق فقط! جهاز التصفيف 5 في 1 يجفف، يكثف، يسرح، ويلف الشعر بدون حرق أو تقصف بفضل تدفق الهواء الأيوني الذكي.',
    supplierCost: 9.8,
    suggestedUSD: 39.99,
    suggestedDZD: 6500,
    suggestedSAR: 149,
    suggestedAED: 139,
    margin: 65,
    likes: 4100,
    comments: 5200, // Comments / Likes = 1.26 (< 4)
    shares: 3400,
    activeAds: 56,
    activeAccounts: 19,
    hook: 'توقفي عن إتلاف شعرك بالمكواة التقليدية! شوفي كيف هذا الجهاز يغير تسريحتك في ثواني!',
    problem: 'تقصف الشعر وحرقه بسبب أدوات التصفيف ذات الحرارة المباشرة وتكلفة الصالونات الباهظة.',
    solution: 'تقنية الكواندا لتدفق الهواء اللطيف لتصفيف الشعر وتجفيفه في آن واحد وبشكل صحي.',
    cta: 'اطلبي مصفف الشعر 5 في 1 اليوم واحصلي على هدية سيروم مجاني مع الطلب!',
    targetGender: 'نساء (92%)',
    targetAge: '18 - 45 سنة',
    keywords: ['شعر', 'استشوار', 'مصفف', 'تجميل', 'كوافير', 'beauty', 'hair', 'styler'],
  },
  // 3. Gadgets - Laser Distance & Level
  {
    titleAr: 'مقياس وميزان الليزر الذكي 4 في 1 مع شريط قياس رقمي متطور',
    titleEn: '4-in-1 Smart Laser Level & Digital Measuring Tool',
    category: 'gadgets',
    pageName: 'PulseCraft Tools Store',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&auto=format&fit=crop&q=80',
    adText: '📐 لكل صاحب حرفة ومحب للصيانة المنزلية! مقياس الليزر الدقيق مع ميزان تسوية 3D وشريط قياس رقمي. علق اللوحات، اضبط البلاط، وركب الأثاث بدقة مليمترية تامة في ثوانٍ معدودة.',
    supplierCost: 6.4,
    suggestedUSD: 29.99,
    suggestedDZD: 4800,
    suggestedSAR: 119,
    suggestedAED: 109,
    margin: 70,
    likes: 2500,
    comments: 3100, // Comments / Likes = 1.24 (< 4)
    shares: 1800,
    activeAds: 31,
    activeAccounts: 9,
    hook: 'هل تعبت من تركيب الرفوف واللوحات المائلة وضياع القياسات؟',
    problem: 'الأدوات اليدوية غير دقيقة وتتطلب شخصين لإتمام القياس.',
    solution: 'جهاز ليزر متعدد الوظائف يعطي خطوطاً مستقيمة واضحة وقياسات رقمية دقيقة بضغطة زر.',
    cta: 'احصل عليه الآن بسعر العرض الترويجي قبل نفاد الكمية!',
    targetGender: 'رجال (85%)',
    targetAge: '22 - 60 سنة',
    keywords: ['ليزر', 'ميزان', 'قياس', 'أدوات', 'gadgets', 'laser', 'level', 'صيانة'],
  },
  // 4. Home & Kitchen - Mini Vacuum Sealer
  {
    titleAr: 'جهاز تفريغ الهواء وحفظ الأطعمة الذكي مع 20 كيس حفظ هدية',
    titleEn: 'Smart Automatic Vacuum Food Sealer Machine',
    category: 'home_kitchen',
    pageName: 'HomePulse Essentials',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80',
    adText: '🥩 احفظي اللحوم، الخضروات، والأطعمة طازجة لمدة تزيد عن 8 أضعاف! جهاز التغليف الحراري بتفريغ الهواء يمنع تعفن الطعام ويوفر مساحة هائلة في الثلاجة والمجمد.',
    supplierCost: 7.5,
    suggestedUSD: 34.99,
    suggestedDZD: 5400,
    suggestedSAR: 129,
    suggestedAED: 119,
    margin: 66,
    likes: 3800,
    comments: 4900, // Comments / Likes = 1.28 (< 4)
    shares: 2900,
    activeAds: 38,
    activeAccounts: 12,
    hook: 'كمية الأكل اللي ترميها كل أسبوع بسبب التلف راح تنتهي تماماً مع هذا الجهاز السحري!',
    problem: 'فساد اللحوم والخضار سريعاً وتكون روائح غير مرغوبة في المجمد.',
    solution: 'تفريغ فوري للأكسجين وإغلاق حراري محكم يبقي الطعام طازجاً لشهور.',
    cta: 'اطلبي الآن واحصلي على 20 كيس حفظ هدية مجانية مع الشحن!',
    targetGender: 'نساء (75%) ورجال (25%)',
    targetAge: '25 - 60 سنة',
    keywords: ['مطبخ', 'طعام', 'تفريغ', 'لحم', 'تغليف', 'kitchen', 'vacuum', 'sealer'],
  },
  // 5. Fitness & Health - EMS Neck Massager
  {
    titleAr: 'جهاز تدليك الرقبة والأكتاف الكهربائي بتقنية التسخين الحراري والنبضات الذكية',
    titleEn: 'Electric Pulse Neck & Shoulder Massager with Heat',
    category: 'fitness_health',
    pageName: 'PulseHealth Wellness Hub',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80',
    adText: '💆‍♂️ تخلص من آلام الرقبة وتشنجات الكتف الناتجة عن الجلوس الطويل واستخدام الهاتف! 6 أوضاع تدليك مريحة مع حرارة دافئة تعمل على فك التشنجات فورياً في 15 دقيقة فقط.',
    supplierCost: 5.9,
    suggestedUSD: 27.99,
    suggestedDZD: 4200,
    suggestedSAR: 99,
    suggestedAED: 89,
    margin: 72,
    likes: 4900,
    comments: 6100, // Comments / Likes = 1.24 (< 4)
    shares: 4100,
    activeAds: 47,
    activeAccounts: 16,
    hook: 'إذا كنت تعاني من وجع الرقبة وصداع التوتر نهاية كل يوم عمل، هذا الحل صنع خصيصاً لك!',
    problem: 'آلام الرقبة وتصلب العضلات الناتج عن وضعيات الجلوس الخاطئة والشاشات.',
    solution: 'مزيج من النبضات الكهرومغناطيسية والحرارة المهدئة لراحة فورية في أي مكان.',
    cta: 'اطلب جهاز المساج اليوم وتمتع براحة تامة يومياً مع التوصيل المجاني!',
    targetGender: 'رجال ونساء (50/50)',
    targetAge: '22 - 65 سنة',
    keywords: ['مساج', 'رقبة', 'صحة', 'علاج', 'ألم', 'تدليك', 'massage', 'neck', 'health'],
  },
  // 6. Electronics - 3-in-1 Foldable MagSafe Charger
  {
    titleAr: 'محطة الشحن اللاسلكية المغناطيسية 3 في 1 القابلة للطي للهاتف والساعة والسماعة',
    titleEn: '3-in-1 Foldable Magnetic MagSafe Fast Wireless Charging Station',
    category: 'electronics',
    pageName: 'PulseTech Gadgets Store',
    image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=600&auto=format&fit=crop&q=80',
    adText: '⚡ تخلص من فوضى الأسلاك على مكتبك وسريرك! محطة شحن سريعة تشحن الآيفون/الأندرويد، وساعة آبل، وسماعاتك في وقت واحد بتصميم أنيق قابل للطي بحجم راحة اليد وسهل الحمل في السفر.',
    supplierCost: 8.2,
    suggestedUSD: 36.99,
    suggestedDZD: 5800,
    suggestedSAR: 139,
    suggestedAED: 129,
    margin: 67,
    likes: 3100,
    comments: 3900, // Comments / Likes = 1.25 (< 4)
    shares: 2200,
    activeAds: 39,
    activeAccounts: 11,
    hook: 'كم شاحن وسلك تحتاج تأخذ معك كل يوم؟ جمع كل أجهزتك على شاحن واحد أنيق!',
    problem: 'تشابك الأسلاك على المكتب وتلف كوابل الشحن المتكرر.',
    solution: 'قاعدة شحن مغناطيسية مدمجة وشديدة السرعة تطوى بسهولة لتوضع في الجيب.',
    cta: 'اضغط على الرابط واحصل على شاحنك الآن بخصم خاص لفترة محدودة!',
    targetGender: 'رجال ونساء (60/40)',
    targetAge: '18 - 45 سنة',
    keywords: ['شاحن', 'لاسلكي', 'ايفون', 'سماعات', 'charger', 'wireless', 'magsafe', 'إلكترونيات'],
  },
  // 7. Fashion & Apparel - Compression Posture Corrector
  {
    titleAr: 'مشد القوام واستقامة الظهر والكتفين الطبي غير المرئي تحت الملابس',
    titleEn: 'Invisible Breathable Back Posture Corrector & Spine Support',
    category: 'fashion_apparel',
    pageName: 'PulseWear Body Solutions',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
    adText: '👔 استعد هيبتك ووقفتك المستقيمة الواثقة! مشد طبي خفيف ومريح لا يظهر تحت القمصان، يسحب الكتفين للخلف ويمنحك قواماً رياضياً جذاباً ويخفف آلام الانحناء والحدبة.',
    supplierCost: 3.8,
    suggestedUSD: 24.99,
    suggestedDZD: 3800,
    suggestedSAR: 89,
    suggestedAED: 79,
    margin: 74,
    likes: 4500,
    comments: 5800, // Comments / Likes = 1.28 (< 4)
    shares: 3100,
    activeAds: 51,
    activeAccounts: 17,
    hook: 'انحناء الظهر يفقدك الثقة ويسبب لك آلام مستمرة.. إليك الحل الخفي والمريح!',
    problem: 'الحدبة والانحناء الناتج عن الجلوس المكتبي واستخدام الهواتف.',
    solution: 'تصميم مريح وخفيف يعيد تدريب العضلات على الاستقامة دون تقييد الحركة.',
    cta: 'اطلب مشد القوام الطبي اليوم واستمتع بجسم مستقيم وواثق!',
    targetGender: 'رجال ونساء (55/45)',
    targetAge: '18 - 55 سنة',
    keywords: ['مشد', 'ظهر', 'قوام', 'ملابس', 'أزياء', 'posture', 'corrector', 'fashion'],
  },
  // 8. Kids & Toys - Magic Water Drawing Mat
  {
    titleAr: 'سجادة الرسم المائي السحرية العملاقة للأطفال بدون ألوان أو حبر أو فوضى',
    titleEn: 'Magic Water Doodle Drawing Mat with Water Pens',
    category: 'kids_toys',
    pageName: 'KidsPulse Joy World',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=600&auto=format&fit=crop&q=80',
    adText: '🎨 دعي أطفالك يبدعون في الرسم والتلوين بدون ما يوسخوا الجدران أو الملابس! سجادة سحرية ترسم بالماء الصافي فقط وتختفي الرسومات تلقائياً بعد 5 دقائق ليعاد استخدامها آلاف المرات.',
    supplierCost: 5.2,
    suggestedUSD: 26.99,
    suggestedDZD: 4100,
    suggestedSAR: 95,
    suggestedAED: 85,
    margin: 71,
    likes: 5200,
    comments: 7100, // Comments / Likes = 1.36 (< 4)
    shares: 4800,
    activeAds: 44,
    activeAccounts: 15,
    hook: 'أولادك يرسموا على الحيطان ويفسدوا أثاث البيت؟ شوفي هذا الاختراع العبقري!',
    problem: 'فوضى الألوان الحبرية وتلطيخ الجدران والملابس والخشية من سمية الألوان.',
    solution: 'أقلام تعبأ بماء الحنفية العادي وتلون على بساط خاص بألوان زاهية تختفي تلقائياً.',
    cta: 'اطلبي سجادة الرسم المائي لأطفالك الآن مع طقم أقلام وأشكال هندسية مجانية!',
    targetGender: 'نساء وأمهات (88%)',
    targetAge: '22 - 45 سنة',
    keywords: ['أطفال', 'رسم', 'ألعاب', 'سجادة', 'kids', 'toys', 'drawing', 'طفل'],
  },
  // 9. Watches & Jewelry - Luxury Minimalist Mechanical Watch
  {
    titleAr: 'ساعة اليد الفاخرة المقاومة للماء ذات التصميم الميكانيكي الشفاف',
    titleEn: 'Luxury Skeleton Waterproof Automatic Mechanical Watch',
    category: 'jewelry_watches',
    pageName: 'PulseTime Luxury Watches',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80',
    adText: '⌚ فخامة وأناقة تخطف الأنظار في كل مناسبة! ساعة ميكانيكية بهيكل شفاف من الفولاذ المقاوم للصدأ وزجاج ياقوتي مضاد للخدش ومقاومة للماء حتى عمق 50 متراً. تأتي في علبة هدايا جلدية فاخرة.',
    supplierCost: 14.5,
    suggestedUSD: 59.99,
    suggestedDZD: 9500,
    suggestedSAR: 229,
    suggestedAED: 219,
    margin: 69,
    likes: 2900,
    comments: 3600, // Comments / Likes = 1.24 (< 4)
    shares: 1900,
    activeAds: 33,
    activeAccounts: 10,
    hook: 'اللمسة اللي تنقص أناقتك في المناسبات والاجتماعات.. ساعة تجمع بين الفخامة والتميز!',
    problem: 'الساعات الفاخرة غالية الثمن جداً، والساعات الرخيصة تتلف وتفقد بريقها بسرعة.',
    solution: 'تصميم هيكلي شفاف بجودة تصنيع سويسرية فائقة وسعر اقتصادي مدروس.',
    cta: 'اطلب ساعتك الآن مع علبة هدايا فاخرة وضمان لمدة سنتين!',
    targetGender: 'رجال (82%)',
    targetAge: '22 - 50 سنة',
    keywords: ['ساعة', 'ساعات', 'مجوهرات', 'فاخرة', 'watch', 'luxury', 'jewelry', 'رجالي'],
  },
  // 10. Tools & DIY - Electric Precision Screwdriver
  {
    titleAr: 'طقم المفك الكهربائي الدقيق اللاسلكي 64 في 1 لإصلاح الهواتف والأجهزة',
    titleEn: '64-in-1 Rechargeable Precision Electric Screwdriver Set',
    category: 'tools_diy',
    pageName: 'PulseCraft Pro Workshop',
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&auto=format&fit=crop&q=80',
    adText: '🔩 لا مزيد من التعب في فك وتركيب البراغي الدقيقة! مفك كهربائي ببطارية قابلة للشحن و3 أضواء LED مع 64 رأس مغناطيسي من فولاذ S2 الصلب. مثالي لإصلاح الهواتف، النظارات، الحواسيب، والألعاب.',
    supplierCost: 7.9,
    suggestedUSD: 32.99,
    suggestedDZD: 5200,
    suggestedSAR: 125,
    suggestedAED: 115,
    margin: 68,
    likes: 3400,
    comments: 4200, // Comments / Likes = 1.23 (< 4)
    shares: 2400,
    activeAds: 36,
    activeAccounts: 11,
    hook: 'أفضل استثمار لورشتك وصيانتك المنزلية.. مفك كهربائي دقيق يختصر عليك ساعات من العمل!',
    problem: 'صعوبة فك البراغي الدقيقة وتلف رؤوس البراغي بالمفكات العادية.',
    solution: 'عزم دوران إلكتروني دقيق مع إضاءة مدمجة ومغناطيس قوي لمنع سقوط البراغي.',
    cta: 'اطلب طقم المفك الذكي الآن واستفد من الشحن السريع لباب منزلك!',
    targetGender: 'رجال (90%)',
    targetAge: '20 - 55 سنة',
    keywords: ['مفك', 'صيانة', 'أدوات', 'ورشة', 'tools', 'screwdriver', 'diy', 'تصليح'],
  },
  // 11. Pets - Automatic Pet Water Fountain
  {
    titleAr: 'نافورة المياه الذكية المفلترة للقطط والكلاب مع مستشعر الحركة الصامت',
    titleEn: 'Ultra-Quiet Smart Pet Water Fountain with Motion Sensor',
    category: 'pets',
    pageName: 'PetPulse Care Store',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80',
    adText: '🐱 حافظ على صحة كليتي أليفك وشجعه على شرب الماء النقي المتدفق! نافورة مياه ذكية بفلتر كربوني رباعي المراحل ومضخة صامتة للغاية مع مستشعر حركة يشتغل تلقائياً عند اقتراب القطة.',
    supplierCost: 6.8,
    suggestedUSD: 29.99,
    suggestedDZD: 4600,
    suggestedSAR: 110,
    suggestedAED: 99,
    margin: 70,
    likes: 2700,
    comments: 3400, // Comments / Likes = 1.25 (< 4)
    shares: 1900,
    activeAds: 28,
    activeAccounts: 8,
    hook: 'هل تعلم أن معظم القطط تعاني من أمراض الكلى لأنها تكره شرب الماء الراكد؟',
    problem: 'رفض الحيوانات الأليفة شرب الماء من الأوعية التقليدية وتلوث المياه السريع.',
    solution: 'مياه جارية مأكسجة ومفلترة باستمرار تجذب الحيوان للشرب بنسبة 3 أضعاف.',
    cta: 'احصل على نافورة المياه الذكية اليوم واحمِ صحة أليفك مع فلاتر إضافية مجاناً!',
    targetGender: 'نساء ورجال (60/40)',
    targetAge: '18 - 45 سنة',
    keywords: ['قطط', 'حيوانات', 'كلاب', 'نافورة', 'pets', 'cats', 'water', 'fountain'],
  },
  // 12. Office - Ergonomic Laptop Stand
  {
    titleAr: 'حامل اللابتوب والأجهزة اللوحية المصنوع من الألمنيوم القابل للتعديل 360 درجة',
    titleEn: '360 Rotating Ergonomic Aluminum Laptop Stand & Riser',
    category: 'office_productivity',
    pageName: 'PulseDesk Workspace Solutions',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80',
    adText: '💻 ارتقِ بتجربة عملك وتخلص من آلام الرقبة والظهر أثناء استخدام اللابتوب! حامل معدني قوي يدور 360 درجة مع فتحات تهوية لتبريد الجهاز وارتفاع قابل للتعديل ليناسب مستوى عينيك تماماً.',
    supplierCost: 7.2,
    suggestedUSD: 31.99,
    suggestedDZD: 4900,
    suggestedSAR: 119,
    suggestedAED: 109,
    margin: 69,
    likes: 3100,
    comments: 3800, // Comments / Likes = 1.22 (< 4)
    shares: 2100,
    activeAds: 34,
    activeAccounts: 11,
    hook: 'جلسة العمل الطويلة أمام اللابتوب تدمر ظهرك ورقبتك.. هذا الحامل سيغير روتينك كلياً!',
    problem: 'الانحناء المستمر للنظر إلى شاشة اللابتوب وسخونة الجهاز الزائدة.',
    solution: 'رفع الشاشة لمستوى النظر المثالي وتوفير زاوية كتابة مريحة وتبريد مستمر للجهاز.',
    cta: 'اطلب حامل اللابتوب المريح اليوم وحسن بيئة عملك وإنتاجيتك فوراً!',
    targetGender: 'رجال ونساء (55/45)',
    targetAge: '20 - 50 سنة',
    keywords: ['لابتوب', 'مكتب', 'حامل', 'عمل', 'stand', 'laptop', 'office', 'desk'],
  },
];

// Helper to calculate ratios properly
const buildProductAd = (template: ProductTemplate, index: number, seedModifier: number = 0): ProductAd => {
  const id = `ad-${template.category}-${index + 1 + seedModifier}`;
  const likes = Math.floor(template.likes * (0.85 + (index % 5) * 0.1));
  // Strictly ensure (Comments / Likes) < 4.0 (typically 0.8 to 2.2 for healthy high-viral ecom products)
  const ratioFactor = 0.9 + ((index * 7 + seedModifier) % 15) * 0.12; // Between 0.9 and 2.7
  const comments = Math.floor(likes * Math.min(2.8, Math.max(0.6, ratioFactor)));
  const shares = Math.floor(likes * (0.4 + ((index * 3) % 8) * 0.15));
  
  const commentsLikesRatio = Number((comments / Math.max(1, likes)).toFixed(2));
  const engagementRatio = Number(((comments + shares) / Math.max(1, likes)).toFixed(2));
  
  const activeAdsCount = Math.max(12, Math.floor(template.activeAds * (0.8 + ((index + seedModifier) % 6) * 0.1)));
  const activeAdAccountsCount = Math.max(4, Math.floor(template.activeAccounts * (0.8 + ((index + seedModifier) % 4) * 0.15)));

  const tier: 'فئة عليا' | 'عادي' | 'صاعد' = engagementRatio >= 2.0 ? 'فئة عليا' : engagementRatio >= 1.2 ? 'صاعد' : 'عادي';

  const deepAnalysis: ProductDeepAnalysis = {
    productOverview: `منتج رابح وطلب متزايد في فئة ${template.category} يتمتع بعامل إبهار بصري قوي وحل فوري لمشكلة واضحة لدى المستهلك.`,
    supplierCostUSD: template.supplierCost,
    marketSaturation: activeAdsCount > 35 ? 'فيروسي رابح' : 'متوسط',
    winningScore: Math.min(98, Math.max(78, Math.floor(75 + engagementRatio * 8))),
    targetAudience: {
      gender: template.targetGender,
      ageRange: template.targetAge,
      topInterests: [template.category, 'التسوق عبر الإنترنت', 'عروض وتخفيضات', 'توصيل مجاني'],
      mainPainPoints: [template.problem, 'ارتفاع الأسعار البديلة', 'عدم توفر حلول عملية وسريعة'],
    },
    marketingAngles: [
      {
        title: 'زاوية الحل الفوري للمشكلة',
        hook: template.hook,
        description: template.problem,
      },
      {
        title: 'زاوية المقارنة والتوفير المالي',
        hook: `لماذا تدفع مبالغ طائلة بينما يمكنك حل المشكلة بـ ${template.suggestedDZD} د.ج فقط؟`,
        description: 'مقارنة سعر الشراء لمرة واحدة بالتكلفة المتكررة للخدمات والبدائل التقليدية.',
      },
      {
        title: 'زاوية الراحة وعامل الإبهار',
        hook: 'شاهد بالفيديو كيف يعمل هذا الابتكار السحري في ثوانٍ!',
        description: template.solution,
      },
    ],
    adCopies: [
      {
        dialect: 'اللهجة الجزائرية (DZ)',
        headline: `🚨 عرض خاص في الجزائر: ${template.titleAr}`,
        primaryText: `${template.adText}\n\n📦 التوصيل متوفر لـ 58 ولاية والدفع بعد ما تفحص سلعتك وتتأكد منها! الكمية محدودة جداً.`,
      },
      {
        dialect: 'اللهجة الخليجية (GCC)',
        headline: `✨ المنتج الأكثر مبيعاً في الخليج: ${template.titleAr}`,
        primaryText: `${template.adText}\n\n🚚 توصيل سريع لجميع مناطق المملكة والخليج والدفع عند الاستلام مع ضمان استرجاع حقيقي!`,
      },
      {
        dialect: 'العربية الفصحى (MSA)',
        headline: `🏆 الحل العصري المبتكر: ${template.titleAr}`,
        primaryText: `${template.adText}\n\nاطلب الآن وتمتع بخصم إضافي مع شحن مجاني لكافة المدن.`,
      },
    ],
    videoScript: {
      hook: template.hook,
      problem: template.problem,
      solution: template.solution,
      cta: template.cta,
    },
    supplierLinks: [
      {
        platform: 'AliExpress',
        url: `https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(template.titleEn)}`,
        label: 'مورد AliExpress (سعر الجملة)',
      },
      {
        platform: '1688',
        url: `https://s.1688.com/selloffer/offer_search.htm?keywords=${encodeURIComponent(template.titleEn)}`,
        label: 'مورد المصنع الصيني 1688 (أعلى هامش ربح)',
      },
      {
        platform: 'CJ Dropshipping',
        url: `https://cjdropshipping.com/list-detail.html?search=${encodeURIComponent(template.titleEn)}`,
        label: 'شحن دروب شيبينغ سريع CJ',
      },
    ],
  };

  return {
    id,
    titleAr: template.titleAr,
    titleEn: template.titleEn,
    category: template.category,
    pageName: template.pageName,
    pageAvatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
    pageFollowers: `${(15 + (index * 11) % 180)}K متابع`,
    isVerifiedPage: index % 3 === 0,
    platform: index % 3 === 0 ? 'facebook' : index % 3 === 1 ? 'instagram' : 'both',
    postUrl: `https://www.facebook.com/ads/library/?id=${94810200 + index * 1000 + seedModifier}`,
    metaAdLibraryUrl: `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&q=${encodeURIComponent(template.titleEn)}`,
    thumbnailUrl: template.image,
    hasVideo: true,
    adText: template.adText,
    activeDays: 12 + ((index * 5 + seedModifier) % 65),
    startDate: '2026-07-20',
    likes,
    comments,
    shares,
    views: likes * 45,
    commentsLikesRatio,
    engagementRatio,
    tier,
    activeAdsCount,
    activeAdAccountsCount,
    pricing: {
      minUSD: Number((template.suggestedUSD * 0.8).toFixed(2)),
      maxUSD: Number((template.suggestedUSD * 1.3).toFixed(2)),
      suggestedUSD: template.suggestedUSD,
      minDZD: Math.floor(template.suggestedDZD * 0.85),
      maxDZD: Math.floor(template.suggestedDZD * 1.25),
      suggestedDZD: template.suggestedDZD,
      minSAR: Math.floor(template.suggestedSAR * 0.85),
      maxSAR: Math.floor(template.suggestedSAR * 1.25),
      suggestedSAR: template.suggestedSAR,
      minAED: Math.floor(template.suggestedAED * 0.85),
      maxAED: Math.floor(template.suggestedAED * 1.25),
      suggestedAED: template.suggestedAED,
    },
    estimatedProfitMargin: template.margin,
    targetMarkets: ['الجزائر', 'السعودية', 'الإمارات', 'الكويت', 'قطر'],
    deepAnalysis,
  };
};

// Generate comprehensive dataset of hundreds of product ads across all categories
export const generateCatalog = (searchSeed: number = 0, query: string = ''): ProductAd[] => {
  const result: ProductAd[] = [];
  const cleanQuery = query.trim().toLowerCase();

  // Generate 25 - 35 variations for each template by varying features, markets, angles, and metrics
  BASE_PRODUCT_TEMPLATES.forEach((tmpl, tmplIdx) => {
    // Generate base ads for this template
    for (let i = 0; i < 25; i++) {
      const ad = buildProductAd(tmpl, i, searchSeed + tmplIdx * 10);
      
      // If there's a search query, filter or prioritize
      if (cleanQuery) {
        const matchesQuery =
          ad.titleAr.toLowerCase().includes(cleanQuery) ||
          ad.titleEn.toLowerCase().includes(cleanQuery) ||
          ad.adText.toLowerCase().includes(cleanQuery) ||
          tmpl.keywords.some((kw) => kw.toLowerCase().includes(cleanQuery));
        if (matchesQuery) {
          result.push(ad);
        }
      } else {
        result.push(ad);
      }
    }
  });

  // If query yielded few results, dynamically synthesize matching ads on the fly
  if (cleanQuery && result.length < 15) {
    for (let i = 0; i < 15; i++) {
      const randomTmpl = BASE_PRODUCT_TEMPLATES[i % BASE_PRODUCT_TEMPLATES.length];
      const customTmpl: ProductTemplate = {
        ...randomTmpl,
        titleAr: `${randomTmpl.titleAr} (موديل مطور فائق الجودة - نتائج بحث ${cleanQuery})`,
        titleEn: `${randomTmpl.titleEn} Pro Edition (${cleanQuery})`,
      };
      result.push(buildProductAd(customTmpl, i + 50, searchSeed + 200));
    }
  }

  return result;
};

// Initial default catalog (300+ viral ads)
export const INITIAL_CATALOG: ProductAd[] = generateCatalog(1, '');
