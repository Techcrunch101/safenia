import { Product, ProductVariant, ShopifyCart, CartLineItem, ShopifyCollection } from '../types';

// Environment variable extraction
export const getShopifyDomain = (): string => {
  const envDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
  if (envDomain && typeof envDomain === 'string' && envDomain.trim()) {
    return envDomain.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
  }
  return 'c0qnsw-vw.myshopify.com';
};

export const getStorefrontToken = (): string => {
  const envToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (envToken && typeof envToken === 'string' && envToken.trim()) {
    const cleanToken = envToken.trim();
    if (!cleanToken.startsWith('YOUR_') && cleanToken.length > 8) {
      return cleanToken;
    }
  }
  return '';
};

export const isShopifyConfigured = (): boolean => {
  const token = getStorefrontToken();
  return Boolean(token && token.length >= 10);
};

export const getShopifyConfig = () => {
  return {
    domain: getShopifyDomain(),
    isConfigured: isShopifyConfigured(),
    apiVersion: SHOPIFY_API_VERSION,
    endpoint: `https://${getShopifyDomain()}/api/${SHOPIFY_API_VERSION}/graphql.json`,
  };
};

export const SHOPIFY_API_VERSION = '2024-07';

/**
 * Verifies the connection to the Shopify Storefront API
 */
export async function testShopifyConnection(): Promise<{
  connected: boolean;
  shopName?: string;
  description?: string;
  error?: string;
}> {
  if (!isShopifyConfigured()) {
    return {
      connected: false,
      error: 'Storefront Access Token not configured yet. Using placeholder botanical catalogue.',
    };
  }

  const query = `
    query getShopInfo {
      shop {
        name
        description
        primaryDomain {
          url
          host
        }
      }
    }
  `;

  try {
    const data = await storefrontFetch<{ shop: { name: string; description: string } }>(query);
    if (data?.shop) {
      return {
        connected: true,
        shopName: data.shop.name,
        description: data.shop.description,
      };
    }
    return {
      connected: false,
      error: 'Failed to retrieve shop info. Check domain or storefront access token permissions.',
    };
  } catch (err: any) {
    return {
      connected: false,
      error: err?.message || 'Network error connecting to Shopify Storefront API.',
    };
  }
}

/**
 * Format monetary amount with currency code
 */
export const formatPrice = (
  amount: number | string | undefined | null,
  currencyCode: string = 'USD'
): string => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : (amount ?? 0);
  if (isNaN(numericAmount)) return '$0.00';

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode || 'USD',
      minimumFractionDigits: numericAmount % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(numericAmount);
  } catch {
    return `${currencyCode || 'USD'} ${numericAmount.toFixed(2)}`;
  }
};

/**
 * Executes a GraphQL query/mutation against the Shopify Storefront API
 */
export async function storefrontFetch<T = any>(query: string, variables: Record<string, any> = {}): Promise<T | null> {
  const domain = getShopifyDomain();
  const token = getStorefrontToken();

  if (!token) {
    return null;
  }

  const endpoint = `https://${domain}/api/${SHOPIFY_API_VERSION}/graphql.json`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': token,
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      console.warn(`Shopify Storefront API HTTP error ${response.status}: ${response.statusText}`);
      return null;
    }

    const json = await response.json();
    if (json.errors && json.errors.length > 0) {
      console.warn('Shopify GraphQL Errors:', json.errors);
      return null;
    }

    return json.data;
  } catch (err) {
    console.warn('Failed to communicate with Shopify Storefront API:', err);
    return null;
  }
}

/**
 * Normalizes a raw GraphQL Product Node into the application's Product type
 */
