import { Link } from 'react-router-dom';
import { Star, Plus } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useState } from 'react';
import { calculateCakePrice, formatPrice } from '../utils/pricing';

const ProductGrid = ({ categoryFilter = null }) => {
  const { addToCart, cakes } = useShop();
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (id, key, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [id]: { ...prev[id], [key]: value },
    }));
  };

  const activeCakes = cakes.filter((cake) => {
    if (cake.isActive === false) return false;
    if (categoryFilter && cake.section !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 md:gap-12">
      {activeCakes.map((cake) => {
        const defaultWeight = cake.availableWeights?.[0] || '0.5kg';
        const defaultType = cake.allowEggless ? 'Eggless' : 'With Egg';
        const currentOptions = selectedOptions[cake.id] || { weight: defaultWeight, type: defaultType };
        const displayPrice = calculateCakePrice(cake.price, currentOptions.weight);

        const handleAddToCart = () => {
          addToCart({
            ...cake,
            price: displayPrice,
            customizations: currentOptions,
          });
        };

        return (
          <div
            key={cake.id}
            className="group flex flex-col bg-white rounded-2xl md:rounded-[3rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-700 md:hover:-translate-y-2"
          >
            <Link to={`/cake/${cake.id}`} className="relative aspect-square md:aspect-[4/5] overflow-hidden block">
              <img
                src={cake.image}
                alt={cake.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-maroon-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex items-end p-6">
                <span className="w-full bg-yellow-accent text-ebony font-black uppercase tracking-widest text-[10px] py-4 rounded-xl translate-y-10 group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center shadow-xl shadow-yellow-accent/20">
                  View Details
                </span>
              </div>

              {cake.badge && (
                <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-maroon-500 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] shadow-lg">
                  {cake.badge}
                </div>
              )}
            </Link>

            <div className="p-4 md:p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[9px] font-black text-maroon-500 uppercase tracking-[0.3em]">{cake.category}</p>
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                  <Star className="w-3 h-3 fill-yellow-accent text-yellow-accent" />
                  {cake.rating || 5.0}
                </div>
              </div>

              <Link to={`/cake/${cake.id}`}>
                <h3 className="text-base md:text-2xl font-bold text-ebony mb-2 md:serif md:italic tracking-tight group-hover:text-maroon-500 transition-colors line-clamp-2">
                  {cake.name}
                </h3>
              </Link>

              <div className="space-y-3 mb-4 md:mb-8 mt-2 md:mt-4">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Select Weight</p>
                <div className="flex flex-wrap gap-2">
                  {cake.availableWeights?.map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => handleOptionChange(cake.id, 'weight', w)}
                      className={`min-w-[52px] flex-1 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                        currentOptions.weight === w
                          ? 'bg-ebony text-white border-ebony'
                          : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-maroon-500 hover:text-maroon-500'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
                {cake.allowEggless && (
                  <div className="flex gap-2">
                    {['Eggless', 'With Egg'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => handleOptionChange(cake.id, 'type', t)}
                        className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                          currentOptions.type === t
                            ? 'bg-maroon-500 text-white border-maroon-500 shadow-lg shadow-maroon-500/20'
                            : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-maroon-500 hover:text-maroon-500'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-auto pt-4 md:pt-6 border-t border-slate-50 flex justify-between items-end gap-2">
                <div>
                  <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Price</p>
                  <p className="text-xl md:text-2xl font-bold text-ebony md:serif tracking-tighter">
                    {formatPrice(displayPrice)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="bg-maroon-500 text-white p-3 rounded-xl hover:bg-maroon-600 transition-all shrink-0"
                  aria-label="Add to cart"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
