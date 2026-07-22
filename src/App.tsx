import React, { useState } from 'react';
import { Product, CartItem, Review } from './types';
import { PRODUCTS_DATA, REVIEWS_DATA } from './data/products';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Star, Heart, Check, Trash2, ShoppingBag } from 'lucide-react';

// Components
import LiquidGoldShader from './components/LiquidGoldShader';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CategorySection from './components/CategorySection';
import MidnightDropSection from './components/MidnightDropSection';
import NewArrivalsSection from './components/NewArrivalsSection';
import ElysiaExperienceSection from './components/ElysiaExperienceSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import CheckoutModal from './components/CheckoutModal';

export default function App() {
  // Navigation & Drawer States
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Quick View Product State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Floating notifications
  const [notifications, setNotifications] = useState<{ id: string; msg: string; type: 'success' | 'info' }[]>([]);

  const addNotification = (msg: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  // Cart Operations
  const handleAddToBag = (
    product: Product,
    selectedSize?: string,
    selectedColor?: { name: string; hex: string }
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === (selectedSize || (product.sizes?.[0] || ''))
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [
        ...prev,
        {
          product,
          quantity: 1,
          selectedSize: selectedSize || (product.sizes?.[0] || undefined),
          selectedColor: selectedColor || (product.colors?.[0] || undefined),
        },
      ];
    });

    addNotification(`Added "${product.name}" to shopping bag`, 'success');
  };

  const handleUpdateQuantity = (productId: string, quantity: number, size?: string) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            return { ...item, quantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string, size?: string) => {
    setCartItems((prev) => prev.filter((item) => !(item.product.id === productId && item.selectedSize === size)));
    addNotification('Item removed from shopping bag', 'info');
  };

  // Wishlist Operations
  const handleToggleWishlist = (product: Product) => {
    const exists = wishlist.some((p) => p.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      addNotification(`Removed "${product.name}" from saved list`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      addNotification(`Saved "${product.name}" to saved list`, 'success');
    }
  };

  // Filter products for the primary showcase grid
  const filteredProducts = PRODUCTS_DATA.filter((product) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'apparel') {
      return product.category === 'apparel' || product.category === 'accessories';
    }
    return product.category === activeCategory;
  });

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCheckoutSuccess = () => {
    // Clear cart upon successful order authorization
    setCartItems([]);
  };

  const scrollToBoutique = () => {
    const el = document.getElementById('categories-grid-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const wishlistIds = new Set<string>(wishlist.map((p) => p.id));
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F5F2ED] text-[#1A1A1A] selection:bg-[#D44D26]/20 scroll-smooth">
      {/* Floating Notifications Toaster */}
      <div id="toast-toaster" className="fixed bottom-6 left-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className={`p-4 rounded-none shadow-xl border text-xs tracking-wider uppercase font-semibold font-sans flex items-center gap-3 backdrop-blur-md ${
                notif.type === 'success'
                  ? 'bg-[#EAE7E1]/95 border-[#D44D26]/30 text-[#D44D26]'
                  : 'bg-[#EAE7E1]/95 border-[#1A1A1A]/10 text-[#1A1A1A]'
              }`}
            >
              <Check className="w-4 h-4 text-[#D44D26] shrink-0" />
              <span>{notif.msg}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Primary Navigation */}
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onCategorySelect={(category) => {
          setActiveCategory(category);
          if (category !== 'all') {
            setTimeout(() => {
              const showcaseEl = document.getElementById('boutique-curated-showcase');
              if (showcaseEl) showcaseEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          }
        }}
        activeCategory={activeCategory}
      />

      <main className="pt-[76px]">
        {/* HERO SECTION */}
        <section id="hero-showcase" className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* WebGL fluid gold background */}
          <LiquidGoldShader />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5F2ED]/20 via-transparent to-[#F5F2ED]" />

          {/* Centered Editorial Copy */}
          <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col items-center">
            {/* Crown ornament */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="mb-6"
            >
              <Sparkles className="w-6 h-6 text-[#D44D26]/70" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-[0.05em] uppercase text-[#1A1A1A] mb-6 leading-tight select-none"
            >
              THE ART OF LUXURY
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="font-sans text-xs sm:text-sm md:text-base text-[#1A1A1A]/80 tracking-[0.1em] font-light max-w-xl mx-auto mb-10 leading-relaxed"
            >
              Discover a curated world of physical craftsmanship and rarity. Hand-picked exclusives for the high-discerning individual.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.9 }}
            >
              <button
                id="hero-explore-btn"
                onClick={scrollToBoutique}
                className="px-10 py-4.5 bg-[#1A1A1A] text-[#F5F2ED] font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#D44D26] transition-all duration-500 rounded-none flex items-center gap-2 group shadow-xl"
              >
                Shop the Collection
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* 4 FEATURED CATEGORIES SECTION */}
        <CategorySection
          onSelectCategory={(category) => {
            setActiveCategory(category);
            setTimeout(() => {
              const showcaseEl = document.getElementById('boutique-curated-showcase');
              if (showcaseEl) showcaseEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          }}
          activeCategory={activeCategory}
        />

        {/* INTERACTIVE CURATED SHOWCASE */}
        <section id="boutique-curated-showcase" className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-[#F5F2ED]">
          <div className="border-b border-[#1A1A1A]/10 pb-6 mb-12 flex flex-col sm:flex-row justify-between items-baseline gap-4">
            <div>
              <span className="text-[10px] font-sans tracking-[0.25em] text-[#D44D26] uppercase font-semibold mb-2 block">
                {activeCategory === 'all' ? 'Signature selections' : 'Curated catalog'}
              </span>
              <h2 className="font-serif text-2xl md:text-3xl tracking-wide uppercase text-[#1A1A1A]">
                {activeCategory === 'all' ? 'CURATED PIECES' : `BOUTIQUE: ${activeCategory}`}
              </h2>
            </div>

            {/* Quick category filter selector inside showcase */}
            <div className="flex flex-wrap gap-2.5 font-sans text-[10px] tracking-wider uppercase font-semibold">
              {['all', 'shoes', 'watches', 'perfumes', 'bags'].map((cat) => (
                <button
                  id={`showcase-filter-${cat}`}
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 border rounded-none transition-all ${
                    activeCategory === cat
                      ? 'bg-[#1A1A1A] text-[#F5F2ED] border-[#1A1A1A]'
                      : 'bg-transparent text-[#1A1A1A]/60 border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-[#EAE7E1] border border-[#1A1A1A]/10 rounded-none">
              <ShoppingBag className="w-8 h-8 text-[#1A1A1A]/40 mx-auto mb-3" />
              <p className="font-serif text-sm text-[#1A1A1A]/70">Currently preparing rare summer drops for this category.</p>
              <button
                onClick={() => setActiveCategory('all')}
                className="mt-4 text-xs text-[#D44D26] hover:underline font-sans uppercase tracking-widest font-semibold"
              >
                View all items
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={handleQuickView}
                  onAddToBag={handleAddToBag}
                  isWishlisted={wishlistIds.has(product.id)}
                  onToggleWishlist={handleToggleWishlist}
                />
              ))}
            </div>
          )}
        </section>

        {/* MIDNIGHT DROP COUNTDOWN FLASH SALE */}
        <MidnightDropSection
          products={PRODUCTS_DATA}
          onQuickView={handleQuickView}
          onAddToBag={handleAddToBag}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* NEW ARRIVALS HORIZONTAL SCROLLER */}
        <NewArrivalsSection
          products={PRODUCTS_DATA}
          onQuickView={handleQuickView}
          onAddToBag={handleAddToBag}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* THE ELYSIA EXPERIENCE REVIEWS FEED */}
        <ElysiaExperienceSection
          reviews={reviews}
          onAddReview={(newReview) => {
            setReviews((prev) => [newReview, ...prev]);
            addNotification('Review published. Thank you for your feedback.', 'success');
          }}
        />

        {/* THE ELYSIA INSIDER NEWSLETTER */}
        <NewsletterSection />
      </main>

      {/* FOOTER */}
      <Footer onCategorySelect={setActiveCategory} />

      {/* DRAWERS & MODALS */}
      <AnimatePresence>
        {/* Quick View Dialog Modal */}
        {isQuickViewOpen && selectedProduct && (
          <QuickViewModal
            product={selectedProduct}
            isOpen={isQuickViewOpen}
            onClose={() => {
              setIsQuickViewOpen(false);
              setSelectedProduct(null);
            }}
            onAddToBag={handleAddToBag}
            isWishlisted={wishlistIds.has(selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {/* Saved Wishlist Drawer */}
        {isWishlistOpen && (
          <WishlistDrawer
            isOpen={isWishlistOpen}
            onClose={() => setIsWishlistOpen(false)}
            wishlist={wishlist}
            onRemoveItem={handleToggleWishlist}
            onQuickView={handleQuickView}
          />
        )}

        {/* Shopping Cart Drawer */}
        {isCartOpen && (
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={() => {
              setIsCartOpen(false);
              setIsCheckoutOpen(true);
            }}
          />
        )}

        {/* Premium Checkout Process Modal */}
        {isCheckoutOpen && cartItems.length > 0 && (
          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            cartItems={cartItems}
            onSuccess={handleCheckoutSuccess}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
