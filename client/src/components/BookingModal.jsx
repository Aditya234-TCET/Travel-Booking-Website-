import React, { useState } from 'react';
import { X, Calendar, Users, DollarSign, ShieldCheck, Tag, ArrowRight } from 'lucide-react';

export const BookingModal = ({ isOpen, onClose, item, itemType, onProceedToPayment, currencySymbol = '₹', formatPrice = (v) => '₹'+Number(v).toLocaleString() }) => {
  if (!isOpen || !item) return null;

  const [travelDate, setTravelDate] = useState('2026-08-15');
  const [returnDate, setReturnDate] = useState('2026-08-19');
  const [travelers, setTravelers] = useState(2);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const unitPrice = item.price || item.pricePerNight || 10000;
  const rawTotal = unitPrice * travelers;
  const finalTotal = Math.max(0, rawTotal - discount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'WANDERLUST10' || promoCode.toUpperCase() === 'SAVE10') {
      const disc = Math.round(rawTotal * 0.1);
      setDiscount(disc);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try WANDERLUST10 for 10% off!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onProceedToPayment({
      itemType: itemType || 'package',
      itemId: item.id,
      itemTitle: item.title || item.name || `${item.airline} (${item.departureCity} -> ${item.arrivalCity})`,
      destination: item.destination || item.city || item.arrivalCity || 'Global Destination',
      itemDetails: item,
      travelDate,
      returnDate,
      travelers,
      totalPrice: finalTotal
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in">
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
        >
          <X size={22} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0ea5e9', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
          <ShieldCheck size={16} /> Instant Trip Reservation
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Book {item.title || item.name || `${item.airline} Flight`}
        </h2>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Select dates and number of travelers to finalize your booking details.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Travel / Check-in Date</label>
              <input 
                type="date" 
                value={travelDate} 
                onChange={(e) => setTravelDate(e.target.value)} 
                required 
                className="form-input" 
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Return / Check-out Date</label>
              <input 
                type="date" 
                value={returnDate} 
                onChange={(e) => setReturnDate(e.target.value)} 
                className="form-input" 
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Number of Travelers / Guests</label>
            <input 
              type="number" 
              min="1" 
              max="10" 
              value={travelers} 
              onChange={(e) => setTravelers(Number(e.target.value))} 
              required 
              className="form-input" 
            />
          </div>

          {/* Promo Code Input */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
            <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
              <label>Promo Code (Use WANDERLUST10)</label>
              <input 
                type="text" 
                placeholder="Enter Promo Code" 
                value={promoCode} 
                onChange={(e) => setPromoCode(e.target.value)} 
                className="form-input" 
              />
            </div>
            <button type="button" onClick={handleApplyPromo} className="btn-secondary" style={{ padding: '0.75rem 1rem' }}>
              <Tag size={16} /> Apply
            </button>
          </div>

          {promoApplied && (
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399', padding: '0.5rem 0.75rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
              🎉 Promo Code Applied! Saved {formatPrice(discount)}
            </div>
          )}

          {/* Price Summary Breakdown */}
          <div style={{ background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
              <span>Base Rate ({formatPrice(unitPrice)} x {travelers} traveler)</span>
              <span>{formatPrice(rawTotal)}</span>
            </div>
            {discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#10b981', marginBottom: '0.4rem' }}>
                <span>Discount Promo</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#38bdf8', marginBottom: '0.8rem' }}>
              <span>Taxes & Service Fees</span>
              <span>INCLUDED</span>
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.6rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              <span>Total Payable</span>
              <span style={{ color: '#10b981' }}>{formatPrice(finalTotal)}</span>
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '0.85rem', fontSize: '1rem', marginTop: '0.5rem' }}>
            Proceed to Payment <ArrowRight size={18} />
          </button>

        </form>
      </div>
    </div>
  );
};
