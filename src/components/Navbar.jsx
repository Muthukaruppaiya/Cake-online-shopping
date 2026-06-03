import { ShoppingCart, User, Menu, MapPin, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: '2 Hr Delivery', href: '/#birthday-cakes' },
  { label: 'Birthday Cakes', href: '/#birthday-cakes' },
  { label: 'Kids Cakes', href: '/#kids-cakes' },
  { label: 'Wedding Cakes', href: '/#wedding-cakes' },
  { label: 'All Cakes', to: '/shop' },
];

const Navbar = () => {
  const { cartCount, setIsCartOpen, user } = useShop();
  const navigate = useNavigate();

  const handleNav = (item) => {
    if (item.href) {
      if (item.href.startsWith('/#')) {
        const hash = item.href.slice(1);
        if (window.location.pathname !== '/') {
          navigate('/');
          setTimeout(() => {
            document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return;
    }
    if (item.to) navigate(item.to);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass px-4 md:px-8 py-4 flex items-center justify-between border-b border-slate-100">
      <div className="flex items-center gap-4 md:gap-10">
        <Link to="/" className="text-2xl md:text-3xl font-bold text-maroon-500 serif italic tracking-tighter">
          Hometown<span className="text-yellow-accent">.</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 text-[10px] font-black tracking-[0.15em] uppercase text-ebony/60">
          {navLinks.map((item) =>
            item.to ? (
              <Link key={item.label} to={item.to} className="hover:text-maroon-500 transition-colors">
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNav(item)}
                className="hover:text-maroon-500 transition-colors"
              >
                {item.label}
              </button>
            )
          )}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="hidden sm:flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 hover:border-maroon-200 transition-all group">
          <MapPin className="w-3.5 h-3.5 text-maroon-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-maroon-600">
            Periyakulam
          </span>
          <ChevronDown className="w-3 h-3 text-slate-300" />
        </button>

        <div className="flex items-center gap-4 text-ebony">
          {user ? (
            <Link
              to="/account"
              className="flex items-center gap-3 pl-4 pr-6 py-2 bg-maroon-500 text-white rounded-full hover:bg-ebony transition-all group"
            >
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
