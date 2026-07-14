import React, { useState } from 'react';
import { Star, ShieldCheck, ThumbsUp, Send, User, Sparkles, AlertCircle } from 'lucide-react';
import { Review } from '../types';

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date' | 'avatarColor'>) => void;
}

export default function ReviewsSection({ reviews, onAddReview }: ReviewsSectionProps) {
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [likedReviews, setLikedReviews] = useState<string[]>([]);

  const handleLikeReview = (id: string) => {
    if (likedReviews.includes(id)) {
      setLikedReviews(likedReviews.filter(item => item !== id));
    } else {
      setLikedReviews([...likedReviews, id]);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !comment) {
      alert('Please fill out all fields first.');
      return;
    }

    onAddReview({
      authorName,
      rating,
      comment,
      isLocalGuide: false,
    });

    // Reset form
    setAuthorName('');
    setRating(5);
    setComment('');
    setShowReviewForm(false);
  };

  // Math for reviews breakdown
  const totalReviewsCount = reviews.length + 32; // Simulating the other 32 Google Reviews
  
  // Calculate average rating dynamically based on standard 3.6 baseline
  const totalRatingSum = reviews.reduce((sum, item) => sum + item.rating, 0) + (3.6 * 32);
  const averageRating = (totalRatingSum / totalReviewsCount).toFixed(1);

  // Hardcoded star count simulator
  const ratingPercentages = [
    { stars: 5, pct: '45%' },
    { stars: 4, pct: '25%' },
    { stars: 3, pct: '10%' },
    { stars: 2, pct: '8%' },
    { stars: 1, pct: '12%' },
  ];

  return (
    <section id="reviews" className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Decorative radial gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] bg-gold-950/15 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-10 right-0 w-[200px] h-[200px] bg-blue-950/10 rounded-full blur-[60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-gold-400 font-bold block">
            Candid Guest Feedback
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            Guest <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-100 to-gold-400">Reviews</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-gold-500 to-gold-300 mx-auto rounded-full mt-4" />
          <p className="text-gray-400 text-sm sm:text-base font-sans font-light">
            We hold ourselves to transparent standards. Read original reviews left by Google Business diners, and see how our new executive crew responded to make things perfect.
          </p>
        </div>

        {/* Rating Summary Header Block */}
        <div className="bg-slate-900/60 border border-gold-900/10 rounded-3xl p-6 sm:p-8 mb-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Average Rating (Left) */}
            <div className="md:col-span-4 text-center space-y-2 border-r-0 md:border-r border-gold-900/10 pb-6 md:pb-0">
              <span className="text-5xl sm:text-6xl font-display font-black text-white">{averageRating}</span>
              <div className="flex justify-center items-center gap-1 text-gold-400">
                {[1, 2, 3, 4, 5].map((s) => {
                  const ratingVal = parseFloat(averageRating);
                  return (
                    <Star 
                      key={s} 
                      className={`w-5 h-5 ${s <= Math.round(ratingVal) ? 'fill-current' : 'text-slate-700'}`} 
                    />
                  );
                })}
              </div>
              <span className="text-xs text-gray-400 font-mono tracking-wider block uppercase">Based on {totalReviewsCount} reviews</span>
            </div>

            {/* Stars Progress Breakdown (Center) */}
            <div className="md:col-span-5 space-y-2.5">
              {ratingPercentages.map((bar) => (
                <div key={bar.stars} className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-gray-400 w-3 text-right">{bar.stars}</span>
                  <Star className="w-3.5 h-3.5 text-gold-400 fill-current shrink-0" />
                  <div className="flex-1 h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-gold-500 to-gold-300 rounded-full" style={{ width: bar.pct }} />
                  </div>
                  <span className="text-gray-500 w-8 text-right">{bar.pct}</span>
                </div>
              ))}
            </div>

            {/* Quick action button (Right) */}
            <div className="md:col-span-3 text-center md:text-right space-y-4">
              <div className="bg-gold-950/20 border border-gold-500/10 p-3 rounded-xl inline-block text-left text-[11px] text-gold-300">
                ⭐ <strong className="text-white">Active Recalculation:</strong> Writing a review instantly updates the real-time average rating sum above.
              </div>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="w-full md:w-auto px-6 py-3.5 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-600 hover:to-gold-500 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Write a Review
              </button>
            </div>

          </div>
        </div>

        {/* REVIEW FORM COLLAPSIBLE */}
        {showReviewForm && (
          <div className="bg-slate-900 border border-gold-500/30 rounded-3xl p-6 sm:p-8 mb-12 shadow-2xl animate-scale-up max-w-2xl mx-auto">
            <div className="flex justify-between items-center pb-4 border-b border-gold-900/10 mb-6">
              <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold-400" /> Share Your Dining Experience
              </h3>
              <button
                onClick={() => setShowReviewForm(false)}
                className="text-xs text-gray-400 hover:text-white font-mono uppercase cursor-pointer"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Sufyan"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-slate-950 text-white pl-4 pr-4 py-3 rounded-xl border border-gold-900/20 focus:border-gold-400/50 focus:outline-none focus:ring-1 focus:ring-gold-400/30 text-sm"
                  />
                </div>

                {/* Rating selection (Stars) */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">Your Rating</label>
                  <div className="flex items-center gap-2.5 h-12 bg-slate-950 px-4 rounded-xl border border-gold-900/20">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 cursor-pointer hover:scale-110 transition-transform"
                      >
                        <Star 
                          className={`w-6 h-6 ${
                            star <= rating ? 'text-gold-400 fill-current' : 'text-slate-700'
                          }`} 
                        />
                      </button>
                    ))}
                    <span className="text-xs font-mono font-bold text-gold-400 ml-auto">{rating} Stars</span>
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">Review Description</label>
                <textarea
                  required
                  placeholder="Tell others what you ordered and how the flavor, service, and safety was. (e.g., The steam roast was incredibly juicy, tender, and spiced perfectly. Quick delivery too!)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-slate-950 text-white p-4 rounded-xl border border-gold-900/20 focus:border-gold-400/50 focus:outline-none focus:ring-1 focus:ring-gold-400/30 text-sm h-28 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-gold-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Publish Review
              </button>
            </form>
          </div>
        )}

        {/* REVIEWS GRID LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((rev) => {
            const isLiked = likedReviews.includes(rev.id);
            return (
              <div 
                key={rev.id}
                className="bg-slate-900/45 hover:bg-slate-900/80 border border-gold-900/10 rounded-2xl p-6 space-y-4 shadow-md flex flex-col justify-between transition-all duration-300 group"
              >
                <div className="space-y-3">
                  
                  {/* Review Header (Avatar & name) */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Round Avatar Letter */}
                      <div className={`w-10 h-10 rounded-full ${rev.avatarColor} text-slate-950 flex items-center justify-center font-bold font-display text-sm`}>
                        {rev.authorName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-white text-sm font-sans">{rev.authorName}</span>
                          {rev.isLocalGuide && (
                            <span className="bg-gold-950 text-gold-400 border border-gold-500/25 text-[9px] font-mono tracking-wide px-1.5 py-0.5 rounded uppercase font-semibold">
                              Local Guide
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider block">{rev.date}</span>
                      </div>
                    </div>

                    {/* Star Rating Display */}
                    <div className="flex items-center gap-0.5 text-gold-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-3.5 h-3.5 ${star <= rev.rating ? 'fill-current' : 'text-slate-800'}`} 
                        />
                      ))}
                    </div>
                  </div>

                  {/* Comment Text */}
                  <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                {/* OWNER'S RESPONSE BLOCK (Critical for handling historical reviews) */}
                {rev.ownerResponse && (
                  <div className="bg-slate-950/80 border-l-2 border-gold-500 p-4 rounded-xl mt-2 space-y-1.5 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-gold-400 tracking-widest font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-gold-500" /> Response from Owner
                      </span>
                      <span className="text-[9px] text-gray-500 font-mono uppercase">Culinary Management</span>
                    </div>
                    <p className="text-xs text-gray-400 font-sans leading-relaxed">
                      {rev.ownerResponse}
                    </p>
                  </div>
                )}

                {/* Card footer actions */}
                <div className="pt-2 border-t border-gold-900/5 flex items-center justify-between text-xs text-gray-500 font-mono">
                  <span>Helpful?</span>
                  <button
                    onClick={() => handleLikeReview(rev.id)}
                    className={`flex items-center gap-1.5 hover:text-gold-300 transition-colors cursor-pointer ${
                      isLiked ? 'text-gold-400 font-bold' : ''
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{isLiked ? 'Liked (1)' : 'Like'}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
