import { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

const categoryLabels = {
  birthday: 'Birthday Cakes',
  'first-birthday': 'First Birthday Cakes',
  kids: 'Kids Birthday Cakes',
  wedding: 'Wedding Cakes',
};

const Shop = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const { cakes } = useShop();

  const filteredCakes = useMemo(() => {
    return cakes.filter((c) => {
      if (c.isActive === false) return false;
      if (category && c.section !== category) return false;
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.description.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [cakes, category, search]);

  return (
    <div className="py-6 sm:py-12 px-3 sm:px-8 container mx-auto animate-luxury bg-[#FFF8F4] min-h-screen">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-maroon-500 hover:text-ebony mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="mb-6 sm:mb-12 px-1">
        <h1 className="text-lg sm:text-4xl font-bold text-maroon-600 sm:serif sm:italic tracking-tight leading-snug">
          {search ? `Search Results for "${search}"` : (category ? categoryLabels[category] || 'All Cakes' : 'All Cakes')}
        </h1>
        <p className="text-slate-500 mt-1 text-sm">{filteredCakes.length} {filteredCakes.length === 1 ? 'cake' : 'cakes'} available</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:hidden">
        {filteredCakes.map((cake) => (
          <ProductCard key={cake.id} cake={cake} compact />
        ))}
      </div>

      <div className="hidden md:block">
        <ProductGrid categoryFilter={category} />
      </div>
    </div>
  );
};

export default Shop;
