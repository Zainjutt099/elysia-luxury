import React, { useState } from 'react';
import { Review } from '../types';
import { Star, MessageSquarePlus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ElysiaExperienceSectionProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export default function ElysiaExperienceSection({
  reviews,
  onAddReview,
}: ElysiaExperienceSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('Verified Collector');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const avatar = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    onAddReview({
      id: 'custom-' + Date.now(),
      name,
      role,
      rating,
      comment,
      avatar: avatar || 'EX',
    });

    setSuccess(true);
    setName('');
    setComment('');
    setTimeout(() => {
      setSuccess(false);
      setShowForm(false);
    }, 2000);
  };

  return (
    <section id="elysia-experience-section" className="py-24 bg-[#EAE7E1] border-t border-b border-[#1A1A1A]/10 text-[#1A1A1A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16 flex flex-col md:flex-row justify-between items-baseline gap-4">
        <div className="text-left">
          <h2 className="font-serif text-3xl md:text-4xl tracking-wide uppercase text-[#1A1A1A] mb-2">
            THE ELYSIA EXPERIENCE
          </h2>
          <p className="font-sans text-xs text-[#1A1A1A]/70 tracking-wider">
            Voices of our discerning community.
          </p>
        </div>

        {/* Form Toggle Button */}
        <button
          id="toggle-review-form"
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-2.5 bg-[#1A1A1A] border border-[#1A1A1A]/10 hover:bg-[#D44D26] hover:border-[#D44D26] text-[#F5F2ED] font-sans text-xs uppercase tracking-widest transition-all rounded-none flex items-center gap-2 cursor-pointer"
        >
          <MessageSquarePlus className="w-3.5 h-3.5" />
          Share Your Experience
        </button>
      </div>

      {/* Submission Form Modal / Block */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="max-w-xl mx-auto px-6 mb-12 overflow-hidden"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[#F5F2ED] border border-[#1A1A1A]/10 p-6 rounded-none space-y-4 shadow-sm"
            >
              <h3 className="font-serif text-md text-[#D44D26] uppercase tracking-wider text-center">
                Submit Boutique Feedback
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-[#1A1A1A]/70 uppercase tracking-widest mb-1">
                    Your Name
                  </label>
                  <input
                    id="review-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#EAE7E1] border border-[#1A1A1A]/10 focus:border-[#D44D26] focus:ring-0 text-[#1A1A1A] text-sm px-3 py-2 rounded-none"
                    placeholder="e.g. Sterling H."
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#1A1A1A]/70 uppercase tracking-widest mb-1">
                    Community Status
                  </label>
                  <select
                    id="review-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-[#EAE7E1] border border-[#1A1A1A]/10 focus:border-[#D44D26] focus:ring-0 text-[#1A1A1A] text-sm px-3 py-2 rounded-none"
                  >
                    <option value="Verified Collector">Verified Collector</option>
                    <option value="Loyalty Member">Loyalty Member</option>
                    <option value="Verified Buyer">Verified Buyer</option>
                    <option value="Connoisseur">Connoisseur</option>
                  </select>
                </div>
              </div>

              {/* Rating selection */}
              <div>
                <label className="block text-[10px] text-[#1A1A1A]/70 uppercase tracking-widest mb-1">
                  Boutique Rating: {rating} / 5 Stars
                </label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      id={`star-btn-${star}`}
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-[#1A1A1A]/40 hover:text-[#D44D26] p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          rating >= star ? 'fill-[#D44D26] text-[#D44D26]' : 'text-[#1A1A1A]/20'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-[#1A1A1A]/70 uppercase tracking-widest mb-1">
                  Experience Review
                </label>
                <textarea
                  id="review-comment"
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-[#EAE7E1] border border-[#1A1A1A]/10 focus:border-[#D44D26] focus:ring-0 text-[#1A1A1A] text-sm px-3 py-2 rounded-none"
                  placeholder="Describe the packaging, shipping times, or material craftsmanship..."
                />
              </div>

              <button
                id="submit-review-btn"
                type="submit"
                className="w-full py-3 bg-[#1A1A1A] hover:bg-[#D44D26] text-[#F5F2ED] font-semibold text-xs uppercase tracking-widest transition-all rounded-none cursor-pointer"
              >
                Publish Review
              </button>

              {success && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-green-600 font-sans mt-2">
                  <Check className="w-3.5 h-3.5" /> Published successfully. Appending to wall.
                </div>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Infinite/Staggered Horizontal Scroller */}
      <div className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth px-6 md:px-12 max-w-7xl mx-auto pb-6">
        {reviews.map((rev) => (
          <div
            id={`review-card-${rev.id}`}
            key={rev.id}
            className="flex-none w-[320px] md:w-[350px] bg-[#F5F2ED] border border-[#1A1A1A]/10 p-6 md:p-8 rounded-none shadow-sm flex flex-col justify-between"
          >
            <div>
              {/* Stars display */}
              <div className="flex text-[#D44D26] mb-4 gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < rev.rating ? 'fill-[#D44D26]' : 'text-[#1A1A1A]/10'}`}
                  />
                ))}
              </div>
              <p className="font-serif text-sm md:text-base italic text-[#1A1A1A]/90 leading-relaxed mb-6">
                "{rev.comment}"
              </p>
            </div>

            {/* Author info */}
            <div className="flex items-center gap-4 border-t border-[#1A1A1A]/10 pt-4">
              <div className="w-10 h-10 rounded-full bg-[#D44D26]/10 border border-[#D44D26]/20 flex items-center justify-center font-sans text-xs tracking-wider text-[#D44D26] font-bold">
                {rev.avatar}
              </div>
              <div>
                <span className="block font-sans text-xs tracking-wider font-semibold text-[#1A1A1A]">
                  {rev.name}
                </span>
                <span className="block font-sans text-[9px] uppercase tracking-widest text-[#1A1A1A]/60 mt-0.5">
                  {rev.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
