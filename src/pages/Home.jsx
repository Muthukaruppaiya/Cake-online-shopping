import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import { Sparkles, Heart, Gift, PartyPopper, Cake, Star } from 'lucide-react';

const occasions = [
  { name: 'Birthday', icon: PartyPopper, color: 'bg-rose-50 text-rose-500' },
  { name: 'Anniversary', icon: Heart, color: 'bg-indigo-50 text-indigo-500' },
  { name: 'Wedding', icon: Sparkles, color: 'bg-gold-50 text-gold-500' },
  { name: 'Congratulation', icon: Gift, color: 'bg-emerald-50 text-emerald-500' },
  { name: 'Just Because', icon: Cake, color: 'bg-blue-50 text-blue-500' },
];

const Home = () => {
  return (
    <div className="animate-luxury">
      <Hero />
      
      {/* Occasions Section */}
      <section className="py-24 px-8 bg-[#fcfaf2]">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <p className="text-[10px] font-black text-gold-600 uppercase tracking-[0.4em] mb-4">Shop by Moment</p>
            <h2 className="text-4xl font-bold text-ebony serif italic">Cakes for Every Occasion</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {occasions.map((occ, i) => (
              <button 
                key={i} 
                className="group bg-white p-8 rounded-[3rem] border border-gold-100 hover:border-gold-400 hover:shadow-xl transition-all duration-500 flex flex-col items-center gap-6"
              >
                <div className={`w-16 h-16 ${occ.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                  <occ.icon className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-ebony transition-colors">
                  {occ.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="collection" className="py-32 px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px w-12 bg-gold-400"></div>
                <span className="text-[10px] font-black text-gold-600 uppercase tracking-widest">Our Curated Selection</span>
              </div>
              <h2 className="text-6xl font-bold text-ebony serif leading-tight tracking-tighter">
                The <span className="italic">Signature</span> Collection
              </h2>
            </div>
            <div className="flex gap-4">
              <button className="btn-outline px-8 py-4 text-[10px]">Filter by Taste</button>
              <button className="btn-primary px-8 py-4 text-[10px]">View All Portfolios</button>
            </div>
          </div>
          
          <ProductGrid />
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-32 px-8 bg-ebony text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-900/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold serif italic mb-12 max-w-4xl mx-auto leading-tight">
            We don't just bake cakes; we create the artifacts of your most beautiful memories.
          </h2>
          <div className="h-px w-24 bg-gold-600 mx-auto mb-8"></div>
          <p className="uppercase tracking-[0.5em] font-black text-gold-400 text-[10px]">Hometown Cakes Philosophie</p>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-8 border-y border-gold-50 bg-[#fcfaf2]">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {[
            { label: 'Artisan Quality', desc: 'Handcrafted by master patissiers' },
            { label: 'Secure Delivery', desc: 'Temperature controlled logistics' },
            { label: 'Timely Arrival', desc: 'Guaranteed 4-hour delivery' },
            { label: 'Secure Payments', desc: '100% encrypted transactions' },
          ].map((item, i) => (
            <div key={i} className="text-center md:text-left">
              <Star className="w-5 h-5 text-gold-500 mb-4 mx-auto md:mx-0" />
              <h4 className="text-[10px] font-black uppercase tracking-widest text-ebony mb-2">{item.label}</h4>
              <p className="text-xs text-slate-400 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-32 px-8">
        <div className="container mx-auto max-w-5xl bg-white rounded-[4rem] border border-gold-100 p-16 md:p-24 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-50/50 rounded-full blur-[80px] -translate-x-20 translate-y-20"></div>
          <h2 className="text-5xl font-bold text-ebony serif italic mb-6">Join the Confection Club</h2>
          <p className="text-slate-400 mb-12 max-w-lg mx-auto">Receive exclusive invitations to private tastings and seasonal collection launches.</p>
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-8 py-5 rounded-full border border-gold-100 focus:outline-none focus:ring-4 focus:ring-gold-500/10 transition-all font-medium"
            />
            <button className="btn-primary px-10 py-5 text-sm uppercase tracking-widest font-black">Join</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
