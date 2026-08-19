import React, { useState } from 'react';
import { UserPlus, Compass, ArrowRight, Gift } from 'lucide-react';
import { api } from '../services/api';

export const RegisterPage = ({ onLoginSuccess, setActivePage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.register({ name, email, password, phone });
      if (res.token) {
        localStorage.setItem('wanderlust_token', res.token);
        localStorage.setItem('wanderlust_user', JSON.stringify(res.user));
        alert('🎉 Welcome bonus of 150 Loyalty Points awarded!');
        onLoginSuccess(res.user);
        setActivePage('home');
      } else {
        setError(res.message || 'Registration failed');
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '460px', margin: '2.5rem auto 0 auto' }}>
      <div className="glass-panel" style={{ padding: '2.5rem 2rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--accent-gradient)', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: '#fff' }}>
            <Compass size={32} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>Create Account</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Join Wanderlust to unlock exclusive travel deals</p>
        </div>

        {/* Welcome Bonus Notice */}
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399', padding: '0.75rem', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Gift size={20} /> Get 150 FREE Loyalty Reward Points upon sign up!
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#f87171', padding: '0.6rem 0.85rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Full Name</label>
            <input 
              type="text" 
              placeholder="Alex Johnson" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="form-input" 
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="alex@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="form-input" 
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Phone Number</label>
            <input 
              type="tel" 
              placeholder="+1 555-0199" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              className="form-input" 
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Minimum 6 characters" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              minLength={6}
              className="form-input" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary" 
            style={{ justifyContent: 'center', padding: '0.85rem', marginTop: '0.5rem' }}
          >
            {loading ? 'Creating Profile...' : 'Register Account'} <ArrowRight size={18} />
          </button>

        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <button 
            onClick={() => setActivePage('login')} 
            style={{ background: 'transparent', border: 'none', color: '#0ea5e9', fontWeight: 700, cursor: 'pointer' }}
          >
            Sign In Here
          </button>
        </div>

      </div>
    </div>
  );
};
