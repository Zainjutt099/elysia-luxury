import { Globe, Share2, Mail } from 'lucide-react';

interface FooterProps {
  onCategorySelect: (category: string) => void;
}

export default function Footer({ onCategorySelect }: FooterProps) {
  return (
    <footer id="boutique-footer" className="bg-[#EAE7E1] border-t border-[#1A1A1A]/10 pt-24 pb-8 text-[#1A1A1A]/70 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Brand Bio */}
        <div className="col-span-1">
          <span
            onClick={() => onCategorySelect('all')}
            className="font-serif text-2xl font-bold text-[#1A1A1A] tracking-[0.15em] cursor-pointer hover:text-[#D44D26] transition-colors"
          >
            ELYSIA
          </span>
          <p className="mt-6 text-xs text-[#1A1A1A]/60 leading-relaxed font-sans">
            Curating the world's most exclusive luxury goods, high-precision timepieces, and raw obsidian desk sculptures for the global connoisseur.
          </p>
        </div>

        {/* Company Links */}
        <div className="flex flex-col gap-3.5">
          <h5 className="text-[11px] font-sans tracking-[0.2em] font-semibold text-[#D44D26] uppercase mb-2">
            Company
          </h5>
          <a href="#" className="text-xs text-[#1A1A1A]/70 hover:text-[#D44D26] transition-colors">Our Story</a>
          <a href="#" className="text-xs text-[#1A1A1A]/70 hover:text-[#D44D26] transition-colors">Craftsmanship</a>
          <a href="#" className="text-xs text-[#1A1A1A]/70 hover:text-[#D44D26] transition-colors">Sustainability</a>
          <a href="#" className="text-xs text-[#1A1A1A]/70 hover:text-[#D44D26] transition-colors">Contact Concierge</a>
        </div>

        {/* Client Services Links */}
        <div className="flex flex-col gap-3.5">
          <h5 className="text-[11px] font-sans tracking-[0.2em] font-semibold text-[#D44D26] uppercase mb-2">
            Client Services
          </h5>
          <a href="#" className="text-xs text-[#1A1A1A]/70 hover:text-[#D44D26] transition-colors">Armored Delivery</a>
          <a href="#" className="text-xs text-[#1A1A1A]/70 hover:text-[#D44D26] transition-colors">Returns & Assurances</a>
          <a href="#" className="text-xs text-[#1A1A1A]/70 hover:text-[#D44D26] transition-colors">Size & Case Guides</a>
          <a href="#" className="text-xs text-[#1A1A1A]/70 hover:text-[#D44D26] transition-colors">Track Secure Package</a>
        </div>

        {/* Connect Links */}
        <div className="flex flex-col gap-3.5">
          <h5 className="text-[11px] font-sans tracking-[0.2em] font-semibold text-[#D44D26] uppercase mb-2">
            Connect
          </h5>
          <div className="flex gap-4 mb-2">
            <span className="p-2 bg-[#F5F2ED] border border-[#1A1A1A]/10 hover:border-[#D44D26] text-[#1A1A1A]/70 hover:text-[#D44D26] rounded-none cursor-pointer transition-colors" title="Global Site">
              <Globe className="w-4 h-4" />
            </span>
            <span className="p-2 bg-[#F5F2ED] border border-[#1A1A1A]/10 hover:border-[#D44D26] text-[#1A1A1A]/70 hover:text-[#D44D26] rounded-none cursor-pointer transition-colors" title="Share Boutique">
              <Share2 className="w-4 h-4" />
            </span>
            <span className="p-2 bg-[#F5F2ED] border border-[#1A1A1A]/10 hover:border-[#D44D26] text-[#1A1A1A]/70 hover:text-[#D44D26] rounded-none cursor-pointer transition-colors" title="Contact Email">
              <Mail className="w-4 h-4" />
            </span>
          </div>
          <a href="#" className="text-xs text-[#1A1A1A]/60 hover:text-[#D44D26] transition-colors mt-1 block">
            Privacy & Guard Policy
          </a>
        </div>
      </div>

      {/* Copy footer */}
      <div className="mt-20 border-t border-[#1A1A1A]/10 pt-8 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.15em] text-[#1A1A1A]/50 gap-4">
        <span>© {new Date().getFullYear()} ELYSIA EXCLUSIVE. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-6 uppercase">
          <a href="#" className="hover:text-[#D44D26] transition-colors">Terms & Conditions</a>
          <a href="#" className="hover:text-[#D44D26] transition-colors">Accessibility Code</a>
        </div>
      </div>
    </footer>
  );
}
