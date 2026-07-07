import { Link } from 'react-router-dom';
import { Cake, Heart, Baby, Sparkles, Palette } from 'lucide-react';

const categories = [
  { label: 'Birthday Cakes', icon: Cake, href: '#birthday-cakes', isHash: true },
  { label: 'First Birthday', icon: Baby, href: '#first-birthday', isHash: true },
  { label: 'Kids Cakes', icon: Sparkles, href: '#kids-cakes', isHash: true },
  { label: 'Wedding Cakes', icon: Heart, href: '#wedding-cakes', isHash: true },
  { label: 'Custom Design', icon: Palette, href: '/shop', isHash: false },
];

const CategoryStrip = () => {
  return (
    <section className="bg-white border-y border-slate-100 py-5 relative">
      <div className="relative">
        {/* Left Fade Overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        
        {/* Scrollable Container */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 px-6 sm:px-8">
          {categories.map(({ label, icon: Icon, href, highlight, isHash }) => {
            const cls = `flex-shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${
              highlight
                ? 'bg-maroon-500 text-white border-maroon-500 shadow-lg shadow-maroon-500/20'
                : 'bg-slate-50 text-slate-600 border-slate-100 hover:border-maroon-300 hover:text-maroon-600'
            }`;
            return isHash ? (
              <a key={label} href={href} className={cls}>
                <Icon className="w-4 h-4" />
                {label}
              </a>
            ) : (
              <Link key={label} to={href} className={cls}>
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right Fade Overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

export default CategoryStrip;
