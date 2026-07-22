import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, ShieldCheck, CreditCard, Sparkles, Check, ChevronRight, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onSuccess: () => void;
}

type CheckoutStep = 'details' | 'processing' | 'success';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onSuccess,
}: CheckoutModalProps) {
  const [step, setStep] = useState<CheckoutStep>('details');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loadingText, setLoadingText] = useState('Initiating secure vault connections...');
  const [orderId, setOrderId] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.08); // 8% luxury tax
  const total = subtotal + tax;

  if (!isOpen) return null;

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) tempErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Invalid email address';
    }
    if (!formData.address.trim()) tempErrors.address = 'Shipping address is required';
    if (!formData.city.trim()) tempErrors.city = 'City is required';
    if (!formData.zip.trim()) tempErrors.zip = 'Zip/Postal code is required';
    if (!formData.cardNumber.trim()) {
      tempErrors.cardNumber = 'Card number is required';
    } else if (formData.cardNumber.replace(/\s/g, '').length < 15) {
      tempErrors.cardNumber = 'Card number must be valid';
    }
    if (!formData.cardExpiry.trim()) tempErrors.cardExpiry = 'Expiry date (MM/YY) is required';
    if (!formData.cardCvc.trim() || formData.cardCvc.length < 3) tempErrors.cardCvc = 'Valid CVC is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Trigger simulation transitions
    setStep('processing');
    setOrderId('ELY-' + Math.floor(100000 + Math.random() * 900000));

    const loadingStages = [
      { text: 'Securing certified 256-bit connection...', delay: 1000 },
      { text: 'Verifying premium credit limits with bank...', delay: 2000 },
      { text: 'Reserving scarce artisanal inventory slots...', delay: 3200 },
      { text: 'Generating smart gold authenticity signature...', delay: 4500 },
      { text: 'Finalizing luxury concierge invoice details...', delay: 5800 },
    ];

    loadingStages.forEach((stage) => {
      setTimeout(() => {
        setLoadingText(stage.text);
      }, stage.delay);
    });

    setTimeout(() => {
      setStep('success');
      onSuccess();
    }, 7200);
  };

  return (
    <div id="checkout-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Dark frosted glass backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={step === 'details' ? onClose : undefined}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Main Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-5xl bg-[#F5F2ED] border border-[#1A1A1A]/10 text-[#1A1A1A] rounded-none shadow-2xl overflow-hidden z-10 grid grid-cols-1 lg:grid-cols-12 max-h-[90vh]"
      >
        {/* Close Button - Only allowed on setup stage */}
        {step === 'details' && (
          <button
            id="close-checkout-btn"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#EAE7E1] rounded-none transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <AnimatePresence mode="wait">
          {step === 'details' && (
            <>
              {/* LEFT COLUMN: Input form (7 cols) */}
              <div className="lg:col-span-7 p-6 md:p-8 overflow-y-auto no-scrollbar max-h-[85vh]">
                <div className="flex items-center gap-2 mb-6">
                  <ShieldCheck className="w-5 h-5 text-[#D44D26]" />
                  <h2 className="font-serif text-xl md:text-2xl tracking-wide uppercase text-[#1A1A1A]">
                    Premium Concierge Checkout
                  </h2>
                </div>

                <form onSubmit={handlePay} className="space-y-6">
                  {/* Shipping Details Section */}
                  <div>
                    <h3 className="text-xs font-sans tracking-widest uppercase text-[#D44D26] mb-4 pb-1 border-b border-[#1A1A1A]/10 font-semibold">
                      01. Delivery & Concierge details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-[11px] font-sans tracking-wider uppercase text-[#1A1A1A]/60 mb-1">
                          Full Name
                        </label>
                        <input
                          id="checkout-fullName"
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full bg-[#F5F2ED] border border-[#1A1A1A]/20 focus:border-[#D44D26] focus:ring-0 rounded-none px-3.5 py-2.5 text-sm outline-none transition-all"
                          placeholder="Your full name"
                        />
                        {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-sans tracking-wider uppercase text-[#1A1A1A]/60 mb-1">
                          Email Address
                        </label>
                        <input
                          id="checkout-email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-[#F5F2ED] border border-[#1A1A1A]/20 focus:border-[#D44D26] focus:ring-0 rounded-none px-3.5 py-2.5 text-sm outline-none transition-all"
                          placeholder="name@exclusive.com"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-sans tracking-wider uppercase text-[#1A1A1A]/60 mb-1">
                          Phone Number (For Delivery Sync)
                        </label>
                        <input
                          id="checkout-phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-[#F5F2ED] border border-[#1A1A1A]/20 focus:border-[#D44D26] focus:ring-0 rounded-none px-3.5 py-2.5 text-sm outline-none transition-all"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-[11px] font-sans tracking-wider uppercase text-[#1A1A1A]/60 mb-1">
                          Shipping Address
                        </label>
                        <input
                          id="checkout-address"
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="w-full bg-[#F5F2ED] border border-[#1A1A1A]/20 focus:border-[#D44D26] focus:ring-0 rounded-none px-3.5 py-2.5 text-sm outline-none transition-all"
                          placeholder="Apartment, suite, street address"
                        />
                        {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-sans tracking-wider uppercase text-[#1A1A1A]/60 mb-1">
                          City
                        </label>
                        <input
                          id="checkout-city"
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full bg-[#F5F2ED] border border-[#1A1A1A]/20 focus:border-[#D44D26] focus:ring-0 rounded-none px-3.5 py-2.5 text-sm outline-none transition-all"
                          placeholder="New York"
                        />
                        {errors.city && <p className="text-xs text-red-400 mt-1">{errors.city}</p>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-sans tracking-wider uppercase text-[#1A1A1A]/60 mb-1">
                          Zip / Postal Code
                        </label>
                        <input
                          id="checkout-zip"
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          className="w-full bg-[#F5F2ED] border border-[#1A1A1A]/20 focus:border-[#D44D26] focus:ring-0 rounded-none px-3.5 py-2.5 text-sm outline-none transition-all"
                          placeholder="10001"
                        />
                        {errors.zip && <p className="text-xs text-red-400 mt-1">{errors.zip}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Payment Info Section */}
                  <div>
                    <h3 className="text-xs font-sans tracking-widest uppercase text-[#D44D26] mb-4 pb-1 border-b border-[#1A1A1A]/10 font-semibold">
                      02. Premium payment authorization
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-4 relative">
                        <label className="block text-[11px] font-sans tracking-wider uppercase text-[#1A1A1A]/60 mb-1">
                          Credit Card Number
                        </label>
                        <div className="relative">
                          <input
                            id="checkout-cardNumber"
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={(e) => {
                              // Auto format spaces
                              const v = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                              setFormData((prev) => ({ ...prev, cardNumber: v.substring(0, 19) }));
                            }}
                            className="w-full bg-[#F5F2ED] border border-[#1A1A1A]/20 focus:border-[#D44D26] focus:ring-0 rounded-none pl-10 pr-3.5 py-2.5 text-sm outline-none transition-all font-mono"
                            placeholder="0000 0000 0000 0000"
                          />
                          <CreditCard className="w-4 h-4 text-[#1A1A1A]/40 absolute left-3.5 top-3.5" />
                        </div>
                        {errors.cardNumber && <p className="text-xs text-red-400 mt-1">{errors.cardNumber}</p>}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-[11px] font-sans tracking-wider uppercase text-[#1A1A1A]/60 mb-1">
                          Expiry Date
                        </label>
                        <input
                          id="checkout-cardExpiry"
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={(e) => {
                            let v = e.target.value.replace(/\//, '');
                            if (v.length > 2) {
                              v = v.substring(0, 2) + '/' + v.substring(2, 4);
                            }
                            setFormData((prev) => ({ ...prev, cardExpiry: v.substring(0, 5) }));
                          }}
                          className="w-full bg-[#F5F2ED] border border-[#1A1A1A]/20 focus:border-[#D44D26] focus:ring-0 rounded-none px-3.5 py-2.5 text-sm outline-none transition-all font-mono"
                          placeholder="MM/YY"
                        />
                        {errors.cardExpiry && <p className="text-xs text-red-400 mt-1">{errors.cardExpiry}</p>}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-[11px] font-sans tracking-wider uppercase text-[#1A1A1A]/60 mb-1">
                          Security Code (CVC)
                        </label>
                        <div className="relative">
                          <input
                            id="checkout-cardCvc"
                            type="password"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={(e) => {
                              const v = e.target.value.replace(/\D/g, '');
                              setFormData((prev) => ({ ...prev, cardCvc: v.substring(0, 4) }));
                            }}
                            className="w-full bg-[#F5F2ED] border border-[#1A1A1A]/20 focus:border-[#D44D26] focus:ring-0 rounded-none pl-3.5 pr-10 py-2.5 text-sm outline-none transition-all font-mono"
                            placeholder="000"
                          />
                          <Lock className="w-3.5 h-3.5 text-[#1A1A1A]/40 absolute right-3.5 top-3.5" />
                        </div>
                        {errors.cardCvc && <p className="text-xs text-red-400 mt-1">{errors.cardCvc}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      id="submit-payment-btn"
                      type="submit"
                      className="w-full py-4 bg-[#D44D26] hover:bg-[#D44D26]/90 text-white font-semibold tracking-widest uppercase text-xs transition-all duration-300 flex items-center justify-center gap-2 rounded-none shadow-md cursor-pointer"
                    >
                      Authorize Payment of ${total.toLocaleString()}
                    </button>
                    <div className="flex items-center justify-center gap-2 mt-3 text-[10px] text-[#1A1A1A]/50 font-sans tracking-wider">
                      <Lock className="w-3 h-3 text-green-700" />
                      SECURE VAULT STORAGE • VERIFIED BY TRUSTEE SECURE
                    </div>
                  </div>
                </form>
              </div>

              {/* RIGHT COLUMN: Order Summary (5 cols) */}
              <div className="lg:col-span-5 p-6 md:p-8 bg-[#EAE7E1] border-t lg:border-t-0 lg:border-l border-[#1A1A1A]/10 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
                <div>
                  <h3 className="text-xs font-sans tracking-widest uppercase text-[#1A1A1A]/60 mb-6 pb-1 border-b border-[#1A1A1A]/10 font-semibold">
                    Order Summary ({cartItems.length} items)
                  </h3>

                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 no-scrollbar mb-6">
                    {cartItems.map((item) => (
                      <div
                        key={`${item.product.id}-${item.selectedSize || ''}`}
                        className="flex gap-3 text-sm pb-4 border-b border-[#1A1A1A]/10"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-14 object-cover bg-[#F5F2ED] rounded-none"
                        />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-serif text-xs text-[#1A1A1A] line-clamp-1">
                              {item.product.name}
                            </h4>
                            <p className="text-[10px] text-[#1A1A1A]/60 font-sans mt-0.5">
                              {item.selectedSize && `Size: ${item.selectedSize}`}
                              {item.selectedSize && item.selectedColor && ' • '}
                              {item.selectedColor && `Color: ${item.selectedColor.name}`}
                            </p>
                          </div>
                          <div className="flex justify-between items-baseline mt-1 text-xs text-[#1A1A1A]/50">
                            <span>Qty: {item.quantity}</span>
                            <span className="font-sans text-[#1A1A1A] font-semibold">
                              ${(item.product.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#1A1A1A]/10 pt-5 space-y-3.5">
                  <div className="flex justify-between text-xs text-[#1A1A1A]/60 font-sans">
                    <span>Subtotal</span>
                    <span className="text-[#1A1A1A] font-medium">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#1A1A1A]/60 font-sans">
                    <span>Luxury Tax (8%)</span>
                    <span className="text-[#1A1A1A] font-medium">${tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#1A1A1A]/60 font-sans">
                    <span>Delivery & Insurance</span>
                    <span className="text-green-700 font-semibold">Complimentary</span>
                  </div>
                  <div className="border-t border-[#1A1A1A]/10 pt-3 flex justify-between items-baseline font-serif">
                    <span className="text-[#1A1A1A] text-sm tracking-wider uppercase font-semibold">Total</span>
                    <span className="text-2xl text-[#D44D26] font-sans font-bold">
                      ${total.toLocaleString()}
                    </span>
                  </div>

                  <div className="bg-[#F5F2ED] p-3 border border-[#1A1A1A]/10 rounded-none mt-4 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#D44D26] flex-shrink-0 mt-0.5" />
                    <div className="text-[10px] text-[#1A1A1A]/70 leading-relaxed font-sans">
                      <span className="text-[#D44D26] block font-bold uppercase mb-0.5">Elysia Authenticity Guarantee</span>
                      All shipments arrive with certified NFC ownership cards, numbered physical certificates, and high-security courier hand-offs.
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 'processing' && (
            <div className="lg:col-span-12 p-12 flex flex-col items-center justify-center text-center h-[500px]">
              <div className="relative w-20 h-20 mb-8">
                {/* Orbiting luxury gold lines */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#D44D26] border-b-[#D44D26]/20"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                  className="absolute inset-1.5 rounded-full border-2 border-transparent border-r-white border-l-white/20"
                />
                <ShieldCheck className="absolute inset-0 m-auto w-8 h-8 text-[#D44D26]" />
              </div>

              <motion.h3
                key={loadingText}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="font-serif text-lg tracking-wider text-[#D44D26] uppercase mb-2"
              >
                Processing Authorized Transaction
              </motion.h3>
              <p className="text-xs text-[#1A1A1A]/60 font-sans tracking-wide max-w-sm leading-relaxed">
                {loadingText}
              </p>
            </div>
          )}

          {step === 'success' && (
            <div className="lg:col-span-12 p-8 md:p-12 text-center flex flex-col items-center max-h-[85vh] overflow-y-auto no-scrollbar">
              <div className="w-16 h-16 bg-[#D44D26]/10 border border-[#D44D26] rounded-none flex items-center justify-center mb-6 text-[#D44D26] shadow-inner">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <span className="text-[10px] text-[#D44D26] tracking-[0.2em] uppercase font-semibold mb-2 block">
                Certificate Of Acquisition
              </span>
              <h2 className="font-serif text-2xl md:text-4xl tracking-wide uppercase mb-3 text-[#1A1A1A]">
                Acquisition Complete
              </h2>
              <p className="text-xs text-[#1A1A1A]/60 font-sans max-w-md leading-relaxed mb-8">
                Excellent selection, {formData.fullName}. Your secure luxury order is successfully placed and registered. A certified digital certificate has been dispatched to <span className="text-[#1A1A1A] font-medium">{formData.email}</span>.
              </p>

              {/* Holographic Styled Invoice Receipt */}
              <div className="w-full max-w-md bg-[#EAE7E1] border border-[#1A1A1A]/10 rounded-none p-6 text-left space-y-4 mb-8 font-sans">
                <div className="flex justify-between items-baseline border-b border-[#1A1A1A]/10 pb-3">
                  <span className="text-[11px] text-[#1A1A1A]/50 tracking-wider uppercase font-semibold">Receipt Registry</span>
                  <span className="font-mono text-sm text-[#D44D26] font-bold">{orderId}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-[#1A1A1A]/60">
                    <span>Acquisition Client</span>
                    <span className="text-[#1A1A1A] font-medium">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between text-[#1A1A1A]/60">
                    <span>Secured Delivery</span>
                    <span className="text-[#1A1A1A] font-medium truncate max-w-[200px]" title={formData.address}>
                      {formData.address}, {formData.city}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#1A1A1A]/60">
                    <span>Acquired Items</span>
                    <span className="text-[#1A1A1A] font-medium">{cartItems.length} Curated Pieces</span>
                  </div>
                </div>

                <div className="border-t border-[#1A1A1A]/10 pt-3 flex justify-between items-baseline font-serif">
                  <span className="text-[11px] tracking-wider uppercase text-[#1A1A1A]/50">Total Charged</span>
                  <span className="text-lg text-[#D44D26] font-sans font-bold">${total.toLocaleString()}</span>
                </div>

                <div className="text-[9px] text-[#1A1A1A]/50 leading-relaxed font-sans text-center border-t border-[#1A1A1A]/10 pt-3">
                  Our private concierge will contact you on <span className="text-[#1A1A1A] font-medium">{formData.phone || 'email'}</span> within 2 hours to coordinate high-security armored transportation and certified unboxing handoffs.
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  id="checkout-success-done"
                  onClick={onClose}
                  className="px-8 py-3.5 bg-[#D44D26] hover:bg-[#D44D26]/90 text-white font-semibold tracking-widest uppercase text-xs transition-all duration-300 rounded-none cursor-pointer"
                >
                  Return to Boutique
                </button>
              </div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
