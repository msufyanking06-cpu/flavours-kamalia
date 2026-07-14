import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Calendar, MapPin, Phone } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  onBookTableClick: () => void;
}

export default function Header({
  activeSection,
  setActiveSection,
  cart,
  setIsCartOpen,
  onBookTableClick,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'order', label: 'Order Online' },
    { id: 'book', label: 'Reservations' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'about', label: 'Our Story' },
  ];

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    
    // Scroll to section
    const element = document.getElementById(id);
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
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-gold-900/20 transition-all duration-300">
      {/* Top micro-bar for contact & address */}
      <div className="hidden sm:flex justify-between items-center px-6 py-1.5 bg-gold-950/60 border-b border-gold-900/10 text-[11px] text-gold-300 font-mono tracking-wide">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-gold-400" /> PMH2+WJR, Kamalia, Pakistan
          </span>
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3 text-gold-400" /> +92 316 6591611
          </span>
        </div>
        <div>
          <span className="text-gold-400 font-bold">Open Daily:</span> 1:00 PM – 2:00 AM (Midnight Bites)
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg shadow-lg shadow-gold-950/50">
            {/* SVG Custom Premium Crown/F logo */}
            <svg className="w-6 h-6 text-slate-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L15 8L22 9L17 14L18 21L12 17L6 21L7 14L2 9L9 8L12 2Z" fill="currentColor"/>
            </svg>
            <div className="absolute -inset-0.5 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg blur-md opacity-20 group-hover:opacity-60 transition duration-300" />
          </div>
          <div>
            <span className="block text-xl font-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-100 to-gold-400">
              FLAVOURZ
            </span>
            <span className="block text-[9px] font-mono tracking-[0.3em] uppercase text-gold-400 -mt-1">
              Lounge & Grill
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium tracking-wide transition-colors relative py-2 cursor-pointer ${
                activeSection === item.id
                  ? 'text-gold-300'
                  : 'text-gray-400 hover:text-gold-200'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500 to-gold-300 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2.5 relative text-gray-400 hover:text-gold-300 hover:bg-slate-900 rounded-full transition-all duration-200 cursor-pointer"
            id="cart-trigger"
          >
            <ShoppingBag className="w-5.5 h-5.5" />
            {totalCartItems > 0 && (
              <span className="absolute top-1 right-1 bg-gradient-to-r from-gold-500 to-gold-300 text-slate-950 font-mono text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-950 animate-bounce">
                {totalCartItems}
              </span>
            )}
          </button>

          {/* Quick Booking Call to Action */}
          <button
            onClick={onBookTableClick}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-600 hover:to-gold-500 text-slate-950 text-xs font-semibold rounded-lg shadow-md hover:shadow-gold-500/20 shadow-gold-950/40 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            Reserve Table
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-gold-300 hover:bg-slate-900 rounded-lg transition-all duration-200 cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-b border-gold-900/20 px-4 py-6 space-y-4 animate-fade-in">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-gold-950/40 text-gold-300 border-l-2 border-gold-400'
                    : 'text-gray-400 hover:bg-slate-900 hover:text-gold-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-gold-900/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBookTableClick();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-slate-950 text-sm font-semibold rounded-lg shadow-md cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              Reserve a Table
            </button>
            <div className="text-center font-mono text-[10px] text-gold-400 pt-2">
              📍 PMH2+WJR, Kamalia, Pakistan
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
