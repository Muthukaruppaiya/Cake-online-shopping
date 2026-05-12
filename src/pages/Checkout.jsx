import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  CreditCard, Truck, ShieldCheck, ArrowLeft, CheckCircle2, 
  Clipboard, Calendar, Clock, MessageSquare, MapPin, 
  Store, Gift, Star, Download, PartyPopper, User, Mail, Lock
} from 'lucide-react';

const accessoriesList = [
  { id: 'acc1', name: 'Metallic Balloons (Set of 10)', price: 250, icon: PartyPopper },
  { id: 'acc2', name: 'Premium Gold Candles', price: 90, icon: Star },
  { id: 'acc3', name: 'Birthday Sash & Crown', price: 350, icon: Gift },
  { id: 'acc4', name: 'Sparkler Candle', price: 120, icon: Star },
];

const Checkout = () => {
  const { cart, cartTotal, placeOrder, user, login, signup } = useShop();
  const navigate = useNavigate();
  
  // Steps: 0: Auth (if needed), 1: Logistics, 2: Accessories, 3: Payment, 4: Success
  const [step, setStep] = useState(user ? 1 : 0); 
  const [orderId, setOrderId] = useState('');
  const [loadingPincode, setLoadingPincode] = useState(false);
  
  // Auth State
  const [isLoginView, setIsLoginView] = useState(true);
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });

  const [details, setDetails] = useState({
    name: user?.name || '',
    mobile: '',
    pincode: '',
    line1: '',
    city: '',
    state: '',
    location: '',
    method: 'Delivery',
    date: '',
    time: '10:00 AM - 01:00 PM',
    message: '',
    occasion: 'Birthday',
    recipientName: '',
    paymentMode: 'Full',
    selectedAccessories: []
  });

  useEffect(() => {
    if (user && step === 0) {
      setStep(1);
      setDetails(prev => ({ ...prev, name: user.name }));
    }
  }, [user, step]);

  const handleAuth = (e) => {
    e.preventDefault();
    if (isLoginView) {
      login(authForm.email, authForm.password);
    } else {
      signup(authForm.name, authForm.email);
    }
    // Step will be updated by the useEffect above
  };

  const handlePincodeSearch = (code) => {
    if (code.length === 6) {
      setLoadingPincode(true);
      setTimeout(() => {
        setDetails(prev => ({
          ...prev,
          city: 'Periyakulam',
          state: 'Theni',
          location: code.startsWith('625') ? 'Main Town Area' : 'Theni District'
        }));
        setLoadingPincode(false);
      }, 800);
    }
  };

  const toggleAccessory = (acc) => {
    setDetails(prev => {
      const exists = prev.selectedAccessories.find(a => a.id === acc.id);
      if (exists) {
        return { ...prev, selectedAccessories: prev.selectedAccessories.filter(a => a.id !== acc.id) };
      }
      return { ...prev, selectedAccessories: [...prev.selectedAccessories, acc] };
    });
  };

  const accessoryTotal = details.selectedAccessories.reduce((sum, a) => sum + a.price, 0);
  const grandTotal = (cartTotal + accessoryTotal) * 1.18;
  const advanceAmount = grandTotal * 0.3;

  const handlePlaceOrder = () => {
    const orderData = {
      ...details,
      total: grandTotal,
      advancePaid: details.paymentMode === 'Advance' ? advanceAmount : grandTotal,
      remainingAmount: details.paymentMode === 'Advance' ? grandTotal - advanceAmount : 0
    };
    const order = placeOrder(orderData);
    setOrderId(order.id);
    setStep(4);
  };

  const downloadSummary = () => {
    const summary = `
      HOMETOWN CAKES - ORDER SUMMARY
      ------------------------------
      Order ID: ${orderId}
      Customer: ${details.name}
      Date: ${details.date}
      Status: Confirmed
      Total Paid: ₹${details.paymentMode === 'Advance' ? advanceAmount.toFixed(0) : grandTotal.toFixed(0)}
      Remaining: ₹${details.paymentMode === 'Advance' ? (grandTotal - advanceAmount).toFixed(0) : 0}
      ------------------------------
      Items: ${cart.map(i => i.name).join(', ')}
      Message: ${details.message}
      Address: ${details.line1}, ${details.city}
    `;
    const element = document.createElement("a");
    const file = new Blob([summary], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Hometown_Cakes_${orderId}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  if (cart.length === 0 && step !== 4) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfaf2] p-8 text-center">
        <div>
          <h2 className="text-4xl font-bold text-ebony serif italic mb-6">Your basket is empty</h2>
          <Link to="/" className="btn-primary">Return to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfaf2] pt-32 pb-20 px-8">
      <div className="container mx-auto max-w-6xl">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gold-600 mb-12 hover:text-ebony transition-colors">
          <ArrowLeft className="w-3 h-3" /> Back to Shop
        </Link>

        {step === 4 ? (
          <div className="max-w-2xl mx-auto text-center py-20 bg-white rounded-[4rem] border border-gold-100 shadow-2xl animate-luxury">
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-10">
              <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            </div>
            <h2 className="text-5xl font-bold text-ebony serif italic mb-4">Masterpiece Authorized</h2>
            <div className="flex items-center justify-center gap-3 mb-10 bg-gold-50/50 py-3 px-6 rounded-2xl w-fit mx-auto border border-gold-100">
              <span className="text-[10px] font-black uppercase tracking-widest text-gold-600">ID:</span>
              <span className="font-bold text-ebony">{orderId}</span>
              <button onClick={() => navigator.clipboard.writeText(orderId)} className="p-1 hover:text-gold-600 transition-colors"><Clipboard className="w-3.5 h-3.5" /></button>
            </div>
            <p className="text-slate-500 mb-10 max-w-sm mx-auto">Your celebration is scheduled for <span className="font-bold text-ebony">{details.date}</span>. You can download your acknowledgement below.</p>
            <div className="flex flex-col gap-4 max-w-xs mx-auto">
              <button onClick={downloadSummary} className="btn-primary flex items-center justify-center gap-3">
                Download Invoice <Download className="w-4 h-4 text-gold-400" />
              </button>
              <Link to="/track" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-gold-600 transition-colors">Track Order Status</Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-10">
              {/* Stepper */}
              <div className="flex items-center gap-6 overflow-x-auto pb-4">
                {['Identification', 'Logistics', 'Accessories', 'Payment'].map((s, i) => (
                  <div key={i} className="flex items-center gap-6 shrink-0">
                    <div className={`flex items-center gap-3 ${step >= i ? 'text-gold-600' : 'text-slate-300'}`}>
                      <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs ${step >= i ? 'border-gold-500 bg-gold-50' : 'border-slate-200'}`}>{i + 1}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest">{s}</span>
                    </div>
                    {i < 3 && <div className="h-px w-8 bg-gold-100"></div>}
                  </div>
                ))}
              </div>

              {step === 0 && (
                <div className="bg-white p-12 rounded-[4rem] border border-gold-100 shadow-xl animate-luxury space-y-10">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-ebony serif italic mb-2">{isLoginView ? 'Welcome Back' : 'Join the Atelier'}</h3>
                    <p className="text-[9px] font-black text-gold-600 uppercase tracking-widest">Identify yourself to continue</p>
                  </div>
                  
                  <form onSubmit={handleAuth} className="space-y-6">
                    {!isLoginView && (
                      <div className="relative group">
                        <User className="absolute left-6 top-5 w-4 h-4 text-gold-400" />
                        <input 
                          type="text" 
                          required
                          value={authForm.name}
                          onChange={(e) => setAuthForm({...authForm, name: e.target.value})}
                          className="input-field w-full pl-14" 
                          placeholder="Full Name" 
                        />
                      </div>
                    )}
                    <div className="relative group">
                      <Mail className="absolute left-6 top-5 w-4 h-4 text-gold-400" />
                      <input 
                        type="email" 
                        required
                        value={authForm.email}
                        onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                        className="input-field w-full pl-14" 
                        placeholder="Email Address" 
                      />
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-6 top-5 w-4 h-4 text-gold-400" />
                      <input 
                        type="password" 
                        required
                        value={authForm.password}
                        onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                        className="input-field w-full pl-14" 
                        placeholder="Password" 
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full py-5 text-sm">
                      {isLoginView ? 'Authorize Access' : 'Create Account'}
                    </button>
                  </form>
                  
                  <div className="text-center">
                    <button onClick={() => setIsLoginView(!isLoginView)} className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-gold-600 transition-colors">
                      {isLoginView ? "Don't have an account? Sign up" : "Already a member? Log in"}
                    </button>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-8 animate-luxury">
                  {/* Method Selection */}
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setDetails({...details, method: 'Delivery'})}
                      className={`flex-1 p-6 rounded-[2.5rem] border flex items-center gap-4 transition-all ${details.method === 'Delivery' ? 'bg-ebony text-gold-400 border-ebony' : 'bg-white text-slate-400 border-gold-100'}`}
                    >
                      <Truck className="w-6 h-6" />
                      <div className="text-left">
                        <p className="text-[10px] font-black uppercase tracking-widest">Home Delivery</p>
                        <p className="text-[9px] opacity-60">At your doorstep</p>
                      </div>
                    </button>
                    <button 
                      onClick={() => setDetails({...details, method: 'Pickup'})}
                      className={`flex-1 p-6 rounded-[2.5rem] border flex items-center gap-4 transition-all ${details.method === 'Pickup' ? 'bg-ebony text-gold-400 border-ebony' : 'bg-white text-slate-400 border-gold-100'}`}
                    >
                      <Store className="w-6 h-6" />
                      <div className="text-left">
                        <p className="text-[10px] font-black uppercase tracking-widest">Store Pickup</p>
                        <p className="text-[9px] opacity-60">Collect from Atelier</p>
                      </div>
                    </button>
                  </div>

                  {/* Delivery Details */}
                  {details.method === 'Delivery' && (
                    <div className="bg-white p-12 rounded-[3.5rem] border border-gold-100 shadow-sm space-y-10">
                      <h3 className="text-3xl font-bold text-ebony serif italic">Logistics Detail</h3>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gold-600 uppercase tracking-widest">Pincode</label>
                          <div className="relative">
                            <input 
                              type="text" 
                              maxLength="6"
                              value={details.pincode}
                              onChange={(e) => {
                                setDetails({...details, pincode: e.target.value});
                                handlePincodeSearch(e.target.value);
                              }}
                              className="input-field w-full" 
                              placeholder="560001" 
                            />
                            {loadingPincode && <div className="absolute right-6 top-5 w-4 h-4 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div>}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gold-600 uppercase tracking-widest">City / State</label>
                          <input type="text" readOnly value={`${details.city}${details.city ? ', ' : ''}${details.state}`} className="input-field w-full bg-gold-50/20" placeholder="Auto-filled" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gold-600 uppercase tracking-widest">Location Detail</label>
                        <div className="flex gap-4">
                          <MapPin className="w-5 h-5 text-gold-500 shrink-0 mt-4" />
                          <input type="text" value={details.line1} onChange={(e) => setDetails({...details, line1: e.target.value})} className="input-field w-full" placeholder="Street, Apartment, Landmarks" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Scheduling */}
                  <div className="bg-white p-12 rounded-[3.5rem] border border-gold-100 shadow-sm space-y-10">
                    <h3 className="text-3xl font-bold text-ebony serif italic">Celebration Schedule</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gold-600 uppercase tracking-widest">Recipient's Name</label>
                        <input type="text" value={details.recipientName} onChange={(e) => setDetails({...details, recipientName: e.target.value})} className="input-field w-full" placeholder="Who is it for?" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gold-600 uppercase tracking-widest">Occasion</label>
                        <select value={details.occasion} onChange={(e) => setDetails({...details, occasion: e.target.value})} className="input-field w-full appearance-none">
                          <option>Birthday</option>
                          <option>Anniversary</option>
                          <option>Wedding</option>
                          <option>Congratulation</option>
                          <option>Other Celebration</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gold-600 uppercase tracking-widest">Delivery Date</label>
                        <input type="date" value={details.date} onChange={(e) => setDetails({...details, date: e.target.value})} className="input-field w-full" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gold-600 uppercase tracking-widest">Time Slot</label>
                        <select value={details.time} onChange={(e) => setDetails({...details, time: e.target.value})} className="input-field w-full appearance-none">
                          <option>10:00 AM - 01:00 PM</option>
                          <option>01:00 PM - 04:00 PM</option>
                          <option>04:00 PM - 07:00 PM</option>
                          <option>07:00 PM - 10:00 PM</option>
                          <option>Midnight (11:30 PM - 12:05 AM)</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gold-600 uppercase tracking-widest">Message on Cake</label>
                      <input type="text" value={details.message} onChange={(e) => setDetails({...details, message: e.target.value})} className="input-field w-full" placeholder="e.g. Happy Birthday Muthu" />
                    </div>
                  </div>
                  <button onClick={() => setStep(2)} className="btn-primary w-full py-5 text-sm uppercase tracking-widest font-black">Continue to Accessories</button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-10 animate-luxury">
                  <div className="bg-white p-12 rounded-[3.5rem] border border-gold-100 shadow-sm">
                    <div className="flex justify-between items-center mb-10">
                      <h3 className="text-3xl font-bold text-ebony serif italic">Extra Sparkle</h3>
                      <p className="text-[9px] font-black text-gold-600 uppercase tracking-widest">Optional Add-ons</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {accessoriesList.map(acc => {
                        const isSelected = details.selectedAccessories.find(a => a.id === acc.id);
                        return (
                          <button 
                            key={acc.id}
                            onClick={() => toggleAccessory(acc)}
                            className={`p-6 rounded-3xl border flex items-center justify-between transition-all ${isSelected ? 'border-gold-500 bg-gold-50/50' : 'border-gold-100 hover:border-gold-300'}`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`p-3 rounded-2xl ${isSelected ? 'bg-gold-500 text-white' : 'bg-slate-50 text-slate-400'}`}>
                                <acc.icon className="w-4 h-4" />
                              </div>
                              <div className="text-left">
                                <p className="text-[10px] font-black uppercase tracking-widest text-ebony">{acc.name}</p>
                                <p className="text-[9px] font-bold text-gold-600">₹{acc.price}</p>
                              </div>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-gold-500 bg-gold-500 text-white' : 'border-gold-100'}`}>
                              {isSelected && <CheckCircle2 className="w-3 h-3" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setStep(1)} className="flex-1 py-5 rounded-full font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all">Back</button>
                    <button onClick={() => setStep(3)} className="flex-[2] btn-primary py-5 text-sm uppercase tracking-widest font-black">Proceed to Payment</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-10 animate-luxury">
                  <div className="bg-white p-12 rounded-[3.5rem] border border-gold-100 shadow-sm space-y-10">
                    <h3 className="text-3xl font-bold text-ebony serif italic">Payment Strategy</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <button 
                        onClick={() => setDetails({...details, paymentMode: 'Full'})}
                        className={`p-8 rounded-[2.5rem] border text-left transition-all ${details.paymentMode === 'Full' ? 'bg-ebony text-gold-400 border-ebony' : 'bg-white text-slate-400 border-gold-100'}`}
                      >
                        <CreditCard className="w-6 h-6 mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-widest">Full Payment</p>
                        <p className="text-[11px] font-bold mt-2">₹{grandTotal.toFixed(0)}</p>
                        <p className="text-[8px] opacity-60 mt-1">Complete reservation now</p>
                      </button>
                      <button 
                        onClick={() => setDetails({...details, paymentMode: 'Advance'})}
                        className={`p-8 rounded-[2.5rem] border text-left transition-all ${details.paymentMode === 'Advance' ? 'bg-ebony text-gold-400 border-ebony' : 'bg-white text-slate-400 border-gold-100'}`}
                      >
                        <Truck className="w-6 h-6 mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-widest">30% Advance</p>
                        <p className="text-[11px] font-bold mt-2">₹{advanceAmount.toFixed(0)}</p>
                        <p className="text-[8px] opacity-60 mt-1">Pay ₹{(grandTotal - advanceAmount).toFixed(0) || 0} on arrival</p>
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setStep(2)} className="flex-1 py-5 rounded-full font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all">Back</button>
                    <button onClick={handlePlaceOrder} className="flex-[2] btn-primary py-5 text-sm uppercase tracking-widest font-black">Confirm Reservation</button>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-10 rounded-[3.5rem] border border-gold-100 shadow-xl sticky top-32">
                <h3 className="font-bold text-xl text-ebony serif italic mb-8">Detailed Summary</h3>
                <div className="space-y-6 mb-8 overflow-y-auto max-h-[300px] pr-2">
                  {cart.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-medium">
                        <div className="flex gap-3">
                          <span className="font-bold text-gold-600">{item.quantity}x</span>
                          <span className="text-ebony italic">{item.name}</span>
                        </div>
                        <span className="font-bold text-ebony">₹{item.price * item.quantity}</span>
                      </div>
                      <div className="flex gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400 pl-6">
                        <span>{item.customizations?.weight}</span>
                        <span>•</span>
                        <span>{item.customizations?.type}</span>
                      </div>
                    </div>
                  ))}
                  {details.selectedAccessories.length > 0 && (
                    <div className="pt-4 border-t border-gold-50 space-y-4">
                      {details.selectedAccessories.map(acc => (
                        <div key={acc.id} className="flex justify-between items-center text-[11px] font-bold text-slate-500">
                          <span className="flex items-center gap-2 uppercase tracking-widest"><acc.icon className="w-3 h-3" /> {acc.name}</span>
                          <span className="text-ebony">₹{acc.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-3 pt-6 border-t border-gold-50">
                  <div className="flex justify-between text-[10px] text-slate-400 font-black uppercase tracking-widest">
                    <span>Base Amount</span>
                    <span>₹{cartTotal + accessoryTotal}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-black uppercase tracking-widest">
                    <span>GST (18%)</span>
                    <span>₹{((cartTotal + accessoryTotal) * 0.18).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold text-ebony pt-6 border-t border-gold-100">
                    <span className="serif italic">Grand Total</span>
                    <span>₹{grandTotal.toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
