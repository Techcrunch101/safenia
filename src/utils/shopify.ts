import { CartItem, ShopifyConfig, Product } from '../types';

const SHOPIFY_CONFIG_KEY = 'safenia_shopify_config';

export const DEFAULT_SHOPIFY_CONFIG: ShopifyConfig = {
  storeDomain: 'safenialuxuryoils.myshopify.com',
  storefrontAccessToken: '',
  currencyCode: 'USD',
  useDirectShopifyCheckout: true,
};

export const getStoredShopifyConfig = (): ShopifyConfig => {
  try {
    const stored = localStorage.getItem(SHOPIFY_CONFIG_KEY);
    if (stored) {
      return { ...DEFAULT_SHOPIFY_CONFIG, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Failed to load Shopify config', e);
  }
  return DEFAULT_SHOPIFY_CONFIG;
};

export const saveShopifyConfig = (config: ShopifyConfig) => {
  try {
    localStorage.setItem(SHOPIFY_CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save Shopify config', e);
  }
};

/**
 * Clean and format store domain
 */
export const formatShopifyDomain = (domain: string): string => {
  if (!domain || !domain.trim()) {
    return 'safenialuxuryoils.myshopify.com';
  }
  return domain.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
};

/**
 * Builds a Shopify Cart Permalink
 * Format: https://{store_domain}/cart/{variant_id}:{quantity},{variant_id2}:{quantity2}?discount={code}&note={note}
 */
export const buildShopifyCheckoutUrl = (
  cartItems: CartItem[],
  config: ShopifyConfig,
  discountCode?: string,
  note?: string
): string => {
  const domain = formatShopifyDomain(config.storeDomain);

  // If cart is empty, link to store catalog
  if (cartItems.length === 0) {
    return `https://${domain}/collections/all`;
  }

  // Build items query using variant ID or product fallback
  const lineItems = cartItems
    .map((item) => {
      const variantId =
        item.selectedVariant?.shopifyVariantId ||
        item.selectedVariant?.id ||
        item.product.shopifyVariantId ||
        item.product.id;
      return `${variantId}:${item.quantity}`;
    })
    .join(',');

  const params = new URLSearchParams();
  if (discountCode) {
    params.set('discount', discountCode);
  }
  if (note) {
    params.set('note', note);
  }

  const queryString = params.toString() ? `?${params.toString()}` : '';
  return `https://${domain}/cart/${lineItems}${queryString}`;
};

/**
 * Builds a single product direct buy link for Shopify
 */
export const buildShopifyProductUrl = (
  productId: string,
  handle: string | undefined,
  config: ShopifyConfig
): string => {
  const domain = formatShopifyDomain(config.storeDomain);
  const cleanHandle = handle || productId;
  return `https://${domain}/products/${cleanHandle}`;
};

/**
 * Builds a Shopify Customer Account link
 */
export const buildShopifyAccountUrl = (config: ShopifyConfig): string => {
  const domain = formatShopifyDomain(config.storeDomain);
  return `https://${domain}/account`;
};

/**
 * Builds a Shopify Order Tracking URL
 */
export const buildShopifyTrackingUrl = (
  config: ShopifyConfig,
  orderNumber?: string,
  emailOrPhone?: string
): string => {
  const domain = formatShopifyDomain(config.storeDomain);
  if (orderNumber) {
    const cleanNum = orderNumber.replace(/^#/, '').trim();
    return `https://${domain}/account/orders/${cleanNum}`;
  }
  return `https://${domain}/account`;
};

/**
 * Builds a Shopify Collection link
 */
export const buildShopifyCollectionUrl = (
  collectionHandle: string,
  config: ShopifyConfig
): string => {
  const domain = formatShopifyDomain(config.storeDomain);
  return `https://${domain}/collections/${collectionHandle}`;
};

/**
 * Fetch live products from Shopify Storefront API if storefrontAccessToken is provided
 */
export const fetchShopifyProducts = async (
  config: ShopifyConfig
): Promise<Product[] | null> => {
  if (!config.storefrontAccessToken || !config.storefrontAccessToken.trim()) {
    return null;
  }

  const domain = formatShopifyDomain(config.storeDomain);
  const endpoint = `https://${domain}/api/2024-01/graphql.json`;

  const query = `
    query getProducts {
      products(first: 20) {
        edges {
          node {
            id
            handle
            title
            description
            totalInventory
            availableForSale
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': config.storefrontAccessToken,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const json = await response.json();
    const edges = json?.data?.products?.edges || [];

    return edges.map((edge: any) => {
      const node = edge.node;
      const images = node.images.edges.map((imgEdge: any) => imgEdge.node.url);
      const variants = node.variants.edges.map((vEdge: any) => ({
        id: vEdge.node.id,
        title: vEdge.node.title,
        price: parseFloat(vEdge.node.price.amount),
        volume: vEdge.node.title,
        inStock: vEdge.node.availableForSale,
        shopifyVariantId: vEdge.node.id,
      }));

      return {
        id: node.id,
        name: node.title,
        subtitle: 'Botanical Hair & Scalp Care',
        tagline: "Nature's Care for Every Crown",
        collection: 'growth',
        price: parseFloat(node.priceRange.minVariantPrice.amount) || 50,
        rating: 4.95,
        reviewCount: 48,
        image: images[0] || 'https://images.unsplash.com/photo-1608248597263-00079996582a?auto=format&fit=crop&w=800&q=80',
        gallery: images.length > 0 ? images : ['https://images.unsplash.com/photo-1608248597263-00079996582a?auto=format&fit=crop&w=800&q=80'],
        description: node.description || 'Handcrafted botanical hair oil formulated to nourish and restore.',
        directions: [
          'Apply 3-5 drops directly onto clean scalp using the glass dropper.',
          'Massage in circular motions for 3 minutes to activate microcirculation.',
        ],
        ingredientsList: ['Cold-pressed botanical oils', 'Pure essential oils', 'Vitamin E'],
        scientificExplanation: 'Botanical lipids nourish the hair follicle and scalp barrier.',
        hairTypes: ['All Hair Types', 'Locs', 'Braids', 'Natural Hair'],
        scalpSuitability: 'Gentle on all scalp types.',
        volume: variants[0]?.volume || '50ml',
        benefits: ['Nourishes hair and scalp', 'Prevents breakage', 'Adds natural luster'],
        keyIngredients: ['Rosemary', 'Castor Oil', 'Jojoba Oil'],
        variants: variants,
        shopifyHandle: node.handle,
        shopifyVariantId: variants[0]?.id,
        inStock: node.availableForSale,
        stockCount: node.totalInventory || 50,
      };
    });
  } catch (error) {
    console.error('Error fetching live Shopify products:', error);
    return null;
  }
};
