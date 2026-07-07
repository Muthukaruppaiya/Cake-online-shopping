import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Package, Truck, LogOut, ChevronRight, Star, Clock, MapPin, Search } from 'lucide-react';

const Account = () => {
  const { user, logout, orders } = useShop();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  const userOrders = orders.filter(o => o.customer === user.name);

  return (
    <div className="min-h-screen bg-[#fcfaf2] pt-4 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 w-full min-w-0">
      <div className="container mx-auto max-w-5xl w-full min-w-0">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-16 gap-6 sm:gap-8">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-gold-400"></div>
              <span className="text-[10px] font-black text-gold-600 uppercase tracking-widest">Client Membership</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ebony serif tracking-tighter italic break-words">Salutations, {user.name.split(' ')[0]}</h2>
          </div>
          <button 
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-rose-500 hover:text-rose-700 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Terminate Session
          </button>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 w-full min-w-0">
          {/* Side Info */}
          <div className="lg:col-span-1 space-y-6 sm:space-y-8 min-w-0">
            <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl sm:rounded-[3rem] border border-gold-100 shadow-sm w-full min-w-0">
              <div className="w-20 h-20 bg-gold-50 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-gold-600 serif italic">{user.name.charAt(0)}</span>
              </div>
              <h3 className="text-xl font-bold text-ebony serif italic mb-2">{user.name}</h3>
              <p className="text-sm text-slate-400 mb-8 font-medium">{user.email}</p>
              <div className="pt-8 border-t border-gold-50 space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Loyalty Tier</span>
                  <span className="text-gold-600 flex items-center gap-1"><Star className="w-3 h-3 fill-gold-600" /> Artisan Elite</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Orders Placed</span>
                  <span className="text-ebony">{userOrders.length}</span>
                </div>
              </div>
            </div>

            <Link to="/track" className="block bg-ebony p-6 sm:p-8 rounded-3xl sm:rounded-[2.5rem] text-gold-400 hover:scale-[1.02] transition-transform shadow-xl shadow-ebony/20 group w-full min-w-0">
              <Search className="w-8 h-8 mb-4 group-hover:rotate-12 transition-transform" />
              <h4 className="text-[10px] font-black uppercase tracking-widest mb-1">Global Tracking</h4>
              <p className="text-xs font-medium text-gold-100/60 leading-relaxed">Search your masterpiece via unique reference ID</p>
            </Link>
          </div>

          {/* Main List */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-black text-gold-600 uppercase tracking-[0.3em] flex items-center gap-3">
                <Package className="w-4 h-4" /> Order Archive
              </h3>
            </div>

            {userOrders.length === 0 ? (
              <div className="bg-white p-10 sm:p-16 md:p-20 rounded-3xl sm:rounded-[4rem] border border-gold-100 text-center opacity-40 w-full min-w-0">
                <Package className="w-12 h-12 mx-auto mb-6 text-gold-400" />
                <p className="serif text-xl italic mb-2">No orders in your archive yet</p>
                <Link to="/" className="text-[10px] font-black uppercase tracking-widest text-gold-600 hover:text-ebony">Browse Collections</Link>
              </div>
            ) : (
              <div className="space-y-6">
                {userOrders.map((order) => (
                  <div key={order.id} className="bg-white p-5 sm:p-8 rounded-3xl sm:rounded-[3rem] border border-gold-100 hover:border-gold-400 transition-all group w-full min-w-0">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="flex gap-6 items-center">
                        <div className="w-16 h-16 bg-gold-50 rounded-2xl flex items-center justify-center shrink-0">
                          <Package className="w-6 h-6 text-gold-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-lg font-bold text-ebony serif italic">{order.id}</span>
                            <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-gold-50 text-gold-600 border-gold-100'}`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{order.date} • {order.items?.length} Items</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                        <div className="text-right">
                          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1 italic">Authorized</p>
                          <p className="text-xl font-bold text-ebony serif tracking-tighter italic">₹{order.total?.toFixed(0)}</p>
                        </div>
                        <Link 
                          to={`/track?id=${order.id}`}
                          className="bg-slate-50 p-4 rounded-2xl text-slate-400 group-hover:bg-ebony group-hover:text-gold-400 transition-all"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
