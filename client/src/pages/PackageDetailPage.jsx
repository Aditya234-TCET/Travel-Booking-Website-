import React from 'react';
import { ArrowLeft, Clock, Star, MapPin, CheckCircle, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { MapView } from '../components/MapView';
import { ReviewSection } from '../components/ReviewSection';

export const PackageDetailPage = ({ pkg, onBack, onBook, user, currencySymbol = '₹', formatPrice = (v) => '₹'+Number(v).toLocaleString() }) => {
  if (!pkg) return null;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingTop: '1rem' }}>
      
      <button 
        onClick={onBack}
        className="btn-secondary"
        style={{ marginBottom: '1.5rem', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
      >
        <ArrowLeft size={16} /> Back to Packages
      </button>

      <div style={{ position: 'relative', height: '380px', borderRadius: '24px', overflow: 'hidden', marginBottom: '2rem', boxShadow: 'var(--shadow-lg)' }}>
        <img src={pkg.image} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, transparent 60%)' }} />
        
        <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-cyan">📍 {pkg.destination}</span>
              <span className="badge badge-warning">★ {pkg.rating} Rating</span>
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>{pkg.title}</h1>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.85rem', color: '#cbd5e1', display: 'block' }}>Package Total Rate</span>
            <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#34d399' }}>{formatPrice(pkg.price)}</span>
            <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}> / per person</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: '2rem', alignItems: 'start' }}>
        
        {/* Package Content Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Overview</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{pkg.description}</p>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>What is Included</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {pkg.includedItems && pkg.includedItems.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  <CheckCircle size={18} color="#10b981" /> {item}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>Trip Highlights</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {pkg.highlights && pkg.highlights.map((h, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <Sparkles size={16} color="#f59e0b" /> {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Map */}
          <MapView 
            locationName={pkg.title}
            latitude={pkg.latitude}
            longitude={pkg.longitude}
            height="320px"
          />

          {/* Reviews Section */}
          <ReviewSection targetType="package" targetId={pkg.id} user={user} />

        </div>

        {/* Sidebar Booking Card */}
        <div className="glass-panel" style={{ padding: '1.5rem', position: 'sticky', top: '90px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem' }}>Reserve Package</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Duration:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{pkg.duration}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Destination:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{pkg.destination}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Cancellation:</span>
              <strong style={{ color: '#10b981' }}>Free 24h Prior</strong>
            </div>
          </div>

          <button 
            onClick={() => onBook(pkg)}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '1rem' }}
          >
            Book This Package Now
          </button>
        </div>

      </div>

    </div>
  );
};
