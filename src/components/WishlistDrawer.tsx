import { Product } from '../types';
import { X, Heart, ShoppingBag, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveItem: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  onRemoveItem,
  onQuickView,
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  return (
    <div id="wishlist-drawer-container" className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark frosted glass backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-out Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
          className="w-screen max-w-md bg-[#F5F2ED] border-l border-[#1A1A1A]/10 text-[#1A1A1A] flex flex-col h-full shadow-2xl"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#1A1A1A]/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-[#D44D26] fill-[#D44D26]" />
              <h3 className="font-serif text-lg tracking-wider uppercase text-[#1A1A1A]">
                Saved Exclusives ({wishlist.length})
              </h3>
            </div>
            <button
              id="close-wishlist-btn"
              onClick={onClose}
              className="p-2 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#EAE7E1] rounded-none transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <Heart className="w-12 h-12 text-[#1A1A1A]/30 mb-4 stroke-[1]" />
                <p className="font-serif text-lg text-[#1A1A1A]/90 mb-1">Your wishlist is empty</p>
                <p className="text-xs text-[#1A1A1A]/60 max-w-xs font-sans leading-relaxed">
                  Mark items with the heart icon while exploring to curate your private gallery of luxury.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-3 bg-[#1A1A1A] hover:bg-[#D44D26] text-[#F5F2ED] text-xs font-semibold tracking-widest uppercase border border-[#1A1A1A]/10 transition-all rounded-none cursor-pointer"
                >
                  Discover Exclusives
                </button>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {wishlist.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-4 border-b border-[#1A1A1A]/10 pb-5"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-24 bg-[#EAE7E1] overflow-hidden flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif text-sm text-[#1A1A1A] line-clamp-1">
                            {product.name}
                          </h4>
                          <span className="font-sans text-sm text-[#D44D26] font-semibold">
                            ${product.price.toLocaleString()}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#1A1A1A]/60 font-sans tracking-wider uppercase mt-1 block">
                          {product.subtitle || product.category}
                        </span>
                      </div>

                      {/* Interactive Actions */}
                      <div className="flex items-center justify-between mt-2">
                        <button
                          id={`wishlist-quickview-${product.id}`}
                          onClick={() => {
                            onQuickView(product);
                            onClose();
                          }}
                          className="text-xs text-[#1A1A1A]/80 hover:text-[#D44D26] flex items-center gap-1.5 font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View Options
                        </button>

                        <button
                          id={`wishlist-remove-${product.id}`}
                          onClick={() => onRemoveItem(product)}
                          className="text-[#1A1A1A]/40 hover:text-[#D44D26] p-1.5 transition-all text-xs flex items-center gap-1 cursor-pointer"
                          title="Remove item"
                        >
                          <X className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
