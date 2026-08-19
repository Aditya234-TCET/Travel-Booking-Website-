import React, { useState, useEffect } from 'react';
import { Search, MapPin, Sparkles, ArrowRight, ShieldCheck, Star, Users, Bot } from 'lucide-react';
import { PackageCard } from '../components/PackageCard';
import { VisaChecker } from '../components/VisaChecker';
import { api } from '../services/api';

export const HomePage = ({ setActivePage, onSelectPackage, onBookPackage, user, currencySymbol = '₹', formatPrice = (v) => '₹'+Number(v).toLocaleString(), openAiPlanner }) => {
  const [packages, setPackages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBg, setCurrentBg] = useState(0);

  const heroImages = [
    'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1920&q=80', // Beach
    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1920&q=80', // Paris
    'https://images.unsplash.com/photo-1512453979434-9d55c46b952a?auto=format&fit=crop&w=1920&q=80', // Dubai
    'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=1920&q=80'  // Japan
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchTopPackages = async () => {
      try {
        const data = await api.getPackages();
        setPackages(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTopPackages();
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActivePage('packages');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', paddingBottom: '3rem' }}>
      
      {/* 1. Stunning Full-Width Hero Section with Animated Carousel */}
      <section style={{
        position: 'relative',
        borderRadius: '32px',
        overflow: 'hidden',
        padding: '8rem 2rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: 'var(--shadow-lg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '600px'
      }}>
        
        {/* Background Image Carousel */}
        {heroImages.map((img, index) => (
          <div 
            key={index}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `linear-gradient(to bottom, rgba(8, 12, 22, 0.3) 0%, rgba(8, 12, 22, 0.8) 100%), url("${img}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentBg === index ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
              zIndex: 1
            }}
          />
        ))}

        <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          
          <div className="animate-float" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(0, 242, 254, 0.2)', border: '1px solid rgba(0, 242, 254, 0.4)', color: '#00f2fe', padding: '0.5rem 1.5rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '2rem', backdropFilter: 'blur(10px)' }}>
            <Sparkles size={16} /> Explore 500+ Worldwide Destinations
          </div>

          <h1 style={{ fontSize: '4.8rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', background: 'linear-gradient(to right, #ffffff, #a8c0ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em' }}>
            Discover Your Next <br/>Extraordinary Journey
          </h1>

          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '600px' }}>
            Book flights, luxury beach resorts, and all-inclusive holiday packages with instant confirmation and 24/7 travel assistance.
          </p>

          <form onSubmit={handleHeroSearch} className="glass-panel" style={{ padding: '0.6rem', borderRadius: '50px', display: 'flex', gap: '0.5rem', alignItems: 'center', width: '100%', maxWidth: '650px', background: 'rgba(17, 24, 39, 0.85)' }}>
            <div style={{ paddingLeft: '1rem', color: '#0ea5e9', display: 'flex' }}>
              <MapPin size={22} />
            </div>
            <input 
              type="text" 
              list="famous-locations"
              placeholder="Search famous destinations (e.g. Taj Mahal, Eiffel Tower)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '1.05rem', outline: 'none', flex: 1 }}
            />
            <datalist id="famous-locations">
              <option value="Taj Mahal, Agra, India" />
              <option value="Eiffel Tower, Paris, France" />
              <option value="Burj Khalifa, Dubai, UAE" />
              <option value="Statue of Liberty, New York, USA" />
              <option value="Colosseum, Rome, Italy" />
              <option value="Machu Picchu, Peru" />
              <option value="Mount Fuji, Japan" />
            </datalist>
            <button type="submit" className="btn-primary" style={{ borderRadius: '40px', padding: '0.8rem 2rem' }}>
              <Search size={18} /> Explore
            </button>
          </form>
        </div>
      </section>

      {/* 1.5 Special Offers Banner */}
      <section style={{ padding: '0 2rem', marginTop: '-1.5rem' }}>
        <div className="glass-panel animate-fade-in" style={{ padding: '2rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(239, 68, 68, 0.15) 100%)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '24px', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ color: '#fbbf24', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '1px' }}>🎉 Limited Time Offer!</div>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', fontWeight: 800, marginBottom: '0.3rem' }}>Get 20% OFF on all Bali & Maldives Holiday Packages</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Use code: <strong style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>WANDERLUST20</strong> at checkout. Valid till midnight!</p>
          </div>
          <button className="btn-primary" onClick={() => setActivePage('packages')} style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', padding: '1rem 2rem', fontSize: '1.1rem', whiteSpace: 'nowrap' }}>
            Claim Offer
          </button>
        </div>
      </section>

      {/* 2. Premium Features Row */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', padding: '0 1rem' }}>
        <div className="glass-panel animate-float-delayed" style={{ padding: '2.5rem', textAlign: 'center', borderRadius: '24px' }}>
          <ShieldCheck size={42} color="#10b981" style={{ margin: '0 auto 1.25rem auto' }} />
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', fontWeight: 700 }}>Secure Bookings</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>Bank-grade encryption for all your payments and personal data.</p>
        </div>
        <div className="glass-panel animate-float" style={{ padding: '2.5rem', textAlign: 'center', borderRadius: '24px' }}>
          <Star size={42} color="#f59e0b" style={{ margin: '0 auto 1.25rem auto' }} />
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', fontWeight: 700 }}>4.9/5 Rating</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>Consistently rated excellent by thousands of happy travelers.</p>
        </div>
        <div className="glass-panel animate-float-delayed" style={{ padding: '2.5rem', textAlign: 'center', borderRadius: '24px' }}>
          <Users size={42} color="#00f2fe" style={{ margin: '0 auto 1.25rem auto' }} />
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', fontWeight: 700 }}>24/7 Support</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>Our travel experts are always available to assist your journey.</p>
        </div>
      </section>

      {/* 3. Featured Packages Grid (Full Width) */}
      <section>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', padding: '0 1rem' }}>
          <div>
            <div style={{ color: '#00f2fe', fontWeight: 700, fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.75rem' }}>Top Destinations</div>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Trending Packages</h2>
          </div>
          <button onClick={() => setActivePage('packages')} className="btn-secondary" style={{ borderRadius: '30px', padding: '0.75rem 1.5rem' }}>
            View All Packages <ArrowRight size={18} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '2.5rem' }}>
          {packages.slice(0, 6).map((pkg) => (
            <PackageCard 
              key={pkg.id}
              pkg={pkg} 
              onBook={onBookPackage} 
              onSelect={onSelectPackage} 
              currencySymbol={currencySymbol} formatPrice={formatPrice} 
            />
          ))}
        </div>
      </section>

      {/* 4. AI Planner & Visa Checker Section */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2.5rem', alignItems: 'stretch' }}>
        
        {/* AI Planner Banner */}
        <div className="glass-panel" style={{ 
          padding: '4rem 3.5rem', 
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(99, 102, 241, 0.12) 100%)', 
          border: '1px solid rgba(168, 85, 247, 0.3)',
          borderRadius: '32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#e879f9', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1rem', background: 'rgba(232, 121, 249, 0.15)', padding: '0.5rem 1.25rem', borderRadius: '30px', width: 'fit-content' }}>
            <Bot size={18} /> Next-Gen AI Technology
          </div>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem', lineHeight: 1.15 }}>
            Plan Your Dream Trip <br/>in Seconds
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '500px' }}>
            Tell our AI where you want to go, your vibe, and your budget. We'll generate a complete day-by-day itinerary instantly.
          </p>
          <button onClick={openAiPlanner} className="btn-primary" style={{ width: 'fit-content', padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '40px', background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)' }}>
            <Sparkles size={20} /> Launch AI Trip Planner
          </button>
        </div>

        {/* Visa Checker Widget */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <VisaChecker />
          </div>
        </div>

      </section>

    </div>
  );
};
