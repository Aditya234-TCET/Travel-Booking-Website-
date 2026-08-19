import React, { useEffect, useRef } from 'react';
import { MapPin, Navigation, Compass, Coffee, Utensils, Bus } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const MapView = ({ locationName = 'Goa Beach Resort', latitude = 15.2993, longitude = 74.1240, height = '350px' }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Prevent duplicate map initialization
    if (mapInstance.current) {
      mapInstance.current.setView([latitude, longitude], 13);
      return;
    }

    const map = L.map(mapRef.current).setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Custom Icon Marker
    const mainMarker = L.marker([latitude, longitude]).addTo(map);
    mainMarker.bindPopup(`<b>${locationName}</b><br/>Primary Destination`).openPopup();

    // Add surrounding points of interest (Attractions, Restaurants, Transport)
    const pois = [
      { name: 'Heritage Sunset Point', offsetLat: 0.012, offsetLng: 0.015, type: 'Attraction' },
      { name: 'Seafood Riviera Bistro', offsetLat: -0.008, offsetLng: 0.011, type: 'Restaurant' },
      { name: 'Central Express Station', offsetLat: 0.015, offsetLng: -0.012, type: 'Transport' }
    ];

    pois.forEach(poi => {
      L.marker([latitude + poi.offsetLat, longitude + poi.offsetLng])
        .addTo(map)
        .bindPopup(`<b>${poi.name}</b><br/>${poi.type}`);
    });

    mapInstance.current = map;

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [latitude, longitude, locationName]);

  return (
    <div className="glass-panel" style={{ padding: '1rem', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0ea5e9', fontWeight: 700, fontSize: '0.9rem' }}>
          <MapPin size={18} /> Interactive Map & Attractions
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>📍 {latitude.toFixed(4)}, {longitude.toFixed(4)}</span>
      </div>

      <div 
        ref={mapRef} 
        style={{ width: '100%', height, borderRadius: '12px', zIndex: 1, border: '1px solid var(--border-color)' }} 
      />

      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={12} color="#ef4444" /> Main Hotel / Package</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Utensils size={12} color="#10b981" /> Nearby Restaurants</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Bus size={12} color="#f59e0b" /> Transport Options</span>
      </div>
    </div>
  );
};
