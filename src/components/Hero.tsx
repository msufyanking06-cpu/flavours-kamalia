import React from 'react';
import { ChefHat, Compass, Calendar, Sparkles } from 'lucide-react';
import loungeImg from '../assets/images/lounge_interior_1784020542143.jpg';

interface HeroProps {
  onExploreMenu: () => void;
  onBookTable: () => void;
  onOrderOnline: () => void;
}

export default function Hero({ onExploreMenu, onBookTable, onOrderOnline }: HeroProps) {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 py-20">
      {/* Background Image with elegant overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={loungeImg}
          alt="Flavourz Lounge Interior"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter blur-[1px] brightness-30 contrast-105"
        />
        {/* Radial Dark & Golden Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/30" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/40 to-slate-950" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      {/* Decorative Golden Light Ray */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none z-1" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8">
        
        {/* We have a Brand Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-950/80 border border-gold-500/30 rounded-full text-gold-300 text-xs font-mono tracking-widest uppercase animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          Reimagined & Revamped under new executive management
        </div>

        {/* Display Typography Title */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-white leading-none">
            Welcome to the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-200 to-gold-500 font-extrabold filter drop-shadow-sm">
              Flavourz Lounge
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-300 font-sans font-light leading-relaxed">
            Experience Kamalia's most luxurious family atmosphere paired with an extraordinary blend of authentic old flavors and premium modern cuisine.
          </p>
        </div>

        {/* Features badges (Dine-in, Takeaway, Delivery) */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 pt-2">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-gold-900/10 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono text-gray-300 font-medium uppercase tracking-wider">Dine-In Available</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-gold-900/10 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-gold-400" />
            <span className="text-xs font-mono text-gray-300 font-medium uppercase tracking-wider">Premium Takeaway</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-gold-900/10 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-xs font-mono text-gray-300 font-medium uppercase tracking-wider">Super-Fast Delivery</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <button
            onClick={onOrderOnline}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-600 hover:to-gold-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-gold-500/20 transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <ChefHat className="w-5 h-5" />
            Order Online Now
          </button>
          
          <button
            onClick={onBookTable}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900/90 hover:bg-slate-800 text-gold-300 border border-gold-400/40 hover:border-gold-300 font-bold rounded-xl shadow-md transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Calendar className="w-5 h-5" />
            Reserve table
          </button>
        </div>

        {/* Quick details ticker */}
        <div className="pt-8 border-t border-gold-900/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
          <div>
            <span className="block text-xl font-display font-bold text-gold-400">Rs 1,000–2,000</span>
            <span className="text-xs text-gray-400 font-mono uppercase tracking-widest mt-1 block">Cost per person</span>
          </div>
          <div>
            <span className="block text-xl font-display font-bold text-gold-400">1:00 PM – 2:00 AM</span>
            <span className="text-xs text-gray-400 font-mono uppercase tracking-widest mt-1 block">Opening Hours</span>
          </div>
          <div>
            <span className="block text-xl font-display font-bold text-gold-400">35+ Google Reviews</span>
            <span className="text-xs text-gray-400 font-mono uppercase tracking-widest mt-1 block">Highly Recommended</span>
          </div>
          <div>
            <span className="block text-xl font-display font-bold text-gold-400">Kamalia, Pakistan</span>
            <span className="text-xs text-gray-400 font-mono uppercase tracking-widest mt-1 block">Lounge Location</span>
          </div>
        </div>

      </div>
    </section>
  );
}
