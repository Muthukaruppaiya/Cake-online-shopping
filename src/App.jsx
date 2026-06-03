import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import Login from './pages/Login';
import Account from './pages/Account';
import Loading from './components/Loading';
import WhatsAppButton from './components/WhatsAppButton';
import CakeOptionsModal from './components/CakeOptionsModal';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-gold-600 cursor-pointer transition-colors"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  if (isAdminPage) {
    return (
      <div className="bg-white min-h-screen">
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Admin />} />
          <Route path="/admin" element={<Navigate to="/admin/login" />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pt-20 min-w-0 w-full">
      <Navbar />
      <Cart />
      <CakeOptionsModal />
      <WhatsAppButton />
      <main className="flex-grow min-w-0 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cake/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-100 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 w-full min-w-0">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 sm:gap-16 w-full min-w-0">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-bold text-ebony serif italic mb-6">Hometown<span className="text-yellow-accent">.</span></h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Crafting premium artisan cakes with zero preservatives. Delivered fresh from our atelier to your doorstep in Periyakulam.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-8 uppercase tracking-widest text-xs">Atelier</h3>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><Link to="/">Home</Link></li>
              <li><a href="/#birthday-cakes">Birthday Cakes</a></li>
              <li><a href="/#wedding-cakes">Wedding Cakes</a></li>
              <li><Link to="/shop">All Cakes</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-8 uppercase tracking-widest text-xs">Inquiries</h3>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li>care@hometowncakes.in</li>
              <li>+91 98765 43210</li>
              <li>Main Road, Periyakulam<br />Theni, Tamil Nadu 625601</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-8 uppercase tracking-widest text-xs">Social</h3>
            <div className="flex gap-4 text-slate-400">
              <InstagramIcon />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ShopProvider>
      {isLoading && <Loading />}
      <Router>
        <AppContent />
      </Router>
    </ShopProvider>
  );
}

export default App;
