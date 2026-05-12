import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple mock auth
    if (email === 'admin@hometown.in' && password === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin/dashboard');
    } else {
      alert('Invalid Credentials. Use admin@hometown.in / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-ebony flex items-center justify-center p-6 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold-900/20 rounded-full blur-[120px]"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold-900/20 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white serif italic mb-4 tracking-tighter">Hometown Cakes</h1>
          <p className="text-gold-500 text-[10px] font-black uppercase tracking-[0.4em]">Atelier Management Portal</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-6">
              <div className="relative group">
                <User className="absolute left-6 top-5 w-4 h-4 text-gold-500/50 group-focus-within:text-gold-500 transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all placeholder:text-white/20"
                  placeholder="Administrator Email"
                  required
                />
              </div>
              <div className="relative group">
                <Lock className="absolute left-6 top-5 w-4 h-4 text-gold-500/50 group-focus-within:text-gold-500 transition-colors" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all placeholder:text-white/20"
                  placeholder="Security Password"
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-gold-500 text-ebony font-black uppercase tracking-widest text-xs py-5 rounded-2xl hover:bg-gold-400 transition-all flex items-center justify-center gap-3 shadow-xl shadow-gold-500/20">
              Authorize Access <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          
          <div className="mt-10 text-center">
            <p className="text-[9px] text-white/30 uppercase tracking-[0.2em]">Secure System Terminal • 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
