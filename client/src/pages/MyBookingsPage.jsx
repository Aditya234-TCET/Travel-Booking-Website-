import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, CreditCard, ShieldCheck, XCircle, FileText, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export const MyBookingsPage = ({ currencySymbol = '₹', formatPrice = (v) => '₹'+Number(v).toLocaleString() }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyBookings = async () => {
    setLoading(true);
    try {
      const data = await api.getMyBookings();
      if (Array.isArray(data)) {
        setBookings(data);
      } else {
        throw new Error('API returned invalid format (likely auth error)');
      }
    } catch (err) {
      console.warn("Loading offline bookings due to server error");
      const stored = localStorage.getItem('wanderlust_offline_bookings');
      let offlineBookings = [];
      try {
        offlineBookings = stored ? JSON.parse(stored) : [];
        if (!Array.isArray(offlineBookings)) offlineBookings = [];
      } catch (e) {
        offlineBookings = [];
      }
      setBookings(offlineBookings);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const handleCancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking? A 100% refund will be processed.')) return;
    try {
      const res = await api.cancelBooking(id);
      alert(res.message);
      fetchMyBookings();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingTop: '1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          📄 My Booking History
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
          Manage your reserved flights, hotels, and holiday packages
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '3rem' }}>
          Loading your travel itineraries...
        </div>
      ) : bookings.length === 0 ? (
        <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <Calendar size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
          <h3>No bookings found yet.</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Explore flights, hotels, or packages to book your first adventure!
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {bookings.map((booking) => {
            const bStatus = booking.bookingStatus || booking.status || 'confirmed';
            return (
            <div key={booking.id} className="package-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: 0 }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>BOOKING ID</span>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0ea5e9' }}>{booking.id}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span className={`badge ${bStatus.toLowerCase() === 'confirmed' ? 'badge-success' : 'badge-danger'}`}>
                    {bStatus.toUpperCase()}
                  </span>
                  <span className="badge badge-cyan">{booking.paymentMethod || 'Online'}</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>RESERVED ITEM</span>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{booking.itemTitle}</span>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>DESTINATION</span>
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <MapPin size={14} color="#f59e0b" /> {booking.destination}
                  </span>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>TRAVEL DATE</span>
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{booking.travelDate}</span>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>TOTAL PRICE</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981' }}>
                    {formatPrice(booking.totalPrice)}
                  </span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Transaction Ref: {booking.transactionId}
                </span>

                {bStatus.toLowerCase() === 'confirmed' && (
                  <button 
                    onClick={() => handleCancelBooking(booking.id)}
                    className="btn-outline-danger"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem' }}
                  >
                    <XCircle size={16} /> Cancel Booking
                  </button>
                )}
              </div>

            </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
