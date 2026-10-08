import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaShippingFast, FaStore, FaCheckCircle, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';

// Format money without trailing ".00" noise
const fmt = (value) =>
  Number(value || 0).toLocaleString('en-LK', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

// Netlify function that saves the order and signs PayHere card payments (see netlify/functions/).
// VITE_ORDER_API_URL is the Netlify site URL, e.g. https://multiflavours-orders.netlify.app
const placeOrder = async (order) => {
  const res = await fetch(`${import.meta.env.VITE_ORDER_API_URL}/.netlify/functions/place-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Failed to place order. Please try again.');
  return data;
};

// Saved while the customer is away on the PayHere page, so a cancelled payment can restore the checkout.
const PENDING_KEY = 'mf-pending-card-checkout';

// Sends the browser to PayHere's hosted payment page with the server-signed fields.
const redirectToPayHere = (checkoutUrl, fields) => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = checkoutUrl;
  Object.entries(fields).forEach(([name, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit();
};

const Checkout = ({ cartItems: liveCartItems, setCartItems }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // Prefer the live cart from App state (resets on refresh, just like the navbar cart)
  // over router history state, which the browser keeps around across a reload.
  const cartItems = liveCartItems ?? location.state?.cartItems ?? [];
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.totalPrice || item.price * item.quantity * item.selectedValue),
    0
  );
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    deliveryMethod: '',
    paymentMethod: ''
  });

  // Back from the PayHere page: ?payment=done after paying, ?payment=cancelled otherwise.
  useEffect(() => {
    const result = new URLSearchParams(location.search).get('payment');
    if (!result) return;

    let pending = null;
    try {
      pending = JSON.parse(sessionStorage.getItem(PENDING_KEY));
      sessionStorage.removeItem(PENDING_KEY);
    } catch {
      // Storage unavailable; the order itself is already saved on the server.
    }
    navigate('/Checkout', { replace: true });

    if (pending?.formData) setFormData(pending.formData);
    if (result === 'done') {
      setShowPopup(true);
    } else {
      if (pending?.cartItems && setCartItems) setCartItems(pending.cartItems);
      alert("Payment was cancelled. You can try again or choose cash payment.");
    }
  }, [location.search, navigate, setCartItems]);

  const deliveryFee = formData.deliveryMethod === 'ship' ? 350 : 0;
  const totalWithDelivery = totalPrice + deliveryFee;

  const calculateTotal = (quantity, selectedValue, unitPrice) => {
    return quantity * selectedValue * unitPrice;
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    if (!formData.deliveryMethod) {
      alert("Please select a delivery method.");
      return;
    }
    if (!formData.paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    setLoading(true);

    try {
      // The server saves and numbers the order, and for card payments signs the PayHere payment.
      const data = await placeOrder({ ...formData, cartItems });

      if (formData.paymentMethod === 'cash') {
        setLoading(false);
        setShowPopup(true);
        return;
      }

      try {
        sessionStorage.setItem(PENDING_KEY, JSON.stringify({ formData, cartItems }));
      } catch {
        // Not critical: only used to restore the cart if the payment is cancelled.
      }
      redirectToPayHere(data.checkoutUrl, data.payment);
    } catch (error) {
      console.error("Failed to place order:", error);
      setLoading(false);
      alert(error.message || "Failed to place order. Please try again.");
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup when the user clicks the close button
    navigate('/');
  };
  const selectDeliveryMethod = (method) => {
    setFormData((prevState) => ({
      ...prevState,
      deliveryMethod: method
    }));
  };
  const selectPaymentMethod = (method) => {
    setFormData((prevState) => ({
      ...prevState,
      paymentMethod: method
    }));
  };
          
  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/60 text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary focus:bg-white";
  const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 sm:py-12">
      <form onSubmit={handlePlaceOrder} className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-8">
        {/* Customer Info (Left) */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Checkout</h1>
            <p className="mt-1 text-sm text-gray-500">Fill in your details to complete your order.</p>
          </div>

          {/* Contact section */}
          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="mb-5 text-base font-semibold text-gray-900">Contact information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClass}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your full name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="07X XXX XXXX"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Delivery method section */}
          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-base font-semibold text-gray-900">Shipping & delivery</h2>
            <p className="mt-1 text-sm text-gray-500">Select how you would like to receive your order.</p>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { key: 'ship', label: 'Ship to my address', hint: 'Delivered to your door', Icon: FaShippingFast },
                { key: 'pickup', label: 'Pick up from store', hint: 'Free, ready same day', Icon: FaStore },
              ].map(({ key, label, hint, Icon }) => {
                const selected = formData.deliveryMethod === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => selectDeliveryMethod(key)}
                    aria-pressed={selected}
                    className={`relative flex items-center gap-3 rounded-2xl border p-4 text-left transition-all focus:outline-none ${
                      selected
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/30'
                        : 'border-gray-200 hover:border-primary/40 hover:bg-gray-50'
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                        selected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{label}</p>
                      <p className="text-xs text-gray-500">{hint}</p>
                    </div>
                    {selected && (
                      <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {formData.deliveryMethod === 'ship' && (
              <div className="mt-5 grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="Street address"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Zip code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Payment method section */}
          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-base font-semibold text-gray-900">Payment method</h2>
            <p className="mt-1 text-sm text-gray-500">Choose how you would like to pay.</p>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { key: 'card', label: 'Card payment', hint: 'Pay securely with PayHere', Icon: FaCreditCard },
                {
                  key: 'cash',
                  label: 'Cash payment',
                  hint: formData.deliveryMethod === 'pickup' ? 'Pay when you pick up' : 'Pay on delivery',
                  Icon: FaMoneyBillWave,
                },
              ].map(({ key, label, hint, Icon }) => {
                const selected = formData.paymentMethod === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => selectPaymentMethod(key)}
                    aria-pressed={selected}
                    className={`relative flex items-center gap-3 rounded-2xl border p-4 text-left transition-all focus:outline-none ${
                      selected
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/30'
                        : 'border-gray-200 hover:border-primary/40 hover:bg-gray-50'
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                        selected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{label}</p>
                      <p className="text-xs text-gray-500">{hint}</p>
                    </div>
                    {selected && (
                      <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Summary (Right) */}
        <div className="lg:sticky lg:top-8">
          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="mb-4 text-base font-semibold text-gray-900">Order summary</h2>

            {cartItems.length === 0 ? (
              <p className="py-6 text-center text-sm text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedValue}`} className="flex items-center gap-3">
                    {item.img ? (
                      <img src={item.img} alt={item.name} className="h-12 w-12 shrink-0 rounded-xl object-cover" />
                    ) : (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-secondary">
                        {item.name?.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-xs text-gray-500">
                        {item.selectedValue}{item.type === 'weight' ? 'g' : ' pcs'} × {item.quantity}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-semibold text-gray-900">
                      Rs {fmt(calculateTotal(item.quantity, item.selectedValue, item.price))}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-5 space-y-2 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium text-gray-900">Rs {fmt(totalPrice)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Delivery fee</span>
                <span className="font-medium text-gray-900">{deliveryFee ? `Rs ${fmt(deliveryFee)}` : 'Free'}</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <span className="text-base font-semibold text-gray-900">Total</span>
                <span className="text-xl font-extrabold tracking-tight text-gray-900">Rs {fmt(totalWithDelivery)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-secondary py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40 active:scale-[0.99] ${
                loading ? 'cursor-not-allowed opacity-60' : ''
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  {formData.paymentMethod === 'card' ? 'Opening PayHere..' : 'Packing Up Happiness..'}
                </>
              ) : (
                <>
                  {formData.paymentMethod === 'card' ? 'Continue to PayHere' : 'Place Order'}
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Popup for Successful Order */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl ring-1 ring-black/5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <FaCheckCircle className="h-8 w-8" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-900">Order placed!</h2>
            <p className="mt-2 text-sm text-gray-500">
              {formData.paymentMethod === 'card'
                ? 'Your payment was successful and your order is placed. Check your email for the details.'
                : `Your order was placed successfully. Please have Rs ${fmt(totalWithDelivery)} ready ${
                    formData.deliveryMethod === 'pickup' ? 'when you pick it up' : 'on delivery'
                  }.`}
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-700">See you soon!</p>
            <button
              onClick={closePopup}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-primary to-secondary py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40 active:scale-[0.99]"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
