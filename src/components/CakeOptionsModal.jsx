import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { calculateCakePrice, formatPrice } from '../utils/pricing';

const CakeOptionsModal = () => {
  const { optionsCake, closeCakeOptions, addToCart } = useShop();
  const [weight, setWeight] = useState('');
  const [type, setType] = useState('Eggless');

  const weights = optionsCake?.availableWeights?.length
    ? optionsCake.availableWeights
    : ['0.5kg'];

  useEffect(() => {
    if (!optionsCake) return;
    const pre = optionsCake._preselect;
    setWeight(pre?.weight || optionsCake.availableWeights?.[0] || '0.5kg');
    setType(pre?.type || (optionsCake.allowEggless ? 'Eggless' : 'With Egg'));
  }, [optionsCake]);

  if (!optionsCake) return null;

  const finalPrice = calculateCakePrice(optionsCake.price, weight);

  const handleAddToCart = () => {
    const { _preselect, ...cakeData } = optionsCake;
    addToCart({
      ...cakeData,
      price: finalPrice,
      customizations: { weight, type },
    });
    closeCakeOptions();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeCakeOptions}
        aria-label="Close"
      />

      <div className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto animate-luxury">
        <button
          type="button"
          onClick={closeCakeOptions}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-5 sm:p-6">
          <div className="flex gap-4 items-start pr-8">
            <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden bg-gradient-to-br from-[#FFE8DC] to-[#FFD4E8] p-2">
              <img src={optionsCake.image} alt={optionsCake.name} className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-maroon-600 text-base leading-snug">{optionsCake.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{optionsCake.category}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
              Select Weight
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {weights.map((w) => {
                const priceForWeight = calculateCakePrice(optionsCake.price, w);
                const isSelected = weight === w;
                return (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWeight(w)}
                    className={`py-3 px-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-maroon-500 text-white border-maroon-500 shadow-lg shadow-maroon-500/20'
                        : 'bg-slate-50 border-slate-100 text-ebony hover:border-maroon-300'
                    }`}
                  >
                    <span className="block text-xs font-black uppercase tracking-wider">{w}</span>
                    <span className={`block text-sm font-bold mt-0.5 ${isSelected ? 'text-white/90' : 'text-maroon-600'}`}>
                      {formatPrice(priceForWeight)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {optionsCake.allowEggless && (
            <div className="mt-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                Egg Preference
              </p>
              <div className="flex gap-2">
                {['Eggless', 'With Egg'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                      type === t
                        ? 'bg-ebony text-white border-ebony'
                        : 'bg-slate-50 border-slate-100 text-slate-500'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total</p>
              <p className="text-2xl font-bold text-ebony">{formatPrice(finalPrice)}</p>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              className="px-8 py-3.5 bg-maroon-500 text-white text-[11px] font-bold uppercase tracking-wide rounded-full hover:bg-maroon-600 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakeOptionsModal;
