import React, { useState } from 'react';
import { Calendar, Users, Clock, MapPin, CheckCircle, Trash2, ShieldCheck, Sparkles } from 'lucide-react';
import { Reservation, Table } from '../types';
import { tables } from '../data/menu';

interface BookingSectionProps {
  onAddReservation: (res: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => void;
  onCancelReservation: (id: string) => void;
  reservations: Reservation[];
}

export default function BookingSection({
  onAddReservation,
  onCancelReservation,
  reservations,
}: BookingSectionProps) {
  // Booking Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guestCount, setGuestCount] = useState(4);
  const [selectedArea, setSelectedArea] = useState<'Lounge' | 'Window Booths' | 'Family Hall' | 'Outdoor Deck'>('Lounge');
  const [selectedTableId, setSelectedTableId] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<Reservation | null>(null);

  // Time slots list
  const timeSlots = [
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
    '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM',
    '11:00 PM', '12:00 AM', '1:00 AM'
  ];

  // Areas list
  const areas = ['Lounge', 'Window Booths', 'Family Hall', 'Outdoor Deck'];

  // Filter tables based on selected area and capacity
  const availableTables = tables.filter(
    (tbl) => tbl.area === selectedArea && tbl.capacity >= guestCount
  );

  // Handle table selection
  const handleTableClick = (tblId: string) => {
    setSelectedTableId(tblId);
  };

  // Submit Booking Form
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date || !time || !selectedTableId) {
      alert('Please fill out all fields and select an available table.');
      return;
    }

    // Submit via callback
    const newReservationId = `FL-RES-${Math.floor(1000 + Math.random() * 9000)}`;
    const tableInfo = tables.find(t => t.id === selectedTableId);
    
    onAddReservation({
      name,
      phone,
      date,
      time,
      guests: guestCount,
      tableId: tableInfo ? `#${tableInfo.number}` : '#1',
      area: selectedArea,
    });

    // Capture success info for screen
    const successRes: Reservation = {
      id: newReservationId,
      name,
      phone,
      date,
      time,
      guests: guestCount,
      tableId: tableInfo ? `Table ${tableInfo.number}` : 'Table 1',
      area: selectedArea,
      status: 'Confirmed',
      createdAt: new Date().toLocaleDateString()
    };

    setBookingSuccess(successRes);

