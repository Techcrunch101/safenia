export type PageView = 'home' | 'shop' | 'about' | 'track' | 'contact';

export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  volume: string;
  sku?: string;
  inStock: boolean;
  shopifyVariantId?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  collection: 'growth' | 'moisture' | 'scalp' | 'strength' | 'locs' | 'beard' | 'gift' | 'merchandise' | string;
  price: number; // base price in USD
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  description: string;
  directions: string[];
  ingredientsList: string[];
  scientificExplanation: string;
  hairTypes: string[];
  scalpSuitability: string;
  volume: string;
  isBestSeller?: boolean;
  isMerchandise?: boolean;
  benefits: string[];
  keyIngredients: string[];
  variants?: ProductVariant[];
  shopifyHandle?: string;
  shopifyVariantId?: string;
  shopifyBuyUrl?: string;
  inStock: boolean;
  stockCount: number;
}

export interface ShopifyConfig {
  storeDomain: string; // e.g. "safenialuxuryoils.myshopify.com" or "safenialuxuryoils.com"
  storefrontAccessToken?: string;
  currencyCode?: string;
  useDirectShopifyCheckout: boolean;
}

export interface Ingredient {
  id: string;
  name: string;
  botanicalName: string;
  image: string;
  origin: string;
  benefits: string[];
  scientificExplanation: string;
  traditionalUse: string;
  safeniaUsage: string;
  iconName: string;
}

export interface CollectionItem {
  id: 'growth' | 'moisture' | 'scalp' | 'strength' | 'locs' | 'beard' | 'gift' | 'merchandise' | string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  tagline: string;
}

export interface Review {
  id: string;
  customerName: string;
  location: string;
  countryCode: string;
  isVerified: boolean;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
  productTitle: string;
  headline: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
  selectedVolume?: string;
  isSubscription?: boolean;
  subscriptionInterval?: '1 month' | '2 months' | '3 months';
}

export interface Currency {
  code: string;
  symbol: string;
  rate: number; // multiplier relative to USD
  flag: string;
  name: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  total: number;
  currency: string;
  items: {
    productName: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  trackingNumber: string;
  courier: string;
  shippingAddress: string;
  paymentMethod: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  excerpt: string;
  author: string;
}
