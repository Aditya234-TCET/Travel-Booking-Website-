import React, { useState, useEffect } from 'react';
import { Car, Search, Clock, ShieldCheck, MapPin } from 'lucide-react';
import api from '../services/api';

export const CabSearch = ({ onBookCab, currencySymbol = '₹', formatPrice = (v) => '₹'+Number(v).toLocaleString() }) => {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [date, setDate] = useState('2026-08-10');
  const [searched, setSearched] = useState(false);

  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCabs = async () => {
      try {
        const data = await api.getCabs();
        setCabs(data);
      } catch (err) {
        console.error('Failed to load cabs', err);
      }
    };
    fetchCabs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem' }}>
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '0.5rem', borderRadius: '10px', color: '#10b981' }}>
            <Car size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Book Intercity & Local Cabs</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Safe, sanitized, and reliable cab services.</p>
          </div>
        </div>

        <form onSubmit={handleSearch} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Pickup Location</label>
            <input type="text" placeholder="e.g. Airport Terminal 1" value={pickup} onChange={(e) => setPickup(e.target.value)} className="form-input" required />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Drop Location</label>
            <input type="text" placeholder="e.g. Goa Beach Resort" value={drop} onChange={(e) => setDrop(e.target.value)} className="form-input" required />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Pickup Date & Time</label>
            <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} className="form-input" required />
          </div>
          <button type="submit" className="btn-primary" style={{ height: '46px', justifyContent: 'center', background: 'linear-gradient(135deg, #10b981, #059669)' }}>
            <Search size={18} /> Search Cabs
          </button>
        </form>
      </div>

      {searched && (
        <div className="animate-fade-in">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Available Cabs ({cabs.length})</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {cabs.map((cab) => (
              <div key={cab.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{cab.type}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cab.model}</span>
                  </div>
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.3rem 0.6rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}>
                    ★ {cab.rating}
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} /> {cab.duration}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><ShieldCheck size={14} /> Sanitized</span>
                  <span>{cab.capacity}</span>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Estimated Fare</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>{formatPrice(cab.price)}</span>
                  </div>
                  <button onClick={() => onBookCab({...cab, title: cab.type + ' Cab', price: cab.price}, 'cab')} className="btn-primary" style={{ padding: '0.6rem 1rem', fontSize: '0.9rem', background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                    Book Cab
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
