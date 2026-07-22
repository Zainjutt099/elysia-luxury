import React, { useRef } from 'react';
import { Product } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

interface NewArrivalsSectionProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToBag: (
    product: Product,
    selectedSize?: string,
    selectedColor?: { name: string; hex: string }
  ) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
}

export default function NewArrivalsSection({
  products,
  onQuickView,
  onAddToBag,
  wishlistIds,
  onToggleWishlist,
}: NewArrivalsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const arrivals = products.filter((p) => p.id.startsWith('arrival-'));

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section id="new-arrivals-section" className="py-24 bg-[#F5F2ED] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex justify-between items-end gap-4 border-b border-[#1A1A1A]/10 pb-6">
          <div>
            <span className="text-[10px] font-sans tracking-[0.25em] text-[#D44D26] uppercase font-semibold mb-2 block">
              The Seasonal Edit
            </span>
            <h2 className="font-serif text-3xl md:text-4xl tracking-wide uppercase text-[#1A1A1A]">
              NEW ARRIVALS
            </h2>
          </div>

          {/* Carousel Buttons */}
          <div className="flex gap-3">
            <button
              id="new-arrivals-prev"
              onClick={scrollLeft}
              className="w-11 h-11 rounded-none border border-[#1A1A1A]/10 hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F5F2ED] flex items-center justify-center transition-all bg-[#EAE7E1] text-[#1A1A1A]"
              aria-label="Slide left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              id="new-arrivals-next"
              onClick={scrollRight}
              className="w-11 h-11 rounded-none border border-[#1A1A1A]/10 hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F5F2ED] flex items-center justify-center transition-all bg-[#EAE7E1] text-[#1A1A1A]"
              aria-label="Slide right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroller */}
      <div
        id="arrivals-scroll-container"
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth px-6 md:px-12 max-w-7xl mx-auto pb-6"
      >
        {arrivals.map((product) => (
          <div key={product.id} className="flex-none w-[280px] md:w-[320px]">
            <ProductCard
              product={product}
              onQuickView={onQuickView}
              onAddToBag={onAddToBag}
              isWishlisted={wishlistIds.has(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
