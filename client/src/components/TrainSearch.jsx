import React, { useState } from 'react';
import { Train, Search, Users, ArrowRight, Clock } from 'lucide-react';

export const TrainSearch = ({ onBookTrain, currencySymbol = '₹', formatPrice = (v) => '₹'+Number(v).toLocaleString() }) => {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [travelDate, setTravelDate] = useState('2026-08-15');
  const [searched, setSearched] = useState(false);

  // Mock Train Data
  const mockTrains = [
    { id: 'T1', trainName: 'Shatabdi Express', trainNumber: '12001', departureTime: '06:00 AM', arrivalTime: '11:30 AM', duration: '5h 30m', price: 1200, class: 'AC Chair Car' },
    { id: 'T2', trainName: 'Rajdhani Express', trainNumber: '12951', departureTime: '04:30 PM', arrivalTime: '08:30 AM', duration: '16h 00m', price: 3400, class: '1st Class AC' },
    { id: 'T3', trainName: 'Vande Bharat', trainNumber: '22436', departureTime: '06:00 AM', arrivalTime: '02:00 PM', duration: '8h 00m', price: 2100, class: 'Executive Class' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem' }}>
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '0.5rem', borderRadius: '10px', color: '#f59e0b' }}>
            <Train size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Search Trains</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Find fast and comfortable rail journeys across the country.</p>
          </div>
        </div>

        <form onSubmit={handleSearch} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>From Station</label>
            <input type="text" placeholder="e.g. New Delhi (NDLS)" value={departure} onChange={(e) => setDeparture(e.target.value)} className="form-input" required />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>To Station</label>
            <input type="text" placeholder="e.g. Mumbai (BCT)" value={arrival} onChange={(e) => setArrival(e.target.value)} className="form-input" required />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Travel Date</label>
            <input type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} className="form-input" required />
          </div>
          <button type="submit" className="btn-primary" style={{ height: '46px', justifyContent: 'center', background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>
            <Search size={18} /> Search Trains
          </button>
        </form>
      </div>

      {searched && (
        <div className="animate-fade-in">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Available Trains ({mockTrains.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mockTrains.map((train) => (
              <div key={train.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '2rem', background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: '12px', color: '#f59e0b' }}>
                    <Train size={28} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{train.trainName} ({train.trainNumber})</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Class: {train.class}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{departure || 'Station A'}</span>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{train.departureTime}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Clock size={16} color="var(--text-muted)" />
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{train.duration}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{arrival || 'Station B'}</span>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{train.arrivalTime}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>{formatPrice(train.price)}</div>
                  <button onClick={() => onBookTrain({...train, title: train.trainName, price: train.price}, 'train')} className="btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem', background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>
                    Book Train
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
