import React from 'react';
import { Compass, Plane, Hotel, MapPin, Sparkles, Calendar, ShieldCheck, Sun, Moon, LogOut, Train, Car } from 'lucide-react';

export const Navbar = ({ activePage, setActivePage, user, setUser, theme, toggleTheme, currency, setCurrency, openAiPlanner }) => {
  const handleLogout = () => {
    localStorage.removeItem('wanderlust_token');
    localStorage.removeItem('wanderlust_user');
    setUser(null);
    setActivePage('home');
  };

  const NavButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActivePage(id)}
      style={{
        background: 'transparent',
        border: 'none',
        color: activePage === id ? '#0ea5e9' : 'var(--text-secondary)',
        fontWeight: activePage === id ? 700 : 500,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
        fontSize: '0.9rem',
        padding: '0.4rem 0.5rem',
        borderRadius: '8px',
        transition: 'all 0.2s'
      }}
      className="nav-item-hover"
    >
      <Icon size={16} /> <span>{label}</span>
    </button>
  );

  return (
    <nav className="glass-nav sticky top-0 z-50 px-4 py-3 shadow-lg" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1400px', margin: '0 auto', width: '100%', gap: '1rem' }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActivePage('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', flexShrink: 0 }}
        >
          <div style={{ background: 'var(--accent-gradient)', padding: '0.5rem', borderRadius: '10px', display: 'flex', color: '#fff' }}>
            <Compass size={24} />
          </div>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'block', lineHeight: 1.1 }}>
              Wanderlust
            </span>
            <span style={{ fontSize: '0.65rem', display: 'block', color: 'var(--text-secondary)' }}>
              Travel & Booking
            </span>
          </div>
        </div>

        {/* Navigation Links (Center) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexWrap: 'wrap', justifyContent: 'center' }} className="nav-links">
          <NavButton id="home" icon={Compass} label="Explore" />
          <NavButton id="flights" icon={Plane} label="Flights" />
          <NavButton id="hotels" icon={Hotel} label="Hotels" />
          <NavButton id="trains" icon={Train} label="Trains" />
          <NavButton id="cabs" icon={Car} label="Cabs" />
          <NavButton id="packages" icon={MapPin} label="Packages" />
        </div>

        {/* Action Controls & User Account (Right) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          
          {/* AI Trip Planner Button */}
          <button
            onClick={openAiPlanner}
            style={{
              background: 'rgba(168, 85, 247, 0.15)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              color: '#c084fc',
              fontWeight: 600,
              padding: '0.4rem 0.8rem',
              borderRadius: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              whiteSpace: 'nowrap'
            }}
          >
            <Sparkles size={16} /> <span>AI Planner</span>
          </button>

          {/* Currency Selector */}
          <select 
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={{
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              padding: '0.35rem 0.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              outline: 'none'
            }}
          >
            <option value="INR">₹ INR</option>
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
            <option value="GBP">£ GBP</option>
          </select>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              padding: '0.4rem',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex'
            }}
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} color="#f59e0b" /> : <Moon size={16} color="#6366f1" />}
          </button>

          {/* User Auth Info & Admin */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-secondary)', padding: '0.2rem 0.5rem 0.2rem 0.2rem', borderRadius: '30px', border: '1px solid var(--border-color)' }}>
                <div 
                  onClick={() => setActivePage('my-bookings')}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', paddingRight: '0.5rem' }}
                  title="View My Bookings"
                >
                  <img 
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
                    alt={user.name} 
                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #0ea5e9' }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', lineHeight: 1.1 }}>
                      {user.name.split(' ')[0]}
                    </span>
                    <span style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 600 }}>
                      🪙 {user.loyaltyPoints || 150} pts
                    </span>
                  </div>
                </div>
                <div style={{ width: '1px', height: '20px', background: 'var(--border-color)' }}></div>
                <button
                  onClick={handleLogout}
                  style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.4rem', display: 'flex' }}
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
              
              {user.role === 'admin' && (
                <button
                  onClick={() => setActivePage('admin')}
                  style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.4)', color: '#fbbf24', padding: '0.4rem', borderRadius: '50%', cursor: 'pointer', display: 'flex' }}
                  title="Admin Panel"
                >
                  <ShieldCheck size={16} />
                </button>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => setActivePage('login')} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>Sign In</button>
              <button onClick={() => setActivePage('register')} className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>Register</button>
            </div>
          )}

        </div>

      </div>
    </nav>
  );
};
