export type PageView = 'home' | 'shop' | 'about' | 'care' | 'ritual' | 'journal' | 'track' | 'contact' | '404';

export interface ShopifyMoney {
  amount: string | number;
  currencyCode: string;
}

export interface ProductVariant {
  id: string; // Shopify GraphQL GID e.g. "gid://shopify/ProductVariant/..."
  title: string;
  price: number;
  compareAtPrice?: number;
  currencyCode: string;
  volume?: string;
  sku?: string;
  availableForSale: boolean;
  selectedOptions?: {
    name: string;
    value: string;
  }[];
}

export interface Product {
  id: string; // Shopify GraphQL GID
  handle: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  price: number;
  compareAtPrice?: number;
  currencyCode: string;
  featuredImage: string;
  images: string[];
  category?: string;
  availableForSale: boolean;
  totalInventory?: number;
  variants: ProductVariant[];
  tags?: string[];
  vendor?: string;
  // Responsible botanical descriptors
  benefits?: string[];
  ingredients?: string[];
  howToUse?: string[];
  details?: string[];
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description?: string;
  image?: string;
  products?: Product[];
}

export interface CartLineItem {
  id: string; // Cart line ID (Shopify or local client id)
  variantId: string; // Shopify Variant GID
  quantity: number;
  product: Product;
  selectedVariant: ProductVariant;
}

export interface ShopifyCart {
  id: string; // Shopify Cart GID
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
    totalTaxAmount?: ShopifyMoney;
    totalDutyAmount?: ShopifyMoney;
  };
  lines: CartLineItem[];
}

export interface OrderLookupResult {
  orderNumber: string;
  email: string;
  status?: string;
  fulfillmentStatus?: string;
  trackingNumber?: string;
  carrier?: string;
  trackingUrl?: string;
  processedAt?: string;
  financialStatus?: string;
}
