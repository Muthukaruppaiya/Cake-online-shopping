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
  const [optionsCake, setOptionsCake] = useState(null);
  const [user, setUser] = useState(null);

  const openCakeOptions = (cake, preselect = null) => {
    setOptionsCake(preselect ? { ...cake, _preselect: preselect } : cake);
  };
  const closeCakeOptions = () => setOptionsCake(null);
  
  // Products / Inventory State
  const [cakes, setCakes] = useState([
    {
      id: 1,
      name: "Chocolate Butterscotch Cake",
      category: "Birthday",
      section: "birthday",
      price: 597,
      rating: 4.9,
      image: chocoImg,
      badge: "Bestseller",
      deliveryTime: "2 Hr",
      description: "Rich chocolate layered with buttery butterscotch crunch.",
      isActive: true,
      availableWeights: ['0.5kg', '1kg', '2kg'],
      allowEggless: true
    },
    {
      id: 2,
      name: "Chocolate Delight Cake",
      category: "Birthday",
      section: "birthday",
      price: 599,
      rating: 4.8,
      image: velvetImg,
      badge: null,
      deliveryTime: "2 Hr",
      description: "Creamy chocolate delight for every celebration.",
      isActive: true,
      availableWeights: ['0.5kg', '1kg'],
      allowEggless: true
    },
    {
      id: 3,
      name: "Ferrero Rocher Birthday Cake",
      category: "Birthday",
      section: "birthday",
      price: 998,
      rating: 4.9,
      image: cheeseImg,
      badge: "Premium",
      deliveryTime: "2 Hr",
      description: "Luxury Ferrero Rocher topped chocolate cake.",
      isActive: true,
      availableWeights: ['0.5kg', '1kg', '2kg'],
      allowEggless: false
    },
    {
      id: 4,
      name: "Special Rasmalai Cake",
      category: "Birthday",
      section: "birthday",
      price: 736,
      rating: 4.7,
      image: confettiImg,
      badge: null,
      deliveryTime: "2 Hr",
      description: "Indian fusion rasmalai flavour sponge cake.",
      isActive: true,
      availableWeights: ['0.5kg', '1kg'],
      allowEggless: true
    },
    {
      id: 5,
      name: "Animal Jungle Theme First Birthday",
      category: "First Birthday",
      section: "first-birthday",
      price: 5040,
      rating: 5.0,
      image: confettiImg,
      badge: "Designer",
      deliveryTime: "3 Hrs",
      description: "Safari jungle theme cake for baby's first birthday.",
      isActive: true,
      availableWeights: ['1kg', '2kg'],
      allowEggless: true
    },
    {
      id: 6,
      name: "Cocomelon Theme Birthday Cake",
      category: "First Birthday",
      section: "first-birthday",
      price: 2416,
      rating: 4.9,
      image: chocoImg,
      badge: null,
      deliveryTime: "3 Hrs",
      description: "Beloved Cocomelon characters for little ones.",
      isActive: true,
      availableWeights: ['1kg', '2kg'],
      allowEggless: true
    },
    {
      id: 7,
      name: "One Tier Unicorn Girl Birthday Cake",
      category: "Kids",
      section: "kids",
      price: 2416,
      rating: 4.9,
      image: velvetImg,
      badge: "Popular",
      deliveryTime: "3 Hrs",
      description: "Magical unicorn theme for girls birthday parties.",
      isActive: true,
      availableWeights: ['0.5kg', '1kg', '2kg'],
      allowEggless: true
    },
    {
      id: 8,
      name: "McQueen Car Boy Birthday Cake",
      category: "Kids",
      section: "kids",
      price: 2416,
      rating: 4.8,
      image: chocoImg,
      badge: null,
      deliveryTime: "3 Hrs",
      description: "Lightning McQueen racing theme for boys.",
      isActive: true,
      availableWeights: ['0.5kg', '1kg', '2kg'],
      allowEggless: true
    },
    {
      id: 9,
      name: "Spiderman Theme Kids Birthday Cake",
      category: "Kids",
      section: "kids",
      price: 5040,
      rating: 5.0,
      image: confettiImg,
      badge: "Designer",
      deliveryTime: "3 Hrs",
      description: "Spiderverse superhero theme kids celebration cake.",
      isActive: true,
      availableWeights: ['1kg', '2kg', '3kg'],
      allowEggless: true
    },
    {
      id: 10,
      name: "Elegant Wedding Cake 5 Kg",
      category: "Wedding",
      section: "wedding",
      price: 5040,
      rating: 5.0,
      image: cheeseImg,
      badge: "Premium",
      deliveryTime: "3 Hrs",
      description: "Multi-tier elegant wedding cake for your big day.",
      isActive: true,
      availableWeights: ['2kg', '3kg'],
      allowEggless: true
    },
    {
      id: 11,
      name: "Red and Gold Wedding Cake",
      category: "Wedding",
      section: "wedding",
      price: 5040,
      rating: 4.9,
      image: velvetImg,
      badge: null,
      deliveryTime: "3 Hrs",
      description: "Luxury red and gold fondant wedding masterpiece.",
      isActive: true,
      availableWeights: ['2kg', '3kg'],
      allowEggless: true
    },
    {
      id: 12,
      name: "Premium Marble Customized Wedding Cake",
      category: "Wedding",
      section: "wedding",
      price: 8400,
      rating: 5.0,
      image: chocoImg,
      badge: "Signature",
      deliveryTime: "8+ Hrs",
      description: "Marble finish custom wedding cake with florals.",
      isActive: true,
      availableWeights: ['3kg'],
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

  const addToCart = (product, quantityToAdd = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => 
        item.id === product.id && 
        JSON.stringify(item.customizations) === JSON.stringify(product.customizations)
      );
      if (existingItem) {
        return prevCart.map((item) =>
          (item.id === product.id && JSON.stringify(item.customizations) === JSON.stringify(product.customizations))
            ? { ...item, quantity: item.quantity + quantityToAdd } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity: quantityToAdd }];
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
      optionsCake,
      openCakeOptions,
      closeCakeOptions,
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
