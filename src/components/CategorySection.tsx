import { CATEGORIES_DATA } from '../data/products';

interface CategorySectionProps {
  onSelectCategory: (category: string) => void;
  activeCategory: string;
}

export default function CategorySection({ onSelectCategory, activeCategory }: CategorySectionProps) {
  return (
    <section id="categories-grid-section" className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-[#F5F2ED]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES_DATA.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <div
              id={`category-card-${cat.id}`}
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`relative group cursor-pointer overflow-hidden aspect-[4/5] border ${
                isActive ? 'border-[#D44D26]' : 'border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30'
              } transition-colors duration-500`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${cat.image}')` }}
                title={cat.description}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/20 to-transparent flex flex-col justify-end p-6 md:p-8">
                <span className="text-[10px] font-sans tracking-[0.2em] text-[#D44D26] uppercase mb-2 block font-semibold">
                  {cat.subtitle}
                </span>
                <h3 className="font-serif text-2xl text-white group-hover:text-[#D44D26] transition-colors">
                  {cat.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
