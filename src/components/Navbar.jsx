import { Search, ShoppingCart, User, Menu, Truck, MapPin, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Navbar = () => {
  const { cartCount, setIsCartOpen, user } = useShop();

  return (
    <nav className="fixed top-0 w-full z-50 glass px-4 md:px-8 py-4 flex items-center justify-between border-b border-slate-100">
      <div className="flex items-center gap-4 md:gap-12">
        <Link to="/" className="text-2xl md:text-3xl font-bold text-maroon-500 serif italic tracking-tighter">
          Hometown<span className="text-yellow-accent">.</span>
        </Link>
        
        <div className="hidden lg:flex items-center gap-8 text-[10px] font-black tracking-[0.2em] uppercase text-ebony/60">
          <Link to="/" className="hover:text-maroon-500 transition-colors">Home</Link>
          <div className="group relative py-4">
            <button className="hover:text-maroon-500 transition-colors flex items-center gap-1">
              Cakes <ChevronDown className="w-3 h-3" />
            </button>
            <div className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-2xl p-6 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 border border-slate-50">
              <div className="space-y-4">
                <Link to="#" className="block hover:text-maroon-500">Xpress (2hr Delivery)</Link>
                <Link to="#" className="block hover:text-maroon-500">Signature Series</Link>
                <Link to="#" className="block hover:text-maroon-500">Handcrafted Masters</Link>
              </div>
            </div>
          </div>
          <Link to="/track" className="hover:text-maroon-500 transition-colors">Track Order</Link>
          <a href="#" className="hover:text-maroon-500 transition-colors">Why CakeBee</a>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* City Selector */}
        <button className="hidden sm:flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 hover:border-maroon-200 transition-all group">
          <MapPin className="w-3.5 h-3.5 text-maroon-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-maroon-600">Periyakulam</span>
          <ChevronDown className="w-3 h-3 text-slate-300" />
        </button>

        <div className="flex items-center gap-4 text-ebony">
          {user ? (
            <Link to="/account" className="flex items-center gap-3 pl-4 pr-6 py-2 bg-maroon-500 text-white rounded-full hover:bg-ebony transition-all group">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-[10px] font-black uppercase">
                {user.name.charAt(0)}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">{user.name.split(' ')[0]}</span>
            </Link>
          ) : (
            <Link to="/login" className="p-2.5 hover:bg-slate-50 rounded-full transition-all group">
              <User className="w-4 h-4 group-hover:text-maroon-500" />
            </Link>
          )}
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="p-2.5 hover:bg-slate-50 rounded-full transition-all relative group"
          >
            <ShoppingCart className="w-4 h-4 group-hover:text-maroon-500" />
            <span className="absolute top-1 right-1 bg-maroon-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-black shadow-sm">
              {cartCount}
            </span>
          </button>
        </div>
        
        <button className="lg:hidden p-2.5 hover:bg-slate-50 rounded-full transition-colors">
          <Menu className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
