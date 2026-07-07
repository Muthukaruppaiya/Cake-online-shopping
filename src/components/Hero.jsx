import { Link } from 'react-router-dom';
import { Truck, ArrowRight } from 'lucide-react';
import heroImg from '../assets/hero-cake.png';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-maroon-500 via-maroon-600 to-ebony text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-yellow-accent/30 blur-3xl rounded-full translate-x-1/4" />
      </div>

      <div className="container mx-auto px-4 sm:px-8 py-16 sm:py-20 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-luxury">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold serif leading-tight tracking-tight">
              Best Birthday Cake Designs in Theni
            </h1>

            <p className="text-white/80 text-base sm:text-lg max-w-lg leading-relaxed">
              Order birthday cakes, custom designer cakes & wedding cakes online. Fresh gourmet cakes with zero preservatives — delivered fast to your doorstep.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#birthday-cakes"
                className="inline-flex items-center gap-2 bg-yellow-accent text-ebony px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl"
              >
                Shop Cakes <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 border-2 border-white/40 px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                View All Cakes
              </Link>
            </div>
          </div>

          <div className="relative hidden sm:block">
            <img
              src={heroImg}
              alt="Premium chocolate birthday cake — Hometown Cakes"
              className="w-full max-w-lg mx-auto drop-shadow-2xl animate-float rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
