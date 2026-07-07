import { useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Info } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { formatPrice, formatWeightLabel } from '../utils/pricing';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen, cakes, addToCart } = useShop();
  const location = useLocation();

  useEffect(() => {
    setIsCartOpen(false);
  }, [location.pathname, setIsCartOpen]);

  if (!isCartOpen) return null;

  // Filter recommendations: active cakes that are not already in the cart
  const recommendations = cakes
    .filter((cake) => cake.isActive && !cart.some((item) => item.id === cake.id))
    .slice(0, 2);

  const handleAddRecommended = (cake) => {
    addToCart({
      ...cake,
      price: cake.price,
      customizations: {
        weight: cake.availableWeights?.[0] || '0.5kg',
        type: cake.allowEggless ? 'Eggless' : 'With Egg',
      },
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-ebony/40 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Cart Sidebar */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-luxury">
        <div className="p-8 border-b border-gold-50 flex justify-between items-center bg-[#fcfaf2]">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-gold-600" />
            <h2 className="text-2xl font-bold text-ebony serif">Your Basket</h2>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gold-100 rounded-full transition-all cursor-pointer w-9 h-9 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
              <div className="w-24 h-24 bg-gold-50 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-10 h-10 text-gold-400" />
              </div>
              <p className="serif text-xl italic mb-2">Your basket is empty</p>
              <p className="text-xs uppercase tracking-widest font-black">Fill it with sweetness</p>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-8">
                {cart.map((item) => (
                  <div key={`${item.id}-${JSON.stringify(item.customizations)}`} className="flex gap-6 group">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 border border-gold-50 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-bold text-ebony serif italic text-sm">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id, item.customizations)}
                          className="text-slate-300 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Customization Details */}
                      <div className="flex gap-2 text-[8px] font-black uppercase tracking-widest text-gold-600 mb-3 bg-gold-50 w-fit px-2 py-0.5 rounded">
                        <span>{formatWeightLabel(item.customizations?.weight)}</span>
                        <span>•</span>
                        <span>{item.customizations?.type}</span>
                      </div>

                      <p className="text-xs text-slate-500 font-medium mb-3">{formatPrice(item.price)}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 bg-gold-50 rounded-full px-3 py-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.customizations, item.quantity - 1)}
                            className="p-1 hover:bg-white rounded-full transition-all cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-black text-ebony w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.customizations, item.quantity + 1)}
                            className="p-1 hover:bg-white rounded-full transition-all cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-bold text-ebony text-sm">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cross-sell Panel */}
              {recommendations.length > 0 && (
                <div className="pt-8 border-t border-slate-100/80">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Complete Your Celebration</h4>
                  <div className="space-y-4">
                    {recommendations.map((cake) => (
                      <div key={cake.id} className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100 hover:border-maroon-100 transition-all">
                        <img src={cake.image} alt={cake.name} className="w-12 h-12 rounded-xl object-cover bg-white border border-slate-100 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-ebony text-xs truncate">{cake.name}</h5>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">{formatPrice(cake.price)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleAddRecommended(cake)}
                          className="px-3.5 py-1.5 bg-maroon-500 text-white text-[9px] font-black uppercase tracking-wider rounded-lg hover:bg-maroon-600 transition-colors shrink-0 cursor-pointer"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-8 bg-[#fcfaf2] border-t border-gold-100 space-y-6 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
            <div className="bg-white p-4 rounded-2xl border border-gold-100 flex items-start gap-3">
              <Info className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
              <p className="text-[9px] font-medium text-slate-500 leading-relaxed uppercase tracking-wider">
                Customizations like message on cake and delivery slots will be selected in the next step.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-500">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-ebony pt-4 border-t border-gold-100/50">
                <span className="serif">Total Amount</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>
            
            <Link 
              to="/checkout" 
              onClick={() => setIsCartOpen(false)}
              className="btn-primary w-full flex items-center justify-center gap-3 py-5 cursor-pointer"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4 text-gold-400" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

