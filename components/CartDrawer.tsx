'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { X, ShoppingBag, Trash2, ArrowRight, CheckCircle, Sparkles, MapPin, Calendar, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer() {
  const {
    cart,
    cartCount,
    cartSubtotal,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeCartItem,
    clearCart,
    showToast
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [customerName, setCustomerName] = useState('Alex Rivera');
  const [customerEmail, setCustomerEmail] = useState('alex.rivera@example.com');
  const [customerPhone, setCustomerPhone] = useState('(512) 555-0198');

  if (!isCartDrawerOpen) return null;

  const handleSimulateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderCompleted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E9B23F', '#FF8378', '#92D4E3', '#F9D3A5', '#3B1E14']
    });
  };

  const handleCloseAll = () => {
    setIsCartDrawerOpen(false);
    if (orderCompleted) {
      clearCart();
      setOrderCompleted(false);
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" data-lenis-prevent>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/55 backdrop-blur-[2px] animate-[fade-in_0.3s_ease-out]"
        onClick={handleCloseAll}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-ground shadow-2xl flex flex-col sm:my-3 sm:mr-3 sm:rounded-[2rem] overflow-hidden animate-[drawer-in_0.55s_cubic-bezier(0.16,1,0.3,1)]">
          
          {/* Header */}
          <div className="doodles-dark px-6 py-5 bg-cocoa text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="relative z-10 w-5 h-5 text-mustard" />
              <h2 className="relative z-10 font-display text-2xl text-white">
                Your order ({cartCount})
              </h2>
            </div>
            <button
              onClick={handleCloseAll}
              className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-ink transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {orderCompleted ? (
              /* ORDER CONFIRMATION SCREEN */
              <div className="text-center py-8 space-y-5 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-mustard text-ink flex items-center justify-center mx-auto shadow-sticker border-[3px] border-ink">
                  <CheckCircle className="w-9 h-9" />
                </div>

                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-mustard text-ink text-xs font-bold">
                    Demo mode, no charge was made
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-burgundy-900">
                    Order reserved, #TC-4288
                  </h3>
                  <p className="text-sm text-cream-800/80 leading-relaxed max-w-xs mx-auto">
                    Fresh dough reserved for Saturday baking. A pickup reminder and gate code will be sent to <strong>{customerEmail}</strong>.
                  </p>
                </div>

                {/* Pickup details card */}
                <div className="bg-peach rounded-[1.25rem] p-4 text-left text-xs space-y-2 text-ink">
                  <div className="flex items-center gap-2 font-bold text-burgundy-800">
                    <MapPin className="w-4 h-4 text-burgundy-700" />
                    <span>Pickup Porch Instructions</span>
                  </div>
                  <p className="text-cream-800/90 leading-relaxed">
                    South Congress / Travis Heights, Austin TX. Drive up Saturday between 11:00 AM and 2:00 PM. Look for the Tatti table on the porch.
                  </p>
                </div>

                <button
                  onClick={handleCloseAll}
                  className="btn btn-dark w-full"
                >
                  Back to the shop
                </button>
              </div>
            ) : isCheckingOut ? (
              /* CHECKOUT SIMULATION FORM */
              <form onSubmit={handleSimulateOrder} className="space-y-5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-burgundy-900">
                    Demo checkout
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs text-burgundy-700 hover:underline font-semibold"
                  >
                    Edit box
                  </button>
                </div>

                <div className="p-3.5 bg-sky rounded-[1.25rem] text-xs text-ink flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    <strong>Sales demo:</strong> No payment details needed. This shows the customer journey and order reservation flow.
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-1.5">
                      Full name
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-full border-2 border-ink/10 bg-white text-ink text-sm focus:outline-none focus:border-ink"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-1.5">
                      Email for the receipt and drop updates
                    </label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={e => setCustomerEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-full border-2 border-ink/10 bg-white text-ink text-sm focus:outline-none focus:border-ink"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-1.5">
                      Mobile, for the Saturday pickup text
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-full border-2 border-ink/10 bg-white text-ink text-sm focus:outline-none focus:border-ink"
                    />
                  </div>
                </div>

                {/* Summary */}
                <div className="pt-3 border-t border-cream-200 text-sm space-y-1.5 text-cream-800">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartCount} boxes)</span>
                    <span className="font-semibold text-burgundy-900">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-cream-800/80">
                    <span>Fulfillment</span>
                    <span className="font-semibold text-ink">Free Austin pickup</span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-burgundy-900 pt-2 border-t border-cream-200">
                    <span>Estimated Total</span>
                    <span>${cartSubtotal.toFixed(2)} <small className="text-xs font-normal text-cream-800/70">(Demo)</small></span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-dark btn-lg w-full group"
                >
                  <span>Place demo pre-order</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            ) : cart.length === 0 ? (
              /* EMPTY CART */
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-butter-200/80 text-burgundy-700 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-lg font-bold text-burgundy-900">
                  Your order is empty
                </h3>
                <p className="text-sm text-cream-800/80 max-w-xs mx-auto">
                  Build a box of 4, 6 or 10 from this week’s flavors, then come back here to reserve it.
                </p>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="btn btn-dark btn-sm"
                >
                  See the flavors
                </button>
              </div>
            ) : (
              /* CART ITEMS LIST */
              <div className="space-y-4">
                {cart.map(box => (
                  <div
                    key={box.id}
                    className="p-4 rounded-[1.5rem] bg-white shadow-card space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="inline-block font-display text-lg leading-tight text-ink">
                          {box.boxTier.name}
                        </span>
                        <div className="text-xs text-cream-800/70 mt-1 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-burgundy-600" />
                          <span>{box.dateLabel}</span>
                          <span>•</span>
                          <span className="font-semibold text-burgundy-800">{box.fulfillment}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-serif font-bold text-burgundy-900 text-base">
                          ${box.price.toFixed(2)}
                        </span>
                        <span className="block text-[10px] text-cream-800/60 uppercase">demo price</span>
                      </div>
                    </div>

                    {/* Cookie Flavors breakdown */}
                    <div className="bg-cream-50 rounded-xl p-2.5 text-xs text-cream-900 space-y-1">
                      <p className="font-semibold text-ink text-xs">
                        Flavors in this box
                      </p>
                      <ul className="space-y-0.5 pl-1">
                        {box.items.map((it, idx) => (
                          <li key={idx} className="flex justify-between items-center text-xs">
                            <span className="text-cream-900">{it.cookie.name}</span>
                            <span className="font-mono font-semibold text-burgundy-700 bg-butter-200/60 px-1.5 py-0.5 rounded">
                              ×{it.quantity}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => removeCartItem(box.id)}
                        className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-800 transition-colors py-1 px-2 rounded hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove box</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          {!orderCompleted && cart.length > 0 && !isCheckingOut && (
            <div className="p-6 bg-peach space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-cream-800">
                  <span>Subtotal</span>
                  <span className="font-bold text-burgundy-900">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-cream-800/80">
                  <span>Drop Window</span>
                  <span className="text-burgundy-700 font-semibold">Drop #42 Active</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-burgundy-900 pt-2 border-t border-cream-200">
                  <span>Total</span>
                  <span>${cartSubtotal.toFixed(2)} <small className="text-xs font-normal text-cream-800/70">(Demo)</small></span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="btn btn-dark btn-lg w-full group"
              >
                <span>Reserve this order</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-center text-[11px] text-cream-800/70">
                Orders close Friday 12 PM CST for the Saturday bake.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
