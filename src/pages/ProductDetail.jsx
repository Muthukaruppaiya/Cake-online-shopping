import { useState, useMemo, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Minus, Plus, Maximize2, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { calculateCakePrice, formatPrice, formatWeightLabel } from '../utils/pricing';

const SECTION_LINKS = {
  birthday: { label: '2 Hr Delivery', path: '/#birthday-cakes' },
  'first-birthday': { label: 'First Birthday Cakes', path: '/#first-birthday' },
  kids: { label: 'Kids Birthday Cakes', path: '/#kids-cakes' },
  wedding: { label: 'Wedding Cakes', path: '/#wedding-cakes' },
};

const ProductDetail = () => {
  const { id } = useParams();
  const { cakes, addToCart } = useShop();
  const [weight, setWeight] = useState('');
  const [cakeType, setCakeType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [imageExpanded, setImageExpanded] = useState(false);

  const cake = cakes.find((c) => String(c.id) === String(id) && c.isActive !== false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const weights = cake?.availableWeights?.length ? cake.availableWeights : ['0.5kg'];

  const activeWeight = weight || weights[0];
  const basePrice = cake ? calculateCakePrice(cake.price, weights[0]) : 0;
  const currentPrice = cake ? calculateCakePrice(cake.price, activeWeight) : 0;

  const sectionLink = cake ? SECTION_LINKS[cake.section] : null;

  const defaultType = cake?.allowEggless ? 'Eggless' : 'With Egg';
  const activeType = cakeType || defaultType;

  const longDescription = useMemo(() => {
    if (!cake) return '';
    return [
      cake.description,
      `Our ${cake.name} is handcrafted fresh with premium ingredients and zero preservatives. Perfect for birthdays, celebrations, and special moments in Periyakulam & Theni.`,
      cake.allowEggless
        ? 'Available in eggless and with-egg options. Select your preference and weight below to see the exact price before adding to your basket.'
        : 'Select your preferred weight below to see the exact price before adding to your basket.',
    ].filter(Boolean);
  }, [cake]);

  if (!cake) {
    return <Navigate to="/shop" replace />;
  }

  const handleClearType = () => setCakeType('');
  const canAdd = !cake.allowEggless || cakeType;

  const handleAddToBasket = () => {
    if (!canAdd) return;
    addToCart(
      {
        ...cake,
        price: currentPrice,
        customizations: { weight: activeWeight, type: activeType },
      },
      quantity
    );
  };

  return (
    <div className="bg-white min-h-screen animate-luxury">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 sm:px-8 pt-4 pb-2">
        <nav className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
          <Link to="/" className="hover:text-maroon-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          {sectionLink ? (
            <>
              <a href={sectionLink.path} className="hover:text-maroon-600 transition-colors">
                {sectionLink.label}
              </a>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            </>
          ) : (
            <>
              <Link to="/shop" className="hover:text-maroon-600 transition-colors">
                Shop
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            </>
          )}
          <span className="text-ebony font-medium line-clamp-1">{cake.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 sm:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-square max-w-xl mx-auto lg:mx-0 rounded-lg overflow-hidden bg-gradient-to-br from-[#FFE8DC] via-[#FFEDE8] to-[#FFD4E8]">
              <img
                src={cake.image}
                alt={cake.name}
                className="w-full h-full object-contain p-6"
              />
              <button
                type="button"
                onClick={() => setImageExpanded(true)}
                className="absolute top-4 right-4 w-9 h-9 bg-white rounded-md shadow flex items-center justify-center hover:bg-slate-50 transition-colors"
                aria-label="Expand image"
              >
                <Maximize2 className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="max-w-xl">
            <h1 className="text-2xl sm:text-3xl font-bold text-ebony leading-tight">{cake.name}</h1>

            <p className="mt-4 text-base text-ebony">
              Price start from:{' '}
              <span className="font-bold text-red-600 text-lg">{formatPrice(basePrice)}</span>
            </p>

            {activeWeight !== weights[0] && (
              <p className="mt-1 text-sm text-slate-600">
                Selected ({formatWeightLabel(activeWeight)}):{' '}
                <span className="font-bold text-red-600">{formatPrice(currentPrice)}</span>
              </p>
            )}

            <div className="mt-8 space-y-5">
              {/* Weight */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <label htmlFor="weight-select" className="text-sm font-semibold text-maroon-700 w-28 shrink-0">
                  Weight
                </label>
                <select
                  id="weight-select"
                  value={activeWeight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="flex-1 max-w-md px-4 py-3 border border-slate-200 rounded-lg bg-white text-ebony text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500/20 focus:border-maroon-400 cursor-pointer h-11"
                >
                  {weights.map((w) => (
                    <option key={w} value={w}>
                      {formatWeightLabel(w)} — {formatPrice(calculateCakePrice(cake.price, w))}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cake Type */}
              {cake.allowEggless && (
                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <label htmlFor="type-select" className="text-sm font-semibold text-maroon-700 w-28 shrink-0">
                      Cake Type
                    </label>
                    <div className="flex-1 flex items-center gap-3 max-w-md">
                      <select
                        id="type-select"
                        value={cakeType}
                        onChange={(e) => setCakeType(e.target.value)}
                        className="flex-1 px-4 py-3 border border-slate-200 rounded-lg bg-white text-ebony text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500/20 focus:border-maroon-400 cursor-pointer h-11"
                      >
                        <option value="">Choose an option</option>
                        <option value="Eggless">Eggless</option>
                        <option value="With Egg">With Egg</option>
                      </select>
                      {cakeType && (
                        <button
                          type="button"
                          onClick={handleClearType}
                          className="text-sm text-slate-500 hover:text-maroon-600 underline shrink-0 cursor-pointer py-2"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>
                  {!canAdd && (
                    <div className="flex sm:pl-34 mt-1">
                      <p className="text-xs font-semibold text-red-500">Please select a cake type to continue.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Quantity + Add */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden h-11">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-semibold text-ebony border-x border-slate-200 py-2.5">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-11 h-11 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToBasket}
                  disabled={!canAdd}
                  className="flex-1 min-w-[200px] h-11 px-8 bg-maroon-500 hover:bg-maroon-600 disabled:bg-[#a88194] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-md shadow-maroon-500/10 active:scale-[0.98]"
                >
                  Add to Basket
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
              {longDescription.map((para, i) => (
                <p key={i} className="text-sm text-slate-600 leading-relaxed">
                  {para}
                </p>
              ))}
              <div className="pt-4 border-t border-slate-100/80 flex items-center gap-2 text-slate-400 text-xs">
                <span className="text-[9px] font-black tracking-widest uppercase bg-slate-50 px-2 py-0.5 rounded border border-slate-200/50">FSSAI</span>
                <span>Lic. No. 12423999000123</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen image */}
      {imageExpanded && (
        <div
          className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setImageExpanded(false)}
          role="dialog"
          aria-modal="true"
        >
          <img
            src={cake.image}
            alt={cake.name}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setImageExpanded(false)}
            className="absolute top-4 right-4 text-white text-sm font-medium px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
