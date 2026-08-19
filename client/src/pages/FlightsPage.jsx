import React from 'react';
import { FlightSearch } from '../components/FlightSearch';

export const FlightsPage = ({ onBookFlight, currencySymbol = '₹', formatPrice = (v) => '₹'+Number(v).toLocaleString() }) => {
  return (
    <div style={{ paddingTop: '1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          ✈️ Flight Search & Booking Engine
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
          Compare domestic & international airfares with instant seat confirmation
        </p>
      </div>

      <FlightSearch onBookFlight={onBookFlight} currencySymbol={currencySymbol} formatPrice={formatPrice} />
    </div>
  );
};
