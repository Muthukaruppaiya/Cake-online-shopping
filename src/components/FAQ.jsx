import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How fast can I get a birthday cake delivered in Periyakulam?',
    a: 'Hometown offers 2-hour delivery for standard birthday cakes within our delivery zones. Times may vary slightly with traffic and location.',
  },
  {
    q: 'What types of cakes are available for quick delivery?',
    a: 'Classic flavours like chocolate, butterscotch, red velvet, vanilla, and fruit cakes are usually ready for express delivery in select areas.',
  },
  {
    q: 'Can I order a custom designer cake for a first birthday?',
    a: 'Yes. We create first birthday designer cakes with cartoon, princess, car, or animal themes. Contact us on WhatsApp or order through our custom cake form.',
  },
  {
    q: 'How long does it take to prepare custom cakes?',
    a: 'Smaller themed cakes may be ready in 3 hours. Larger or intricate designs may need 8+ hours for perfect detailing.',
  },
  {
    q: 'Can I personalise a cake with a name or message?',
    a: 'Absolutely. Every Hometown cake can include names, ages, messages, or special decorations on request.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-ebony serif italic text-center mb-10">FAQs</h2>
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-ebony text-sm">{item.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-maroon-500 flex-shrink-0 transition-transform ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === i && (
                <p className="px-5 pb-4 text-sm text-slate-500 leading-relaxed">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
