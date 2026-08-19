import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, SlidersHorizontal } from 'lucide-react';
import { PackageCard } from '../components/PackageCard';
import { api } from '../services/api';

export const PackagesPage = ({ onBookPackage, onSelectPackage, currencySymbol = '₹', formatPrice = (v) => '₹'+Number(v).toLocaleString() }) => {
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const data = await api.getPackages({ search, maxPrice });
      setPackages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [search, maxPrice]);

  return (
    <div style={{ paddingTop: '1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          🌍 Holiday Package Expeditions
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
          All-inclusive curated vacation packages with flights, stay, meals & guided excursions
        </p>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel" style={{ maxWidth: '1000px', margin: '0 auto 2.5rem auto', padding: '1.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '240px' }}>
          <Search size={18} color="#0ea5e9" />
          <input 
            type="text" 
            placeholder="Search destination, experience, title..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="form-input" 
            style={{ marginBottom: 0 }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '220px' }}>
          <SlidersHorizontal size={18} color="#10b981" />
          <input 
            type="number" 
            placeholder={`Max Price (${currencySymbol})`} 
            value={maxPrice} 
            onChange={(e) => setMaxPrice(e.target.value)} 
            className="form-input" 
            style={{ marginBottom: 0 }}
          />
        </div>
      </div>

      {/* Package Grid */}
      <div className="grid-3" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {packages.map((pkg) => (
          <PackageCard 
            key={pkg.id} 
            pkg={pkg} 
            onBook={onBookPackage} 
            onSelect={onSelectPackage} 
            currencySymbol={currencySymbol} formatPrice={formatPrice} 
          />
        ))}
      </div>
    </div>
  );
};