    // Reset Form
    setName('');
    setPhone('');
    setDate('');
    setTime('');
    setSpecialRequest('');
    setSelectedTableId('');
  };

  return (
    <section id="book" className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Visual Accent Blurs */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-gold-950/15 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[250px] h-[250px] bg-blue-950/10 rounded-full blur-[70px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-gold-400 font-bold block">
            Exclusive Reservation Desk
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            Book a <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-100 to-gold-400">Family Table</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-sans font-light">
            Skip the queue and secure your preferred dining area. We feature designated premium zones designed specifically for Pakistani families, couples, and group meetups.
          </p>
        </div>

        {bookingSuccess ? (
          /* SUCCESS SCREEN */
          <div className="max-w-2xl mx-auto bg-slate-900 border border-gold-500/40 rounded-3xl p-8 text-center space-y-6 shadow-2xl animate-scale-up">
            <div className="w-16 h-16 bg-gold-950 border border-gold-500/30 rounded-full flex items-center justify-center mx-auto text-gold-400">
              <CheckCircle className="w-10 h-10" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-display font-bold text-white tracking-tight">Table Reserved Successfully!</h3>
              <p className="text-sm text-gray-300 font-sans">
                A premium space has been locked for your family at <span className="text-gold-300 font-bold">Flavourz Lounge</span>.
              </p>
            </div>

            {/* Reciept styled breakdown */}
            <div className="bg-slate-950 rounded-2xl p-6 border border-gold-900/25 text-left space-y-4 max-w-md mx-auto">
              <div className="flex justify-between border-b border-gold-900/10 pb-2">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Guest Name</span>
                <span className="text-sm font-bold text-white font-sans">{bookingSuccess.name}</span>
              </div>
              <div className="flex justify-between border-b border-gold-900/10 pb-2">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Date & Time</span>
                <span className="text-sm font-bold text-gold-300 font-sans">{bookingSuccess.date} @ {bookingSuccess.time}</span>
              </div>
              <div className="flex justify-between border-b border-gold-900/10 pb-2">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Lounge Area</span>
                <span className="text-sm font-bold text-white font-sans">{bookingSuccess.area}</span>
              </div>
              <div className="flex justify-between border-b border-gold-900/10 pb-2">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Table Allocation</span>
                <span className="text-sm font-mono font-bold text-gold-400">{bookingSuccess.tableId} ({bookingSuccess.guests} Guests Capacity)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Verification Status</span>
                <span className="text-xs font-bold text-emerald-400 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Confirmed
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <button
                onClick={() => setBookingSuccess(null)}
                className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-slate-950 font-semibold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Book Another Table
              </button>
              <a
                href="#home"
                className="px-6 py-3 bg-slate-950 border border-gold-900/30 text-gray-300 font-semibold text-xs rounded-xl hover:text-white transition-colors text-center"
              >
                Return to Home
              </a>
            </div>
          </div>
        ) : (
          /* BOOKING PORTAL */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Booking Form (Left Side) */}
            <form onSubmit={handleBookingSubmit} className="lg:col-span-7 bg-slate-900/60 backdrop-blur-md border border-gold-900/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-950 border border-gold-500/20 rounded-lg text-gold-300 text-[10px] font-mono tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" /> Table Scheduler
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">Contact Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Sufyan Khan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 text-white pl-4 pr-4 py-3 rounded-xl border border-gold-900/20 focus:border-gold-400/50 focus:outline-none focus:ring-1 focus:ring-gold-400/30 text-sm transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">Contact Phone (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 316 6591611"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 text-white pl-4 pr-4 py-3 rounded-xl border border-gold-900/20 focus:border-gold-400/50 focus:outline-none focus:ring-1 focus:ring-gold-400/30 text-sm transition-all"
                  />
                </div>

                {/* Date Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-slate-950 text-white pl-4 pr-4 py-3 rounded-xl border border-gold-900/20 focus:border-gold-400/50 focus:outline-none focus:ring-1 focus:ring-gold-400/30 text-sm transition-all [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Time Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">Preferred Time</label>
                  <select
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-slate-950 text-white pl-4 pr-4 py-3.5 rounded-xl border border-gold-900/20 focus:border-gold-400/50 focus:outline-none focus:ring-1 focus:ring-gold-400/30 text-sm transition-all cursor-pointer"
                  >
                    <option value="" disabled>Select Time Slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                {/* Guest Count Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">Number of Guests</label>
                  <div className="flex items-center gap-3 bg-slate-950 border border-gold-900/20 px-3 py-1.5 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      className="w-10 h-10 hover:bg-gold-500/10 text-gold-400 hover:text-gold-300 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-mono font-bold text-white text-base">{guestCount} Guests</span>
                    <button
                      type="button"
                      onClick={() => setGuestCount(Math.min(12, guestCount + 1))}
                      className="w-10 h-10 hover:bg-gold-500/10 text-gold-400 hover:text-gold-300 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Area Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">Dining Hall Zone</label>
                  <select
                    value={selectedArea}
                    onChange={(e) => {
                      setSelectedArea(e.target.value as any);
                      setSelectedTableId(''); // Reset table selection on area change
                    }}
                    className="w-full bg-slate-950 text-white pl-4 pr-4 py-3.5 rounded-xl border border-gold-900/20 focus:border-gold-400/50 focus:outline-none focus:ring-1 focus:ring-gold-400/30 text-sm transition-all cursor-pointer"
                  >
                    {areas.map((area) => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* SPECIAL REQUEST */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">Special Requests (Optional)</label>
                <textarea
                  placeholder="E.g., High-chair for a baby, quiet corner, wedding anniversary decoration..."
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  className="w-full bg-slate-950 text-white p-4 rounded-xl border border-gold-900/20 focus:border-gold-400/50 focus:outline-none focus:ring-1 focus:ring-gold-400/30 text-sm transition-all h-20 resize-none"
                />
              </div>

              {/* TABLE SELECTOR (Interactive visual map) */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">
                  Select Table spot in <span className="text-gold-400 font-bold">{selectedArea}</span>
                </label>
                
                {availableTables.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {availableTables.map((tbl) => {
                      const isSelected = selectedTableId === tbl.id;
                      return (
                        <button
                          key={tbl.id}
                          type="button"
                          onClick={() => handleTableClick(tbl.id)}
                          className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'bg-gold-950/50 border-gold-400 shadow-md shadow-gold-500/10'
                              : 'bg-slate-950 hover:bg-slate-950/80 border-gold-900/10 hover:border-gold-500/25'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isSelected ? 'text-gold-300' : 'text-gray-400'}`}>
                              Table {tbl.number}
                            </span>
                            <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-gray-400 font-mono">
                              Max {tbl.capacity}
                            </span>
                          </div>
                          <span className="text-[11px] text-gray-400 font-sans block leading-none">
                            {tbl.area} Seating
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 bg-red-950/20 border border-red-500/25 rounded-xl text-center">
                    <p className="text-xs text-red-300 font-mono">
                      No tables matching {guestCount} guests available in {selectedArea}. Try another area or reduce guests.
                    </p>
                  </div>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={!selectedTableId}
                className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-600 hover:to-gold-500 disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-gold-500/20 transform hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Confirm Table Reservation
              </button>
            </form>

            {/* Reservations List & Active Bookings (Right Side) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Vibe / Area description card */}
              <div className="bg-slate-900 border border-gold-900/10 rounded-3xl p-6 space-y-4">
                <h4 className="text-lg font-bold font-display text-white">Lounge Seating Zones</h4>
                
                <div className="space-y-3 font-sans text-xs text-gray-300">
                  <div className="border-l-2 border-gold-500 pl-3 py-1">
                    <strong className="text-gold-300 block mb-0.5">🛋 The Main Lounge</strong>
                    Warm dim lights, soft velvet leather sofas, matching a refined executive layout.
                  </div>
                  <div className="border-l-2 border-gold-500 pl-3 py-1">
                    <strong className="text-gold-300 block mb-0.5">🪟 Window Booths</strong>
                    Private insulated booths, looking out into the breezy streets, great for couples.
                  </div>
                  <div className="border-l-2 border-gold-500 pl-3 py-1">
                    <strong className="text-gold-300 block mb-0.5">👨‍👩‍👧 Family Dining Hall</strong>
                    Spacious noise-insulated layouts configured specifically for medium to large families.
                  </div>
                  <div className="border-l-2 border-gold-500 pl-3 py-1">
                    <strong className="text-gold-300 block mb-0.5">🌌 Sky-Deck Outdoor</strong>
                    Stunning open-air deck seating under local festoon light strings, highly recommended for late-night.
                  </div>
                </div>
              </div>

              {/* Active User Bookings */}
              <div className="bg-slate-900 border border-gold-900/10 rounded-3xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-gray-400 font-bold">Your Bookings ({reservations.length})</h4>
                  {reservations.length > 0 && <span className="text-[10px] bg-gold-950 text-gold-400 border border-gold-500/20 px-2 py-0.5 rounded-full font-mono uppercase font-bold animate-pulse">active</span>}
                </div>

                {reservations.length > 0 ? (
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                    {reservations.map((res) => (
                      <div 
                        key={res.id} 
                        className="bg-slate-950 border border-gold-900/15 rounded-2xl p-4 flex justify-between items-center group hover:border-gold-500/20 transition-all duration-200"
                      >
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-gold-400 font-bold uppercase block tracking-wider">{res.id}</span>
                          <span className="text-sm font-bold text-white block">{res.name}</span>
                          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-400 font-mono">
                            <span>📅 {res.date}</span>
                            <span>⏱ {res.time}</span>
                            <span>👥 {res.guests} Ppl</span>
                            <span className="text-gold-300">📍 {res.area} {res.tableId}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => onCancelReservation(res.id)}
                          className="p-2.5 text-gray-500 hover:text-red-400 hover:bg-red-950/20 rounded-xl transition-all cursor-pointer"
                          title="Cancel Reservation"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400 font-mono text-xs border border-dashed border-gold-900/10 rounded-2xl">
                    No active table bookings currently.
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