export function normalizeShopifyProduct(node: any): Product {
  const variants: ProductVariant[] = (node.variants?.edges || []).map((vEdge: any) => {
    const v = vEdge.node;
    return {
      id: v.id,
      title: v.title,
      price: parseFloat(v.price?.amount || '0'),
      compareAtPrice: v.compareAtPrice ? parseFloat(v.compareAtPrice.amount) : undefined,
      currencyCode: v.price?.currencyCode || 'USD',
      volume: v.title === 'Default Title' ? undefined : v.title,
      sku: v.sku || undefined,
      availableForSale: Boolean(v.availableForSale),
      selectedOptions: v.selectedOptions || [],
    };
  });

  const images: string[] = (node.images?.edges || []).map((imgEdge: any) => imgEdge.node.url);
  const featuredImage = node.featuredImage?.url || images[0] || '';

  const minPrice = parseFloat(node.priceRange?.minVariantPrice?.amount || variants[0]?.price || '0');
  const compareAtPrice = node.compareAtPriceRange?.minVariantPrice?.amount
    ? parseFloat(node.compareAtPriceRange.minVariantPrice.amount)
    : undefined;
  const currencyCode = node.priceRange?.minVariantPrice?.currencyCode || variants[0]?.currencyCode || 'USD';

  // Determine category from productType or tags
  const productType = (node.productType || '').toLowerCase();
  const tags = (node.tags || []).map((t: string) => t.toLowerCase());

  let category = 'growth';
  if (productType.includes('moisture') || tags.includes('moisture')) category = 'moisture';
  else if (productType.includes('scalp') || tags.includes('scalp') || tags.includes('scalp care')) category = 'scalp';
  else if (productType.includes('strength') || tags.includes('repair') || tags.includes('strength')) category = 'strength';
  else if (productType.includes('gift') || tags.includes('gift set') || tags.includes('kit')) category = 'gift';
  else if (productType.includes('merch') || tags.includes('bonnet') || tags.includes('scarf') || tags.includes('bag') || tags.includes('merchandise')) category = 'merchandise';
  else if (productType.includes('hair oil') || tags.includes('oil') || tags.includes('growth')) category = 'growth';

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description || '',
    descriptionHtml: node.descriptionHtml || '',
    price: minPrice,
    compareAtPrice: compareAtPrice && compareAtPrice > minPrice ? compareAtPrice : undefined,
    currencyCode,
    featuredImage,
    images: images.length > 0 ? images : (featuredImage ? [featuredImage] : []),
    category,
    availableForSale: Boolean(node.availableForSale),
    totalInventory: node.totalInventory ?? undefined,
    variants: variants.length > 0 ? variants : [
      {
        id: node.id,
        title: '50ml (Standard)',
        price: minPrice,
        currencyCode,
        availableForSale: Boolean(node.availableForSale),
      }
    ],
    tags: node.tags || [],
    vendor: node.vendor || 'Safenia Luxury Oils',
    benefits: [
      'Nourishes hair and scalp with essential botanical fatty acids',
      'Supports natural scalp barrier moisture and flexibility',
      'Helps maintain soft, lustrous, healthy-looking hair',
    ],
    ingredients: [
      'Cold-pressed botanical oils (Castor, Jojoba, Sweet Almond)',
      'Infused botanical extracts (Rosemary, Amla, Hibiscus)',
      'Pure essential oils & Natural Vitamin E (Tocopherol)',
    ],
    howToUse: [
      'Apply 3–5 drops directly onto the scalp or palms using the glass dropper.',
      'Massage gently in circular motions for 2–3 minutes to promote healthy circulation.',
      'Can also be smoothed through mid-lengths and ends to seal in moisture.',
      'Use 3–4 times weekly or as needed for your hair-care routine.',
    ],
    details: [
      '100% Handcrafted Botanical Formulation',
      'Formulated without mineral oils, silicones, synthetic parabens, or harsh sulfates',
      'Suitable for natural curls, coils, locs, braids, and color-treated crowns',
    ],
  };
}

/**
 * Fetch products from Shopify Storefront API
 */
