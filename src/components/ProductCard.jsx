import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { calculateCakePrice, formatPrice } from '../utils/pricing';

const ProductCard = ({ cake, compact = false }) => {
  const productUrl = `/cake/${cake.id}`;
  const defaultWeight = cake.availableWeights?.[0] || '0.5kg';
  const displayPrice = calculateCakePrice(cake.price, defaultWeight);
  const deliveryLabel = cake.deliveryTime || '2 Hr';
  const hasMultipleWeights = (cake.availableWeights?.length ?? 0) > 1;

  if (compact) {
    return (
      <article className="w-full flex flex-col">
        <Link to={productUrl} className="text-left w-full block">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#FFE8DC] via-[#FFEDE8] to-[#FFD4E8] p-2">
            <img
              src={cake.image}
              alt={cake.name}
              className="w-full h-full object-contain drop-shadow-md"
            />
            <span className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
              <Zap className="w-3 h-3 fill-current" />
              {deliveryLabel}
            </span>
          </div>

          <h3 className="mt-2.5 text-[13px] font-bold text-maroon-600 leading-snug line-clamp-1">
            {cake.name}
          </h3>
          {cake.description && (
            <p className="mt-1 text-[11px] text-slate-500 leading-relaxed line-clamp-2">{cake.description}</p>
          )}
          <p className="mt-1.5 text-base font-bold text-ebony">
            {hasMultipleWeights ? (
              <>
                <span className="text-[10px] font-semibold text-slate-400 uppercase">From </span>
                {formatPrice(displayPrice)}
              </>
            ) : (
              formatPrice(displayPrice)
            )}
          </p>
        </Link>

        <Link
          to={productUrl}
          className="w-full mt-2.5 py-3.5 bg-maroon-500 text-white text-[11px] font-bold uppercase tracking-wide rounded-full hover:bg-maroon-600 active:scale-[0.98] transition-all text-center block"
        >
          Buy Now
        </Link>
      </article>
    );
  }

  return (
    <article className="group flex-shrink-0 w-full lg:w-[280px] bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <Link to={productUrl} className="w-full text-left block">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#FFE8DC] to-[#FFD4E8]">
          <img
            src={cake.image}
            alt={cake.name}
            className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          />
          {cake.deliveryTime && (
            <span className="absolute top-3 right-3 flex items-center gap-1 bg-black text-white text-[9px] font-bold px-2.5 py-1 rounded-full">
              <Zap className="w-3 h-3 fill-current" />
              {deliveryLabel}
            </span>
          )}
          {cake.badge && (
            <span className="absolute top-3 left-3 bg-yellow-accent text-ebony text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
              {cake.badge}
            </span>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-bold text-maroon-600 text-sm leading-snug line-clamp-1 group-hover:text-maroon-700 transition-colors">
            {cake.name}
          </h3>
          {cake.description && (
            <p className="mt-1 text-[11px] text-slate-400 leading-relaxed line-clamp-2">{cake.description}</p>
          )}
          <p className="text-lg font-bold text-ebony mt-2">
            {hasMultipleWeights ? (
              <>
                <span className="text-[10px] font-semibold text-slate-400 uppercase block">From</span>
                {formatPrice(displayPrice)}
              </>
            ) : (
              formatPrice(displayPrice)
            )}
          </p>
        </div>
      </Link>

      <div className="px-4 pb-4 -mt-2">
        <Link
          to={productUrl}
          className="w-full py-3.5 bg-maroon-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-maroon-600 transition-colors text-center block"
        >
          Buy Now
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;
