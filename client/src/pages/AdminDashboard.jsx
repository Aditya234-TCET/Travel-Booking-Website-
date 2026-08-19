import React, { useState, useEffect } from 'react';
import { ShieldCheck, DollarSign, Calendar, Users, Plus, Trash2, Package, Plane, Hotel, BarChart2 } from 'lucide-react';
import { api } from '../services/api';

export const AdminDashboard = ({ currencySymbol = '₹', formatPrice = (v) => '₹'+Number(v).toLocaleString() }) => {
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'add-package' | 'add-flight' | 'add-hotel' | 'all-bookings'
  const [bookings, setBookings] = useState([]);

  // Form states
  const [pkgTitle, setPkgTitle] = useState('');
  const [pkgDest, setPkgDest] = useState('');
  const [pkgPrice, setPkgPrice] = useState('');
  const [pkgDuration, setPkgDuration] = useState('5 Days / 4 Nights');
  const [pkgImage, setPkgImage] = useState('');

  const [flAirline, setFlAirline] = useState('');
  const [flNumber, setFlNumber] = useState('');
  const [flDep, setFlDep] = useState('');
  const [flArr, setFlArr] = useState('');
  const [flPrice, setFlPrice] = useState('');

  const [htName, setHtName] = useState('');
  const [htCity, setHtCity] = useState('');
  const [htPrice, setHtPrice] = useState('');
  const [htImage, setHtImage] = useState('');

  const fetchStats = async () => {
    try {
      const data = await api.getAdminStats();
      setStats(data);
      const allBks = await api.getAllBookings();
      setBookings(allBks);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleAddPackage = async (e) => {
    e.preventDefault();
    try {
      await api.createPackage({
        title: pkgTitle,
        destination: pkgDest,
        price: Number(pkgPrice),
        duration: pkgDuration,
        image: pkgImage || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
        description: `Luxury package expedition to ${pkgDest}. Includes flights, resort stay, daily breakfast, and local tours.`
      });
      alert('Package added successfully!');
      setPkgTitle(''); setPkgDest(''); setPkgPrice('');
      fetchStats();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddFlight = async (e) => {
    e.preventDefault();
    try {
      await api.createFlight({
        airline: flAirline,
        flightNumber: flNumber,
        departureCity: flDep,
        arrivalCity: flArr,
        price: Number(flPrice),
        departureTime: '10:30 AM',
        arrivalTime: '01:45 PM'
      });
      alert('Flight route added successfully!');
      setFlAirline(''); setFlNumber(''); setFlDep(''); setFlArr(''); setFlPrice('');
      fetchStats();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddHotel = async (e) => {
    e.preventDefault();
    try {
      await api.createHotel({
        name: htName,
        city: htCity,
        pricePerNight: Number(htPrice),
        image: htImage || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        description: `Premier resort hotel located in the heart of ${htCity}.`
      });
      alert('Hotel added successfully!');
      setHtName(''); setHtCity(''); setHtPrice('');
      fetchStats();
    } catch (err) {
      console.error(err);
    }
  };

  if (!stats) return <div style={{ textAlign: 'center', padding: '3rem' }}>Loading Admin Console...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '1rem' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={28} color="#f59e0b" /> Administrator Command Dashboard
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Real-time analytics, travel inventories management & customer bookings report
          </p>
        </div>
      </div>

      {/* Analytics KPI Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', fontWeight: 700 }}>TOTAL REVENUE</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', marginTop: '0.3rem' }}>
            {formatPrice(stats.totalRevenue)}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', fontWeight: 700 }}>TOTAL BOOKINGS</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0ea5e9', marginTop: '0.3rem' }}>
            {stats.totalBookings}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', fontWeight: 700 }}>REGISTERED USERS</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c084fc', marginTop: '0.3rem' }}>
            {stats.totalUsers}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', fontWeight: 700 }}>ACTIVE PACKAGES</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b', marginTop: '0.3rem' }}>
            {stats.totalPackages}
          </div>
        </div>

      </div>

      {/* Admin Tabs Bar */}
      <div style={{ display: 'flex', gap: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setActiveTab('overview')}
          className={activeTab === 'overview' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
        >
          <BarChart2 size={16} /> Overview & Analytics
        </button>

        <button 
          onClick={() => setActiveTab('add-package')}
          className={activeTab === 'add-package' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
        >
          <Package size={16} /> Add Holiday Package
        </button>

        <button 
          onClick={() => setActiveTab('add-flight')}
          className={activeTab === 'add-flight' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
        >
          <Plane size={16} /> Add Flight Route
        </button>

        <button 
          onClick={() => setActiveTab('add-hotel')}
          className={activeTab === 'add-hotel' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
        >
          <Hotel size={16} /> Add Hotel Resort
        </button>

        <button 
          onClick={() => setActiveTab('all-bookings')}
          className={activeTab === 'all-bookings' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
        >
          <Calendar size={16} /> Manage All Bookings ({bookings.length})
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>Top Popular Destinations</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {stats.popularDestinations.map((dest, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.8rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{dest.name}</span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 700, display: 'block' }}>
                      {formatPrice(dest.revenue)}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{dest.bookings} Bookings</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>Recent Platform Activity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {stats.recentBookings.map((b) => (
                <div key={b.id} style={{ padding: '0.6rem 0.8rem', background: 'var(--bg-primary)', borderRadius: '8px', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                    <span>{b.userName}</span>
                    <span style={{ color: '#10b981' }}>{formatPrice(b.totalPrice)}</span>
                  </div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Booked {b.itemTitle} ({b.destination})</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {activeTab === 'add-package' && (
        <div className="glass-panel" style={{ maxWidth: '650px', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem' }}>Add New Travel Package</h3>
          <form onSubmit={handleAddPackage} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Package Title</label>
              <input type="text" placeholder="e.g. Maldivian Water Villa Retreat" value={pkgTitle} onChange={(e) => setPkgTitle(e.target.value)} required className="form-input" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Destination City</label>
                <input type="text" placeholder="e.g. Maldives, Bali" value={pkgDest} onChange={(e) => setPkgDest(e.target.value)} required className="form-input" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Price ({currencySymbol})</label>
                <input type="number" placeholder="55000" value={pkgPrice} onChange={(e) => setPkgPrice(e.target.value)} required className="form-input" />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Image URL</label>
              <input type="url" placeholder="https://images.unsplash.com/..." value={pkgImage} onChange={(e) => setPkgImage(e.target.value)} className="form-input" />
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '0.75rem', justifyContent: 'center' }}>
              <Plus size={18} /> Publish Package
            </button>
          </form>
        </div>
      )}

      {activeTab === 'add-flight' && (
        <div className="glass-panel" style={{ maxWidth: '650px', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem' }}>Add Airline Flight Route</h3>
          <form onSubmit={handleAddFlight} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Airline Name</label>
                <input type="text" placeholder="e.g. Singapore Airlines" value={flAirline} onChange={(e) => setFlAirline(e.target.value)} required className="form-input" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Flight Code</label>
                <input type="text" placeholder="e.g. SQ-902" value={flNumber} onChange={(e) => setFlNumber(e.target.value)} required className="form-input" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>From</label>
                <input type="text" placeholder="Mumbai" value={flDep} onChange={(e) => setFlDep(e.target.value)} required className="form-input" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>To</label>
                <input type="text" placeholder="Singapore" value={flArr} onChange={(e) => setFlArr(e.target.value)} required className="form-input" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Price ({currencySymbol})</label>
                <input type="number" placeholder="28000" value={flPrice} onChange={(e) => setFlPrice(e.target.value)} required className="form-input" />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '0.75rem', justifyContent: 'center' }}>
              <Plus size={18} /> Add Flight Route
            </button>
          </form>
        </div>
      )}

      {activeTab === 'add-hotel' && (
        <div className="glass-panel" style={{ maxWidth: '650px', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem' }}>Add Hotel Resort</h3>
          <form onSubmit={handleAddHotel} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Hotel / Resort Name</label>
              <input type="text" placeholder="e.g. St. Regis Resort" value={htName} onChange={(e) => setHtName(e.target.value)} required className="form-input" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>City</label>
                <input type="text" placeholder="e.g. Bali" value={htCity} onChange={(e) => setHtCity(e.target.value)} required className="form-input" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Price / Night ({currencySymbol})</label>
                <input type="number" placeholder="16000" value={htPrice} onChange={(e) => setHtPrice(e.target.value)} required className="form-input" />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '0.75rem', justifyContent: 'center' }}>
              <Plus size={18} /> Add Hotel Resort
            </button>
          </form>
        </div>
      )}

      {activeTab === 'all-bookings' && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>All Platform Bookings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {bookings.map((b) => (
              <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', background: 'var(--bg-primary)', borderRadius: '10px', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>{b.userName} - {b.itemTitle}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {b.id} | Travel Date: {b.travelDate}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: '#10b981', display: 'block' }}>{formatPrice(b.totalPrice)}</span>
                  <span className={`badge ${b.bookingStatus === 'confirmed' ? 'badge-success' : 'badge-danger'}`}>{b.bookingStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
