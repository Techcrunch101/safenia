import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy Gemini AI Client Initialization (Server-side)
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

const FALLBACK_PRODUCTS = [
  {
    id: 'gid://shopify/Product/safenia-growth-oil',
    handle: 'safenia-growth-oil',
    title: 'Safenia Crown Growth Hair Oil',
    description: 'A nutrient-dense botanical elixir infused with rosemary, amla, and cold-pressed castor oil.',
    price: 48,
    currencyCode: 'USD',
    featuredImage: '/images/safenia_emerald_botanical_hero_1787295575998.jpg',
    images: ['/images/safenia_emerald_botanical_hero_1787295575998.jpg'],
    category: 'growth',
    availableForSale: true,
  },
  {
    id: 'gid://shopify/Product/safenia-moisture-nectar',
    handle: 'safenia-moisture-nectar',
    title: 'Safenia Botanical Moisture Nectar',
    description: 'A featherlight botanical oil blend featuring sweet almond, argan, and kalahari melon seed oil.',
    price: 45,
    currencyCode: 'USD',
    featuredImage: '/images/safenia_seren_warm_hero_1787295590207.jpg',
    images: ['/images/safenia_seren_warm_hero_1787295590207.jpg'],
    category: 'moisture',
    availableForSale: true,
  },
  {
    id: 'gid://shopify/Product/safenia-scalp-therapy',
    handle: 'safenia-scalp-therapy',
    title: 'Safenia Clarifying Scalp Therapy Drops',
    description: 'A soothing botanical scalp elixir infused with tea tree, peppermint, and chamomile.',
    price: 42,
    currencyCode: 'USD',
    featuredImage: '/images/safenia_scalp_pipette_1787295337432.jpg',
    images: ['/images/safenia_scalp_pipette_1787295337432.jpg'],
    category: 'scalp',
    availableForSale: true,
  },
];

// ================= API ROUTES ================= //

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: 'Safenia Luxury Oils',
    slogan: "Nature's Care for Every Crown",
    email: 'safenialuxuryoils@gmail.com',
    timestamp: new Date().toISOString(),
  });
});

// Contact Form Dispatch Endpoint
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {};

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ error: 'Please provide a valid full name.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return res.status(400).json({ error: 'Please provide an inquiry message of at least 10 characters.' });
    }

    console.log(`[CONCIERGE INQUIRY] From: ${name.trim()} <${email.trim()}> | Subject: ${subject || 'General Inquiry'}`);
    console.log(`Message: ${message.trim()}`);

    return res.status(200).json({
      success: true,
      message: 'Your inquiry has been received by our botanical concierge. We will respond to your crown inquiry within 24 business hours.',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Contact form submission error:', err);
    return res.status(500).json({ error: 'Failed to process inquiry. Please try again or email us directly at safenialuxuryoils@gmail.com.' });
  }
});

// Newsletter Subscription Endpoint
app.post('/api/newsletter', (req, res) => {
  try {
    const { email } = req.body || {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    console.log(`[NEWSLETTER SUBSCRIPTION] New Safenia Circle member: ${email.trim()}`);

    return res.status(200).json({
      success: true,
      message: 'Welcome to the Safenia Circle. You will receive private botanical updates and micro-batch releases.',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Newsletter error:', err);
    return res.status(500).json({ error: 'Failed to join circle. Please try again.' });
  }
});

// Shopify Storefront Integration Status
app.get('/api/shopify/status', (req, res) => {
  const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN || 'safenialuxuryoils.myshopify.com';
  const hasToken = Boolean(process.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN);
  
  res.json({
    configured: hasToken,
    domain: domain.replace(/^https?:\/\//, '').replace(/\/$/, ''),
    apiVersion: '2024-07',
    mode: hasToken ? 'live_shopify_storefront' : 'placeholder_shopify_ready',
    instruction: hasToken
      ? 'Shopify Storefront API credentials are active and serving live catalog data.'
      : 'Placeholder configuration active. Add VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN to connect live Shopify inventory.',
  });
});

// Fallback products endpoint for initial hydration
app.get('/api/products', (req, res) => {
  res.json(FALLBACK_PRODUCTS);
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
    console.log(`✨ Safenia Luxury Oils Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
