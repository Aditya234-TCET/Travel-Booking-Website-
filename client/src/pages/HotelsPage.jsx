import React, { useState } from 'react';
import { HotelSearch } from '../components/HotelSearch';
import { MapView } from '../components/MapView';

export const HotelsPage = ({ onBookHotel, currencySymbol = '₹', formatPrice = (v) => '₹'+Number(v).toLocaleString() }) => {
  const [activeHotelMap, setActiveHotelMap] = useState(null);

  return (
    <div style={{ paddingTop: '1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          🏨 Hotel & Beach Resort Finder
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
          Reserve 5-star luxury stays, mountain chalets, and private pool villas
        </p>
      </div>

      {activeHotelMap && (
        <div className="modal-overlay" onClick={() => setActiveHotelMap(null)} style={{ zIndex: 9999 }}>
          <div className="modal-content animate-fade-in" style={{ maxWidth: '800px', width: '95%', padding: '1.5rem' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>📍 {activeHotelMap.name}</h3>
              <button 
                onClick={() => setActiveHotelMap(null)} 
                style={{ background: 'var(--bg-secondary)', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>
            <MapView 
              locationName={activeHotelMap.name}
              latitude={activeHotelMap.latitude}
              longitude={activeHotelMap.longitude}
              height="450px"
            />
          </div>
        </div>
      )}

      <HotelSearch 
        onBookHotel={onBookHotel} 
        currencySymbol={currencySymbol} formatPrice={formatPrice} 
        onViewMap={(hotel) => setActiveHotelMap(hotel)}
      />
    </div>
  );
};
