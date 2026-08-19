import React, { useState } from 'react';
import { Plane, Search, Calendar, Users, DollarSign, ArrowRight, ShieldCheck, Clock, Leaf } from 'lucide-react';

export const FlightSearch = ({ onBookFlight, currencySymbol = '₹', formatPrice = (v) => '₹'+Number(v).toLocaleString() }) => {
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [travelDate, setTravelDate] = useState('2026-08-10');
  const [travelers, setTravelers] = useState(1);
  const [maxPrice, setMaxPrice] = useState('');
  const [flights, setFlights] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const query = new URLSearchParams({
        departureCity,
        arrivalCity,
        maxPrice
      }).toString();
      const res = await fetch(`http://localhost:5000/api/flights?${query}`);
      const data = await res.json();
      setFlights(data);
      setSearched(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem' }}>
      
      {/* Flight Search Widget Container */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'rgba(14, 165, 233, 0.2)', padding: '0.5rem', borderRadius: '10px', color: '#0ea5e9' }}>
            <Plane size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Search Airline Flights</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Find instant direct & connecting flights across top global airlines</p>
          </div>
        </div>

        <form onSubmit={handleSearch} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', alignItems: 'end' }}>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Departure City</label>
            <input
              type="text"
              placeholder="e.g. Mumbai, Delhi"
              value={departureCity}
              onChange={(e) => setDepartureCity(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Destination City</label>
            <input
              type="text"
              placeholder="e.g. Goa, Paris, Tokyo"
              value={arrivalCity}
              onChange={(e) => setArrivalCity(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Travel Date</label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Travelers</label>
            <input
              type="number"
              min="1"
              max="10"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Max Budget ({currencySymbol})</label>
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="form-input"
            />
          </div>

          <button type="submit" className="btn-primary" style={{ height: '46px', justifyContent: 'center' }}>
            <Search size={18} /> Search Flights
          </button>
        </form>
      </div>

      {/* Flight Search Results */}
      {searched && (
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Available Flights ({flights.length})</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 400 }}>Date: {travelDate} | {travelers} Traveler(s)</span>
          </h3>

          {flights.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <Plane size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p>No flights found matching your filter criteria. Try clearing budget or changing city names.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {flights.map((flight) => (
                <div key={flight.id} className="package-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: 0 }}>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '2rem', background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: '12px' }}>
                      {flight.logo}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{flight.airline}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Flight #{flight.flightNumber} • {flight.duration}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.3rem' }}>
                        <span className="badge badge-cyan">★ {flight.rating}</span>
                        <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>{flight.seatsAvailable} Seats Left</span>
                        {flight.price < 500 && (
                          <span className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#10b981', fontSize: '0.7rem', fontWeight: 600, padding: '0.15rem 0.4rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '6px' }}>
                            <Leaf size={12} /> -18% CO₂ Emission
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{flight.departureCity}</span>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{flight.departureTime}</div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Direct</span>
                      <ArrowRight size={18} color="#0ea5e9" />
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{flight.duration}</span>
                    </div>

                    <div>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{flight.arrivalCity}</span>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{flight.arrivalTime}</div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>
                      {formatPrice((flight.price * travelers))}
                    </div>
                    <button 
                      onClick={() => onBookFlight(flight, travelDate, travelers)} 
                      className="btn-primary" 
                      style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}
                    >
                      Book Flight
                    </button>
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
