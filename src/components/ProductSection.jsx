import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const ProductSection = ({ id, title, cakes, seeAllLink }) => {
  if (!cakes?.length) return null;

  const displayCakes = cakes.slice(0, 4);

  return (
    <section id={id} className="py-6 sm:py-12 scroll-mt-24 bg-[#FFF8F4]">
      <div className="container mx-auto px-3 sm:px-8">
        <div className="flex items-start justify-between gap-3 mb-4 sm:mb-8 px-1">
          <h2 className="text-[15px] sm:text-2xl md:text-3xl font-bold text-maroon-600 leading-snug max-w-[70%] sm:max-w-none">
            {title}
          </h2>
          {seeAllLink && (
            <Link
              to={seeAllLink}
              className="text-[13px] sm:text-sm font-bold text-maroon-600 hover:text-maroon-700 whitespace-nowrap pt-0.5 shrink-0"
            >
              See All
            </Link>
          )}
        </div>

        {/* Mobile: 2-column grid (CakeSquare style) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:hidden">
          {displayCakes.map((cake) => (
            <ProductCard key={cake.id} cake={cake} compact />
          ))}
        </div>

        {/* Tablet+: horizontal scroll */}
        <div className="hidden md:flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
          {cakes.map((cake) => (
            <div key={cake.id} className="snap-start flex-shrink-0 w-[260px] lg:w-[280px]">
              <ProductCard cake={cake} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
