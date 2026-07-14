import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, X, ArrowRight, ShieldCheck, HelpCircle, 
  MapPin, Phone, Trash2, Plus, Minus, Info, Calendar, Sparkles
} from 'lucide-react';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import MenuSection from './components/MenuSection';
import BookingSection from './components/BookingSection';
import OrderSection from './components/OrderSection';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';

// Types and Data
import { MenuItem, CartItem, Reservation, Review, Order } from './types';
import { menuItems } from './data/menu';

// Initial reviews capturing Google Business profile feedback
const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'rev-moosa',
    authorName: 'Moosa Abdul gaffar',
    rating: 1,
    date: '4 months ago',
    comment: 'Very disgusting ,I tried everything the staff was slow took a lot of time for only one burger and it contained shattered glass peace so definitely not recommend',
    ownerResponse: 'Dear Moosa, we are devastated by this report. This occurred under previous subcontracted crew whom we have completely discharged. Our kitchen has been entirely overhauled with active double metal-screening and 5-star sanitation audits. We invite you back to experience our new high-end lounge safety. Please reach out to our management at +92 316 6591611.',
    isLocalGuide: false,
    avatarColor: 'bg-red-400'
  },
  {
    id: 'rev-mehreen',
    authorName: 'Mehreen imran',
    rating: 2,
    date: 'a year ago',
    comment: 'I ordered 1shwarma two peace stream roast.shawrma was better but the taste of steam roast too bad.competely bland.not recommend.they had lost their Old flavour',
    ownerResponse: 'Hi Mehreen, thank you for sharing your feedback. We took your note seriously. Our brand new executive Master Chef has fully restored our signature 24-hour spice marinade and slow-steaming tandoori methods. The authentic original flavor is completely back! Please order again to taste the change.',
    isLocalGuide: false,
    avatarColor: 'bg-purple-400'
  },
  {
    id: 'rev-farman',
    authorName: 'Farman Asghar',
    rating: 4,
    date: 'a year ago',
    comment: "Delicious food and luxurious environment. Good option for kamalia's people. Food is excellent, seating layout is highly comfortable.",
    ownerResponse: "Thank you Farman! We love serving the people of Kamalia. Come back soon for our new weekend family platter specials!",
    isLocalGuide: true,
    reviewsCount: 239,
    photosCount: 130,
    avatarColor: 'bg-gold-400'
  }
];

