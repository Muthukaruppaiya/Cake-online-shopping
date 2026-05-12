import { createContext, useContext, useState, useEffect } from 'react';
import chocoImg from '../assets/chocolate-cake.png';
import velvetImg from '../assets/red-velvet.png';
import cheeseImg from '../assets/cheesecake.png';
import confettiImg from '../assets/confetti-cake.png';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  // Products / Inventory State
  const [cakes, setCakes] = useState([
    {
      id: 1,
      name: "Midnight Ganache",
      category: "Signature Series",
      price: 1450,
      rating: 4.9,
      image: chocoImg,
      badge: "Bestseller",
      description: "Rich dark chocolate with layers of silky ganache.",
      isActive: true,
      availableWeights: ['0.5kg', '1kg', '2kg'],
      allowEggless: true
    },
    {
      id: 2,
      name: "Velvet Crimson",
      category: "Royal Collection",
      price: 1380,
      rating: 4.8,
      image: velvetImg,
      badge: "Limited",
      description: "Classic red velvet with premium cream cheese frosting.",
      isActive: true,
      availableWeights: ['0.5kg', '1kg'],
      allowEggless: true
    },
    {
      id: 3,
      name: "Summer Berry Bliss",
      category: "Artisan Fruit",
      price: 1420,
      rating: 4.7,
      image: cheeseImg,
      badge: "Seasonal",
      description: "Fresh forest berries on a light, airy sponge.",
      isActive: true,
      availableWeights: ['0.5kg', '1kg', '2kg'],
      allowEggless: false
    },
    {
      id: 4,
      name: "Celebration Confetti",
      category: "Gala Special",
      price: 1350,
      rating: 4.9,
      image: confettiImg,
      badge: "Popular",
      description: "Fun vanilla sponge filled with colorful sprinkles.",
      isActive: true,
      availableWeights: ['0.5kg', '1kg', '2kg', '3kg'],
      allowEggless: true
    }
  ]);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('cakeShopUser');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Inventory Actions
  const addCake = (newCake) => {
    setCakes(prev => [{ ...newCake, id: Date.now(), rating: 5.0, isActive: true }, ...prev]);
  };

  const updateCake = (id, updatedFields) => {
    setCakes(prev => prev.map(c => c.id === id ? { ...c, ...updatedFields } : c));
  };

  const toggleCakeStatus = (id) => {
    setCakes(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  const deleteCake = (id) => {
    setCakes(prev => prev.filter(c => c.id !== id));
  };

  const login = (email, password) => {
    const userData = { name: 'Muthu Karuppaiya', email, orders: [] };
    setUser(userData);
    localStorage.setItem('cakeShopUser', JSON.stringify(userData));
  };

  const signup = (name, email) => {
    const userData = { name, email, orders: [] };
    setUser(userData);
    localStorage.setItem('cakeShopUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cakeShopUser');
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => 
        item.id === product.id && 
        JSON.stringify(item.customizations) === JSON.stringify(product.customizations)
      );
      if (existingItem) {
        return prevCart.map((item) =>
          (item.id === product.id && JSON.stringify(item.customizations) === JSON.stringify(product.customizations))
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id, customizations) => {
    setCart((prevCart) => prevCart.filter((item) => 
      !(item.id === id && JSON.stringify(item.customizations) === JSON.stringify(customizations))
    ));
  };

  const updateQuantity = (id, customizations, quantity) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) => 
        (item.id === id && JSON.stringify(item.customizations) === JSON.stringify(customizations))
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: user?.name || orderDetails.name,
      ...orderDetails,
      items: [...cart],
      total: orderDetails.total,
      status: 'Placed',
      date: new Date().toISOString().split('T')[0]
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <ShopContext.Provider value={{ 
      cart, 
      cakes,
      addCake,
      updateCake,
      deleteCake,
      toggleCakeStatus,
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      cartTotal, 
      cartCount,
      isCartOpen,
      setIsCartOpen,
      user,
      login,
      signup,
      logout,
      orders,
      placeOrder,
      updateOrderStatus
    }}>
      {children}
    </ShopContext.Provider>
  );
};
