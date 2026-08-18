import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent header
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    appName: 'Mouhcen e-commerce pro',
    timestamp: new Date().toISOString(),
  });
});

// AI Deep Product & Meta Ads Analysis
app.post('/api/gemini/analyze-product', async (req, res) => {
  try {
    const { productName, category, market, adExcerpt } = req.body;
    if (!productName) {
      return res.status(400).json({ error: 'Product name is required' });
    }

    const ai = getGeminiClient();
    const prompt = `You are a world-class E-Commerce and Meta Ads (Facebook & Instagram) media buying expert for "Mouhcen e-commerce pro".
Analyze this e-commerce product in depth for dropshipping, COD (Cash on Delivery in Algeria/North Africa & GCC) and global e-commerce:

Product: ${productName}
Category: ${category || 'General E-Commerce'}
Target Market: ${market || 'Algeria, GCC & Global'}
Ad Excerpt: ${adExcerpt || 'Standard sponsored ad'}

Return a JSON object strictly following this structure:
{
  "productNameAr": "اسم المنتج بالعربية بدقة وجاذبية",
  "productNameEn": "Accurate English Product Name",
  "estimatedActiveAds": 25,
  "activeAdvertisersCount": 8,
  "saturationLevel": "منخفض / Low" or "متوسط / Medium" or "مرتفع / High" or "فيروسي رابح / Viral Winning",
  "pricing": {
    "usd": { "min": 29.99, "max": 49.99, "suggested": 39.99 },
    "dzd": { "min": 4500, "max": 8500, "suggested": 5900 },
    "sar": { "min": 120, "max": 220, "suggested": 169 },
    "aed": { "min": 115, "max": 210, "suggested": 159 }
  },
  "estimatedSupplierCostUSD": 8.5,
  "estimatedProfitMarginPercent": 65,
  "winningReasons": [
    "سبب 1 لكونه منتج رابح (مثل حل مشكلة حقيقية، تأثير بصري قوي في الفيديو)",
    "سبب 2",
    "سبب 3"
  ],
  "targetAudience": {
    "gender": "الجميع / All" or "نساء / Women" or "رجال / Men",
    "ageRange": "22 - 55",
    "interests": ["اهتمام 1 فيسبوك", "اهتمام 2", "اهتمام 3"],
    "painPoints": ["المشكلة 1 التي يعاني منها العميل", "المشكلة 2"]
  },
  "marketingAngles": [
    {
      "angleTitle": "زاوية حل المشكلة الفوري",
      "hook": "الخطاف الجذاب لأول 3 ثواني من الفيديو",
      "description": "شرح الزاوية التسويقية وكيفية إقناع العميل"
    },
    {
      "angleTitle": "زاوية توفير الوقت والمال",
      "hook": "خطاف العرض المحدود",
      "description": "شرح الزاوية"
    }
  ],
  "adCopies": [
    {
      "dialect": "اللهجة الخليجية (KSA/UAE)",
      "primaryText": "نص إعلاني احترافي مع إيموجي ودعوة لاتخاذ إجراء CTA",
      "headline": "عنوان جذاب للإعلان"
    },
    {
      "dialect": "اللهجة الجزائرية / المغاربية (DZ/North Africa)",
      "primaryText": "نص إعلاني باللهجة الجزائرية للتجارة والتوصيل الدفع عند الاستلام",
      "headline": "عنوان الإعلان فيسبوك"
    },
    {
      "dialect": "اللغة العربية الفصحى (Standard Arabic)",
      "primaryText": "نص إعلاني بالفصحى مناسب لجميع الدول",
      "headline": "عنوان رئيسي"
    }
  ],
  "videoScript": {
    "hookSec0to3": "ما يتم عرضه وقوله في أول 3 ثواني لإيقاف التمرير (Stop Scroll)",
    "problemSec3to10": "عرض المشكلة والشعور بالانزعاج",
    "solutionSec10to20": "ظهور المنتج كحل سحري وطريقة استخدامه",
    "ctaSec20to30": "عرض السعر الخاص، الضمان، والدفع عند الاستلام مع رابط الطلب"
  },
  "competitionVerdict": "ملخص تقييم المنافسة وإمكانية النجاح في الحملات الإعلانية الحالية"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    const analysis = JSON.parse(text);
    res.json({ success: true, data: analysis });
  } catch (error: any) {
    console.error('Error analyzing product with Gemini:', error);
    res.status(500).json({ error: error.message || 'Failed to analyze product' });
  }
});

// AI Custom Product Research & Scanner
app.post('/api/gemini/instant-scan', async (req, res) => {
  try {
    const { query, market, niche } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Search query or niche is required' });
    }

    const ai = getGeminiClient();
    const prompt = `You are the AI Meta Ads & Winning Products Scanner for "Mouhcen e-commerce pro".
The user is searching for: "${query}" in niche: "${niche || 'All'}" targeting market: "${market || 'MENA / Global'}".

Analyze potential winning products matching this search, recent Meta Ads Library trends, viral potential, engagement ratios, and estimated pricing.
Return JSON strictly in this format:
{
  "searchSummary": "ملخص شامل عن أداء هذه الفئة أو المنتج في إعلانات فيسبوك وانستغرام الممولة",
  "recommendedProducts": [
    {
      "id": "scan-1",
      "title": "اسم المنتج بالعربية",
      "titleEn": "English Name",
      "category": "الفئة",
      "engagementRatio": 5.2,
      "tier": "فئة عليا",
      "estimatedActiveAds": 32,
      "estimatedAdvertisers": 11,
      "priceRange": {
        "usd": "$29 - $49",
        "dzd": "4800 - 7500 د.ج",
        "sar": "130 - 210 ر.س"
      },
      "whyItWins": "سبب فيروسية المنتج على منصات ميتا",
      "suggestedHook": "خطاف الفيديو الإعلاني المقترح",
      "platform": "Facebook / Instagram"
    },
    {
      "id": "scan-2",
      "title": "اسم منتج رابح ثاني",
      "titleEn": "Second English Name",
      "category": "الفئة",
      "engagementRatio": 4.6,
      "tier": "فئة عليا",
      "estimatedActiveAds": 19,
      "estimatedAdvertisers": 6,
      "priceRange": {
        "usd": "$19 - $35",
        "dzd": "3500 - 5800 د.ج",
        "sar": "89 - 149 ر.س"
      },
      "whyItWins": "سبب النجاح",
      "suggestedHook": "الخطاف المقترح",
      "platform": "Instagram / TikTok / Facebook"
    }
  ],
  "marketAdvice": "نصائح ذهبية لإطلاق الحملات الإعلانية وتفادي حظر الحسابات وزيادة الـ ROAS"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    const result = JSON.parse(text);
    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error during AI instant scan:', error);
    res.status(500).json({ error: error.message || 'Scan failed' });
  }
});

// Proxy / Fallback to read public Google Sheet data in CSV / JSON format if needed
app.post('/api/sheets/fetch-public-csv', async (req, res) => {
  try {
    const { sheetUrlOrId, gid = '0' } = req.body;
    if (!sheetUrlOrId) {
      return res.status(400).json({ error: 'Sheet ID or URL is required' });
    }

    let sheetId = sheetUrlOrId.trim();
    // Extract ID from full Google Sheet URL if provided
    const match = sheetId.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (match) {
      sheetId = match[1];
    }

    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
    const response = await fetch(csvUrl);
    if (!response.ok) {
      return res.status(response.status).json({
        error: `Could not fetch Google Sheet. Make sure the sheet is shared as "Anyone with the link can view".`,
      });
    }

    const csvText = await response.text();
    res.json({ success: true, csv: csvText, sheetId });
  } catch (error: any) {
    console.error('Error fetching Google Sheet CSV:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch Google Sheet' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Mouhcen e-commerce pro] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
