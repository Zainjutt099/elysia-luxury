import React, { useState } from 'react';
import { Mail, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <section id="newsletter-signup-section" className="py-24 bg-[#F5F2ED] text-[#1A1A1A] border-t border-[#1A1A1A]/10">
      <div className="max-w-3xl mx-auto text-center px-6">
        <span className="text-[10px] font-sans tracking-[0.25em] text-[#D44D26] uppercase font-semibold mb-4 block">
          Newsletter
        </span>
        <h2 className="font-serif text-3xl md:text-5xl tracking-wide uppercase mb-4 text-[#1A1A1A]">
          THE ELYSIA INSIDER
        </h2>
        <p className="font-sans text-xs md:text-sm text-[#1A1A1A]/70 max-w-lg mx-auto mb-10 leading-relaxed tracking-wide">
          Be the first to access exclusive limited-edition collections, private digital drops, and invite-only global luxury events.
        </p>

        <AnimatePresence mode="wait">
          {!subscribed ? (
            <motion.form
              key="newsletter-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row items-stretch gap-4 max-w-lg mx-auto"
            >
              <div className="relative flex-1">
                <input
                  id="newsletter-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL"
                  className="w-full bg-transparent border-b border-[#1A1A1A]/20 focus:border-[#D44D26] focus:ring-0 px-1 py-4 font-sans text-xs tracking-widest outline-none transition-all uppercase text-[#1A1A1A]"
                />
                <Mail className="w-4 h-4 text-[#1A1A1A]/40 absolute right-2 top-4" />
              </div>
              <button
                id="newsletter-submit-btn"
                type="submit"
                className="px-10 py-4 bg-[#1A1A1A] hover:bg-[#D44D26] text-[#F5F2ED] font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-none cursor-pointer"
              >
                Join
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="newsletter-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#D44D26]/10 border border-[#D44D26]/20 max-w-lg mx-auto p-6 rounded-none"
            >
              <div className="flex items-center justify-center gap-2 text-[#D44D26] font-serif text-lg uppercase tracking-wider mb-2">
                <Check className="w-5 h-5 stroke-[2]" />
                <span className="font-semibold text-sm">Welcome to Elysia Insider</span>
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <p className="text-[11px] text-[#1A1A1A]/70 font-sans tracking-wide leading-relaxed">
                Your credentials are encrypted and logged in our VIP register. You will receive private digital invitations to drops prior to public listings.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
