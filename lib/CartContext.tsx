'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockData, CookieFlavor, BoxTier } from '@/lib/mockData';

export interface CartBoxItem {
  id: string;
  boxTier: BoxTier;
  fulfillment: 'Austin Pickup' | 'Austin Delivery' | 'Texas Shipping';
  dateLabel: string;
  items: { cookie: CookieFlavor; quantity: number }[];
  price: number;
}

interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info' | 'warning';
}

interface CartContextType {
  // Current Box Building State
  currentBoxSize: number;
  setCurrentBoxSize: (size: number) => void;
  selectedFlavors: { [flavorId: string]: number };
  addFlavorToBox: (flavor: CookieFlavor) => boolean;
  removeFlavorFromBox: (flavorId: string) => void;
  clearCurrentBox: () => void;
  totalFlavorsInBox: number;
  isBoxFull: boolean;

  // Selected Fulfillment & Date
  fulfillment: 'Austin Pickup' | 'Austin Delivery' | 'Texas Shipping';
  setFulfillment: (f: 'Austin Pickup' | 'Austin Delivery' | 'Texas Shipping') => void;
  selectedDateId: string;
  setSelectedDateId: (id: string) => void;

  // Cart state
  cart: CartBoxItem[];
  addCurrentBoxToCart: () => boolean;
  removeCartItem: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Quick cookie detail modal
  activeModalCookie: CookieFlavor | null;
  setActiveModalCookie: (c: CookieFlavor | null) => void;

  // Toast notifications
  toasts: ToastMessage[];
  showToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning') => void;
  dismissToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [currentBoxSize, setCurrentBoxSize] = useState<number>(6);
  const [selectedFlavors, setSelectedFlavors] = useState<{ [flavorId: string]: number }>({});
  const [fulfillment, setFulfillment] = useState<'Austin Pickup' | 'Austin Delivery' | 'Texas Shipping'>('Austin Pickup');
  const [selectedDateId, setSelectedDateId] = useState<string>('drop-nov-8');
  
  const [cart, setCart] = useState<CartBoxItem[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [activeModalCookie, setActiveModalCookie] = useState<CookieFlavor | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, message?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const totalFlavorsInBox = Object.values(selectedFlavors).reduce((sum, count) => sum + count, 0);
  const isBoxFull = totalFlavorsInBox >= currentBoxSize;

  const addFlavorToBox = (flavor: CookieFlavor): boolean => {
    if (totalFlavorsInBox >= currentBoxSize) {
      showToast(
        `Box of ${currentBoxSize} is full!`,
        `You've selected ${currentBoxSize}/${currentBoxSize} cookies. Add to cart or switch to a Box of 10.`,
        'warning'
      );
      return false;
    }

    setSelectedFlavors(prev => ({
      ...prev,
      [flavor.id]: (prev[flavor.id] || 0) + 1
    }));

    showToast(`Added ${flavor.name}`, `${totalFlavorsInBox + 1} of ${currentBoxSize} cookies in your box`, 'success');
    return true;
  };

  const removeFlavorFromBox = (flavorId: string) => {
    setSelectedFlavors(prev => {
      const current = prev[flavorId] || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[flavorId];
        return copy;
      }
      return { ...prev, [flavorId]: current - 1 };
    });
  };

  const clearCurrentBox = () => {
    setSelectedFlavors({});
  };

  const addCurrentBoxToCart = (): boolean => {
    if (totalFlavorsInBox !== currentBoxSize) {
      showToast(
        `Please select exactly ${currentBoxSize} cookies`,
        `You currently have ${totalFlavorsInBox} selected. Need ${currentBoxSize - totalFlavorsInBox} more.`,
        'warning'
      );
      return false;
    }

    const tier = mockData.boxTiers.find(b => b.size === currentBoxSize) || mockData.boxTiers[1];
    const dateObj = mockData.dropDates.find(d => d.id === selectedDateId) || mockData.dropDates[0];

    const boxItems = Object.entries(selectedFlavors).map(([flavorId, qty]) => {
      const cookie = mockData.menuItems.find(m => m.id === flavorId)!;
      return { cookie, quantity: qty };
    });

    const newCartBox: CartBoxItem = {
      id: 'box_' + Date.now().toString(36),
      boxTier: tier,
      fulfillment,
      dateLabel: dateObj.dateLabel,
      items: boxItems,
      price: tier.demoPrice
    };

    setCart(prev => [...prev, newCartBox]);
    setSelectedFlavors({});
    setIsCartDrawerOpen(true);
    showToast(`Box of ${currentBoxSize} Added to Cart!`, `Ready for ${fulfillment} on ${dateObj.dateLabel}`, 'success');
    return true;
  };

  const removeCartItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    showToast('Box removed from cart', undefined, 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.length;
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider
      value={{
        currentBoxSize,
        setCurrentBoxSize,
        selectedFlavors,
        addFlavorToBox,
        removeFlavorFromBox,
        clearCurrentBox,
        totalFlavorsInBox,
        isBoxFull,
        fulfillment,
        setFulfillment,
        selectedDateId,
        setSelectedDateId,
        cart,
        addCurrentBoxToCart,
        removeCartItem,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        activeModalCookie,
        setActiveModalCookie,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
