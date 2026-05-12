import { ArrowRight, Star, Play, Search, MapPin } from 'lucide-react';
import heroImg from '../assets/hero-cake.png';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-20 z-0"></div>
      
      <div className="container mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <div className="space-y-10 animate-luxury">
          <div className="flex items-center gap-3">
            <span className="w-10 h-px bg-maroon-500"></span>
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-maroon-500">Handcrafted with Love</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold text-ebony serif leading-[0.9] tracking-tighter">
            Theni's <br /> 
            <span className="text-maroon-500 italic text-4xl md:text-8xl">Finest Cakes.</span>
          </h1>
          
          <p className="text-slate-500 text-lg max-w-lg leading-relaxed font-medium">
            Discover artisanal cakes baked with zero preservatives, delivering the finest gourmet experience to your doorstep in just 2 hours.
          </p>

          {/* Integrated Search Bar (Hometown Style) */}
          <div className="max-w-xl bg-white p-2 rounded-[2.5rem] shadow-2xl border border-slate-100 flex items-center gap-2 md:gap-4 group focus-within:border-maroon-200 transition-all">
            <div className="hidden sm:flex pl-6 items-center gap-2 text-slate-300 border-r border-slate-100 pr-4">
              <MapPin className="w-4 h-4 text-maroon-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Theni</span>
            </div>
            <div className="flex-1 relative pl-4 md:pl-0">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input 
                type="text" 
                placeholder="Search local flavors..." 
                className="w-full py-4 pl-8 bg-transparent text-sm focus:outline-none placeholder:text-slate-300"
              />
            </div>
            <button className="bg-maroon-500 text-white p-4 rounded-full hover:bg-ebony transition-all shadow-lg">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-12 pt-4">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-ebony serif italic">12k+</span>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Happy Clients</span>
            </div>
            <div className="w-px h-10 bg-slate-100"></div>
            <div className="flex flex-col">
              <div className="flex text-yellow-accent">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">4.9/5 Rating</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-maroon-500/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>
          <img 
            src={heroImg} 
            alt="Signature Cake" 
            className="w-full h-auto drop-shadow-[0_50px_50px_rgba(144,28,59,0.15)] animate-float"
          />
          
          {/* Floating Card */}
          <div className="absolute -bottom-10 -left-10 bg-white/90 backdrop-blur-md p-6 rounded-[2.5rem] shadow-2xl border border-white/50 flex items-center gap-5 animate-bounce-slow">
            <div className="w-14 h-14 bg-maroon-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-maroon-500/20">
              <Play className="w-5 h-5 fill-current ml-1" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Xpress Series</p>
              <p className="font-bold text-ebony serif italic">2 Hour Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
