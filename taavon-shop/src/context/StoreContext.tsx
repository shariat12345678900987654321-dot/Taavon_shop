import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, Category, OrderStatus, StoreAnnouncement } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ANNOUNCEMENTS } from '../data/initialProducts';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  announcements: StoreAnnouncement[];
  isAdmin: boolean;
  selectedCategory: Category;
  searchQuery: string;
  onlyKalabarg: boolean;
  onlyRestocked: boolean;
  activeProductDetail: Product | null;
  lastSubmittedOrder: Order | null;
  isCartOpen: boolean;
  isAdminModalOpen: boolean;
  isStoreInfoOpen: boolean;
  
  // Actions
  setSelectedCategory: (cat: Category) => void;
  setSearchQuery: (q: string) => void;
  setOnlyKalabarg: (val: boolean) => void;
  setOnlyRestocked: (val: boolean) => void;
  setActiveProductDetail: (product: Product | null) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsAdminModalOpen: (open: boolean) => void;
  setIsStoreInfoOpen: (open: boolean) => void;
  
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  
  loginAdmin: (code: string) => boolean;
  logoutAdmin: () => void;
  
  restockProduct: (productId: string, addedStock: number, newPrice?: number, markAsRestocked?: boolean) => void;
  updateProduct: (product: Product) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  deleteProduct: (productId: string) => void;
  resetToInitialProducts: () => void;
  
  submitOrder: (orderData: {
    customerName: string;
    customerPhone: string;
    deliveryMethod: 'delivery' | 'pickup';
    address?: string;
    paymentMethod: 'kalabarg' | 'cash_on_delivery' | 'card_transfer';
    notes?: string;
  }) => Order;
  
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateAnnouncement: (announcement: StoreAnnouncement) => void;
  
  cartTotalCount: number;
  cartTotalPrice: number;
  cartKalabargTotal: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const PRODUCTS_STORAGE_KEY = 'taavon_products_v1';
const CART_STORAGE_KEY = 'taavon_cart_v1';
const ORDERS_STORAGE_KEY = 'taavon_orders_v1';
const ANNOUNCEMENTS_STORAGE_KEY = 'taavon_announcements_v1';
const ADMIN_STORAGE_KEY = 'taavon_admin_auth_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_PRODUCTS;
  });

  // Load Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [];
  });

  // Load Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [];
  });

  // Load Announcements
  const [announcements, setAnnouncements] = useState<StoreAnnouncement[]>(() => {
    try {
      const saved = localStorage.getItem(ANNOUNCEMENTS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_ANNOUNCEMENTS;
  });

  // Admin Auth State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // UI state
  const [selectedCategory, setSelectedCategory] = useState<Category>('همه');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyKalabarg, setOnlyKalabarg] = useState<boolean>(false);
  const [onlyRestocked, setOnlyRestocked] = useState<boolean>(false);
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  const [lastSubmittedOrder, setLastSubmittedOrder] = useState<Order | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isStoreInfoOpen, setIsStoreInfoOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(announcements));
    } catch {
      // ignore
    }
  }, [announcements]);

  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_STORAGE_KEY, isAdmin ? 'true' : 'false');
    } catch {
      // ignore
    }
  }, [isAdmin]);

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock);
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      return [...prev, { product, quantity: Math.min(quantity, Math.max(1, product.stock)) }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) => {
      return prev.map((item) => {
        if (item.product.id === productId) {
          const maxStock = item.product.stock;
          return { ...item, quantity: Math.min(quantity, maxStock) };
        }
        return item;
      });
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Admin authentication (Accepts either Mr. Haghdoust's phone numbers or standard passwords)
  const loginAdmin = (code: string): boolean => {
    const clean = code.trim().replace(/\s+/g, '');
    const validCodes = ['09351506418', '09158304737', '9351506418', '9158304737', '1234', '1357', 'haghdoust', 'حقدوست', 'admin'];
    if (validCodes.includes(clean)) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
  };

  // Restock action specifically requested by user:
  // "امکان اینکه من به عنوان مدیر وارد شود و محصولاتی که مججد به فروشگاه میاوردم را شارژ کنم"
  const restockProduct = (
    productId: string,
    addedStock: number,
    newPrice?: number,
    markAsRestocked = true
  ) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedStock = Math.max(0, p.stock + addedStock);
          return {
            ...p,
            stock: updatedStock,
            price: newPrice !== undefined && newPrice > 0 ? newPrice : p.price,
            isRestocked: markAsRestocked ? true : p.isRestocked,
            isDailyFresh: true,
          };
        }
        return p;
      })
    );
  };

  const updateProduct = (product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    // Also update in cart if present
    setCart((prev) =>
      prev.map((item) => (item.product.id === product.id ? { ...item, product } : item))
    );
  };

  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProdData,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    removeFromCart(productId);
  };

  const resetToInitialProducts = () => {
    setProducts(INITIAL_PRODUCTS);
  };

  // Order submission
  const submitOrder = (orderData: {
    customerName: string;
    customerPhone: string;
    deliveryMethod: 'delivery' | 'pickup';
    address?: string;
    paymentMethod: 'kalabarg' | 'cash_on_delivery' | 'card_transfer';
    notes?: string;
  }): Order => {
    const now = new Date();
    const orderNumber = `TV-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderItems = cart.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      unit: item.product.unit,
      price: item.product.price,
      quantity: item.quantity,
      imageUrl: item.product.imageUrl,
      hasKalabarg: item.product.hasKalabarg,
    }));

    const totalAmount = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const kalabargEligibleAmount = cart
      .filter((item) => item.product.hasKalabarg)
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      deliveryMethod: orderData.deliveryMethod,
      address: orderData.address,
      paymentMethod: orderData.paymentMethod,
      items: orderItems,
      totalAmount,
      kalabargEligibleAmount,
      status: 'pending',
      createdAt: now.toLocaleString('fa-IR'),
      notes: orderData.notes,
    };

    // Deduct stock
    setProducts((prev) =>
      prev.map((p) => {
        const cartMatch = cart.find((c) => c.product.id === p.id);
        if (cartMatch) {
          return {
            ...p,
            stock: Math.max(0, p.stock - cartMatch.quantity),
          };
        }
        return p;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    setLastSubmittedOrder(newOrder);
    clearCart();
    setIsCartOpen(false);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  const updateAnnouncement = (ann: StoreAnnouncement) => {
    setAnnouncements((prev) =>
      prev.map((item) => (item.id === ann.id ? ann : item))
    );
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const cartKalabargTotal = cart
    .filter((item) => item.product.hasKalabarg)
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        orders,
        announcements,
        isAdmin,
        selectedCategory,
        searchQuery,
        onlyKalabarg,
        onlyRestocked,
        activeProductDetail,
        lastSubmittedOrder,
        isCartOpen,
        isAdminModalOpen,
        isStoreInfoOpen,
        setSelectedCategory,
        setSearchQuery,
        setOnlyKalabarg,
        setOnlyRestocked,
        setActiveProductDetail,
        setIsCartOpen,
        setIsAdminModalOpen,
        setIsStoreInfoOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        loginAdmin,
        logoutAdmin,
        restockProduct,
        updateProduct,
        addProduct,
        deleteProduct,
        resetToInitialProducts,
        submitOrder,
        updateOrderStatus,
        updateAnnouncement,
        cartTotalCount,
        cartTotalPrice,
        cartKalabargTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
