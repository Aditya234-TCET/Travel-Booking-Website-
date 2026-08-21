import React, { useState } from 'react';
import { Book, Globe, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const visaDatabase = {
  'India-Thailand': { status: 'Visa on Arrival', color: '#f59e0b', icon: <Info size={16} /> },
  'India-Dubai': { status: 'E-Visa Required', color: '#00f2fe', icon: <Info size={16} /> },
  'India-Maldives': { status: 'Visa Free (30 days)', color: '#10b981', icon: <CheckCircle size={16} /> },
  'India-France': { status: 'Schengen Visa Required', color: '#ef4444', icon: <AlertTriangle size={16} /> },
  'US-France': { status: 'Visa Free (90 days)', color: '#10b981', icon: <CheckCircle size={16} /> },
  'UK-Australia': { status: 'E-Visitor Visa', color: '#00f2fe', icon: <Info size={16} /> },
};

export const VisaChecker = () => {
  const [nationality, setNationality] = useState('India');
  const [destination, setDestination] = useState('Maldives');
  const [result, setResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!destination.trim()) return;
    
    setIsChecking(true);
    setResult(null);

    setTimeout(() => {
      const key = `${nationality}-${destination}`;
      if (visaDatabase[key]) {
        setResult(visaDatabase[key]);
      } else {
        // Mock random result for demo purposes
        const outcomes = [
           { status: 'Visa Free', color: '#10b981', icon: <CheckCircle size={16} /> },
           { status: 'E-Visa Available', color: '#00f2fe', icon: <Info size={16} /> },
           { status: 'Visa Required', color: '#ef4444', icon: <AlertTriangle size={16} /> }
        ];
        setResult(outcomes[Math.floor(Math.random() * outcomes.length)]);
      }
      setIsChecking(false);
    }, 800);
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem', background: 'var(--bg-secondary)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#10b981', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.1rem' }}>
        <Book size={22} className="animate-float" /> Visa Requirements
      </div>
      
      <form onSubmit={handleCheck} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>My Passport:</label>
          <select 
            value={nationality} 
            onChange={(e) => setNationality(e.target.value)}
            className="form-input" 
            style={{ padding: '0.6rem', fontSize: '0.9rem', background: 'var(--bg-primary)' }}
          >
            {countries.map(country => (
              <option key={country} value={country} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>{country}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Destination:</label>
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ paddingLeft: '0.8rem', color: 'var(--text-muted)' }}><Globe size={16} /></div>
            <select 
              value={destination} 
              onChange={(e) => setDestination(e.target.value)}
              className="form-input" 
              style={{ border: 'none', background: 'transparent', padding: '0.6rem', fontSize: '0.9rem' }}
            >
              {countries.map(country => (
                <option key={country} value={country} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>{country}</option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', borderColor: 'rgba(16, 185, 129, 0.4)', color: '#10b981' }}>
          {isChecking ? 'Checking...' : 'Check Status'}
        </button>
      </form>

      {result && (
        <div className="animate-fade-in" style={{ marginTop: '1.25rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: 'var(--radius-md)', borderLeft: `4px solid ${result.color}` }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Result for {nationality} to {destination}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: result.color, fontWeight: 800, fontSize: '0.95rem' }}>
            {result.icon} {result.status}
          </div>
        </div>
      )}
    </div>
  );
};
