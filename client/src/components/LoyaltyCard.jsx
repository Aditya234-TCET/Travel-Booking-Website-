import React from 'react';
import { Award, Crown, Gift, Sparkles, CheckCircle2 } from 'lucide-react';

export const LoyaltyCard = ({ user, currencySymbol = '₹', formatPrice = (v) => '₹'+Number(v).toLocaleString() }) => {
  if (!user) return null;

  const points = user.loyaltyPoints || 150;
  const tier = points > 1000 ? 'Platinum Wanderer' : points > 500 ? 'Gold Explorer' : 'Silver Traveler';
  const tierColor = points > 1000 ? '#e2e8f0' : points > 500 ? '#f59e0b' : '#38bdf8';

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)', border: '1px solid rgba(245, 158, 11, 0.3)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.1, color: '#f59e0b' }}>
        <Crown size={140} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '0.5rem', borderRadius: '10px', color: '#f59e0b' }}>
            <Award size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700 }}>Loyalty Rewards Program</span>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: tierColor }}>{tier}</h4>
          </div>
        </div>

        <span className="badge badge-warning" style={{ fontSize: '0.8rem' }}>
          🪙 {points} Points
        </span>
      </div>

      <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '12px', marginBottom: '1rem', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
          <span>Points Balance Value</span>
          <strong style={{ color: '#10b981' }}>= {formatPrice((points * 2))} Discount Credit</strong>
        </div>
        <div style={{ width: '100%', height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${Math.min(100, (points / 1500) * 100)}%`, height: '100%', background: 'linear-gradient(90deg, #f59e0b, #10b981)' }} />
        </div>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.3rem', display: 'block' }}>
          Earn 5% points back on every flight, hotel, or holiday package booking!
        </span>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><CheckCircle2 size={12} color="#10b981" /> Free Airport Lounge Access</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><CheckCircle2 size={12} color="#10b981" /> Priority Check-in</span>
      </div>
    </div>
  );
};