const DEFAULT_RESERVATIONS: Reservation[] = [
  {
    id: 'FL-RES-9821',
    name: 'Sufyan Khan',
    phone: '+92 316 6591611',
    date: '2026-07-20',
    time: '8:30 PM',
    guests: 4,
    tableId: '#3',
    area: 'Lounge',
    status: 'Confirmed',
    createdAt: '2026-07-14'
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Core Persistent State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Initialize data from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('fl_cart');
    const savedReservations = localStorage.getItem('fl_reservations');
    const savedReviews = localStorage.getItem('fl_reviews');
    const savedOrders = localStorage.getItem('fl_orders');

    if (savedCart) setCart(JSON.parse(savedCart));
    
    if (savedReservations) {
      setReservations(JSON.parse(savedReservations));
    } else {
      setReservations(DEFAULT_RESERVATIONS);
      localStorage.setItem('fl_reservations', JSON.stringify(DEFAULT_RESERVATIONS));
    }

    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      setReviews(DEFAULT_REVIEWS);
      localStorage.setItem('fl_reviews', JSON.stringify(DEFAULT_REVIEWS));
    }

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Sync state helpers
  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem('fl_cart', JSON.stringify(updatedCart));
  };

  const saveReservationsToStorage = (updatedRes: Reservation[]) => {
    setReservations(updatedRes);
    localStorage.setItem('fl_reservations', JSON.stringify(updatedRes));
  };

  const saveReviewsToStorage = (updatedReviews: Review[]) => {
    setReviews(updatedReviews);
    localStorage.setItem('fl_reviews', JSON.stringify(updatedReviews));
  };

  const saveOrdersToStorage = (updatedOrders: Order[]) => {
    setOrders(updatedOrders);
    localStorage.setItem('fl_orders', JSON.stringify(updatedOrders));
  };

  // --- CART MOTIONS ---
  const handleAddToBag = (item: MenuItem) => {
    const existingIndex = cart.findIndex((cartItem) => cartItem.menuItem.id === item.id);
    let updatedCart = [...cart];

    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart.push({ menuItem: item, quantity: 1 });
    }
    saveCartToStorage(updatedCart);
  };

  const handleRemoveFromBag = (itemId: string) => {
    const existingIndex = cart.findIndex((cartItem) => cartItem.menuItem.id === itemId);
    if (existingIndex === -1) return;

    let updatedCart = [...cart];
    if (updatedCart[existingIndex].quantity > 1) {
      updatedCart[existingIndex].quantity -= 1;
    } else {
      updatedCart.splice(existingIndex, 1);
    }
    saveCartToStorage(updatedCart);
  };

  const handleClearCart = () => {
    saveCartToStorage([]);
  };

  // --- RESERVATIONS MOTIONS ---
  const handleAddReservation = (newRes: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => {
    const resId = `FL-RES-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullRes: Reservation = {
      ...newRes,
      id: resId,
      status: 'Confirmed',
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [fullRes, ...reservations];
    saveReservationsToStorage(updated);
  };

  const handleCancelReservation = (id: string) => {
    const updated = reservations.filter(res => res.id !== id);
    saveReservationsToStorage(updated);
  };

  // --- REVIEWS MOTIONS ---
  const handleAddReview = (newReview: Omit<Review, 'id' | 'date' | 'avatarColor'>) => {
    const revId = `FL-REV-${Math.floor(10000 + Math.random() * 90000)}`;
    const colors = ['bg-amber-400', 'bg-blue-400', 'bg-emerald-400', 'bg-pink-400', 'bg-indigo-400', 'bg-gold-300'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const fullReview: Review = {
      ...newReview,
      id: revId,
      date: 'Just now',
      avatarColor: randomColor
    };

    const updated = [fullReview, ...reviews];
    saveReviewsToStorage(updated);
  };

  // --- ORDERS MOTIONS ---
  const handlePlaceOrder = (newOrder: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
    const ordId = `FL-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const fullOrder: Order = {
      ...newOrder,
      id: ordId,
      status: 'Placed',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [fullOrder, ...orders];
    saveOrdersToStorage(updated);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);

  // Navigate & scroll helper
  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 flex flex-col font-sans relative antialiased selection:bg-gold-500 selection:text-slate-950">
      
      {/* HEADER NAVBAR */}
      <Header 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        onBookTableClick={() => navigateToSection('book')}
      />

      {/* CORE SECTIONS */}
      <main className="flex-1">
        
        {/* HERO BANNER */}
        <Hero 
          onExploreMenu={() => navigateToSection('menu')}
          onBookTable={() => navigateToSection('book')}
          onOrderOnline={() => navigateToSection('order')}
        />

        {/* ABOUT & OVERHAUL */}
        <About />

        {/* INTERACTIVE MENU */}
        <MenuSection 
          onAddToBag={handleAddToBag}
          onRemoveFromBag={handleRemoveFromBag}
          cart={cart}
        />

        {/* RESERVATION CENTER */}
        <BookingSection 
          onAddReservation={handleAddReservation}
          onCancelReservation={handleCancelReservation}
          reservations={reservations}
        />

        {/* DELIVERY / TAKEAWAY SERVICE & PAYMENT SIMULATOR */}
        <OrderSection 
          cart={cart}
          onAddToBag={handleAddToBag}
          onRemoveFromBag={handleRemoveFromBag}
          onClearCart={handleClearCart}
          onPlaceOrder={handlePlaceOrder}
          orders={orders}
        />

        {/* CUSTOMER REVIEWS */}
        <ReviewsSection 
          reviews={reviews}
          onAddReview={handleAddReview}
        />

      </main>

      {/* GLOBAL FOOTER */}
      <Footer />

      {/* --- SLIDING CART SIDEBAR DRAWER OVERLAY --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="absolute inset-0 overflow-hidden">
            
            {/* Backdrop filter */}
            <div 
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity cursor-pointer" 
            />

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              {/* Drawer Panel */}
              <div className="pointer-events-auto w-screen max-w-md transform transition-all duration-300 bg-slate-900/98 border-l border-gold-900/25 flex flex-col shadow-2xl">
                
                {/* Header */}
                <div className="px-6 py-5 border-b border-gold-900/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gold-400">
                    <ShoppingBag className="w-5.5 h-5.5 animate-pulse" />
                    <h2 className="text-lg font-display font-bold text-white tracking-tight">Your Dinner Basket</h2>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="p-1.5 hover:bg-slate-800 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {cart.length > 0 ? (
                    cart.map((item) => (
                      <div 
                        key={item.menuItem.id} 
                        className="flex gap-4 p-3 bg-slate-950 rounded-xl border border-gold-900/10 hover:border-gold-500/15 transition-all duration-200"
                      >
                        <img 
                          src={item.menuItem.image} 
                          alt={item.menuItem.name} 
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 object-cover rounded-lg shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold font-display text-white block truncate">{item.menuItem.name}</span>
                          <span className="text-[11px] font-mono text-gold-400 mt-1 block">Rs. {item.menuItem.price.toLocaleString()}</span>
                          
                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 bg-slate-900 border border-gold-900/10 p-0.5 rounded-lg">
                              <button 
                                onClick={() => handleRemoveFromBag(item.menuItem.id)}
                                className="p-1 hover:bg-gold-500/10 text-gold-400 rounded cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-mono text-xs font-bold text-white px-1.5">{item.quantity}</span>
                              <button 
                                onClick={() => handleAddToBag(item.menuItem)}
                                className="p-1 hover:bg-gold-500/10 text-gold-400 rounded cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Subtotal */}
                            <span className="font-mono text-xs font-bold text-white text-right">
                              Rs. {(item.menuItem.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                      <ShoppingBag className="w-12 h-12 text-gray-700 animate-bounce" />
                      <div className="space-y-1">
                        <p className="text-sm text-gray-300 font-sans font-bold">Your basket is looking empty!</p>
                        <p className="text-xs text-gray-500 font-mono">Fill it with original Kamalia flavor.</p>
                      </div>
                      <button 
                        onClick={() => {
                          setIsCartOpen(false);
                          navigateToSection('menu');
                        }}
                        className="px-4 py-2 bg-gold-950/60 border border-gold-500/30 text-gold-300 text-xs font-bold uppercase rounded-xl hover:bg-gold-500/10"
                      >
                        Browse Menu
                      </button>
                    </div>
                  )}
                </div>

                {/* Footer Drawer */}
                {cart.length > 0 && (
                  <div className="px-6 py-6 border-t border-gold-900/10 bg-slate-950/40 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Subtotal Due</span>
                      <span className="text-xl font-bold text-gold-400 font-mono">Rs. {cartSubtotal.toLocaleString()}</span>
                    </div>
                    
                    <p className="text-[10px] text-gray-500 font-sans leading-normal">
                      Packaging fees and optional delivery fees will be calculated at checkout based on your delivery selection.
                    </p>

                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        navigateToSection('order');
                      }}
                      className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-gold-500/25 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 transition-all"
                    >
                      <span>Checkout Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
