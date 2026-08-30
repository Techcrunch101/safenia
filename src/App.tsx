import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturedProducts } from './components/FeaturedProducts';
import { WhySafenia } from './components/WhySafenia';
import { AboutTeaser } from './components/AboutTeaser';
import { ShopByNeed } from './components/ShopByNeed';
import { SafeniaRitualSection } from './components/SafeniaRitualSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';

import { ShopView } from './components/ShopView';
import { AboutView } from './components/AboutView';
import { RitualView } from './components/RitualView';
import { JournalView } from './components/JournalView';
import { TrackOrderView } from './components/TrackOrderView';
import { ContactView } from './components/ContactView';
import { NotFoundView } from './components/NotFoundView';

import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { FaqModal } from './components/FaqModal';
import { LiveBackground } from './components/LiveBackground';

import { Product, CartLineItem, PageView, ProductVariant, ShopifyCart } from './types';
import { DEFAULT_PRODUCTS } from './data/defaultProducts';
import {
  fetchShopifyProducts,
  fetchShopifyCart,
  addToShopifyCart,
  updateShopifyCartLine,
  removeShopifyCartLines,
  buildShopifyCartPermalink,
} from './utils/shopify';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // Cart state
  const [cartLines, setCartLines] = useState<CartLineItem[]>([]);
  const [cartCheckoutUrl, setCartCheckoutUrl] = useState<string | undefined>(undefined);
  const [isCartLoading, setIsCartLoading] = useState(false);

  // Modals & Navigation state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [shopInitialCategory, setShopInitialCategory] = useState<string>('all');

  // Load products from Shopify Storefront API on mount
  useEffect(() => {
    let isMounted = true;
    async function loadProducts() {
      try {
        setIsLoadingProducts(true);
        const shopifyProducts = await fetchShopifyProducts();
        if (isMounted && shopifyProducts && shopifyProducts.length > 0) {
          setProducts(shopifyProducts);
        }
      } catch (err) {
        console.warn('Using default botanical catalog fallback', err);
      } finally {
        if (isMounted) {
          setIsLoadingProducts(false);
        }
      }
    }
    loadProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  // Restore cart on mount if one exists in localStorage
  useEffect(() => {
    async function loadCart() {
      try {
        const existingCart = await fetchShopifyCart();
        if (existingCart) {
          setCartCheckoutUrl(existingCart.checkoutUrl);
          if (existingCart.lines && existingCart.lines.length > 0) {
            setCartLines(existingCart.lines);
          }
        }
      } catch (err) {
        console.warn('Could not restore previous Shopify cart session', err);
      }
    }
    loadCart();
  }, []);

  const handleNavigate = (page: PageView, category?: string) => {
    if (category) {
      setShopInitialCategory(category);
    } else {
      setShopInitialCategory('all');
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add to Bag
  const handleAddToCart = async (
    product: Product,
    quantity = 1,
    selectedVariant?: ProductVariant
  ) => {
    const variant = selectedVariant || product.variants[0] || {
      id: product.id,
      title: 'Standard',
      price: product.price,
      currencyCode: product.currencyCode,
      availableForSale: true,
    };

    // Update local cart state immediately for instantaneous UX
    setCartLines((prev) => {
      const existingIndex = prev.findIndex((item) => item.variantId === variant.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [
        ...prev,
        {
          id: `local_${Date.now()}_${Math.random()}`,
          variantId: variant.id,
          quantity,
          product,
          selectedVariant: variant,
        },
      ];
    });

    setIsCartOpen(true);

    // Sync with Shopify Storefront Cart API
    try {
      setIsCartLoading(true);
      const updatedCart = await addToShopifyCart(variant.id, quantity);
      if (updatedCart?.checkoutUrl) {
        setCartCheckoutUrl(updatedCart.checkoutUrl);
      }
      if (updatedCart?.lines) {
        setCartLines(updatedCart.lines);
      }
    } catch (e) {
      console.warn('Shopify Cart API sync error:', e);
    } finally {
      setIsCartLoading(false);
    }
  };

  const handleUpdateQuantity = async (lineId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(lineId);
      return;
    }

    setCartLines((prev) =>
      prev.map((item) => (item.id === lineId ? { ...item, quantity } : item))
    );

    try {
      setIsCartLoading(true);
      const updatedCart = await updateShopifyCartLine(lineId, quantity);
      if (updatedCart?.lines) {
        setCartLines(updatedCart.lines);
      }
    } catch (e) {
      console.warn('Shopify Cart update error:', e);
    } finally {
      setIsCartLoading(false);
    }
  };

  const handleRemoveItem = async (lineId: string) => {
    setCartLines((prev) => prev.filter((item) => item.id !== lineId));

    try {
      setIsCartLoading(true);
      const updatedCart = await removeShopifyCartLines([lineId]);
      if (updatedCart?.lines) {
        setCartLines(updatedCart.lines);
      }
    } catch (e) {
      console.warn('Shopify Cart remove line error:', e);
    } finally {
      setIsCartLoading(false);
    }
  };

  const handleCheckout = () => {
    if (cartCheckoutUrl) {
      window.location.href = cartCheckoutUrl;
    } else {
      const items = cartLines.map((l) => ({
        variantId: l.variantId,
        quantity: l.quantity,
      }));
      window.location.href = buildShopifyCartPermalink(items);
    }
  };

  const totalCartCount = cartLines.reduce((sum, item) => sum + item.quantity, 0);

  // Construct structured ShopifyCart model
  const subtotalAmount = cartLines.reduce(
    (sum, item) => sum + item.selectedVariant.price * item.quantity,
    0
  );
  const currentCurrency = cartLines[0]?.selectedVariant.currencyCode || 'USD';

  const shopifyCartObject: ShopifyCart = {
    id: 'active_cart',
    checkoutUrl:
      cartCheckoutUrl ||
      buildShopifyCartPermalink(
        cartLines.map((l) => ({ variantId: l.variantId, quantity: l.quantity }))
      ),
    totalQuantity: totalCartCount,
    lines: cartLines,
    cost: {
      subtotalAmount: {
        amount: String(subtotalAmount),
        currencyCode: currentCurrency,
      },
      totalAmount: {
        amount: String(subtotalAmount),
        currencyCode: currentCurrency,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#0B0908] text-[#F5F0E6] flex flex-col font-sans-body selection:bg-[#D4AF37] selection:text-[#0B0908] antialiased relative">
      {/* 0. Live Botanical Atmosphere Canvas */}
      <LiveBackground />

      {/* 1. Fixed Editorial Header */}
      <Header
        currentPage={currentPage}
        cartCount={totalCartCount}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 2. Dynamic Main Content Canvas */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <div className="animate-fadeIn">
            {/* Section 1: Hero Section */}
            <HeroSection
              onShopClick={() => handleNavigate('shop')}
              onAboutClick={() => handleNavigate('about')}
            />

            {/* Section 2: Magazine Philosophy / Heritage Teaser */}
            <AboutTeaser onAboutClick={() => handleNavigate('about')} />

            {/* Section 3: Shop by Hair Journey (4 Cards + 3 Sub-Collections) */}
            <ShopByNeed onSelectCategory={(cat) => handleNavigate('shop', cat)} />

            {/* Section 4: Featured Formulations (All 3 Botanical Oils) */}
            <FeaturedProducts
              products={products}
              isLoading={isLoadingProducts}
              onSelectProduct={setSelectedProduct}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onViewAll={() => handleNavigate('shop')}
            />

            {/* Section 5: Documented 16-Week Before/After Transformation Slider */}
            <SafeniaRitualSection onShopClick={() => handleNavigate('shop')} />

            {/* Section 7: Editorial Newsletter & Inner Circle */}
            <NewsletterSection />
          </div>
        )}

        {currentPage === 'shop' && (
          <div className="animate-fadeIn">
            <ShopView
              products={products}
              initialCategory={shopInitialCategory}
              onSelectProduct={setSelectedProduct}
              onAddToCart={(p) => handleAddToCart(p, 1)}
            />
          </div>
        )}

        {currentPage === 'about' && (
          <div className="animate-fadeIn">
            <AboutView onShopClick={() => handleNavigate('shop')} />
          </div>
        )}

        {(currentPage === 'care' || currentPage === 'ritual') && (
          <div className="animate-fadeIn">
            <RitualView onShopClick={() => handleNavigate('shop')} />
          </div>
        )}

        {currentPage === 'journal' && (
          <div className="animate-fadeIn">
            <JournalView onShopClick={() => handleNavigate('shop')} />
          </div>
        )}

        {currentPage === 'track' && (
          <div className="animate-fadeIn">
            <TrackOrderView />
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="animate-fadeIn">
            <ContactView />
          </div>
        )}

        {currentPage === '404' && (
          <div className="animate-fadeIn">
            <NotFoundView
              onNavigateHome={() => handleNavigate('home')}
              onNavigateShop={() => handleNavigate('shop')}
            />
          </div>
        )}
      </main>

      {/* 3. Luxury Editorial Botanical Footer */}
      <Footer
        onNavigate={handleNavigate}
      />

      {/* 4. Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 5. Real Shopify Connected Slide-Out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        cart={shopifyCartObject}
        isLoading={isCartLoading}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        onContinueShopping={() => {
          setIsCartOpen(false);
          handleNavigate('shop');
        }}
      />

      {/* 6. Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        products={products}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={setSelectedProduct}
      />

      {/* 7. Botanical FAQ Modal */}
      <FaqModal
        isOpen={isFaqOpen}
        onClose={() => setIsFaqOpen(false)}
      />
    </div>
  );
}

