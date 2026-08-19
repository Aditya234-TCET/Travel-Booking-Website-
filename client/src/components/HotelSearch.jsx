import React, { useState } from 'react';
import { Hotel, Search, Star, MapPin, Wifi, Coffee, Sparkles, DollarSign } from 'lucide-react';

export const HotelSearch = ({ onBookHotel, currencySymbol = '₹', formatPrice = (v) => '₹'+Number(v).toLocaleString(), onViewMap }) => {
  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState('2026-08-10');
  const [checkOut, setCheckOut] = useState('2026-08-14');
  const [guests, setGuests] = useState(2);
  const [maxPrice, setMaxPrice] = useState('');
  const [hotels, setHotels] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const query = new URLSearchParams({
        city,
        maxPrice
      }).toString();
      const res = await fetch(`http://localhost:5000/api/hotels?${query}`);
      const data = await res.json();
      setHotels(data);
      setSearched(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem' }}>
      
      {/* Search Header Container */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '0.5rem', borderRadius: '10px', color: '#10b981' }}>
            <Hotel size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Search Hotels & Luxury Resorts</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Find top rated stays, beach resorts, and alpine chalets with free breakfast</p>
          </div>
        </div>

        <form onSubmit={handleSearch} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', alignItems: 'end' }}>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>City or Hotel Name</label>
            <input
              type="text"
              placeholder="e.g. Goa, Paris, Tokyo"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Check-In Date</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Check-Out Date</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Guests</label>
            <input
              type="number"
              min="1"
              max="6"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Max Price / Night ({currencySymbol})</label>
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="form-input"
            />
          </div>

          <button type="submit" className="btn-primary" style={{ height: '46px', justifyContent: 'center' }}>
            <Search size={18} /> Search Hotels
          </button>
        </form>
      </div>

      {/* Hotel Results Grid */}
      {searched && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Available Hotels ({hotels.length})</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Dates: {checkIn} to {checkOut}</span>
          </div>

          {hotels.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <Hotel size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p>No hotels found matching your search. Try resetting filters.</p>
            </div>
          ) : (
            <div className="grid-2">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="package-card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: '200px' }}>
                    <img 
                      src={hotel.image} 
                      alt={hotel.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', padding: '0.25rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <Star size={14} fill="#f59e0b" /> {hotel.rating} ({hotel.reviewsCount} reviews)
                    </div>
                  </div>

                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>{hotel.name}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                      <MapPin size={14} color="#0ea5e9" /> {hotel.address}
                    </div>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem', flex: 1 }}>
                      {hotel.description}
                    </p>

                    {/* Amenities tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                      {hotel.amenities.map((item, idx) => (
                        <span key={idx} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                          {item}
                        </span>
                      ))}
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10b981' }}>{formatPrice(hotel.pricePerNight)}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}> / night</span>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {onViewMap && (
                          <button 
                            onClick={() => onViewMap(hotel)} 
                            className="btn-secondary"
                            style={{ padding: '0.5rem 0.8rem', fontSize: '0.85rem' }}
                          >
                            <MapPin size={14} /> Map
                          </button>
                        )}
                        <button 
                          onClick={() => onBookHotel(hotel, checkIn, checkOut, guests)} 
                          className="btn-primary"
                          style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                        >
                          Reserve Room
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
