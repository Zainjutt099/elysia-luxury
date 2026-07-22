import { useState, useEffect } from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToBag: (product: Product, selectedSize?: string, selectedColor?: { name: string; hex: string }) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  onAddToBag,
  isWishlisted,
  onToggleWishlist,
}: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | undefined>(undefined);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    if (product) {
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      } else {
        setSelectedSize('');
      }
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      } else {
        setSelectedColor(undefined);
      }
      setSuccessMsg(false);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToBag(product, selectedSize, selectedColor);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
    }, 2500);
  };

  return (
    <div id="quickview-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      {/* Frosted glass backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-md"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="relative w-full max-w-4xl bg-[#F5F2ED] border border-[#1A1A1A]/10 text-[#1A1A1A] rounded-none shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2"
      >
        {/* Close Button */}
        <button
          id="close-quickview-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#EAE7E1] rounded-none transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Section */}
        <div className="relative h-64 md:h-[500px] bg-[#EAE7E1]">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-[#D44D26] text-white px-2.5 py-1 text-[9px] tracking-widest font-semibold uppercase">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Details Section */}
        <div className="p-6 md:p-8 flex flex-col justify-between max-h-[500px] md:max-h-full overflow-y-auto no-scrollbar">
          <div>
            <span className="text-[10px] font-sans text-[#1A1A1A]/60 tracking-widest uppercase mb-1 block">
              {product.subtitle || product.category}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-[#1A1A1A] mb-2">
              {product.name}
            </h2>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-xl font-semibold text-[#D44D26]">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm line-through text-[#1A1A1A]/40">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed font-sans mb-6">
              {product.description}
            </p>

            {/* Colors Picker */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-5">
                <span className="text-[11px] font-sans tracking-wider uppercase text-[#1A1A1A]/60 mb-2 block">
                  Select Accent Color: {selectedColor?.name}
                </span>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      id={`color-picker-${color.name.toLowerCase()}`}
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-6 h-6 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                        selectedColor?.name === color.name
                          ? 'border-[#D44D26] scale-110'
                          : 'border-[#1A1A1A]/10 hover:border-[#1A1A1A]/40'
                      }`}
                      title={color.name}
                    >
                      <span
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color.hex }}
                      />
                      {selectedColor?.name === color.name && (
                        <Check className="w-2.5 h-2.5 text-black absolute inset-0 m-auto mix-blend-difference invert" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes Picker */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <span className="text-[11px] font-sans tracking-wider uppercase text-[#1A1A1A]/60 mb-2 block">
                  Select Size
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      id={`size-picker-${size.toLowerCase().replace(/\s/g, '-')}`}
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-xs font-sans border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-[#1A1A1A] text-[#F5F2ED] border-[#1A1A1A]'
                          : 'bg-transparent text-[#1A1A1A] border-[#1A1A1A]/20 hover:border-[#1A1A1A]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Premium Details Bullets */}
            {product.details && product.details.length > 0 && (
              <div className="mb-6">
                <span className="text-[11px] font-sans tracking-wider uppercase text-[#1A1A1A]/60 mb-2 block">
                  Specifications & Craftsmanship
                </span>
                <ul className="text-xs text-[#1A1A1A]/60 space-y-1.5 list-disc pl-4 font-sans">
                  {product.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex gap-3">
              <button
                id="modal-add-to-bag"
                onClick={handleAdd}
                className="flex-1 py-3.5 bg-[#D44D26] hover:bg-[#D44D26]/90 text-white font-semibold tracking-widest uppercase text-xs transition-all duration-300 flex items-center justify-center gap-2 rounded-none cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Shopping Bag
              </button>

              <button
                id="modal-toggle-wishlist"
                onClick={() => onToggleWishlist(product)}
                className={`p-3.5 border transition-all duration-300 rounded-none cursor-pointer ${
                  isWishlisted
                    ? 'border-[#D44D26] text-[#D44D26] bg-[#D44D26]/5'
                    : 'border-[#1A1A1A]/10 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:border-[#1A1A1A]/40'
                }`}
                title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#D44D26]' : ''}`} />
              </button>
            </div>

            {/* Success addition indicator */}
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-xs text-green-600 font-sans tracking-wider"
              >
                ✓ Added successfully. View your bag to checkout.
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
