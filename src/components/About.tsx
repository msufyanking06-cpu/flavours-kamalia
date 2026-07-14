import React from 'react';
import { ShieldCheck, Flame, Users, Clock, Star, Award, Sparkles } from 'lucide-react';

export default function About() {
  const commitments = [
    {
      icon: <Award className="w-6 h-6 text-gold-400" />,
      title: "Revamped Culinary Mastery",
      description: "Under our brand-new executive culinary leadership, we have onboarded master chefs who have meticulously re-crafted our entire menu—especially restoring our original, authentic blend of spices that made us a legend."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-gold-400" />,
      title: "Zero-Tolerance Food Safety",
      description: "We have fully overhauled our kitchen operations with strict hygiene protocols, certified ingredient sourcing, and double sanitation rounds to guarantee absolute safety and zero impurities in every bite."
    },
    {
      icon: <Clock className="w-6 h-6 text-gold-400" />,
      title: "Express Kitchen Performance",
      description: "No more waiting hours for your meal! We have deployed a modern order-routing system and doubled our kitchen line, slashing average preparation times by over 60% without compromising on fresh-cooked perfection."
    },
    {
      icon: <Users className="w-6 h-6 text-gold-400" />,
      title: "Kamalia's Premier Family Sanctuary",
      description: "A private, luxurious, and beautifully insulated space designed specifically for local families to enjoy comfortable dining, celebrating milestones in complete peace and elegant privacy."
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-gold-950/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-slate-900/60 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-gold-400 font-bold block">
            Our Journey & Overhaul
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            The Story of <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-100 to-gold-400">Flavourz Lounge</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-gold-500 to-gold-300 mx-auto rounded-full mt-4" />
          <p className="text-gray-300 font-sans font-light leading-relaxed">
            In the heart of Kamalia, Flavourz Lounge was established with a singular vision: to serve the most flavorful, authentic, and high-quality food. Today, we are proud to open our doors to a completely revamped and upgraded experience.
          </p>
        </div>

        {/* Narrative Box with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Story Text (Left Side) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-950/55 border border-gold-400/20 rounded-lg text-gold-300 text-xs font-mono tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" /> A Message from Our New Executive Team
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              "We Listened, We Transformed, We Restored Our Old Flavor"
            </h3>
            
            <p className="text-gray-300 font-sans leading-relaxed text-sm sm:text-base">
              Great restaurants are built on trust and flavor. When our valued guests shared constructive feedback regarding service speeds and seasoning, we didn't make excuses—<strong>we made fundamental changes</strong>.
            </p>
            
            <p className="text-gray-300 font-sans leading-relaxed text-sm sm:text-base">
              We completely restructured our culinary department, recruited top-tier regional chefs, and rigorously revamped our entire kitchen infrastructure. We replaced subcontracted suppliers with premium, certified vendors and introduced standardized food quality checks.
            </p>

            <p className="text-gray-300 font-sans leading-relaxed text-sm sm:text-base">
              The result? Our <strong>Signature Royal Steam Roast</strong> is back to its legendary, juicy, melt-in-the-mouth glory. Our <strong>Garlic Shawarmas</strong> are stuffed with tender meat marinated for a full 24 hours. We have brought back the rich, heritage "Old Flavourz" that Kamalia fell in love with, combined with the absolute peak of food hygiene and luxury service.
            </p>

            {/* Signature Block */}
            <div className="pt-4 flex items-center gap-4">
              <div className="border-l-4 border-gold-500 pl-4">
                <span className="block text-lg font-display font-bold italic text-gold-200">The Flavourz Lounge Culinary Council</span>
                <span className="text-xs text-gray-400 font-mono tracking-wider uppercase mt-1 block">Standardized Excellence since 2026</span>
              </div>
            </div>
          </div>

          {/* Showcase visual card (Right Side) */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-gold-500 to-gold-400 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition duration-500" />
            <div className="relative bg-slate-900 border border-gold-900/30 rounded-2xl p-4 overflow-hidden">
              <img
                src="/src/assets/images/steam_roast_1784020560823.jpg"
                alt="Flavourz Lounge Gourmet Steam Roast Platter"
                referrerPolicy="no-referrer"
                className="w-full h-64 object-cover rounded-xl shadow-lg transition duration-500 group-hover:scale-102"
              />
              {/* Overlaid stats badge */}
              <div className="absolute top-8 right-8 bg-slate-950/90 backdrop-blur-md border border-gold-400/40 px-4 py-2.5 rounded-xl text-center shadow-lg">
                <div className="flex items-center justify-center gap-1 text-gold-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-lg font-bold font-mono">4.9</span>
                </div>
                <span className="text-[9px] text-gray-400 font-mono uppercase tracking-wider block">Steam Roast Rating</span>
              </div>
              
              <div className="mt-4 p-3 bg-gold-950/20 rounded-xl border border-gold-900/10">
                <p className="text-xs text-gold-300 font-mono tracking-wide italic text-center">
                  "Our secret resides in authentic Pakistani brick tandoors and hours of marinated steam precision."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Commitment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gold-900/10">
          {commitments.map((item, index) => (
            <div 
              key={index}
              className="p-6 sm:p-8 bg-slate-900/40 hover:bg-slate-900/70 border border-gold-900/10 rounded-2xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold-950/60 rounded-xl border border-gold-500/10 text-gold-400 group-hover:text-gold-300 group-hover:bg-gold-500/15 transition-all duration-300 shrink-0">
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-white font-display tracking-tight group-hover:text-gold-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
