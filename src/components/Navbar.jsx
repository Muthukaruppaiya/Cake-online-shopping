import { useState } from 'react';
import { ShoppingCart, User, Menu, Search, X, ChevronRight, Home, CakeSlice, Baby, Star, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const mobileNavLinks = [
  { label: 'Home', icon: Home, to: '/' },
  { label: '2 Hr Delivery', icon: CakeSlice, href: '/#birthday-cakes' },
  { label: 'Birthday Cakes', icon: Star, href: '/#birthday-cakes' },
  { label: 'Kids Cakes', icon: Baby, href: '/#kids-cakes' },
  { label: 'Wedding Cakes', icon: Heart, href: '/#wedding-cakes' },
  { label: 'All Cakes', icon: CakeSlice, to: '/shop' },
];

const Navbar = () => {
  const { cartCount, setIsCartOpen, user } = useShop();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleNav = (item) => {
    setIsDrawerOpen(false);
    if (item.href?.startsWith('/#')) {
      const hash = item.href.slice(1);
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 100);
      } else {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    if (item.to) navigate(item.to);
  };

  return (
    <>
      {/* ─── MOBILE HEADER (two rows) ─── */}
      <header className="fixed top-0 w-full z-50 md:hidden">

        {/* Row 1 — Maroon bar: Logo + Action icons */}
        <div className="bg-maroon-500 px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none">
            <span className="text-white text-[22px] font-black italic tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Hometown
            </span>
            <span className="text-yellow-accent text-[10px] font-bold tracking-[0.25em] uppercase -mt-1">
              Cakes
            </span>
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5 text-maroon-500" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-yellow-accent text-ebony text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account */}
            {user ? (
              <Link
                to="/account"
                className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md"
              >
                <span className="text-maroon-500 text-sm font-black uppercase">{user.name.charAt(0)}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md"
                aria-label="Account"
              >
                <User className="w-5 h-5 text-maroon-500" />
              </Link>
            )}
          </div>
        </div>

        {/* Row 2 — White bar: Hamburger + Search */}
        <div className="bg-white border-b border-slate-100 px-3 py-2.5 flex items-center gap-3">
          {/* Hamburger */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100 shrink-0 cursor-pointer"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5 text-ebony" />
          </button>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Products..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-slate-200 bg-slate-50 text-sm text-ebony font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-maroon-500/20 focus:border-maroon-400"
            />
          </form>
        </div>
      </header>

      {/* ─── DESKTOP HEADER (single row) ─── */}
      <header className="hidden md:flex fixed top-0 w-full z-50 bg-maroon-500 px-8 py-0 items-stretch min-h-[64px]">
        {/* Logo */}
        <Link to="/" className="flex items-center mr-10 shrink-0">
          <span className="text-white text-2xl font-black italic tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Hometown<span className="text-yellow-accent">.</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-6 flex-1">
          {mobileNavLinks.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNav(item)}
              className="text-white/80 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop search */}
        <form onSubmit={handleSearchSubmit} className="flex items-center flex-1 lg:flex-none lg:w-72 mx-6 my-2.5">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Products..."
              className="w-full pl-11 pr-4 py-2 rounded-full bg-white/95 text-sm text-ebony font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-accent/40"
            />
          </div>
        </form>

        {/* Desktop right icons */}
        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all cursor-pointer"
            aria-label="Cart"
          >
            <ShoppingCart className="w-4.5 h-4.5 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-yellow-accent text-ebony text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <Link to="/account" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-full px-4 h-10 transition-all">
              <div className="w-5 h-5 bg-yellow-accent rounded-full flex items-center justify-center text-[10px] font-black text-ebony shrink-0">
                {user.name.charAt(0)}
              </div>
              <span className="text-white text-[10px] font-black uppercase tracking-widest">{user.name.split(' ')[0]}</span>
            </Link>
          ) : (
            <Link to="/login" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all" aria-label="Account">
              <User className="w-4 h-4 text-white" />
            </Link>
          )}

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="lg:hidden w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center cursor-pointer"
          >
            <Menu className="w-4 h-4 text-white" />
          </button>
        </div>
      </header>

      {/* ─── MOBILE DRAWER ─── */}
      {isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-72 bg-white z-[70] shadow-2xl flex flex-col animate-luxury">
            {/* Drawer header */}
            <div className="bg-maroon-500 px-6 py-5 flex items-center justify-between">
              <span className="text-white text-xl font-black italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                Hometown<span className="text-yellow-accent">.</span>
              </span>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 py-4 overflow-y-auto">
              {mobileNavLinks.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNav(item)}
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-maroon-50 text-left group transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <item.icon className="w-4 h-4 text-maroon-500 shrink-0" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-ebony group-hover:text-maroon-600">{item.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-maroon-400 transition-colors" />
                </button>
              ))}
            </nav>

            {/* Drawer footer */}
            <div className="px-6 py-5 border-t border-slate-100 bg-slate-50">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest text-center">
                Hometown Cakes — Periyakulam & Theni
              </p>
            </div>
          </div>
        </>
      )}

      {/* Spacer to push page content below fixed header */}
      <div className="md:hidden h-[108px]" />
      <div className="hidden md:block h-16" />
    </>
  );
};

export default Navbar;
