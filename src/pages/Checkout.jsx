import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  CreditCard, Truck, ShieldCheck, ArrowLeft, CheckCircle2, 
  Clipboard, Calendar, Clock, MessageSquare, MapPin, 
  Store, Gift, Star, Download, PartyPopper, User, Mail, Lock
} from 'lucide-react';
import { formatPrice, formatWeightLabel } from '../utils/pricing';

const accessoriesList = [
  { id: 'acc1', name: 'Metallic Balloons (Set of 10)', price: 250, icon: PartyPopper },
  { id: 'acc2', name: 'Premium Gold Candles', price: 90, icon: Star },
  { id: 'acc3', name: 'Birthday Sash & Crown', price: 350, icon: Gift },
  { id: 'acc4', name: 'Sparkler Candle', price: 120, icon: Star },
];

const Checkout = () => {
  const { cart, cartTotal, placeOrder, user, login, signup, logout } = useShop();
  const navigate = useNavigate();
  
  // Steps: 0: Auth (if needed), 1: Logistics, 2: Accessories, 3: Payment, 4: Success
  const [step, setStep] = useState(user ? 1 : 0); 
  const [orderId, setOrderId] = useState('');
  const [loadingPincode, setLoadingPincode] = useState(false);
  const [pincodeError, setPincodeError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  
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

  useEffect(() => {
    if (!user && step > 0) {
      setStep(0);
    }
  }, [user, step]);

  const handleAuth = (e) => {
    e.preventDefault();
    if (isLoginView) {
      login(authForm.email, authForm.password);
    } else {
      signup(authForm.name, authForm.email);
    }
  };

  const handlePincodeSearch = (code) => {
    if (code.length === 6) {
      if (!code.startsWith('625')) {
        setPincodeError("We currently don't deliver to this area. We only deliver to Periyakulam & Theni district (625xxx).");
        setDetails(prev => ({ ...prev, city: '', state: '', location: '' }));
        return;
      }
      setPincodeError('');
      setLoadingPincode(true);
      setTimeout(() => {
        setDetails(prev => ({
          ...prev,
          city: 'Periyakulam',
          state: 'Theni',
          location: 'Main Town Area'
        }));
        setLoadingPincode(false);
      }, 800);
    } else {
      setPincodeError('');
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
  const grandTotal = Math.round((cartTotal + accessoryTotal) * 1.18);
  const advanceAmount = Math.round(grandTotal * 0.3);
  const balanceAmount = grandTotal - advanceAmount;

  const handlePlaceOrder = () => {
    const orderData = {
      ...details,
      total: grandTotal,
      advancePaid: details.paymentMode === 'Advance' ? advanceAmount : grandTotal,
      remainingAmount: details.paymentMode === 'Advance' ? balanceAmount : 0
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
      Total Paid: ₹${details.paymentMode === 'Advance' ? advanceAmount : grandTotal}
      Remaining: ₹${details.paymentMode === 'Advance' ? balanceAmount : 0}
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
    document.body.removeChild(element);
  };

  if (cart.length === 0 && step !== 4) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfaf2] px-4 py-12 sm:p-8 text-center">
        <div className="min-w-0 max-w-md w-full">
          <h2 className="text-2xl sm:text-4xl font-bold text-ebony serif italic mb-6">Your basket is empty</h2>
          <Link to="/" className="btn-primary">Return to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfaf2] pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 w-full min-w-0">
      <div className="container mx-auto max-w-6xl w-full min-w-0">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gold-600 mb-12 hover:text-ebony transition-colors">
          <ArrowLeft className="w-3 h-3" /> Back to Shop
        </Link>

        {step === 4 ? (
          <div className="max-w-2xl mx-auto text-center py-10 sm:py-16 md:py-20 px-5 sm:px-10 bg-white rounded-3xl sm:rounded-[3rem] md:rounded-[4rem] border border-gold-100 shadow-2xl animate-luxury w-full min-w-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 sm:mb-10">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-500" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ebony serif italic mb-4 px-1">Masterpiece Authorized</h2>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 bg-gold-50/50 py-3 px-4 sm:px-6 rounded-2xl w-fit max-w-full mx-auto border border-gold-100">
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
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 w-full min-w-0">
            <div className="lg:col-span-2 space-y-8 sm:space-y-10 min-w-0">
              {/* Stepper */}
              <div className="w-full overflow-x-auto no-scrollbar -mx-1 px-1">
                <div className="flex items-center min-w-max gap-0">
                  {['Identification', 'Logistics', 'Accessories', 'Payment'].map((s, i) => {
                    const isCompleted = step > i || (i === 0 && user);
                    const isActive = step === i;
                    return (
                      <div key={i} className="flex items-center">
                        <div className={`flex items-center gap-2 px-2 py-1 rounded-full transition-all ${isActive ? 'bg-gold-50' : ''}`}>
                          <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold text-[10px] shrink-0 transition-all ${
                            isCompleted ? 'border-emerald-500 bg-emerald-50 text-emerald-600' :
                            isActive ? 'border-gold-500 bg-gold-50 text-gold-600' :
                            'border-slate-200 text-slate-400'
                          }`}>
                            {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : i + 1}
                          </span>
                          <span className={`text-[9px] font-black uppercase tracking-widest whitespace-nowrap ${
                            isActive ? 'text-gold-600' : isCompleted ? 'text-emerald-600' : 'text-slate-300'
                          }`}>{s}</span>
                        </div>
                        {i < 3 && <div className="h-px w-6 bg-slate-100 shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {step === 0 && (
                <div className="bg-white p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] md:rounded-[4rem] border border-gold-100 shadow-xl animate-luxury space-y-8 sm:space-y-10 w-full min-w-0">
                  <div className="text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-ebony serif italic mb-2">{isLoginView ? 'Welcome Back' : 'Join the Atelier'}</h3>
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
                <div className="space-y-8 animate-luxury w-full min-w-0">
                  {user && (
                    <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex justify-between items-center text-xs animate-luxury">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center font-black uppercase text-[10px]">
                          {user.name.charAt(0)}
                        </div>
                        <p className="font-bold text-slate-700">
                          Authenticated as <span className="text-emerald-700">{user.name}</span> ({user.email})
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={logout}
                        className="text-slate-400 hover:text-red-500 font-bold uppercase tracking-wider text-[9px] cursor-pointer"
                      >
                        Log Out
                      </button>
                    </div>
                  )}

                  {/* Method Selection */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      type="button"
                      onClick={() => setDetails({...details, method: 'Delivery'})}
                      className={`w-full sm:flex-1 p-5 sm:p-6 rounded-3xl sm:rounded-[2.5rem] border flex items-center gap-4 transition-all text-left min-w-0 cursor-pointer ${details.method === 'Delivery' ? 'bg-ebony text-gold-400 border-ebony' : 'bg-white text-slate-400 border-gold-100'}`}
                    >
                      <Truck className="w-6 h-6" />
                      <div className="text-left">
                        <p className="text-[10px] font-black uppercase tracking-widest">Home Delivery</p>
                        <p className="text-[9px] opacity-60">At your doorstep</p>
                      </div>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setDetails({...details, method: 'Pickup'})}
                      className={`w-full sm:flex-1 p-5 sm:p-6 rounded-3xl sm:rounded-[2.5rem] border flex items-center gap-4 transition-all text-left min-w-0 cursor-pointer ${details.method === 'Pickup' ? 'bg-ebony text-gold-400 border-ebony' : 'bg-white text-slate-400 border-gold-100'}`}
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
                    <div className="bg-white p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] md:rounded-[3.5rem] border border-gold-100 shadow-sm space-y-8 sm:space-y-10 w-full min-w-0 animate-luxury">
                      <h3 className="text-2xl sm:text-3xl font-bold text-ebony serif italic">Logistics Detail</h3>
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
                              placeholder="625601" 
                            />
                            {loadingPincode && <div className="absolute right-6 top-5 w-4 h-4 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div>}
                          </div>
                          {pincodeError && <p className="text-xs text-red-500 mt-1 font-semibold leading-relaxed">{pincodeError}</p>}
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
                  <div className="bg-white p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] md:rounded-[3.5rem] border border-gold-100 shadow-sm space-y-8 sm:space-y-10 w-full min-w-0">
                    <h3 className="text-2xl sm:text-3xl font-bold text-ebony serif italic">Celebration Schedule</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gold-600 uppercase tracking-widest">Recipient's Name</label>
                        <input type="text" value={details.recipientName} onChange={(e) => setDetails({...details, recipientName: e.target.value})} className="input-field w-full" placeholder="Who is it for?" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gold-600 uppercase tracking-widest">Occasion</label>
                        <select value={details.occasion} onChange={(e) => setDetails({...details, occasion: e.target.value})} className="input-field w-full appearance-none cursor-pointer">
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
                        <input type="date" value={details.date} onChange={(e) => setDetails({...details, date: e.target.value})} className="input-field w-full cursor-pointer" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gold-600 uppercase tracking-widest">Time Slot</label>
                        <select value={details.time} onChange={(e) => setDetails({...details, time: e.target.value})} className="input-field w-full appearance-none cursor-pointer">
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
                  <button 
                    type="button" 
                    onClick={() => setStep(2)} 
                    disabled={
                      details.method === 'Pickup'
                        ? !(details.recipientName && details.date && details.time)
                        : !(details.recipientName && details.date && details.time && details.pincode.length === 6 && !pincodeError && details.line1)
                    } 
                    className="btn-primary w-full py-4 sm:py-5 text-xs sm:text-sm uppercase tracking-widest font-black disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Continue to Accessories
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 sm:space-y-10 animate-luxury w-full min-w-0">
                  <div className="bg-white p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] md:rounded-[3.5rem] border border-gold-100 shadow-sm w-full min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 sm:mb-10">
                      <h3 className="text-2xl sm:text-3xl font-bold text-ebony serif italic text-left">Extra Sparkle</h3>
                      <p className="text-[9px] font-black text-gold-600 uppercase tracking-widest shrink-0">Optional Add-ons</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {accessoriesList.map(acc => {
                        const isSelected = details.selectedAccessories.find(a => a.id === acc.id);
                        return (
                          <button 
                            type="button"
                            key={acc.id}
                            onClick={() => toggleAccessory(acc)}
                            className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border flex items-center justify-between gap-3 transition-all text-left min-w-0 w-full cursor-pointer ${isSelected ? 'border-gold-500 bg-gold-50/50' : 'border-gold-100 hover:border-gold-300'}`}
                          >
                            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                              <div className={`p-3 rounded-2xl shrink-0 ${isSelected ? 'bg-gold-500 text-white' : 'bg-slate-50 text-slate-400'}`}>
                                <acc.icon className="w-4 h-4" />
                              </div>
                              <div className="text-left min-w-0">
                                <p className="text-[10px] font-black uppercase tracking-widest text-ebony break-words">{acc.name}</p>
                                <p className="text-[9px] font-bold text-gold-600">{formatPrice(acc.price)}</p>
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
                  <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 sm:py-5 rounded-full font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all cursor-pointer">Back</button>
                    <button type="button" onClick={() => setStep(3)} className="flex-[2] btn-primary py-4 sm:py-5 text-xs sm:text-sm uppercase tracking-widest font-black cursor-pointer">Proceed to Payment</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8 sm:space-y-10 animate-luxury w-full min-w-0">
                  <div className="bg-white p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] md:rounded-[3.5rem] border border-gold-100 shadow-sm space-y-8 sm:space-y-10 w-full min-w-0">
                    <h3 className="text-2xl sm:text-3xl font-bold text-ebony serif italic">Choose Payment Option</h3>
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <button 
                        type="button"
                        onClick={() => setDetails({...details, paymentMode: 'Full'})}
                        className={`p-6 sm:p-8 rounded-3xl sm:rounded-[2.5rem] border text-left transition-all min-w-0 cursor-pointer ${details.paymentMode === 'Full' ? 'bg-ebony text-gold-400 border-ebony' : 'bg-white text-slate-400 border-gold-100'}`}
                      >
                        <CreditCard className="w-6 h-6 mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-widest">Full Payment</p>
                        <p className="text-[13px] font-bold mt-2 text-gold-500">{formatPrice(grandTotal)}</p>
                        <p className="text-[8px] opacity-60 mt-1">Complete reservation now</p>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setDetails({...details, paymentMode: 'Advance'})}
                        className={`p-6 sm:p-8 rounded-3xl sm:rounded-[2.5rem] border text-left transition-all min-w-0 cursor-pointer ${details.paymentMode === 'Advance' ? 'bg-ebony text-gold-400 border-ebony' : 'bg-white text-slate-400 border-gold-100'}`}
                      >
                        <Truck className="w-6 h-6 mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-widest">30% Advance</p>
                        <p className="text-[13px] font-bold mt-2 text-gold-500">{formatPrice(advanceAmount)}</p>
                        <p className="text-[8px] opacity-60 mt-1">Pay {formatPrice(balanceAmount)} on arrival</p>
                      </button>
                    </div>

                    {/* Integrated Payment Gateways Section */}
                    <div className="mt-8 pt-8 border-t border-slate-100 space-y-6">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Payment Method</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'UPI', label: 'UPI (GPay/PhonePe)', icon: '📱' },
                          { id: 'CARD', label: 'Card (Visa/Mastercard/RuPay)', icon: '💳' },
                          { id: 'NETBANKING', label: 'Net Banking', icon: '🏦' }
                        ].map(m => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setPaymentMethod(m.id)}
                            className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${paymentMethod === m.id ? 'border-maroon-500 bg-maroon-50/20 text-maroon-600 font-bold' : 'border-slate-100 hover:border-slate-200 text-slate-500'}`}
                          >
                            <span className="text-xl block mb-2">{m.icon}</span>
                            <span className="text-[8px] uppercase tracking-wider block font-bold">{m.label.split(' ')[0]}</span>
                          </button>
                        ))}
                      </div>

                      {/* Payment Method Details (Simulated Gateway) */}
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100/80">
                        {paymentMethod === 'UPI' && (
                          <div className="space-y-4">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">UPI Application</p>
                            <div className="flex flex-wrap gap-3">
                              {['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI'].map(app => (
                                <label key={app} className="flex-1 min-w-[100px] p-3 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-xs font-semibold cursor-pointer hover:border-maroon-200">
                                  <input type="radio" name="upi-app" defaultChecked={app === 'Google Pay'} className="mr-2 accent-maroon-500" />
                                  {app}
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                        {paymentMethod === 'CARD' && (
                          <div className="space-y-4">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Card Details</p>
                            <div className="space-y-3">
                              <input type="text" className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs focus:outline-none focus:border-maroon-500" placeholder="Card Number (XXXX XXXX XXXX XXXX)" />
                              <div className="flex gap-3">
                                <input type="text" className="flex-1 px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs focus:outline-none focus:border-maroon-500" placeholder="Expiry Date (MM/YY)" />
                                <input type="password" maxLength="3" className="w-24 px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs focus:outline-none focus:border-maroon-500" placeholder="CVV" />
                              </div>
                            </div>
                          </div>
                        )}
                        {paymentMethod === 'NETBANKING' && (
                          <div className="space-y-4">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Popular Banks</p>
                            <div className="grid grid-cols-2 gap-2.5">
                              {['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank'].map(bank => (
                                <label key={bank} className="p-3 bg-white border border-slate-100 rounded-xl flex items-center text-xs font-semibold cursor-pointer hover:border-maroon-200">
                                  <input type="radio" name="nb-bank" className="mr-2 accent-maroon-500" />
                                  {bank}
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
                    <button type="button" onClick={() => setStep(2)} className="flex-1 py-4 sm:py-5 rounded-full font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all cursor-pointer">Back</button>
                    <button type="button" onClick={handlePlaceOrder} className="flex-[2] btn-primary py-4 sm:py-5 text-xs sm:text-sm uppercase tracking-widest font-black cursor-pointer">Confirm Reservation</button>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1 min-w-0 z-10">
              <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl sm:rounded-[3rem] border border-gold-100 shadow-xl lg:sticky lg:top-24 xl:top-28 w-full min-w-0">
                <h3 className="font-bold text-xl text-ebony serif italic mb-8">Detailed Summary</h3>
                <div className="space-y-6 mb-8 overflow-y-auto max-h-[300px] pr-2 no-scrollbar">
                  {cart.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-start gap-3 text-sm font-medium">
                        <div className="flex gap-3 min-w-0">
                          <span className="font-bold text-gold-600 shrink-0">{item.quantity}x</span>
                          <span className="text-ebony italic break-words">{item.name}</span>
                        </div>
                        <span className="font-bold text-ebony shrink-0 tabular-nums">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                      <div className="flex gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400 pl-6">
                        <span>{formatWeightLabel(item.customizations?.weight)}</span>
                        <span>•</span>
                        <span>{item.customizations?.type}</span>
                      </div>
                    </div>
                  ))}
                  {details.selectedAccessories.length > 0 && (
                    <div className="pt-4 border-t border-gold-50 space-y-4">
                      {details.selectedAccessories.map(acc => (
                        <div key={acc.id} className="flex justify-between items-center text-[11px] font-bold text-slate-500">
                          <span className="flex items-center gap-2 uppercase tracking-widest"><acc.icon className="w-3 h-3 animate-float" /> {acc.name}</span>
                          <span className="text-ebony">{formatPrice(acc.price)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-3 pt-6 border-t border-gold-50">
                  <div className="flex justify-between text-[10px] text-slate-400 font-black uppercase tracking-widest">
                    <span>Base Amount</span>
                    <span>{formatPrice(cartTotal + accessoryTotal)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-black uppercase tracking-widest">
                    <span>GST (18%)</span>
                    <span>{formatPrice(Math.round((cartTotal + accessoryTotal) * 0.18))}</span>
                  </div>
                  <div className="flex flex-wrap justify-between items-baseline gap-x-4 gap-y-2 text-xl sm:text-2xl font-bold text-ebony pt-6 border-t border-gold-100">
                    <span className="serif italic min-w-0">Grand Total</span>
                    <span className="tabular-nums shrink-0">{formatPrice(grandTotal)}</span>
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
