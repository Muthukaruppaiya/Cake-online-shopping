import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, Package, Box, Truck, CheckCircle, ArrowLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/pricing';

const TrackOrder = () => {
  const { orders } = useShop();
  const [searchId, setSearchId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const order = orders.find(o => o.id.toLowerCase() === searchId.toLowerCase());
    setTrackedOrder(order || 'NOT_FOUND');
  };

  const statusSteps = ['Placed', 'Accepted', 'Preparing', 'Dispatched', 'Delivered'];
  
  const getStatusIndex = (status) => statusSteps.indexOf(status);

  return (
    <div className="min-h-screen bg-[#fcfaf2] pb-20 px-8">
      <div className="container mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gold-600 mb-12 hover:text-ebony transition-colors">
          <ArrowLeft className="w-3 h-3" /> Back to Shop
        </Link>

        <div className="bg-white rounded-[4rem] border border-gold-100 shadow-2xl p-12 mb-12 text-center overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-50/30 rounded-full blur-[80px] -translate-y-20 translate-x-20"></div>
          
          <h2 className="text-5xl font-bold text-ebony serif italic mb-8">Track Your Masterpiece</h2>
          <form onSubmit={handleSearch} className="max-w-md mx-auto relative group">
            <input 
              type="text" 
              placeholder="Enter Order ID (e.g. ORD-7721)" 
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full pl-8 pr-16 py-6 rounded-full border border-gold-100 bg-gold-50/20 focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold-500/10 transition-all font-bold text-ebony"
            />
            <button type="submit" className="absolute right-2 top-2 bottom-2 bg-ebony text-gold-400 w-12 h-12 flex items-center justify-center rounded-full hover:bg-gold-500 hover:text-white transition-all shadow-xl cursor-pointer">
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

        {trackedOrder === 'NOT_FOUND' && (
          <div className="text-center py-10 bg-rose-50 rounded-3xl border border-rose-100 animate-luxury">
            <p className="text-rose-600 font-bold uppercase tracking-widest text-xs">Order reference not found. Please verify your ID.</p>
          </div>
        )}

        {trackedOrder && trackedOrder !== 'NOT_FOUND' && (
          <div className="bg-white rounded-[4rem] border border-gold-100 shadow-2xl p-12 animate-luxury">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-8 border-b border-gold-50">
              <div>
                <span className="text-[10px] font-black text-gold-600 uppercase tracking-[0.3em] mb-2 block">Tracking Reference</span>
                <h3 className="text-4xl font-bold text-ebony serif italic">{trackedOrder.id}</h3>
              </div>
              <div className="mt-6 md:mt-0 text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Expected Delivery</p>
                <p className="text-xl font-bold text-ebony serif italic">Within 2-4 Hours</p>
              </div>
            </div>

            {/* Tracking Progress */}
            <div className="relative mb-20 px-4">
              <div className="absolute top-6 left-8 right-8 h-px bg-gold-100"></div>
              <div className="flex justify-between relative z-10">
                {[
                  { label: 'Placed', icon: Clock },
                  { label: 'Accepted', icon: CheckCircle },
                  { label: 'Preparing', icon: Box },
                  { label: 'Dispatched', icon: Truck },
                  { label: 'Delivered', icon: CheckCircle }
                ].map((step, i) => {
                  const isActive = getStatusIndex(trackedOrder.status) >= i;
                  return (
                    <div key={i} className="flex flex-col items-center gap-4 group">
                      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${isActive ? 'bg-gold-500 border-gold-500 text-white shadow-xl shadow-gold-200' : 'bg-white border-gold-100 text-slate-300'}`}>
                        <step.icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-widest text-center transition-colors duration-700 ${isActive ? 'text-ebony' : 'text-slate-300'}`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div 
                className="absolute top-6 left-8 h-1 bg-gold-500 transition-all duration-1000 ease-out z-0" 
                style={{ width: `${(getStatusIndex(trackedOrder.status) / (statusSteps.length - 1)) * 100}%`, transform: 'translateY(-1.5px)' }}
              ></div>
            </div>

            {/* Order Details */}
            <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-gold-50">
              <div className="space-y-6">
                <h4 className="text-xs font-black text-gold-600 uppercase tracking-widest">Order Manifest</h4>
                <div className="space-y-4">
                  {trackedOrder.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-sm font-medium">
                      <p className="text-ebony">{item.quantity}x <span className="text-slate-500 italic">{item.name}</span></p>
                      <p className="text-ebony">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-gold-50 flex justify-between items-center">
                    <p className="font-bold text-ebony">Total Amount</p>
                    <p className="text-2xl font-bold text-ebony serif tracking-tighter italic">{formatPrice(trackedOrder.total)}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gold-50/20 p-8 rounded-[2.5rem] border border-gold-100/50">
                <h4 className="text-xs font-black text-gold-600 uppercase tracking-widest mb-6">Logistics Detail</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Recipient</p>
                    <p className="text-sm font-bold text-ebony">{trackedOrder.customer}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Delivery Address</p>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed italic">{trackedOrder.address || 'Address provided during checkout.'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
