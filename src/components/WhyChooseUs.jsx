import { Truck, Palette, Users } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Fastest Delivery',
    desc: '2-hour delivery for standard cakes across Periyakulam & Theni.',
  },
  {
    icon: Palette,
    title: 'Custom Designs',
    desc: 'Princess, cartoon, wedding & kids themes made to order.',
  },
  {
    icon: Users,
    title: 'Trusted by Families',
    desc: 'Fresh, preservative-free cakes loved across South Tamil Nadu.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#fcfaf2]">
      <div className="container mx-auto px-4 sm:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-ebony serif italic mb-12">
          Why Hometown is Theni&apos;s Top Choice for Cakes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center">
              <div className="w-14 h-14 bg-maroon-500 text-white rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-maroon-500/20">
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-ebony mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
