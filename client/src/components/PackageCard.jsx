import React from 'react';
import { MapPin, Clock, Star, CheckCircle, ArrowRight, Compass } from 'lucide-react';

export const PackageCard = ({ pkg, onBook, onSelect, currencySymbol = '₹', formatPrice = (v) => '₹'+Number(v).toLocaleString() }) => {
  return (
    <div className="package-card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: '220px' }}>
        <img 
          src={pkg.image} 
          alt={pkg.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'var(--accent-gradient)', color: '#fff', padding: '0.3rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
          <Compass size={14} /> {pkg.destination}
        </div>
        <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', padding: '0.3rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          <Star size={14} fill="#f59e0b" /> {pkg.rating}
        </div>
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.4rem' }}>
          <Clock size={14} color="#0ea5e9" /> {pkg.duration}
        </div>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.6rem', lineHeight: 1.3 }}>
          {pkg.title}
        </h3>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {pkg.description}
        </p>

        {/* Included features tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
          {pkg.includedItems && pkg.includedItems.slice(0, 3).map((item, idx) => (
            <span key={idx} style={{ background: 'rgba(0, 242, 254, 0.1)', border: '1px solid rgba(0, 242, 254, 0.25)', color: '#00f2fe', fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <CheckCircle size={10} /> {item}
            </span>
          ))}
          {pkg.includedItems && pkg.includedItems.length > 3 && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', padding: '0.2rem 0.3rem' }}>
              +{pkg.includedItems.length - 3} more
            </span>
          )}
        </div>

        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Starting from</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>{formatPrice(pkg.price)}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}> / person</span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {onSelect && (
              <button 
                onClick={() => onSelect(pkg)} 
                className="btn-secondary"
                style={{ padding: '0.5rem 0.8rem', fontSize: '0.85rem' }}
              >
                Details
              </button>
            )}
            <button 
              onClick={() => onBook(pkg)} 
              className="btn-primary"
              style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}
            >
              Book Package <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
