import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, size?: string) => void;
  onRemoveItem: (productId: string, size?: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div id="cart-drawer-container" className="fixed inset-0 z-50 overflow-hidden">
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
              <ShoppingBag className="w-5 h-5 text-[#D44D26]" />
              <h3 className="font-serif text-lg tracking-wider uppercase text-[#1A1A1A]">
                Shopping Bag ({cartItems.length})
              </h3>
            </div>
            <button
              id="close-cart-btn"
              onClick={onClose}
              className="p-2 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#EAE7E1] rounded-none transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <ShoppingBag className="w-12 h-12 text-[#1A1A1A]/30 mb-4 stroke-[1]" />
                <p className="font-serif text-lg text-[#1A1A1A]/90 mb-1">Your bag is empty</p>
                <p className="text-xs text-[#1A1A1A]/60 max-w-xs font-sans leading-relaxed">
                  Discover curated exquisite garments, skeleton automatic timepieces, and hand-cut obsidian accessories.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-3 bg-[#1A1A1A] hover:bg-[#D44D26] text-[#F5F2ED] text-xs font-semibold tracking-widest uppercase border border-[#1A1A1A]/10 transition-all rounded-none cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {cartItems.map((item) => (
                  <motion.div
                    key={`${item.product.id}-${item.selectedSize || ''}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-4 border-b border-[#1A1A1A]/10 pb-5"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-24 bg-[#EAE7E1] overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif text-sm text-[#1A1A1A] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <span className="font-sans text-sm text-[#D44D26] font-semibold">
                            ${(item.product.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-[10px] text-[#1A1A1A]/60 font-sans tracking-wider space-y-0.5 mt-1">
                          {item.selectedSize && <div>Size: {item.selectedSize}</div>}
                          {item.selectedColor && (
                            <div className="flex items-center gap-1.5">
                              Color: {item.selectedColor.name}
                              <span
                                className="w-2 h-2 rounded-full inline-block"
                                style={{ backgroundColor: item.selectedColor.hex }}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quantity Increments and Trash */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-[#1A1A1A]/10 bg-[#EAE7E1] px-1 py-0.5 rounded-none">
                          <button
                            id={`qty-dec-${item.product.id}`}
                            onClick={() =>
                              onUpdateQuantity(item.product.id, item.quantity - 1, item.selectedSize)
                            }
                            className="p-1 text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-all cursor-pointer"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                          <button
                            id={`qty-inc-${item.product.id}`}
                            onClick={() =>
                              onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedSize)
                            }
                            className="p-1 text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-all cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          id={`remove-cart-item-${item.product.id}`}
                          onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                          className="text-[#1A1A1A]/40 hover:text-[#D44D26] p-1.5 transition-all cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Subtotal and Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-[#1A1A1A]/10 bg-[#EAE7E1]">
              <div className="space-y-2 mb-5">
                <div className="flex justify-between text-xs text-[#1A1A1A]/60 font-sans tracking-widest uppercase">
                  <span>Shipping & Taxes</span>
                  <span className="text-green-700 text-[10px] tracking-normal font-sans font-semibold">
                    Complimentary / Insured
                  </span>
                </div>
                <div className="flex justify-between items-baseline font-serif">
                  <span className="text-[#1A1A1A]/80 text-sm uppercase tracking-wider">Subtotal</span>
                  <span className="text-xl text-[#D44D26] font-sans font-bold">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                id="drawer-checkout-btn"
                onClick={onCheckout}
                className="w-full py-4 bg-[#D44D26] hover:bg-[#D44D26]/90 text-white font-semibold tracking-widest uppercase text-xs transition-all duration-300 flex items-center justify-center gap-2 shadow-md rounded-none cursor-pointer"
              >
                Proceed to Premium Checkout
              </button>

              <div className="text-[10px] text-center text-[#1A1A1A]/50 font-sans tracking-wider mt-3">
                Secure SSL 256-Bit Insured Global Delivery
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
