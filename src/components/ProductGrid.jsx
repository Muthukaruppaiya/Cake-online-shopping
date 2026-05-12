import { Star, Plus, ArrowRight, Info, EyeOff, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useState } from 'react';

const ProductGrid = () => {
  const { addToCart, cakes } = useShop();
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (id, key, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [id]: { ...prev[id], [key]: value }
    }));
  };

  const handleAddToCart = (cake) => {
    const defaultWeight = cake.availableWeights?.[0] || '0.5kg';
    const defaultType = cake.allowEggless ? 'Eggless' : 'With Egg';
    const options = selectedOptions[cake.id] || { weight: defaultWeight, type: defaultType };
    
    let weightMultiplier = 0;
    if (options.weight === '1kg') weightMultiplier = 600;
    else if (options.weight === '1.5kg') weightMultiplier = 900;
    else if (options.weight === '2kg') weightMultiplier = 1200;
    else if (options.weight === '3kg') weightMultiplier = 1800;

    const finalPrice = Number(cake.price) + weightMultiplier;
    
    addToCart({
      ...cake,
      price: finalPrice,
      customizations: options
    });
  };

  const activeCakes = cakes.filter(cake => cake.isActive !== false);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
      {activeCakes.map((cake) => {
        const defaultWeight = cake.availableWeights?.[0] || '0.5kg';
        const defaultType = cake.allowEggless ? 'Eggless' : 'With Egg';
        const currentOptions = selectedOptions[cake.id] || { weight: defaultWeight, type: defaultType };
        
        return (
          <div key={cake.id} className="group flex flex-col bg-white rounded-[3rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
            {/* Image Section */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={cake.image} alt={cake.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              
              {/* Overlay with Buy Now (Cakebee Style) */}
              <div className="absolute inset-0 bg-maroon-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <button 
                  onClick={() => handleAddToCart(cake)}
                  className="w-full bg-yellow-accent text-ebony font-black uppercase tracking-widest text-[10px] py-4 rounded-xl translate-y-10 group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center gap-2 shadow-xl shadow-yellow-accent/20"
                >
                  <ShoppingBag className="w-4 h-4" /> Quick Reserve
                </button>
              </div>

              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {cake.badge && (
                  <div className="bg-maroon-500 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] shadow-lg">
                    {cake.badge}
                  </div>
                )}
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[9px] font-black text-maroon-500 uppercase tracking-[0.3em]">{cake.category}</p>
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                  <Star className="w-3 h-3 fill-yellow-accent text-yellow-accent" />
                  {cake.rating || 5.0}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-ebony mb-2 serif italic tracking-tight group-hover:text-maroon-500 transition-colors">{cake.name}</h3>
              
              <div className="space-y-4 mb-8 mt-4">
                <div className="flex flex-wrap gap-2">
                  {cake.availableWeights?.map((w) => (
                    <button 
                      key={w}
                      onClick={() => handleOptionChange(cake.id, 'weight', w)}
                      className={`flex-1 min-w-[60px] py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${currentOptions.weight === w ? 'bg-ebony text-white border-ebony' : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-maroon-500 hover:text-maroon-500'}`}
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
                        onClick={() => handleOptionChange(cake.id, 'type', t)}
                        className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${currentOptions.type === t ? 'bg-maroon-500 text-white border-maroon-500 shadow-lg shadow-maroon-500/20' : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-maroon-500 hover:text-maroon-500'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-end">
                <div>
                  <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Pricing starts at</p>
                  <p className="text-2xl font-bold text-ebony serif tracking-tighter">₹{cake.price}</p>
                </div>
                <button 
                  onClick={() => handleAddToCart(cake)}
                  className="bg-slate-50 text-maroon-500 p-3 rounded-xl hover:bg-maroon-500 hover:text-white transition-all border border-slate-100"
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
