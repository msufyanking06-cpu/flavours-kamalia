import React from 'react';
import { MapPin, Phone, Clock, Mail, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  const googleMapsUrl = "https://maps.app.goo.gl/jTc6BwURB2atMLps6";

  return (
    <footer className="bg-slate-950 border-t border-gold-900/20 text-gray-400 font-sans">
      
      {/* Top Banner with Direct Map Link Call to Action */}
      <div className="bg-gradient-to-r from-gold-950/60 to-gold-900/40 border-b border-gold-900/10 py-10 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
            Visiting Kamalia or Planning a Family Dinner?
          </h3>
          <p className="text-xs sm:text-sm text-gray-300">
            Click below to find us on Google Maps, read detailed local reviews, see photos, and get precise navigation directions straight to our doorstep.
          </p>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-600 hover:to-gold-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-gold-500/20 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <MapPin className="w-4 h-4 shrink-0" />
            Navigate on Google Maps
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Brand identity (Col 1) */}
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg">
              <svg className="w-6 h-6 text-slate-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L15 8L22 9L17 14L18 21L12 17L6 21L7 14L2 9L9 8L12 2Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <span className="block text-xl font-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-400">
                FLAVOURZ
              </span>
              <span className="block text-[9px] font-mono tracking-[0.3em] uppercase text-gold-400 -mt-1">
                Lounge & Grill
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
            Completely revamped family restaurant in Kamalia, Pakistan. Experience our legendary whole chicken steam roast, double beef smash burgers, and comfortable seating lounges built specifically to support local families and couples.
          </p>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center gap-3">
              <MapPin className="w-4.5 h-4.5 text-gold-400 shrink-0" />
              <span>PMH2+WJR, Kamalia, Pakistan</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4.5 h-4.5 text-gold-400 shrink-0" />
              <span>+92 316 6591611</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4.5 h-4.5 text-gold-400 shrink-0" />
              <span>Open Daily: 1:00 PM – 2:00 AM (Midnight Bites)</span>
            </div>
          </div>
        </div>

        {/* Dynamic Timetable Info (Col 2) */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs font-mono uppercase text-white font-bold tracking-widest border-b border-gold-900/10 pb-2">
            Weekly Timing Hours
          </h4>
          <ul className="space-y-2 text-xs font-mono">
            <li className="flex justify-between border-b border-gold-900/5 pb-1">
              <span>Monday</span>
              <span className="text-gold-300">1:00 PM – 2:00 AM</span>
            </li>
            <li className="flex justify-between border-b border-gold-900/5 pb-1 font-bold text-white">
              <span>Tuesday (Popular)</span>
              <span className="text-gold-300">1:00 PM – 2:00 AM</span>
            </li>
            <li className="flex justify-between border-b border-gold-900/5 pb-1">
              <span>Wednesday</span>
              <span className="text-gold-300">1:00 PM – 2:00 AM</span>
            </li>
            <li className="flex justify-between border-b border-gold-900/5 pb-1">
              <span>Thursday</span>
              <span className="text-gold-300">1:00 PM – 2:00 AM</span>
            </li>
            <li className="flex justify-between border-b border-gold-900/5 pb-1">
              <span>Friday</span>
              <span className="text-gold-300">1:00 PM – 2:00 AM</span>
            </li>
            <li className="flex justify-between border-b border-gold-900/5 pb-1 font-bold text-white">
              <span>Saturday (Family Night)</span>
              <span className="text-gold-300">1:00 PM – 3:00 AM</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday</span>
              <span className="text-gold-300">1:00 PM – 2:00 AM</span>
            </li>
          </ul>
        </div>

        {/* Safety standards pledge (Col 3) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-mono uppercase text-white font-bold tracking-widest border-b border-gold-900/10 pb-2">
            The Family Pledge
          </h4>
          <p className="text-xs leading-relaxed text-gray-400">
            We operate a 100% halal, family-safe, and alcohol-free environment. Under new management, we enforce rigorous dual-sterilization rounds on all cooking utensils, cutting boards, and grills to ensure pristine dining.
          </p>
          <div className="pt-2">
            <span className="text-[10px] bg-emerald-950/40 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-emerald-400 font-mono uppercase tracking-wide inline-block font-semibold">
              ✓ Food-Safety Inspected
            </span>
          </div>
        </div>

      </div>

      {/* Footer Bottom copyright */}
      <div className="bg-slate-950 border-t border-gold-900/5 py-6 text-center text-xs text-gray-500 font-mono">
        <p>© {new Date().getFullYear()} Flavourz Lounge & Grill, Kamalia. All Rights Reserved.</p>
        <p className="mt-1 flex items-center justify-center gap-1">
          Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> for the hospitality and families of Kamalia.
        </p>
      </div>

    </footer>
  );
}
