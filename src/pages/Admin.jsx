import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  BookText, 
  Settings, 
  LogOut,
  TrendingUp,
  DollarSign,
  Users,
  Plus,
  CheckCircle,
  Truck,
  Box,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Gift,
  CreditCard,
  Clock,
  MessageSquare,
  Store,
  Trash2,
  Edit3,
  Image as ImageIcon,
  X,
  Menu,
  Eye,
  EyeOff,
  Check
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Admin = () => {
  const { orders, updateOrderStatus, cakes, addCake, updateCake, deleteCake, toggleCakeStatus } = useShop();
  const [activeTab, setActiveTab] = useState('orders');
  const navigate = useNavigate();

  // Inventory Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingCake, setEditingCake] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Signature Series',
    price: '',
    description: '',
    image: '',
    badge: 'New',
    availableWeights: ['0.5kg', '1kg'],
    allowEggless: true
  });

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (!auth) navigate('/admin/login');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  const openModal = (cake = null) => {
    if (cake) {
      setEditingCake(cake);
      setFormData({ 
        ...cake,
        availableWeights: cake.availableWeights || ['0.5kg', '1kg'],
        allowEggless: cake.allowEggless !== undefined ? cake.allowEggless : true
      });
    } else {
      setEditingCake(null);
      setFormData({ 
        name: '', 
        category: 'Signature Series', 
        price: '', 
        description: '', 
        image: '', 
        badge: 'New',
        availableWeights: ['0.5kg', '1kg'],
        allowEggless: true
      });
    }
    setShowModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingCake) {
      updateCake(editingCake.id, formData);
    } else {
      addCake(formData);
    }
    setShowModal(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleWeight = (weight) => {
    setFormData(prev => ({
      ...prev,
      availableWeights: prev.availableWeights.includes(weight)
        ? prev.availableWeights.filter(w => w !== weight)
        : [...prev.availableWeights, weight]
    }));
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Placed': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Accepted': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'Preparing': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Dispatched': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'Delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fcfaf2] flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden bg-ebony p-6 flex justify-between items-center sticky top-0 z-[60]">
        <h1 className="text-xl font-bold text-white serif italic">Hometown.</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gold-400">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Admin Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-[70] lg:relative lg:z-0 w-80 bg-ebony text-gold-100/50 p-10 flex flex-col gap-12 border-r border-white/5 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex justify-between items-center lg:block">
          <div>
            <h1 className="text-2xl font-bold text-white serif italic tracking-tighter mb-2">Hometown Cakes</h1>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gold-500">Management Console</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-white"><X className="w-6 h-6" /></button>
        </div>
        
        <nav className="flex flex-col gap-3 text-[10px] font-black uppercase tracking-[0.2em]">
          {[
            { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
            { id: 'reports', label: 'Analytics', icon: BarChart3 },
            { id: 'orders', label: 'Order Flow', icon: ShoppingCart },
            { id: 'inventory', label: 'Catalog', icon: Package },
            { id: 'ledger', label: 'Financials', icon: BookText },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${activeTab === item.id ? 'bg-gold-500/10 text-gold-400 border-gold-500/20 shadow-lg' : 'hover:bg-white/5 border-transparent'}`}
            >
              <span className="flex items-center gap-4"><item.icon className="w-4 h-4" /> {item.label}</span>
              <ChevronRight className={`w-3 h-3 transition-transform ${activeTab === item.id ? 'rotate-90' : ''}`} />
            </button>
          ))}
          
          <div className="mt-20 pt-10 border-t border-white/5 space-y-3">
            <button className="w-full flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl transition-all">
              <Settings className="w-4 h-4" /> Settings
            </button>
            <button onClick={handleLogout} className="w-full flex items-center gap-4 p-4 hover:bg-rose-500/10 text-rose-400 rounded-2xl transition-all">
              <LogOut className="w-4 h-4" /> Terminate Session
            </button>
          </div>
        </nav>
      </aside>

      {/* Overlay */}
      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/60 z-[65] lg:hidden backdrop-blur-sm"></div>}

      {/* Admin Main Content */}
      <main className="flex-1 p-6 md:p-16">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-gold-400"></div>
              <span className="text-[10px] font-black text-gold-600 uppercase tracking-widest">System Operational</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-ebony serif tracking-tighter italic capitalize">{activeTab} Management</h2>
          </div>
          {activeTab === 'inventory' && (
            <button 
              onClick={() => openModal()}
              className="btn-primary w-full md:w-auto flex items-center justify-center gap-3"
            >
              <Plus className="w-4 h-4" /> Add New Masterpiece
            </button>
          )}
        </header>

        {activeTab === 'orders' && (
          <div className="space-y-12 animate-luxury">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-[4rem] border border-gold-100/50 p-12 shadow-sm hover:shadow-2xl transition-all duration-700">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12 pb-10 border-b border-gold-50">
                  <div>
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-3xl font-bold text-ebony serif italic">{order.id}</h3>
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
                      <p>Client: <span className="text-ebony font-bold">{order.customer}</span></p>
                      <p>•</p>
                      <p>{order.date}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {['Accepted', 'Preparing', 'Dispatched', 'Delivered'].map((status) => (
                      <button 
                        key={status}
                        onClick={() => updateOrderStatus(order.id, status)}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${order.status === status ? 'bg-gold-500 text-ebony shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-gold-50 hover:text-gold-600'}`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-10">
                    <div className="space-y-6">
                      <h4 className="text-[10px] font-black text-gold-600 uppercase tracking-[0.2em] flex items-center gap-2"><Package className="w-4 h-4" /> Manifest Details</h4>
                      <div className="space-y-4 bg-gold-50/20 p-8 rounded-3xl border border-gold-100">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between items-start">
                            <div>
                              <p className="font-bold text-ebony serif italic text-lg">{item.quantity}x {item.name}</p>
                              <div className="flex gap-2 text-[9px] font-black uppercase tracking-widest text-gold-600/70 mt-1">
                                <span>{item.customizations?.weight}</span>
                                <span>•</span>
                                <span>{item.customizations?.type}</span>
                              </div>
                            </div>
                            <p className="font-bold text-ebony">₹{item.price * item.quantity}</p>
                          </div>
                        ))}
                        <div className="pt-6 border-t border-gold-200 flex justify-between items-end">
                          <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Grand Valuation</p>
                            <p className="text-3xl font-bold text-ebony serif tracking-tighter">₹{order.total?.toFixed(0)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[9px] font-black uppercase tracking-widest text-gold-600">Payment: {order.paymentMode}</p>
                            <p className="text-xs font-bold text-ebony">Paid: ₹{order.advancePaid?.toFixed(0)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="animate-luxury space-y-8">
            <div className="bg-white rounded-[3.5rem] border border-gold-100 overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                  <tr>
                    <th className="px-10 py-6">Cake Portfolio</th>
                    <th className="px-10 py-6">Category</th>
                    <th className="px-10 py-6">Valuation</th>
                    <th className="px-10 py-6">Status</th>
                    <th className="px-10 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold-50/50">
                  {cakes.map((cake) => (
                    <tr key={cake.id} className="hover:bg-gold-50/20 transition-colors group">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-50 border border-gold-100 shrink-0">
                            <img src={cake.image} alt={cake.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-ebony serif italic text-lg">{cake.name}</p>
                            <div className="flex gap-2">
                              {cake.availableWeights?.map(w => <span key={w} className="text-[7px] font-black text-slate-300 border border-slate-100 px-1 rounded">{w}</span>)}
                              {cake.allowEggless && <span className="text-[7px] font-black text-emerald-500 border border-emerald-100 px-1 rounded uppercase">Eggless</span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full">{cake.category}</span>
                      </td>
                      <td className="px-10 py-8 font-bold text-ebony">₹{cake.price}</td>
                      <td className="px-10 py-8">
                        <button onClick={() => toggleCakeStatus(cake.id)} className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${cake.isActive ? 'text-emerald-500' : 'text-slate-300'}`}>
                          {cake.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          {cake.isActive ? 'Active' : 'Draft'}
                        </button>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openModal(cake)} className="p-2 hover:bg-white rounded-full text-slate-400 hover:text-indigo-500 transition-all"><Edit3 className="w-4 h-4" /></button>
                          <button onClick={() => deleteCake(cake.id)} className="p-2 hover:bg-white rounded-full text-slate-400 hover:text-rose-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Inventory Modal */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ebony/60 backdrop-blur-md p-6 overflow-y-auto">
            <div className="bg-white w-full max-w-4xl rounded-[4rem] shadow-2xl relative animate-luxury flex flex-col max-h-[90vh]">
              <div className="p-10 border-b border-gold-50 flex justify-between items-center bg-[#fcfaf2] rounded-t-[4rem]">
                <div>
                  <h3 className="text-3xl font-bold text-ebony serif italic">{editingCake ? 'Refine Masterpiece' : 'Create New Masterpiece'}</h3>
                  <p className="text-[9px] font-black text-gold-600 uppercase tracking-widest">Atelier Catalog Entry</p>
                </div>
                <button onClick={() => setShowModal(false)} className="p-3 hover:bg-gold-100 rounded-full transition-all"><X className="w-6 h-6" /></button>
              </div>

              <form onSubmit={handleFormSubmit} className="p-12 overflow-y-auto space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-gold-600 uppercase tracking-widest block pl-2">Portfolio Image</label>
                      <div className="relative group aspect-square rounded-[2.5rem] overflow-hidden bg-slate-50 border-2 border-dashed border-gold-100 flex flex-col items-center justify-center gap-4 hover:border-gold-400 transition-all cursor-pointer">
                        {formData.image ? <img src={formData.image} alt="Preview" className="w-full h-full object-cover" /> : <><ImageIcon className="w-10 h-10 text-gold-200" /><p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Select Image</p></>}
                        <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gold-600 uppercase tracking-widest block pl-2">Cake Name</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="input-field w-full" placeholder="e.g. Royal Gold Ganache" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gold-600 uppercase tracking-widest block pl-2">Category</label>
                        <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="input-field w-full appearance-none">
                          <option>Signature Series</option><option>Royal Collection</option><option>Artisan Fruit</option><option>Gala Special</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gold-600 uppercase tracking-widest block pl-2">Base Price (₹)</label>
                        <input type="number" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="input-field w-full" placeholder="000" />
                      </div>
                    </div>

                    {/* NEW: Options (Weight & Eggless) */}
                    <div className="space-y-6 bg-gold-50/20 p-6 rounded-3xl border border-gold-100">
                      <div>
                        <label className="text-[10px] font-black text-gold-600 uppercase tracking-widest block mb-4">Available Weights</label>
                        <div className="flex flex-wrap gap-2">
                          {['0.5kg', '1kg', '1.5kg', '2kg', '3kg'].map(w => (
                            <button 
                              key={w} type="button"
                              onClick={() => toggleWeight(w)}
                              className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${formData.availableWeights.includes(w) ? 'bg-ebony text-gold-400 border-ebony' : 'bg-white text-slate-300 border-gold-100'}`}
                            >
                              {w}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="pt-6 border-t border-gold-100">
                        <label className="flex items-center justify-between cursor-pointer group">
                          <span className="text-[10px] font-black text-gold-600 uppercase tracking-widest">Allow Eggless Option</span>
                          <button 
                            type="button"
                            onClick={() => setFormData({...formData, allowEggless: !formData.allowEggless})}
                            className={`w-12 h-6 rounded-full transition-all relative ${formData.allowEggless ? 'bg-emerald-500' : 'bg-slate-200'}`}
                          >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.allowEggless ? 'left-7' : 'left-1'}`}></div>
                          </button>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gold-600 uppercase tracking-widest block pl-2">Description</label>
                      <textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="input-field w-full h-32 py-4" placeholder="Describe flavor profile..." />
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-gold-50 flex gap-4">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-5 rounded-full font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all">Cancel</button>
                  <button type="submit" className="flex-[2] btn-primary py-5 text-sm uppercase tracking-widest font-black">
                    {editingCake ? 'Commit Updates' : 'Publish to Catalog'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
