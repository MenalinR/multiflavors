import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Format money without trailing ".00" noise
const fmt = (value) =>
  Number(value).toLocaleString('en-LK', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

const CartItem = ({ item, onDelete }) => {
  const itemTotalPrice = item.price * item.quantity * item.selectedValue;
  const isWeight = item.type === 'weight';
  const amountLabel = isWeight ? `${item.selectedValue}g` : `${item.selectedValue} pcs`;

  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 transition-all hover:border-primary/40 hover:shadow-md sm:p-4">
      {item.img ? (
        <img
          src={item.img}
          alt={item.name}
          className="h-14 w-14 shrink-0 rounded-xl object-cover sm:h-16 sm:w-16"
        />
      ) : (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-secondary sm:h-16 sm:w-16">
          {item.name?.charAt(0)}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-semibold text-gray-900">{item.name}</h3>
        <p className="mt-0.5 text-sm text-gray-500">
          {amountLabel}
          <span className="text-gray-300"> × </span>
          {item.quantity}
          <span className="text-gray-300"> · </span>
          Rs {fmt(item.price)}/{isWeight ? 'g' : 'pc'}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <span className="text-base font-bold text-gray-900 sm:text-lg">
          Rs {fmt(itemTotalPrice)}
        </span>
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(item.id, item.selectedValue)}
            aria-label={`Remove ${item.name} from cart`}
            className="flex items-center gap-1 rounded-full px-2 py-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 sm:px-2.5"
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6" />
            </svg>
            <span className="hidden text-xs font-semibold sm:inline">Remove</span>
          </button>
        )}
      </div>
    </div>
  );
};

const Cart = ({ isOpen, onClose, cartItems, onDelete }) => {
  const [isUnderConstruction, setIsUnderConstruction] = useState(false);
  const navigate = useNavigate();

  // Close on Escape and lock background scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const calculateTotalPrice = () =>
    cartItems.reduce(
      (total, item) =>
        total + (item.totalPrice || item.price * item.quantity * item.selectedValue),
      0
    );

  const isCartEmpty = cartItems.length === 0;
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const handleCheckoutClick = () => {
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty! Add items before checking out.");
      return;
    }

    const totalPrice = calculateTotalPrice();
    onClose();
    navigate('/checkout', { state: { cartItems, totalPrice } });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl ring-1 ring-black/5 sm:max-h-[85vh] sm:rounded-3xl"
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 sm:px-7 sm:py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-secondary">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3 6h18M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Your Cart</h2>
            {!isCartEmpty && (
              <p className="text-sm text-gray-500">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {isUnderConstruction ? (
          <div className="px-5 py-10 text-center sm:px-7">
            <p className="text-lg font-medium leading-relaxed text-gray-700">
              We are currently building our cart ordering feature, so it's not quite ready yet.
              In the meantime, you can easily place your orders through Instagram, PickMe, UberEats, or WhatsApp.
              Just check the footer for the links!
            </p>
          </div>
        ) : isCartEmpty ? (
          <div className="flex flex-col items-center px-5 py-14 text-center sm:px-7">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3 6h18M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <p className="mt-4 text-lg font-semibold text-gray-900">Your cart is empty</p>
            <p className="mt-1 text-sm text-gray-500">Add some treats to get started.</p>
            <button
              onClick={onClose}
              className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary"
            >
              Browse products
            </button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 space-y-2.5 overflow-y-auto px-5 py-4 sm:px-7 sm:py-5">
              {cartItems.map((item) => (
                <CartItem
                  key={`${item.id}-${item.selectedValue}`}
                  item={item}
                  onDelete={onDelete}
                />
              ))}
            </div>

            {/* Footer / summary */}
            <div className="border-t border-gray-100 bg-gray-50/80 px-5 py-4 sm:px-7 sm:py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-gray-500">Total Price</span>
                <span className="text-2xl font-extrabold tracking-tight text-gray-900">
                  Rs {fmt(calculateTotalPrice())}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-end gap-3">
                <button
                  onClick={onClose}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCheckoutClick}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40 active:scale-[0.99]"
                >
                  Checkout
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
