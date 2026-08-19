import React, { useState } from 'react';
import { Sun, CloudRain, Wind, Thermometer, CloudLightning, Search } from 'lucide-react';

export const WeatherWidget = ({ initialCity = 'Goa' }) => {
  const [city, setCity] = useState(initialCity);
  const [activeCity, setActiveCity] = useState(initialCity);

  const mockWeatherData = {
    Goa: { temp: '29°C', condition: 'Sunny Beach Weather', humidity: '72%', wind: '12 km/h', forecast: ['Sunny 30°C', 'Partly Cloudy 29°C', 'Clear 28°C'] },
    Paris: { temp: '22°C', condition: 'Pleasant & Mild', humidity: '55%', wind: '15 km/h', forecast: ['Breezy 21°C', 'Sunny 23°C', 'Light Rain 19°C'] },
    Tokyo: { temp: '25°C', condition: 'Clear Sky', humidity: '60%', wind: '9 km/h', forecast: ['Clear 26°C', 'Sunny 25°C', 'Cloudy 23°C'] },
    Zurich: { temp: '16°C', condition: 'Crisp Mountain Breeze', humidity: '48%', wind: '18 km/h', forecast: ['Cool 15°C', 'Alpine Sun 17°C', 'Snow Peaks 14°C'] },
    Dubai: { temp: '36°C', condition: 'Hot & Clear', humidity: '40%', wind: '10 km/h', forecast: ['Sunny 37°C', 'Sunny 36°C', 'Sunny 38°C'] },
    Bali: { temp: '28°C', condition: 'Tropical Breeze', humidity: '78%', wind: '11 km/h', forecast: ['Tropical Sun 29°C', 'Showers 27°C', 'Sunny 28°C'] }
  };

  const weather = mockWeatherData[activeCity] || { temp: '26°C', condition: 'Pleasant Weather', humidity: '65%', wind: '14 km/h', forecast: ['Sunny 26°C', 'Partly Cloudy 25°C', 'Clear 27°C'] };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      setActiveCity(city.trim());
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f59e0b', fontWeight: 700, fontSize: '0.95rem' }}>
          <Sun size={20} /> Destination Weather Forecast
        </div>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.3rem' }}>
          <input 
            type="text" 
            placeholder="City weather..." 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.3rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', width: '110px' }}
          />
          <button type="submit" style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '0.3rem 0.5rem', borderRadius: '6px', cursor: 'pointer' }}>
            <Search size={12} />
          </button>
        </form>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', background: 'var(--bg-primary)', padding: '1rem', borderRadius: '12px' }}>
        <div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{activeCity}</h4>
          <span style={{ fontSize: '0.85rem', color: '#f59e0b', fontWeight: 600 }}>{weather.condition}</span>
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          {weather.temp}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Thermometer size={14} color="#ef4444" /> Humidity: {weather.humidity}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Wind size={14} color="#0ea5e9" /> Wind: {weather.wind}
        </div>
      </div>
    </div>
  );
};
