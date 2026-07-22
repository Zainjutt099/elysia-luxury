import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, User, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onCategorySelect: (category: string) => void;
  activeCategory: string;
}

export default function Navbar({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onCategorySelect,
  activeCategory,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'all' },
    { label: 'Shoes', id: 'shoes' },
    { label: 'Watches', id: 'watches' },
    { label: 'Perfumes', id: 'perfumes' },
    { label: 'Bags', id: 'bags' },
    { label: 'Apparel & Acc', id: 'apparel' },
  ];

  return (
    <header id="boutique-navbar" className="fixed top-0 inset-x-0 z-40 transition-all duration-500">
      {/* Top micro announcement bar */}
      <div className="bg-[#D44D26]/10 border-b border-[#D44D26]/20 text-[#D44D26] text-[10px] tracking-[0.25em] font-sans uppercase text-center py-2 flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 animate-pulse" />
        Complimentary armored shipping & signature gift wraps on all summer drops
      </div>

      <nav
        className={`w-full py-4 md:py-5 px-6 md:px-12 transition-all duration-500 ${
          isScrolled || mobileMenuOpen
            ? 'bg-[#F5F2ED]/95 backdrop-blur-md border-b border-[#1A1A1A]/10 shadow-sm'
            : 'bg-[#F5F2ED]/60 backdrop-blur-sm border-b border-[#1A1A1A]/5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <button
              id="brand-logo-btn"
              onClick={() => onCategorySelect('all')}
              className="font-serif text-2xl md:text-3xl font-bold tracking-[0.15em] text-[#1A1A1A] hover:text-[#D44D26] transition-colors"
            >
              ELYSIA
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 font-sans text-[11px] tracking-[0.15em] uppercase">
            {navLinks.map((link) => (
              <button
                id={`nav-link-${link.id}`}
                key={link.id}
                onClick={() => onCategorySelect(link.id)}
                className={`transition-colors py-1.5 border-b-2 ${
                  activeCategory === link.id
                    ? 'text-[#D44D26] border-[#D44D26]'
                    : 'text-[#1A1A1A]/70 border-transparent hover:text-[#1A1A1A]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Icons Bar */}
          <div className="flex items-center gap-4 md:gap-5">
            <button
              id="profile-trigger-btn"
              className="p-2 text-[#1A1A1A]/70 hover:text-[#D44D26] transition-colors rounded-full"
              title="Concierge Account"
            >
              <User className="w-4 h-4 md:w-5 h-5" />
            </button>

            {/* Wishlist Button with Counter */}
            <button
              id="wishlist-trigger-btn"
              onClick={onOpenWishlist}
              className="relative p-2 text-[#1A1A1A]/70 hover:text-[#D44D26] transition-colors rounded-full"
              title="View Wishlist"
            >
              <Heart className="w-4 h-4 md:w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#D44D26] text-white text-[9px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#F5F2ED]">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button with Counter */}
            <button
              id="cart-trigger-btn"
              onClick={onOpenCart}
              className="relative p-2 text-[#1A1A1A]/70 hover:text-[#D44D26] transition-colors rounded-full"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 md:w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#D44D26] text-white text-[9px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#F5F2ED]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1A1A1A]/70 hover:text-[#1A1A1A] rounded-full transition-all"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div id="mobile-nav-menu" className="md:hidden border-t border-[#1A1A1A]/10 mt-4 pt-4 pb-6 space-y-4 px-2 font-sans text-xs tracking-widest uppercase">
            {navLinks.map((link) => (
              <button
                id={`mobile-nav-link-${link.id}`}
                key={link.id}
                onClick={() => {
                  onCategorySelect(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2 border-l-2 pl-3 ${
                  activeCategory === link.id
                    ? 'text-[#D44D26] border-[#D44D26] bg-[#D44D26]/5'
                    : 'text-[#1A1A1A]/70 border-transparent hover:text-[#1A1A1A]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
