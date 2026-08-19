import React from 'react';
import { Compass, Heart, Globe, Mail, Phone, MapPin, Shield, CreditCard } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '3rem', paddingBottom: '2rem', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ background: 'var(--accent-gradient)', padding: '0.5rem', borderRadius: '10px', color: '#fff' }}>
                <Compass size={22} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>Wanderlust</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Your ultimate travel companion for booking flights, luxury hotels, and curated holiday packages worldwide with instant payment verification.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-muted)' }}>
              <Globe size={18} />
              <Shield size={18} />
              <CreditCard size={18} />
            </div>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <li>Flights Search</li>
              <li>Hotel Resorts</li>
              <li>Holiday Packages</li>
              <li>AI Itinerary Planner</li>
              <li>Loyalty Rewards</li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Top Destinations</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <li>Goa Beach Carnival, India</li>
              <li>Paris Romance Tour, France</li>
              <li>Tokyo High Speed Explorer, Japan</li>
              <li>Swiss Alps Skiing, Switzerland</li>
              <li>Bali Island Sanctuary, Indonesia</li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Support & Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} color="#0ea5e9" /> adityashubhash3075@gmail.com
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} color="#10b981" /> +91 7303083033
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} color="#f59e0b" /> Mumbai, India
              </div>
            </div>
          </div>

        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <div>© {new Date().getFullYear()} Wanderlust Travel Booking Portal. All rights reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Built with <Heart size={14} color="#ef4444" fill="#ef4444" /> by <strong style={{ color: '#0ea5e9' }}>Aditya Maurya</strong>
          </div>
        </div>
      </div>
    </footer>
  );
};
