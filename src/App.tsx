import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { WhySafenia } from './components/WhySafenia';
import { AboutTeaser } from './components/AboutTeaser';
import { ShopByNeed } from './components/ShopByNeed';
import { MerchandiseSection } from './components/MerchandiseSection';
import { FeaturedProducts } from './components/FeaturedProducts';
import { TrackOrderTeaser } from './components/TrackOrderTeaser';

import { ShopView } from './components/ShopView';
import { AboutView } from './components/AboutView';
import { TrackOrderView } from './components/TrackOrderView';
import { ContactView } from './components/ContactView';

import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { AccountModal } from './components/AccountModal';
import { ShopifySettingsModal } from './components/ShopifySettingsModal';
import { Footer } from './components/Footer';

import { CURRENCIES } from './data/currencies';
import { PRODUCTS } from './data/mockData';
import { Product, CartItem, Currency, ShopifyConfig, PageView, ProductVariant } from './types';
import { getStoredShopifyConfig } from './utils/shopify';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [shopifyConfig, setShopifyConfig] = useState<ShopifyConfig>(getStoredShopifyConfig());
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(CURRENCIES[0]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([PRODUCTS[0].id]);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      quantity: 1,
    },
  ]);

  // Modal & Drawer State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isShopifySettingsOpen, setIsShopifySettingsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [shopInitialCategory, setShopInitialCategory] = useState<string>('all');

  const handleNavigate = (page: PageView, category?: string) => {
    if (category) {
      setShopInitialCategory(category);
    } else {
      setShopInitialCategory('all');
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (
    product: Product,
    quantity = 1,
    selectedVariant?: ProductVariant
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant?.id === selectedVariant?.id
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [
        ...prev,
        {
          product,
          quantity,
          selectedVariant,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F8F5F0] relative font-sans selection:bg-[#BF914A] selection:text-black antialiased">
      {/* Navigation Header */}
      <Header
        currentPage={currentPage}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        selectedCurrency={selectedCurrency}
        shopifyConfig={shopifyConfig}
        onNavigate={handleNavigate}
        onSelectCurrency={setSelectedCurrency}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenShopifyConfig={() => setIsShopifySettingsOpen(true)}
      />

      {/* Main Dynamic View Controller */}
      <main className="min-h-[70vh]">
        {currentPage === 'home' && (
          <div className="space-y-0 animate-fadeIn">
            <HeroSection
              onShopClick={() => handleNavigate('shop')}
              onAboutClick={() => handleNavigate('about')}
            />
            <WhySafenia />
            <AboutTeaser onAboutClick={() => handleNavigate('about')} />
            <ShopByNeed onSelectCategory={(cat) => handleNavigate('shop', cat)} />
            <FeaturedProducts
              products={PRODUCTS}
              selectedCurrency={selectedCurrency}
              onSelectProduct={setSelectedProduct}
              onAddToCart={handleAddToCart}
              onViewAll={() => handleNavigate('shop')}
            />
            <TrackOrderTeaser
              onTrackClick={() => handleNavigate('track')}
            />
          </div>
        )}

        {currentPage === 'shop' && (
          <div className="animate-fadeIn">
            <ShopView
              products={PRODUCTS}
              selectedCurrency={selectedCurrency}
              shopifyConfig={shopifyConfig}
              initialCategory={shopInitialCategory}
              onSelectProduct={setSelectedProduct}
              onAddToCart={handleAddToCart}
            />
          </div>
        )}

        {currentPage === 'about' && (
          <div className="animate-fadeIn">
            <AboutView
              onShopClick={() => handleNavigate('shop')}
              onContactClick={() => handleNavigate('contact')}
            />
          </div>
        )}

        {currentPage === 'track' && (
          <div className="animate-fadeIn">
            <TrackOrderView
              shopifyConfig={shopifyConfig}
              onContactClick={() => handleNavigate('contact')}
            />
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="animate-fadeIn">
            <ContactView />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenShopifyConfig={() => setIsShopifySettingsOpen(true)}
      />

      {/* Modals & Overlays */}
      <ProductDetailModal
        product={selectedProduct}
        selectedCurrency={selectedCurrency}
        shopifyConfig={shopifyConfig}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(prod, qty, variant) => {
          handleAddToCart(prod, qty, variant);
          setSelectedProduct(null);
        }}
        onToggleWishlist={handleToggleWishlist}
      />

      <CartDrawer
        isOpen={isCartOpen}
        cartItems={cartItems}
        selectedCurrency={selectedCurrency}
        shopifyConfig={shopifyConfig}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {}}
        onOpenShopifyConfig={() => {
          setIsCartOpen(false);
          setIsShopifySettingsOpen(true);
        }}
      />

      <AccountModal
        isOpen={isAccountOpen}
        shopifyConfig={shopifyConfig}
        onClose={() => setIsAccountOpen(false)}
        onOpenShopifyConfig={() => {
          setIsAccountOpen(false);
          setIsShopifySettingsOpen(true);
        }}
      />

      <ShopifySettingsModal
        isOpen={isShopifySettingsOpen}
        config={shopifyConfig}
        onClose={() => setIsShopifySettingsOpen(false)}
        onUpdateConfig={setShopifyConfig}
      />
    </div>
  );
}
