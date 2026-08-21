import React, { useState, useEffect } from 'react';

const images = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80', // Maldives Beach
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80', // Road Trip / Mountains
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80', // Swiss Alps Lake
  'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80', // Paris Eiffel Tower
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'  // Dubai Cityscape
];

export function BackgroundSlideshow({ theme }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000); // Change every 6 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      zIndex: -1,
      overflow: 'hidden',
      backgroundColor: theme === 'dark' ? '#080c16' : '#f8fafc'
    }}>
      {images.map((img, index) => (
        <div
          key={img}
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: index === currentIndex ? (theme === 'dark' ? 0.25 : 0.15) : 0,
            transition: 'opacity 2.5s ease-in-out, transform 12s linear',
            transform: index === currentIndex ? 'scale(1.1)' : 'scale(1)',
          }}
        />
      ))}
      
      {/* Dark/Light fade gradient overlay so text remains perfectly readable */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: theme === 'dark' 
          ? 'radial-gradient(circle at center, rgba(8,12,22,0.6) 0%, rgba(8,12,22,0.95) 100%)'
          : 'radial-gradient(circle at center, rgba(248,250,252,0.5) 0%, rgba(248,250,252,0.9) 100%)',
        pointerEvents: 'none'
      }} />
    </div>
  );
}
