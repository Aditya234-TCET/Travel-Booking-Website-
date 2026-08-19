import React, { useState } from 'react';
import { LogIn, Compass, Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { api } from '../services/api';

export const LoginPage = ({ onLoginSuccess, setActivePage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (loginMethod === 'phone') {
      if (!otpSent) {
        // Simulate sending OTP
        setTimeout(() => {
          setOtpSent(true);
          setLoading(false);
        }, 1000);
        return;
      } else {
        // Simulate OTP verification and login
        setTimeout(() => {
          autofillUser(); // Just to load demo user data
          setLoading(false);
        }, 1500);
      }
    }

    try {
      const res = await api.login({ email: email || 'user@wanderlust.com', password: password || 'user123' });
      if (res.token) {
        localStorage.setItem('wanderlust_token', res.token);
        localStorage.setItem('wanderlust_user', JSON.stringify(res.user));
        onLoginSuccess(res.user);
        setActivePage('home');
      } else {
        setError(res.message || 'Invalid credentials');
      }
    } catch (err) {
      console.warn("Backend unreachable. Using demo login fallback.");
      const mockUser = {
        id: 'mock_123',
        name: 'Aditya Maurya',
        email: email || 'adityashubhash3075@gmail.com',
        role: email === 'admin@wanderlust.com' ? 'admin' : 'user',
        loyaltyPoints: 2500,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
      };
      localStorage.setItem('wanderlust_token', 'mock_token_xyz');
      localStorage.setItem('wanderlust_user', JSON.stringify(mockUser));
      onLoginSuccess(mockUser);
      setActivePage('home');
    } finally {
      setLoading(false);
    }
  };

  const autofillUser = () => {
    setEmail('user@wanderlust.com');
    setPassword('user123');
  };

  const autofillAdmin = () => {
    setEmail('admin@wanderlust.com');
    setPassword('admin123');
  };

  return (
    <div style={{ maxWidth: '440px', margin: '3rem auto 0 auto' }}>
      <div className="glass-panel" style={{ padding: '2.5rem 2rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--accent-gradient)', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: '#fff' }}>
            <Compass size={32} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>Welcome Back</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Sign in to manage your bookings and loyalty points</p>
        </div>

        {/* Demo Fast Login Helper Buttons */}
        <div style={{ background: 'var(--bg-primary)', padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', textAlign: 'center' }}>⚡ ONE-CLICK DEMO LOGIN</span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <button type="button" onClick={autofillUser} className="btn-secondary" style={{ padding: '0.4rem', fontSize: '0.75rem', justifyContent: 'center' }}>
              <UserCheck size={14} color="#0ea5e9" /> Demo Traveler
            </button>
            <button type="button" onClick={autofillAdmin} className="btn-secondary" style={{ padding: '0.4rem', fontSize: '0.75rem', justifyContent: 'center' }}>
              <ShieldCheck size={14} color="#f59e0b" /> Demo Admin
            </button>
          </div>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#f87171', padding: '0.6rem 0.85rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', background: 'var(--bg-primary)', padding: '0.4rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <button type="button" onClick={() => { setLoginMethod('email'); setOtpSent(false); }} style={{ flex: 1, padding: '0.6rem', background: loginMethod === 'email' ? 'var(--bg-secondary)' : 'transparent', color: loginMethod === 'email' ? '#fff' : 'var(--text-secondary)', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', boxShadow: loginMethod === 'email' ? 'var(--shadow-lg)' : 'none' }}>
            Email
          </button>
          <button type="button" onClick={() => setLoginMethod('phone')} style={{ flex: 1, padding: '0.6rem', background: loginMethod === 'phone' ? 'var(--bg-secondary)' : 'transparent', color: loginMethod === 'phone' ? '#fff' : 'var(--text-secondary)', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', boxShadow: loginMethod === 'phone' ? 'var(--shadow-lg)' : 'none' }}>
            Phone (OTP)
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {loginMethod === 'email' ? (
            <>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Email Address</label>
                <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Password</label>
                <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-input" />
              </div>
            </>
          ) : (
            <>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Phone Number</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <select className="form-input" style={{ width: '80px', padding: '0.75rem 0.5rem' }}>
                    <option>+91</option>
                    <option>+1</option>
                    <option>+44</option>
                  </select>
                  <input type="tel" placeholder="Enter mobile number" value={phone} onChange={(e) => setPhone(e.target.value)} required disabled={otpSent} className="form-input" style={{ flex: 1 }} />
                </div>
              </div>

              {otpSent && (
                <div className="form-group animate-fade-in" style={{ marginBottom: 0 }}>
                  <label style={{ color: '#10b981' }}>Enter OTP sent to your phone</label>
                  <input type="text" placeholder="6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required className="form-input" style={{ borderColor: '#10b981' }} maxLength="6" />
                </div>
              )}
            </>
          )}

          <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: 'center', padding: '0.85rem', marginTop: '0.5rem' }}>
            {loading ? 'Processing...' : (loginMethod === 'phone' && !otpSent) ? 'Send OTP' : 'Sign In'} <ArrowRight size={18} />
          </button>

        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Don't have an account?{' '}
          <button 
            onClick={() => setActivePage('register')} 
            style={{ background: 'transparent', border: 'none', color: '#0ea5e9', fontWeight: 700, cursor: 'pointer' }}
          >
            Register Now
          </button>
        </div>

      </div>
    </div>
  );
};
