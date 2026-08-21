import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { PRODUCTS, REVIEWS, JOURNAL_ARTICLES } from './src/data/mockData';

const currentFilename = typeof __filename !== 'undefined' ? __filename : (import.meta && import.meta.url ? fileURLToPath(import.meta.url) : '');
const currentDirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(currentFilename || process.cwd());

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy Gemini AI Client Initialization
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// ================= API ENDPOINTS ================= //

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: 'Safenia Luxury Oils',
    tagline: "Nature's Care for Every Crown",
    serverTime: new Date().toISOString(),
  });
});

// Get All Products
app.get('/api/products', (req, res) => {
  const { collection, hairType } = req.query;
  let filtered = [...PRODUCTS];

  if (collection) {
    filtered = filtered.filter((p) => p.collection === collection);
  }
  if (hairType) {
    filtered = filtered.filter((p) =>
      p.hairTypes.some((ht) => ht.toLowerCase().includes(String(hairType).toLowerCase()))
    );
  }

  res.json(filtered);
});

// Get Single Product
app.get('/api/products/:id', (req, res) => {
  const product = PRODUCTS.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Get Journal Articles
app.get('/api/journal', (req, res) => {
  res.json(JOURNAL_ARTICLES);
});

// Get Reviews
app.get('/api/reviews', (req, res) => {
  res.json(REVIEWS);
});

// Interactive Hair Ritual Quiz AI Consultation
app.post('/api/quiz/consultation', async (req, res) => {
  const { hairType, hairGoals, scalpCondition, texture, protectiveStyle } = req.body;

  try {
    const ai = getAIClient();
    if (ai) {
      const prompt = `You are Safenia's Chief Botanical Trichologist for Safenia Luxury Oils ("Nature's Care for Every Crown").
A luxury client has submitted their Hair Ritual Quiz:
- Hair Type: ${hairType}
- Hair Texture: ${texture}
- Hair Goals: ${Array.isArray(hairGoals) ? hairGoals.join(', ') : hairGoals}
- Scalp Condition: ${scalpCondition}
- Current Styling / Protective Style: ${protectiveStyle}

Provide a personalized luxury crown hair care ceremony prescription in json format with:
1. customAdvice: A 2-3 sentence personalized editorial analysis on their scalp microbiome and growth potential.
2. keyBotanicalRecommendations: An array of 3 key plant ingredients they should prioritize.
3. routineSteps: An array of 4 step-by-step ceremony instructions (e.g. Step 1: Pre-Wash Scalp Stimulation, Step 2: Wash Day Seal, etc.).
Answer ONLY in clean valid JSON without markdown tags or code blocks.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const responseText = response.text || '';
      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      
      try {
        const parsed = JSON.parse(cleanJson);
        return res.json({
          success: true,
          consultation: parsed,
          aiPowered: true,
        });
      } catch {
        // fallback if parsing fails
      }
    }
  } catch (err) {
    console.error('Gemini API quiz consultation error:', err);
  }

  // Smart Fallback Recommendation Engine
  const recommended = PRODUCTS.filter((p) => {
    if (protectiveStyle?.toLowerCase().includes('braid') || protectiveStyle?.toLowerCase().includes('twist')) {
      return p.collection === 'protective' || p.collection === 'scalp' || p.collection === 'growth';
    }
    if (hairType?.toLowerCase().includes('loc')) {
      return p.collection === 'locs' || p.collection === 'scalp';
    }
    return p.isBestSeller || p.collection === 'growth';
  });

  return res.json({
    success: true,
    aiPowered: false,
    consultation: {
      customAdvice: `Based on your ${hairType} crown profile and goal of ${Array.isArray(hairGoals) ? hairGoals.join(' & ') : 'optimal hair health'}, your scalp will thrive with high-purity cold-pressed botanical lipids like Rosemary, Black Seed, and Golden Jojoba.`,
      keyBotanicalRecommendations: ['Rosemary Leaf Oil', 'Egyptian Black Seed', 'Jamaican Castor'],
      routineSteps: [
        { step: 1, title: 'Scalp Awakening', instruction: 'Apply 3-4 drops along your grid parts and massage gently for 3 minutes.' },
        { step: 2, title: 'Follicle Nourishment', instruction: 'Apply Crown Growth Elixir to ends and edges before bed.' },
        { step: 3, title: 'Protective Shield', instruction: 'Seal coils or locs with lightweight Jojoba/Kalahari Melon oil.' },
        { step: 4, title: 'Weekly Deep Ceremony', instruction: 'Perform a warm oil scalp wrap once per week for maximum absorption.' },
      ],
      recommendedProducts: recommended.slice(0, 3),
    },
  });
});

// Order Creation Simulation Endpoint
app.post('/api/orders/create', (req, res) => {
  const { items, shippingAddress, paymentMethod, total, currency } = req.body;

  const orderId = `SAF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const trackingNumber = `DHL-EXPRESS-${Math.floor(100000000 + Math.random() * 900000000)}`;

  res.json({
    success: true,
    order: {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: 'Processing',
      total: total || 130,
      currency: currency || 'USD',
      items: items || [],
      trackingNumber,
      courier: 'DHL Express Global Priority',
      shippingAddress: shippingAddress || '123 Luxury Avenue, Beverly Hills, CA 90210',
      paymentMethod: paymentMethod || 'Visa ending in 4242',
      crownPointsEarned: Math.round((total || 130) * 10),
    },
  });
});

// Admin Dashboard Analytics API
app.get('/api/admin/stats', (req, res) => {
  res.json({
    totalRevenueUSD: 148920.0,
    totalOrdersThisMonth: 842,
    activeSubscribers: 312,
    averageRating: 4.94,
    topSellingProducts: [
      { name: 'Safenia Crown Growth Elixir', unitsSold: 1240, revenueUSD: 84320 },
      { name: 'Safenia Royal Loc & Scalp Nectar', unitsSold: 810, revenueUSD: 50220 },
      { name: 'Safenia Golden Crown Luxury Gift Set', unitsSold: 88, revenueUSD: 14520 },
    ],
    recentOrders: [
      { id: 'SAF-2026-9812', customer: 'Lady Vivienne Thorne', city: 'London, UK', amount: '$130.00', status: 'Shipped' },
      { id: 'SAF-2026-9811', customer: 'Fatima Al-Maktoum', city: 'Dubai, UAE', amount: '$185.00', status: 'Delivered' },
      { id: 'SAF-2026-9810', customer: 'Zuri Ndegwa', city: 'Nairobi, Kenya', amount: '$68.00', status: 'Processing' },
    ],
  });
});

// ================= VITE MIDDLEWARE SETUP ================= //

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
    console.log(`✨ Safenia Luxury Oils Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