export async function fetchShopifyProducts(options: {
  first?: number;
  query?: string;
  reverse?: boolean;
  sortKey?: string;
} = {}): Promise<Product[] | null> {
  const { first = 24, query, reverse = false, sortKey = 'BEST_SELLING' } = options;

  const gql = `
    query getProducts($first: Int!, $query: String, $reverse: Boolean, $sortKey: ProductSortKeys) {
      products(first: $first, query: $query, reverse: $reverse, sortKey: $sortKey) {
        edges {
          node {
            id
            handle
            title
            description
            descriptionHtml
            productType
            vendor
            tags
            totalInventory
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              url
              altText
            }
            images(first: 6) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  sku
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await storefrontFetch<{ products: { edges: any[] } }>(gql, {
    first,
    query: query || null,
    reverse,
    sortKey,
  });

  if (!data?.products?.edges) {
    return null;
  }

  return data.products.edges.map((edge) => normalizeShopifyProduct(edge.node));
}

/**
 * Fetch a single product by handle
 */
export async function fetchShopifyProductByHandle(handle: string): Promise<Product | null> {
  const gql = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        description
        descriptionHtml
        productType
        vendor
        tags
        totalInventory
        availableForSale
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
        }
        images(first: 8) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              sku
              availableForSale
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;

  const data = await storefrontFetch<{ product: any }>(gql, { handle });
  if (!data?.product) {
    return null;
  }

  return normalizeShopifyProduct(data.product);
}

/**
 * Fetch collections
 */
export async function fetchShopifyCollections(): Promise<ShopifyCollection[] | null> {
  const gql = `
    query getCollections {
      collections(first: 10) {
        edges {
          node {
            id
            handle
            title
            description
            image {
              url
              altText
            }
          }
        }
      }
    }
  `;

  const data = await storefrontFetch<{ collections: { edges: any[] } }>(gql);
  if (!data?.collections?.edges) {
    return null;
  }

  return data.collections.edges.map((edge) => ({
    id: edge.node.id,
    handle: edge.node.handle,
    title: edge.node.title,
    description: edge.node.description || '',
    image: edge.node.image?.url || '',
  }));
}

/**
 * Cart Storage Management
 */
const CART_STORAGE_KEY = 'safenia_shopify_cart_id';

export const getStoredCartId = (): string | null => {
  try {
    return localStorage.getItem(CART_STORAGE_KEY);
  } catch {
    return null;
  }
};

export const setStoredCartId = (cartId: string | null) => {
  try {
    if (cartId) {
      localStorage.setItem(CART_STORAGE_KEY, cartId);
    } else {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  } catch (err) {
    console.error('Failed to update stored cart ID:', err);
  }
};

/**
 * Normalizes Shopify Cart GraphQL response
 */
function normalizeShopifyCart(cartNode: any): ShopifyCart {
  const lines: CartLineItem[] = (cartNode.lines?.edges || []).map((edge: any) => {
    const line = edge.node;
    const v = line.merchandise;
    const p = v.product;

    const normalizedVariant: ProductVariant = {
      id: v.id,
      title: v.title,
      price: parseFloat(v.price?.amount || '0'),
      compareAtPrice: v.compareAtPrice ? parseFloat(v.compareAtPrice.amount) : undefined,
      currencyCode: v.price?.currencyCode || 'USD',
      availableForSale: Boolean(v.availableForSale),
    };

    const normalizedProduct: Product = {
      id: p.id,
      handle: p.handle,
      title: p.title,
      description: p.description || '',
      price: parseFloat(v.price?.amount || '0'),
      currencyCode: v.price?.currencyCode || 'USD',
      featuredImage: v.image?.url || p.featuredImage?.url || '',
      images: [v.image?.url || p.featuredImage?.url || ''],
      availableForSale: Boolean(v.availableForSale),
      variants: [normalizedVariant],
    };

    return {
      id: line.id,
      variantId: v.id,
      quantity: line.quantity,
      product: normalizedProduct,
      selectedVariant: normalizedVariant,
    };
  });

  return {
    id: cartNode.id,
    checkoutUrl: cartNode.checkoutUrl,
    totalQuantity: cartNode.totalQuantity || 0,
    cost: {
      subtotalAmount: cartNode.cost?.subtotalAmount || { amount: '0', currencyCode: 'USD' },
      totalAmount: cartNode.cost?.totalAmount || { amount: '0', currencyCode: 'USD' },
      totalTaxAmount: cartNode.cost?.totalTaxAmount,
      totalDutyAmount: cartNode.cost?.totalDutyAmount,
    },
    lines,
  };
}

/**
 * Creates a new Shopify Cart
 */
export async function createShopifyCart(lines: { merchandiseId: string; quantity: number }[] = []): Promise<ShopifyCart | null> {
  const gql = `
    mutation cartCreate($input: CartInput) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    availableForSale
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                    product {
                      id
                      handle
                      title
                      description
                      featuredImage {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await storefrontFetch<{ cartCreate: { cart: any; userErrors: any[] } }>(gql, {
    input: {
      lines: lines.map((l) => ({ merchandiseId: l.merchandiseId, quantity: l.quantity })),
    },
  });

  if (data?.cartCreate?.cart) {
    const normalized = normalizeShopifyCart(data.cartCreate.cart);
    setStoredCartId(normalized.id);
    return normalized;
  }

  return null;
}

/**
 * Retrieves an existing Shopify Cart by ID or localStorage
 */
export async function fetchShopifyCart(cartIdParam?: string): Promise<ShopifyCart | null> {
  const cartId = cartIdParam || getStoredCartId();
  if (!cartId) return null;

  const gql = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                  product {
                    id
                    handle
                    title
                    description
                    featuredImage {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await storefrontFetch<{ cart: any }>(gql, { cartId });
  if (data?.cart) {
    return normalizeShopifyCart(data.cart);
  }

  setStoredCartId(null);
  return null;
}

/**
 * Add items to an existing Shopify Cart (or create if absent)
 */
export async function addToShopifyCart(
  variantId: string,
  quantity: number = 1,
  cartIdParam?: string
): Promise<ShopifyCart | null> {
  let cartId = cartIdParam || getStoredCartId();

  if (!cartId) {
    return createShopifyCart([{ merchandiseId: variantId, quantity }]);
  }

  const gql = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    availableForSale
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                    product {
                      id
                      handle
                      title
                      description
                      featuredImage {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await storefrontFetch<{ cartLinesAdd: { cart: any; userErrors: any[] } }>(gql, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  });

  if (data?.cartLinesAdd?.cart) {
    return normalizeShopifyCart(data.cartLinesAdd.cart);
  }

  // If adding failed because cartId was stale, recreate cart
  return createShopifyCart([{ merchandiseId: variantId, quantity }]);
}

/**
 * Update line quantity in Shopify Cart
 */
export async function updateShopifyCartLine(
  lineId: string,
  quantity: number,
  cartIdParam?: string
): Promise<ShopifyCart | null> {
  const cartId = cartIdParam || getStoredCartId();
  if (!cartId) return null;

  const gql = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    availableForSale
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                    product {
                      id
                      handle
                      title
                      description
                      featuredImage {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await storefrontFetch<{ cartLinesUpdate: { cart: any; userErrors: any[] } }>(gql, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });

  if (data?.cartLinesUpdate?.cart) {
    return normalizeShopifyCart(data.cartLinesUpdate.cart);
  }

  return null;
}

/**
 * Remove lines from Shopify Cart
 */
export async function removeShopifyCartLines(
  lineIds: string[],
  cartIdParam?: string
): Promise<ShopifyCart | null> {
  const cartId = cartIdParam || getStoredCartId();
  if (!cartId) return null;

  const gql = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    availableForSale
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                    product {
                      id
                      handle
                      title
                      description
                      featuredImage {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await storefrontFetch<{ cartLinesRemove: { cart: any; userErrors: any[] } }>(gql, {
    cartId,
    lineIds,
  });

  if (data?.cartLinesRemove?.cart) {
    return normalizeShopifyCart(data.cartLinesRemove.cart);
  }

  return null;
}

/**
 * Direct Shopify Cart Permalink Builder
 */
export function buildShopifyCartPermalink(
  items: { variantId?: string; quantity: number }[]
): string {
  const domain = getShopifyDomain();
  if (!items || items.length === 0) {
    return `https://${domain}/cart`;
  }

  const lineItems = items
    .filter((i) => i.variantId)
    .map((i) => {
      const cleanId = i.variantId?.replace(/^gid:\/\/shopify\/ProductVariant\//, '') || i.variantId;
      return `${cleanId}:${i.quantity}`;
    })
    .join(',');

  return `https://${domain}/cart/${lineItems}`;
}

/**
 * Account & Tracking URLs
 */
export const getShopifyAccountUrl = (): string => {
  const domain = getShopifyDomain();
  return `https://${domain}/account`;
};

export const getShopifyOrderStatusUrl = (orderNumber?: string, email?: string): string => {
  const domain = getShopifyDomain();
  if (orderNumber) {
    const cleanNum = orderNumber.replace(/^#/, '').trim();
    if (email) {
      return `https://${domain}/account/orders/${cleanNum}?email=${encodeURIComponent(email)}`;
    }
    return `https://${domain}/account/orders/${cleanNum}`;
  }
  return `https://${domain}/account`;
};

export const getShopifyProductUrl = (handle: string): string => {
  const domain = getShopifyDomain();
  return `https://${domain}/products/${handle}`;
};
