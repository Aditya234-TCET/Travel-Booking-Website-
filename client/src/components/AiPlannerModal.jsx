import React, { useState } from 'react';
import { X, Sparkles, Calendar, DollarSign, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export const AiPlannerModal = ({ isOpen, onClose, currencySymbol = '₹', formatPrice = (v) => '₹'+Number(v).toLocaleString() }) => {
  if (!isOpen) return null;

  const [destination, setDestination] = useState('Goa');
  const [days, setDays] = useState(4);
  const [budget, setBudget] = useState(40000);
  const [style, setStyle] = useState('Balanced');
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await api.generateAiItinerary({
        destination,
        days: Number(days),
        budget: Number(budget),
        style
      });
      setItinerary(result);
    } catch (err) {
      console.error(err);
      alert('Error generating itinerary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in" style={{ maxWidth: itinerary ? '750px' : '550px' }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
        >
          <X size={22} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c084fc', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
          <Sparkles size={16} /> Intelligent AI Trip Planner
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {itinerary ? `AI Itinerary for ${itinerary.destination}` : 'Generate Custom Day-by-Day Itinerary'}
        </h2>

        {!itinerary ? (
          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Where do you want to travel?</label>
              <input 
                type="text" 
                placeholder="e.g. Goa, Paris, Tokyo, Zurich, Bali" 
                value={destination} 
                onChange={(e) => setDestination(e.target.value)} 
                required 
                className="form-input" 
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Trip Duration (Days)</label>
                <input 
                  type="number" 
                  min="2" 
                  max="14" 
                  value={days} 
                  onChange={(e) => setDays(e.target.value)} 
                  required 
                  className="form-input" 
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Total Budget ({currencySymbol})</label>
                <input 
                  type="number" 
                  value={budget} 
                  onChange={(e) => setBudget(e.target.value)} 
                  required 
                  className="form-input" 
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Travel Vibe / Style</label>
              <select 
                value={style} 
                onChange={(e) => setStyle(e.target.value)} 
                className="form-input"
              >
                <option value="Balanced">Balanced (Culture + Relaxation)</option>
                <option value="Adventure">Adventure & Outdoor Action</option>
                <option value="Romantic">Romantic Getaway</option>
                <option value="Luxury">5-Star Luxury Experience</option>
                <option value="Budget">Budget Explorer</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary" 
              style={{ justifyContent: 'center', padding: '0.85rem', background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)', marginTop: '0.5rem' }}
            >
              {loading ? (
                <span>Generating AI Itinerary...</span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Sparkles size={18} /> Generate Plan</span>
              )}
            </button>
          </form>
        ) : (
          <div>
            <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '12px', marginBottom: '1.25rem', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>TOTAL ESTIMATED EXPENSE</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>{formatPrice(itinerary.totalEstimatedCost)}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-cyan">{itinerary.days} Days • {itinerary.style} Style</span>
              </div>
            </div>

            {/* Day by Day Plan */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.4rem', marginBottom: '1.25rem' }}>
              {itinerary.itinerary.map((dayItem) => (
                <div key={dayItem.day} style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #a855f7' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Day {dayItem.day}: {dayItem.title}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>~{formatPrice(dayItem.estimatedCost)}</span>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <div>🌅 <strong>Morning:</strong> {dayItem.morning}</div>
                    <div>☀️ <strong>Afternoon:</strong> {dayItem.afternoon}</div>
                    <div>🌙 <strong>Evening:</strong> {dayItem.evening}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                onClick={() => setItinerary(null)} 
                className="btn-secondary" 
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Re-plan Trip
              </button>
              <button 
                onClick={onClose} 
                className="btn-primary" 
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Save & Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
