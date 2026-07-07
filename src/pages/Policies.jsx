import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Shield, Truck, AlertTriangle, FileText } from 'lucide-react';

const POLICIES = {
  refund: {
    id: 'refund',
    title: 'Refund & Cancellation Policy',
    icon: AlertTriangle,
    content: (
      <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
        <p className="font-semibold text-slate-800">Last updated: July 2026</p>
        <div>
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-2">Order Cancellations</h4>
          <p>
            At Hometown, we bake our cakes fresh to order. You can request a cancellation and receive a full refund up to <strong>24 hours before</strong> your scheduled delivery time. 
          </p>
          <p className="mt-2">
            Cancellations requested within 24 hours of the scheduled delivery time are not eligible for a refund, as raw ingredients are prepared and the cake customization process has already begun.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-2">Modifications</h4>
          <p>
            If you need to change your delivery slot, recipient details, or message on the cake, please contact us via WhatsApp or phone at least <strong>12 hours prior</strong> to the scheduled slot. We will do our absolute best to accommodate your requests.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-2">Refund Processing</h4>
          <p>
            Approved refunds will be processed back to your original payment mode (UPI, Card, Net Banking) within <strong>5 to 7 business days</strong>, in compliance with Indian banking guidelines. For orders where a 30% advance was paid, the advance is non-refundable if canceled within the 24-hour window.
          </p>
        </div>
      </div>
    )
  },
  shipping: {
    id: 'shipping',
    title: 'Shipping & Delivery Policy',
    icon: Truck,
    content: (
      <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
        <p className="font-semibold text-slate-800">Last updated: July 2026</p>
        <div>
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-2">Delivery Serviceability Area</h4>
          <p>
            We operate exclusively within <strong>Periyakulam & Theni (Tamil Nadu, India)</strong> and surrounding towns in the Theni district (pincode prefix range <strong>625xxx</strong>). If your pincode is outside our active delivery zone, we will not be able to deliver, but you may contact us to arrange self-pickup from our Periyakulam atelier.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-2">Delivery Slots & Timeframes</h4>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Standard Delivery:</strong> Delivered within your chosen slot (e.g., 10 AM - 1 PM, 4 PM - 7 PM).</li>
            <li><strong>2-Hour Express:</strong> Available for select catalog cakes (Birthday/Classic categories) within Periyakulam town limits.</li>
            <li><strong>Midnight Delivery (11:30 PM - 12:05 AM):</strong> Subject to a nominal midnight delivery convenience fee. Perfect for surprise birthday celebrations!</li>
            <li><strong>Custom Designer/Wedding Cakes:</strong> Require at least 8 to 24 hours of preparation time.</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-2">Delivery Attempts</h4>
          <p>
            Since cakes are perishable items, we only make <strong>one delivery attempt</strong>. Please ensure the recipient's mobile number is correct and they are available to receive the cake. In case of gate locks or unreachable numbers, the cake will be brought back to our atelier and can be collected by the customer.
          </p>
        </div>
      </div>
    )
  },
  terms: {
    id: 'terms',
    title: 'Terms & Conditions',
    icon: FileText,
    content: (
      <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
        <p className="font-semibold text-slate-800">Last updated: July 2026</p>
        <div>
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-2">Handcrafted Products</h4>
          <p>
            All Hometown products are artisanally handcrafted by our expert pastry chefs. As a result, there may be minor variations in design, color shades, or decorative toppings between the website photo and the delivered cake. 
          </p>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-2">Advance Payments</h4>
          <p>
            When choosing the "30% Advance" option, the customer agrees to pay the remaining 70% balance amount on delivery (either via Cash or UPI scan). Failure to pay the balance on delivery entitles Hometown to withhold the product without refunding the advance.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-2">Allergen Information</h4>
          <p>
            Our products may contain wheat, gluten, milk, and nuts. While we offer a strict eggless cake selection, these are baked in a kitchen that handles ingredients containing eggs. Cross-contamination precautions are taken, but customers with severe allergies should exercise discretion.
          </p>
        </div>
      </div>
    )
  },
  privacy: {
    id: 'privacy',
    title: 'Privacy Policy',
    icon: Shield,
    content: (
      <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
        <p className="font-semibold text-slate-800">Last updated: July 2026</p>
        <div>
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-2">Data We Collect</h4>
          <p>
            To successfully customize and deliver your order, we collect essential details: name, mobile number, delivery address, pincode, email address, occasion, and custom message for the cake.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-2">How We Use Your Data</h4>
          <p>
            Your information is used solely for order processing, logistics coordination (delivery updates), customer care inquiries, and mandatory regulatory invoices. We do not sell or lease your personal information to third parties.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-2">Payment Security</h4>
          <p>
            We partner with industry-standard, PCI-DSS compliant Indian payment gateways. Your credit card, debit card, or UPI credentials are encrypted and never stored on our servers.
          </p>
        </div>
      </div>
    )
  }
};

const Policies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const activeTab = POLICIES[tabParam] ? tabParam : 'refund';

  const handleTabChange = (tabId) => {
    setSearchParams({ tab: tabId });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const SelectedTab = POLICIES[activeTab];
  const IconComponent = SelectedTab.icon;

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 container mx-auto max-w-5xl min-h-screen animate-luxury bg-[#FFF8F4]">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-maroon-500 hover:text-ebony mb-8 sm:mb-12"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <div className="md:col-span-1 space-y-2">
          {Object.values(POLICIES).map((policy) => {
            const IsActive = activeTab === policy.id;
            return (
              <button
                key={policy.id}
                onClick={() => handleTabChange(policy.id)}
                className={`w-full text-left px-5 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider border transition-all flex items-center gap-3 cursor-pointer ${
                  IsActive
                    ? 'bg-maroon-500 text-white border-maroon-500 shadow-md'
                    : 'bg-white text-slate-500 border-slate-100 hover:border-maroon-200'
                }`}
              >
                <policy.icon className="w-4 h-4 shrink-0" />
                <span>{policy.title.split(' ')[0]} Policy</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-xl">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 bg-maroon-50 rounded-full flex items-center justify-center text-maroon-500">
              <IconComponent className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-ebony serif italic">
              {SelectedTab.title}
            </h1>
          </div>
          {SelectedTab.content}
        </div>
      </div>
    </div>
  );
};

export default Policies;
