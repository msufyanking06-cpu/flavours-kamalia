import React, { useState } from 'react';
import { Search, Flame, Leaf, Clock, Star, Plus, Minus, Check, Sparkles } from 'lucide-react';
import { MenuItem, FoodCategory, CartItem } from '../types';
import { menuItems } from '../data/menu';

interface MenuSectionProps {
  onAddToBag: (item: MenuItem) => void;
  onRemoveFromBag: (itemId: string) => void;
  cart: CartItem[];
}

export default function MenuSection({ onAddToBag, onRemoveFromBag, cart }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<FoodCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpicyOnly, setFilterSpicyOnly] = useState(false);
  const [filterVegOnly, setFilterVegOnly] = useState(false);

  const categories: { id: FoodCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'Full Menu' },
    { id: 'specialties', label: '👑 Chef Specialties' },
    { id: 'burgers', label: '🍔 Burgers' },
    { id: 'traditional', label: '🍢 Traditional BBQ' },
    { id: 'refreshers', label: '🍹 Cool Refreshers' },
    { id: 'desserts', label: '🍰 Desserts' },
  ];

  // Helper to find quantity in cart
  const getItemQuantity = (itemId: string) => {
    const found = cart.find(item => item.menuItem.id === itemId);
    return found ? found.quantity : 0;
  };

  // Filter items based on user inputs
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpicy = !filterSpicyOnly || item.isSpicy;
    const matchesVeg = !filterVegOnly || item.isVegetarian;
    return matchesCategory && matchesSearch && matchesSpicy && matchesVeg;
  });

  return (
    <section id="menu" className="py-24 bg-slate-950 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-gold-400 font-bold block">
            Savor the Taste
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-100 to-gold-400">Gourmet Menu</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-sans font-light">
            Every dish is prepared using fresh ingredients, hand-ground secret spices, and cooked on-order. Select from our traditional or fusion gourmet offerings.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-gold-900/10 rounded-2xl p-4 sm:p-6 mb-10 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search our delicious creations... (e.g., Steam Roast, Margarita)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/80 text-white placeholder-gray-500 pl-12 pr-4 py-3.5 rounded-xl border border-gold-900/20 focus:border-gold-400/50 focus:outline-none focus:ring-1 focus:ring-gold-400/30 text-sm transition-all"
              />
            </div>

            {/* Quick Filter Checkboxes */}
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={() => setFilterSpicyOnly(!filterSpicyOnly)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  filterSpicyOnly
                    ? 'bg-red-950/40 border-red-500/40 text-red-400'
                    : 'bg-slate-950/40 border-gold-900/15 text-gray-400 hover:border-red-500/20 hover:text-red-300'
                }`}
              >
                <Flame className={`w-4 h-4 ${filterSpicyOnly ? 'fill-current animate-pulse' : ''}`} />
                Spicy Hot
              </button>

              <button
                onClick={() => setFilterVegOnly(!filterVegOnly)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  filterVegOnly
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400'
                    : 'bg-slate-950/40 border-gold-900/15 text-gray-400 hover:border-emerald-500/20 hover:text-emerald-300'
                }`}
              >
                <Leaf className="w-4 h-4" />
                Vegetarian
              </button>
            </div>
          </div>

          {/* Categories Tab Roller */}
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none border-t border-gold-900/5 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-slate-950 border-gold-400 shadow-md shadow-gold-500/10 font-bold'
                    : 'bg-slate-950/40 text-gray-400 border-gold-900/10 hover:border-gold-500/25 hover:text-gold-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const qty = getItemQuantity(item.id);
              const isSignature = item.id === 'spec-steam-roast';

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col h-full bg-slate-900/40 hover:bg-slate-900/80 border border-gold-900/10 hover:border-gold-500/20 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group hover:-translate-y-1 ${
                    isSignature ? 'ring-1 ring-gold-500/30' : ''
                  }`}
                >
                  {/* Food Image Container */}
                  <div className="relative h-48 overflow-hidden bg-slate-950 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Dark gradient shadow inside image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />

                    {/* Left top badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                      {isSignature && (
                        <span className="flex items-center gap-1 bg-gradient-to-r from-gold-500 to-gold-400 text-slate-950 text-[10px] font-bold font-mono tracking-widest uppercase px-2.5 py-1 rounded-md shadow-md animate-pulse">
                          <Sparkles className="w-3 h-3 fill-current" /> Signature
                        </span>
                      )}
                      
                      {item.isSpicy && (
                        <span className="inline-flex items-center gap-1 bg-red-950/80 backdrop-blur-md border border-red-500/30 text-red-400 text-[10px] font-bold font-mono tracking-wider uppercase px-2 py-0.5 rounded-md">
                          <Flame className="w-3.5 h-3.5 fill-current" /> Spicy
                        </span>
                      )}

                      {item.isVegetarian && (
                        <span className="inline-flex items-center gap-1 bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-[10px] font-bold font-mono tracking-wider uppercase px-2 py-0.5 rounded-md">
                          <Leaf className="w-3.5 h-3.5" /> Veg
                        </span>
                      )}
                    </div>

                    {/* Right top Rating badge */}
                    {item.rating && (
                      <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-gold-500/25 px-2.5 py-1 rounded-lg flex items-center gap-1 text-gold-400">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-[11px] font-mono font-bold">{item.rating}</span>
                      </div>
                    )}

                    {/* Right bottom Prep time badge */}
                    <div className="absolute bottom-3 right-4 bg-slate-950/90 border border-gold-900/10 px-2 py-0.5 rounded text-[11px] font-mono text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold-400" />
                      <span>{item.estimatedPrepTime} mins</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold font-display text-white tracking-tight group-hover:text-gold-300 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-400 font-sans line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      {/* Price Tag */}
                      <div className="font-mono">
                        <span className="text-xs text-gold-400">Rs </span>
                        <span className="text-xl font-bold text-white tracking-tight">{item.price.toLocaleString()}</span>
                      </div>

                      {/* Add to Basket Action */}
                      <div className="relative">
                        {qty > 0 ? (
                          <div className="flex items-center gap-2 bg-slate-950 border border-gold-500/30 px-2 py-1.5 rounded-xl shadow-lg animate-scale-up">
                            <button
                              onClick={() => onRemoveFromBag(item.id)}
                              className="p-1.5 hover:bg-gold-500/10 text-gold-400 hover:text-gold-300 rounded-lg transition-colors cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-mono text-xs font-bold text-white px-1">{qty}</span>
                            <button
                              onClick={() => onAddToBag(item)}
                              className="p-1.5 hover:bg-gold-500/10 text-gold-400 hover:text-gold-300 rounded-lg transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => onAddToBag(item)}
                            className="px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-600 hover:to-gold-500 text-slate-950 text-xs font-bold rounded-xl shadow-md hover:shadow-gold-500/15 transform hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <Plus className="w-4 h-4" />
                            Add to Basket
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/20 border border-gold-900/10 rounded-2xl max-w-xl mx-auto space-y-4">
            <p className="text-gray-400 font-mono text-sm">No delicious matching dishes found!</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setFilterSpicyOnly(false);
                setFilterVegOnly(false);
              }}
              className="px-4 py-2 bg-gold-950/60 border border-gold-500/30 text-gold-300 text-xs font-mono rounded-lg hover:bg-gold-500/10 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
