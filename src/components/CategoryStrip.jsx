import { Link } from 'react-router-dom';
import { Cake, Heart, Baby, Sparkles, Truck, Palette } from 'lucide-react';

const categories = [
  { label: '2 Hr Delivery', icon: Truck, href: '#birthday-cakes', highlight: true, isHash: true },
  { label: 'Birthday Cakes', icon: Cake, href: '#birthday-cakes', isHash: true },
  { label: 'First Birthday', icon: Baby, href: '#first-birthday', isHash: true },
  { label: 'Kids Cakes', icon: Sparkles, href: '#kids-cakes', isHash: true },
  { label: 'Wedding Cakes', icon: Heart, href: '#wedding-cakes', isHash: true },
  { label: 'Custom Design', icon: Palette, href: '/shop', isHash: false },
];

const CategoryStrip = () => {
  return (
    <section className="bg-white border-y border-slate-100 py-6">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex gap-3 overflow-x-auto pb-1">
          {categories.map(({ label, icon: Icon, href, highlight, isHash }) => {
            const className = `flex-shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${
              highlight
                ? 'bg-maroon-500 text-white border-maroon-500 shadow-lg shadow-maroon-500/20'
                : 'bg-slate-50 text-slate-600 border-slate-100 hover:border-maroon-300 hover:text-maroon-600'
            }`;
            return isHash ? (
              <a key={label} href={href} className={className}>
                <Icon className="w-4 h-4" />
                {label}
              </a>
            ) : (
              <Link key={label} to={href} className={className}>
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryStrip;
