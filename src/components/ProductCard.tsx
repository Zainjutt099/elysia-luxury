import React, { useState } from 'react';
import { Product } from '../types';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToBag: (
    product: Product,
    selectedSize?: string,
    selectedColor?: { name: string; hex: string }
  ) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export default function ProductCard({
  product,
  onQuickView,
  onAddToBag,
  isWishlisted,
  onToggleWishlist,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      id={`product-card-${product.id}`}
      className="product-card group relative flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-[4/5] bg-[#EAE7E1] mb-4 transition-all duration-500">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-105"
        />

        {/* Favorite Heart Button */}
        <button
          id={`wishlist-toggle-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-4 right-4 z-10 p-2 bg-[#F5F2ED]/90 hover:bg-[#F5F2ED] text-[#1A1A1A] shadow-sm transition-all duration-300 rounded-none border border-[#1A1A1A]/5"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#D44D26] text-[#D44D26]' : 'text-[#1A1A1A]/70 hover:text-[#D44D26]'
            }`}
          />
        </button>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-10 bg-[#D44D26] text-white px-2.5 py-1 text-[10px] tracking-widest font-semibold uppercase">
            {product.badge}
          </div>
        )}

        {/* Quick actions overlay with animations */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#EAE7E1]/95 via-[#EAE7E1]/60 to-transparent flex flex-col gap-2"
            >
              <button
                id={`quick-view-btn-${product.id}`}
                onClick={() => onQuickView(product)}
                className="w-full py-3 bg-[#1A1A1A] hover:bg-[#D44D26] text-[#F5F2ED] font-medium tracking-widest uppercase text-xs transition-colors duration-300 flex items-center justify-center gap-2 shadow-md rounded-none"
              >
                <Eye className="w-3.5 h-3.5" />
                Quick View
              </button>
              <button
                id={`add-to-bag-btn-${product.id}`}
                onClick={() => onAddToBag(product)}
                className="w-full py-3 bg-transparent hover:bg-[#1A1A1A] hover:text-[#F5F2ED] text-[#1A1A1A] font-medium tracking-widest uppercase text-xs border border-[#1A1A1A]/30 transition-all duration-300 flex items-center justify-center gap-2 rounded-none"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Add To Bag
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col">
        {product.subtitle && (
          <span className="text-[10px] font-sans text-[#1A1A1A]/60 tracking-widest uppercase mb-1">
            {product.subtitle}
          </span>
        )}
        <h4 className="font-serif text-[15px] text-[#1A1A1A] group-hover:text-[#D44D26] transition-colors duration-300 mb-1">
          {product.name}
        </h4>
        <div className="flex items-center gap-2.5 mt-0.5">
          <span className="font-sans text-sm font-semibold text-[#D44D26]">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="font-sans text-xs line-through text-[#1A1A1A]/40">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
