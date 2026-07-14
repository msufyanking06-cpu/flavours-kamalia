import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Trash2, MapPin, Phone, User, CreditCard, 
  Sparkles, CheckCircle, Clock, Truck, ShieldCheck, Heart, AlertCircle, RefreshCw 
} from 'lucide-react';
import { CartItem, MenuItem, Order } from '../types';

interface OrderSectionProps {
  cart: CartItem[];
  onAddToBag: (item: MenuItem) => void;
  onRemoveFromBag: (itemId: string) => void;
  onClearCart: () => void;
  onPlaceOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => void;
  orders: Order[];
}

export default function OrderSection({
  cart,
  onAddToBag,
  onRemoveFromBag,
  onClearCart,
  onPlaceOrder,
  orders,
}: OrderSectionProps) {
  // Checkout & Payment State
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'card_simulator' | 'cash_on_delivery'>('card_simulator');
  
  // Card Details State
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // Payment Sim States
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [paymentSteps, setPaymentSteps] = useState<string>('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Cart financial math
  const subtotal = cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
  const deliveryFee = orderType === 'delivery' ? 150 : 0;
  const total = subtotal + deliveryFee;

  // Simulate Payment Gateway Stages
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || (orderType === 'delivery' && !address)) {
      alert('Please fill out all required shipping fields.');
      return;
    }

    if (paymentMethod === 'card_simulator' && (!cardNumber || !cardExpiry || !cardCvv)) {
      alert('Please enter simulated card credentials.');
      return;
    }

    setPaymentStatus('processing');
    setPaymentSteps('Establishing handshake with Flavourz Bank Gateway...');

    setTimeout(() => {
      setPaymentSteps('Validating credentials and card limits...');
    }, 1200);

    setTimeout(() => {
      setPaymentSteps('Authorizing payment and settling funds...');
    }, 2500);

    setTimeout(() => {
      // Complete Order Construction
      const orderId = `FL-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
      onPlaceOrder({
        items: [...cart],
        subtotal,
        deliveryFee,
        total,
        customerName,
        phone,
        address: orderType === 'delivery' ? address : 'Self Takeaway from Kamalia Lounge',
        type: orderType,
        paymentMethod,
      });

      const finishedOrder: Order = {
        id: orderId,
        items: [...cart],
        subtotal,
        deliveryFee,
        total,
        customerName,
        phone,
        address: orderType === 'delivery' ? address : 'Lounge Pickup',
        type: orderType,
        paymentMethod,
        status: 'Placed',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setCompletedOrder(finishedOrder);
      setPaymentStatus('success');
      onClearCart();
      
      // Reset details
      setCardNumber('');
      setCardExpiry('');
      setCardCvv('');
      setCardName('');
      setIsCheckoutMode(false);
    }, 4000);
  };

  // Status mapping for order steps
  const getStepStatus = (orderStatus: string, stepName: string) => {
    const steps = ['Placed', 'Kitchen Preparing', 'Out for Delivery', 'Delivered'];
    const currentIdx = steps.indexOf(orderStatus);
    const stepIdx = steps.indexOf(stepName);

    if (stepIdx < currentIdx) return 'completed';
    if (stepIdx === currentIdx) return 'active';
    return 'pending';
  };

  return (
    <section id="order" className="py-24 bg-slate-950 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-gold-400 font-bold block">
            Express Takeaway & Delivery
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            Order Online <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-100 to-gold-400">Home Service</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-sans font-light">
            Craving that signature steam roast or a hot gourmet burger? Load your basket, select delivery or collection, and experience rapid packaging and service.
          </p>
        </div>

        {paymentStatus === 'processing' ? (
          /* PROCESSING SPINNER SCREEN */
          <div className="max-w-xl mx-auto bg-slate-900 border border-gold-500/20 rounded-3xl p-10 text-center space-y-6 shadow-2xl">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-gold-950" />
              <div className="absolute inset-0 rounded-full border-4 border-t-gold-400 animate-spin" />
              <ShoppingBag className="w-8 h-8 text-gold-400 absolute inset-0 m-auto animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white font-display">Processing Payment</h3>
              <p className="text-xs text-gold-400 font-mono tracking-wider uppercase animate-pulse">Simulator Active</p>
            </div>
            
            <div className="bg-slate-950 rounded-xl p-4 border border-gold-900/10 max-w-md mx-auto">
              <p className="text-xs text-gray-400 font-mono italic leading-relaxed">
                {paymentSteps}
              </p>
            </div>
            
            <p className="text-[10px] text-gray-500 font-mono">
              Please do not refresh this window or close the tab. This payment is fully simulated.
            </p>
          </div>

        ) : paymentStatus === 'success' && completedOrder ? (
          /* PAYMENT SUCCESS & ACTIVE ORDER TRACKER */
          <div className="max-w-3xl mx-auto space-y-8 animate-scale-up">
            
            <div className="bg-slate-900 border border-gold-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-xl">
              <div className="w-14 h-14 bg-gold-950 border border-gold-500/20 rounded-full flex items-center justify-center mx-auto text-gold-400">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-display font-bold text-white tracking-tight">Order Placed Successfully!</h3>
                <p className="text-xs text-gray-400 font-mono">Receipt Reference: <span className="text-gold-400 font-bold">{completedOrder.id}</span></p>
              </div>

              {/* Realtime tracker map */}
              <div className="bg-slate-950 rounded-2xl p-6 border border-gold-900/15 max-w-xl mx-auto space-y-8">
                <div className="text-left">
                  <span className="text-xs font-mono uppercase tracking-wider text-gold-400 font-bold block mb-2">Live Order Status Tracker</span>
                  <p className="text-xs text-gray-300 font-sans">We have forwarded your order details straight to our Kamalia branch kitchen line. Track status steps live below:</p>
                </div>

                {/* Tracking Stepper Layout */}
                <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  {/* Stepper center connector line */}
                  <div className="absolute left-[19px] md:left-0 md:top-[19px] top-0 bottom-0 md:bottom-auto md:w-full md:h-1 bg-slate-900 -z-1" />
                  
                  {/* Step 1: Placed */}
                  <div className="flex md:flex-col items-center gap-4 md:gap-2 text-left md:text-center flex-1">
                    <div className="w-10 h-10 rounded-full bg-gold-500 text-slate-950 flex items-center justify-center font-bold text-sm shadow-md shadow-gold-500/20">
                      1
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-white font-mono uppercase">Ordered</span>
                      <span className="text-[10px] text-gray-400 font-sans">Placed at {completedOrder.createdAt}</span>
                    </div>
                  </div>

                  {/* Step 2: Kitchen */}
                  <div className="flex md:flex-col items-center gap-4 md:gap-2 text-left md:text-center flex-1">
                    <div className="w-10 h-10 rounded-full bg-gold-950 text-gold-400 border border-gold-500/40 flex items-center justify-center font-bold text-sm shadow-md animate-pulse">
                      2
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gold-400 font-mono uppercase">In Kitchen</span>
                      <span className="text-[10px] text-gray-400 font-sans">Grilling Freshly</span>
                    </div>
                  </div>

                  {/* Step 3: Out for Delivery */}
                  <div className="flex md:flex-col items-center gap-4 md:gap-2 text-left md:text-center flex-1">
                    <div className="w-10 h-10 rounded-full bg-slate-950 text-gray-600 border border-slate-900 flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 font-mono uppercase">Dispatched</span>
                      <span className="text-[10px] text-gray-500 font-sans">Hot Box Transit</span>
                    </div>
                  </div>

                  {/* Step 4: Delivered */}
                  <div className="flex md:flex-col items-center gap-4 md:gap-2 text-left md:text-center flex-1">
                    <div className="w-10 h-10 rounded-full bg-slate-950 text-gray-600 border border-slate-900 flex items-center justify-center font-bold text-sm">
                      4
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 font-mono uppercase">Arrived</span>
                      <span className="text-[10px] text-gray-500 font-sans">Enjoy Dinner!</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setPaymentStatus('idle')}
                  className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-slate-950 font-bold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Order Something Else
                </button>
              </div>
            </div>

          </div>

        ) : isCheckoutMode ? (
          /* CHECKOUT INTERFACE */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form details (Left side) */}
            <form onSubmit={handlePayment} className="lg:col-span-7 bg-slate-900/60 backdrop-blur-md border border-gold-900/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              
              <div className="flex justify-between items-center pb-4 border-b border-gold-900/10">
                <h3 className="text-xl font-bold font-display text-white">Checkout Details</h3>
                <button
                  type="button"
                  onClick={() => setIsCheckoutMode(false)}
                  className="text-xs text-gold-400 hover:text-gold-300 font-mono tracking-wider uppercase cursor-pointer"
                >
                  ← Modify Basket
                </button>
              </div>

              {/* Order Mode Toggle */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`p-4 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center gap-1.5 ${
                    orderType === 'delivery'
                      ? 'bg-gold-950/40 border-gold-500 text-gold-300'
                      : 'bg-slate-950 border-gold-900/10 text-gray-400'
                  }`}
                >
                  <Truck className="w-5 h-5" />
                  <span className="text-xs font-semibold uppercase tracking-wider font-mono">Breezy Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType('takeaway')}
                  className={`p-4 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center gap-1.5 ${
                    orderType === 'takeaway'
                      ? 'bg-gold-950/40 border-gold-500 text-gold-300'
                      : 'bg-slate-950 border-gold-900/10 text-gray-400'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="text-xs font-semibold uppercase tracking-wider font-mono">Takeaway Pickup</span>
                </button>
              </div>

              {/* Address & Contacts */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Sufyan"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-slate-950 text-white pl-4 pr-4 py-3 rounded-xl border border-gold-900/20 focus:border-gold-400/50 focus:outline-none focus:ring-1 focus:ring-gold-400/30 text-sm transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">Active Contact (Phone)</label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 316 6591611"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-950 text-white pl-4 pr-4 py-3 rounded-xl border border-gold-900/20 focus:border-gold-400/50 focus:outline-none focus:ring-1 focus:ring-gold-400/30 text-sm transition-all"
                    />
                  </div>
                </div>

                {orderType === 'delivery' && (
                  <div className="space-y-2 animate-fade-in">
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">Delivery Address (Kamalia, Pakistan)</label>
                    <textarea
                      required
                      placeholder="E.g., House #24, Near Gola Pull Masjid, Kamalia, Pakistan"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-slate-950 text-white p-4 rounded-xl border border-gold-900/20 focus:border-gold-400/50 focus:outline-none focus:ring-1 focus:ring-gold-400/30 text-sm transition-all h-20 resize-none"
                    />
                  </div>
                )}
              </div>

              {/* Payment Selector */}
              <div className="space-y-4">
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">Payment Methods</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card_simulator')}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                      paymentMethod === 'card_simulator'
                        ? 'bg-gold-950/40 border-gold-400 text-gold-300'
                        : 'bg-slate-950 border-gold-900/10 text-gray-400'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 shrink-0" />
                    <div>
                      <span className="block text-xs font-bold font-mono uppercase">Card Simulator</span>
                      <span className="text-[10px] text-gray-400 block font-sans">Simulate secure checkout</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash_on_delivery')}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                      paymentMethod === 'cash_on_delivery'
                        ? 'bg-gold-950/40 border-gold-400 text-gold-300'
                        : 'bg-slate-950 border-gold-900/10 text-gray-400'
                    }`}
                  >
                    <ShoppingBag className="w-5 h-5 shrink-0" />
                    <div>
                      <span className="block text-xs font-bold font-mono uppercase">Cash on Delivery</span>
                      <span className="text-[10px] text-gray-400 block font-sans">Settle at your door step</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Credit Card Details (Card simulator only) */}
              {paymentMethod === 'card_simulator' && (
                <div className="bg-slate-950 border border-gold-900/15 p-6 rounded-2xl space-y-4 animate-scale-up">
                  <div className="flex items-center gap-2 text-gold-400 pb-2 border-b border-gold-900/5">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xs font-mono uppercase tracking-wider font-bold">Secure Card Sandbox (Fully Safe)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono uppercase text-gray-400 block">Cardholder Name</span>
                      <input
                        type="text"
                        required={paymentMethod === 'card_simulator'}
                        placeholder="M Sufyan"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full bg-slate-900 text-white px-3.5 py-2.5 rounded-lg border border-gold-900/10 focus:border-gold-400/40 focus:outline-none text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-mono uppercase text-gray-400 block">Card Number (16-digits)</span>
                      <input
                        type="text"
                        required={paymentMethod === 'card_simulator'}
                        maxLength={16}
                        placeholder="4242 4242 4242 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-slate-900 text-white px-3.5 py-2.5 rounded-lg border border-gold-900/10 focus:border-gold-400/40 focus:outline-none text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-mono uppercase text-gray-400 block">Expiry Date</span>
                      <input
                        type="text"
                        required={paymentMethod === 'card_simulator'}
                        maxLength={5}
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-slate-900 text-white px-3.5 py-2.5 rounded-lg border border-gold-900/10 focus:border-gold-400/40 focus:outline-none text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-mono uppercase text-gray-400 block">CVV Code</span>
                      <input
                        type="password"
                        required={paymentMethod === 'card_simulator'}
                        maxLength={3}
                        placeholder="***"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-slate-900 text-white px-3.5 py-2.5 rounded-lg border border-gold-900/10 focus:border-gold-400/40 focus:outline-none text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Action checkout button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-gold-500/20 transform hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-5 h-5" />
                Settle Payment of Rs. {total.toLocaleString()}
              </button>
            </form>

            {/* Receipt Summary Card (Right side) */}
            <div className="lg:col-span-5 bg-slate-900 border border-gold-900/10 rounded-3xl p-6 space-y-6">
              <h4 className="text-sm font-mono uppercase tracking-wider text-gray-400 font-bold border-b border-gold-900/10 pb-3">Bill Settlement</h4>
              
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.menuItem.id} className="flex justify-between items-center text-xs">
                    <div>
                      <span className="text-white block font-sans font-bold">{item.menuItem.name}</span>
                      <span className="text-gray-400 font-mono">Rs. {item.menuItem.price.toLocaleString()} x {item.quantity}</span>
                    </div>
                    <span className="text-white font-mono font-bold">Rs. {(item.menuItem.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gold-900/10 pt-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-gray-400">
                  <span>Cart Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Packaging & Delivery Fee</span>
                  <span>{deliveryFee > 0 ? `Rs. ${deliveryFee.toLocaleString()}` : 'Free'}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white border-t border-gold-900/10 pt-2 font-sans">
                  <span>Total Due</span>
                  <span className="text-gold-400">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-3.5 bg-gold-950/20 border border-gold-900/10 rounded-xl text-[11px] text-gold-300 leading-relaxed font-sans">
                💡 <strong>Order Simulation Notice:</strong> Credit details are handled locally in a secure sandbox. Zero actual credit funds will ever be moved.
              </div>
            </div>

          </div>

        ) : (
          /* DEFAULT BASKET INTERFACE */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Basket Items (Left Side) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex justify-between items-center pb-2 border-b border-gold-900/5">
                <h3 className="text-lg font-bold text-white font-display">Shopping Basket ({cart.length} items)</h3>
                {cart.length > 0 && (
                  <button
                    onClick={onClearCart}
                    className="text-xs text-red-400 hover:text-red-300 font-mono tracking-wide flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Empty Basket
                  </button>
                )}
              </div>

              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.menuItem.id}
                      className="bg-slate-900/40 border border-gold-900/10 rounded-2xl p-4 flex gap-4 items-center"
                    >
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        referrerPolicy="no-referrer"
                        className="w-20 h-20 object-cover rounded-xl shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-bold font-display text-white block truncate">{item.menuItem.name}</span>
                        <span className="text-xs text-gray-400 block line-clamp-1">{item.menuItem.description}</span>
                        <span className="text-xs text-gold-400 font-mono font-semibold mt-1 block">Rs. {item.menuItem.price.toLocaleString()} each</span>
                      </div>

                      {/* Quantity Toggles */}
                      <div className="flex items-center gap-2.5 bg-slate-950 border border-gold-900/10 p-1 rounded-xl">
                        <button
                          onClick={() => onRemoveFromBag(item.menuItem.id)}
                          className="p-1 hover:bg-gold-500/10 text-gold-400 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-gray-500 hover:text-red-400" />
                        </button>
                        <span className="font-mono text-xs font-bold text-white w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onAddToBag(item.menuItem)}
                          className="p-1 hover:bg-gold-500/10 text-gold-400 rounded-lg cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="font-mono text-sm font-bold text-white w-20 text-right shrink-0">
                        Rs. {(item.menuItem.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-slate-900/10 border border-dashed border-gold-900/10 rounded-3xl space-y-4">
                  <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto animate-pulse" />
                  <p className="text-gray-400 text-sm font-mono">Your dinner basket is currently empty.</p>
                  <a
                    href="#menu"
                    className="inline-block px-5 py-2.5 bg-gold-950/60 border border-gold-500/30 text-gold-300 text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-gold-500/10 transition-colors"
                  >
                    Select Food Items
                  </a>
                </div>
              )}
            </div>

            {/* Financial Summary & Checkout Trigger (Right Side) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Bills panel */}
              <div className="bg-slate-900 border border-gold-900/10 rounded-3xl p-6 space-y-6">
                <h4 className="text-sm font-mono uppercase tracking-wider text-gray-400 font-bold">Checkout Summary</h4>
                
                <div className="space-y-3 text-xs font-mono border-b border-gold-900/5 pb-4">
                  <div className="flex justify-between text-gray-400">
                    <span>Items Subtotal</span>
                    <span className="text-white">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Local Packaging & Delivery</span>
                    <span className="text-white">Calculated next step</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-white">Estimated Amount</span>
                  <span className="text-xl font-bold text-gold-400 font-mono">Rs. {subtotal.toLocaleString()}</span>
                </div>

                <button
                  disabled={cart.length === 0}
                  onClick={() => setIsCheckoutMode(true)}
                  className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-600 hover:to-gold-500 disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-gold-500/25 transform hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5" />
                  Proceed to Secure Checkout
                </button>
              </div>

              {/* Order History list */}
              {orders.length > 0 && (
                <div className="bg-slate-900 border border-gold-900/10 rounded-3xl p-6 space-y-4">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-gray-400 font-bold">Your Past Orders ({orders.length})</h4>
                  
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {orders.map((ord) => (
                      <div key={ord.id} className="bg-slate-950 border border-gold-900/10 rounded-xl p-3 space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-mono">
                          <span className="text-gold-400 font-bold">{ord.id}</span>
                          <span className="bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded text-emerald-400 font-bold uppercase">{ord.status}</span>
                        </div>

                        <div className="text-xs space-y-1">
                          <p className="text-white font-semibold truncate">
                            {ord.items.map(i => `${i.menuItem.name} (${i.quantity})`).join(', ')}
                          </p>
                          <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
                            <span>🕒 {ord.createdAt}</span>
                            <span className="text-white font-bold">Rs. {ord.total.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
