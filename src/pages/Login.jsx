import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login, signup } = useShop();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login(email, password);
    } else {
      signup(name, email);
    }
    navigate(-1); // Go back to where they were (usually checkout)
  };

  return (
    <div className="min-h-screen bg-[#fcfaf2] pt-4 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center w-full min-w-0">
      <div className="w-full max-w-lg min-w-0">
        <div className="text-center mb-8 sm:mb-12 px-1">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ebony serif italic mb-4">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-gold-600 text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em]">Experience the Art of Baking</p>
        </div>

        <div className="bg-white rounded-3xl sm:rounded-[3rem] md:rounded-[4rem] border border-gold-100 p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden w-full min-w-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-50 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
          
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gold-600 uppercase tracking-widest pl-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-6 top-5 w-4 h-4 text-gold-400" />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field w-full pl-14" 
                    placeholder="Muthu Karuppaiya" 
                    required 
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gold-600 uppercase tracking-widest pl-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-6 top-5 w-4 h-4 text-gold-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field w-full pl-14" 
                  placeholder="muthu@example.com" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gold-600 uppercase tracking-widest pl-2">Security Password</label>
              <div className="relative">
                <Lock className="absolute left-6 top-5 w-4 h-4 text-gold-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field w-full pl-14" 
                  placeholder="••••••••" 
                  required 
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full py-5 flex items-center justify-center gap-3">
              {isLogin ? 'Authorize Entry' : 'Register Member'} <ArrowRight className="w-4 h-4 text-gold-400" />
            </button>
          </form>

          <div className="mt-10 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-gold-600 transition-colors"
            >
              {isLogin ? "Don't have an account? Create one" : "Already a member? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
