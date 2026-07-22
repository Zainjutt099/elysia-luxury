import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface MidnightDropSectionProps {
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

export default function MidnightDropSection({
  products,
  onQuickView,
  onAddToBag,
  wishlistIds,
  onToggleWishlist,
}: MidnightDropSectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 8,
    seconds: 43,
  });

  // Simple, elegant countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset countdown to simulate ongoing interest
          return { hours: 14, minutes: 8, seconds: 43 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter products for the Midnight Drop series (IDs starting with 'drop-')
  const dropProducts = products.filter((p) => p.id.startsWith('drop-'));

  const formatNum = (num: number) => num.toString().padStart(2, '0');

  return (
    <section id="midnight-drop-section" className="bg-[#EAE7E1] text-[#1A1A1A] py-24 border-t border-b border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-[#1A1A1A]/10 pb-8 gap-6">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl tracking-wide uppercase text-[#1A1A1A] mb-2">
              THE MIDNIGHT DROP
            </h2>
            <p className="font-sans text-xs text-[#1A1A1A]/70 tracking-wider">
              Exclusive pieces at exceptional values. Ending soon.
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="flex gap-6 self-start md:self-auto">
            <div className="text-center bg-[#F5F2ED] border border-[#1A1A1A]/10 px-4 py-2.5 rounded-none shadow-sm">
              <span id="countdown-hours" className="block font-serif text-2xl text-[#D44D26] font-semibold leading-none">
                {formatNum(timeLeft.hours)}
              </span>
              <span className="font-sans text-[9px] uppercase tracking-wider text-[#1A1A1A]/60 block mt-1">
                Hours
              </span>
            </div>
            <div className="text-center bg-[#F5F2ED] border border-[#1A1A1A]/10 px-4 py-2.5 rounded-none shadow-sm">
              <span id="countdown-minutes" className="block font-serif text-2xl text-[#D44D26] font-semibold leading-none">
                {formatNum(timeLeft.minutes)}
              </span>
              <span className="font-sans text-[9px] uppercase tracking-wider text-[#1A1A1A]/60 block mt-1">
                Minutes
              </span>
            </div>
            <div className="text-center bg-[#F5F2ED] border border-[#1A1A1A]/10 px-4 py-2.5 rounded-none shadow-sm">
              <span id="countdown-seconds" className="block font-serif text-2xl text-[#D44D26] font-semibold leading-none">
                {formatNum(timeLeft.seconds)}
              </span>
              <span className="font-sans text-[9px] uppercase tracking-wider text-[#1A1A1A]/60 block mt-1">
                Seconds
              </span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {dropProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onAddToBag={onAddToBag}
              isWishlisted={wishlistIds.has(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
