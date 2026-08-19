import React, { useState, useEffect } from 'react';
import { Train, Search, Users, ArrowRight, Clock } from 'lucide-react';
import api from '../services/api';

export const TrainSearch = ({ onBookTrain, currencySymbol = '₹', formatPrice = (v) => '₹'+Number(v).toLocaleString() }) => {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [travelDate, setTravelDate] = useState('2026-08-15');
  const [trainQuery, setTrainQuery] = useState('');
  const [searched, setSearched] = useState(false);

  const [allTrains, setAllTrains] = useState([]);
  const [filteredTrains, setFilteredTrains] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initial fetch so the trains are ready when user clicks search
    const fetchTrains = async () => {
      try {
        const data = await api.getTrains();
        setAllTrains(data);
        setFilteredTrains(data);
      } catch (err) {
        console.error('Failed to load trains', err);
      }
    };
    fetchTrains();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let result = allTrains;
    
    if (departure) {
      result = result.filter(t => t.departureCity.toLowerCase().includes(departure.toLowerCase()));
    }
    if (arrival) {
      result = result.filter(t => t.arrivalCity.toLowerCase().includes(arrival.toLowerCase()));
    }
    if (trainQuery) {
      result = result.filter(t => 
        t.trainName.toLowerCase().includes(trainQuery.toLowerCase()) || 
        t.trainNumber.includes(trainQuery)
      );
    }
    
    setFilteredTrains(result);
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
            <label>Train No. / Name</label>
            <input type="text" placeholder="e.g. 12952 or Rajdhani" value={trainQuery} onChange={(e) => setTrainQuery(e.target.value)} className="form-input" />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>From Station</label>
            <input type="text" placeholder="e.g. New Delhi" value={departure} onChange={(e) => setDeparture(e.target.value)} className="form-input" />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>To Station</label>
            <input type="text" placeholder="e.g. Mumbai" value={arrival} onChange={(e) => setArrival(e.target.value)} className="form-input" />
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
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Available Trains ({filteredTrains.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredTrains.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No trains found matching your search.</div>
            ) : filteredTrains.map((train) => (
              <div key={train.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '2rem', background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: '12px', color: '#f59e0b' }}>
                    <Train size={28} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{train.trainName} ({train.trainNumber})</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Class: {train.classType || train.class}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{train.departureCity}</span>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{train.departureTime}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Clock size={16} color="var(--text-muted)" />
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{train.duration}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{train.arrivalCity}</span>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{train.arrivalTime}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>{formatPrice(train.price)}</div>
                  <button onClick={() => onBookTrain({...train, title: `${train.trainName} (Train No: ${train.trainNumber})`, price: train.price}, 'train')} className="btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem', background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>
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
