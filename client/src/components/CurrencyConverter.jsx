import React, { useState } from 'react';
import { DollarSign, ArrowLeftRight, RefreshCw } from 'lucide-react';

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState(10000);
  const [fromCurr, setFromCurr] = useState('INR');
  const [toCurr, setToCurr] = useState('USD');

  const rates = {
    INR: 1,
    USD: 0.012,
    EUR: 0.011,
    GBP: 0.0094
  };

  const converted = Math.round((amount / rates[fromCurr]) * rates[toCurr] * 100) / 100;

  return (
    <div className="glass-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontWeight: 700, fontSize: '0.95rem', marginBottom: '1rem' }}>
        <DollarSign size={20} /> Live Travel Currency Converter
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(Number(e.target.value))} 
            className="form-input" 
            style={{ flex: 1, padding: '0.4rem 0.6rem', fontSize: '0.9rem' }}
          />
          <select 
            value={fromCurr} 
            onChange={(e) => setFromCurr(e.target.value)}
            className="form-input" 
            style={{ width: '90px', padding: '0.4rem' }}
          >
            <option value="INR">₹ INR</option>
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
            <option value="GBP">£ GBP</option>
          </select>
        </div>

        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          <ArrowLeftRight size={16} />
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Converted Value:</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981' }}>
            {toCurr === 'INR' ? '₹' : toCurr === 'USD' ? '$' : toCurr === 'EUR' ? '€' : '£'}{converted.toLocaleString()} {toCurr}
          </span>
        </div>
      </div>
    </div>
  );
};
