import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

export const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your AI Travel Assistant. How can I help with your bookings, baggage, or itinerary today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    // Instant bot response logic
    setTimeout(() => {
      let botReply = "I'm happy to assist you! Our team offers 24/7 travel support for flights, hotel reschedules, and cancellations.";
      const lower = userMsg.toLowerCase();

      if (lower.includes('promo') || lower.includes('discount') || lower.includes('coupon')) {
        botReply = "Use promo code 'WANDERLUST10' at checkout to get an instant 10% discount on all holiday packages!";
      } else if (lower.includes('cancel') || lower.includes('refund')) {
        botReply = "Cancellations are 100% free up to 24 hours prior to travel. Refunds process automatically back to original payment method.";
      } else if (lower.includes('baggage') || lower.includes('flight')) {
        botReply = "All flight bookings include 15kg check-in baggage and 7kg cabin baggage by default.";
      } else if (lower.includes('contact') || lower.includes('phone')) {
        botReply = "You can call our 24/7 hotline at +1 (800) 234-9876 or email support@wanderlust-travel.com";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, 600);
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 999 }}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            background: 'var(--accent-gradient)',
            color: '#fff',
            border: 'none',
            padding: '0.85rem 1.25rem',
            borderRadius: '30px',
            boxShadow: '0 10px 25px rgba(14, 165, 233, 0.5)',
            cursor: 'pointer',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem'
          }}
        >
          <MessageSquare size={20} /> Live Travel Support
        </button>
      ) : (
        <div className="glass-panel animate-fade-in" style={{ width: '340px', height: '440px', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0, border: '1px solid var(--border-color)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          {/* Header */}
          <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', justifyBetween: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ background: '#0ea5e9', padding: '0.4rem', borderRadius: '50%', color: '#fff', display: 'flex' }}>
                <Bot size={18} />
              </div>
              <div>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>Wanderlust Assistant</span>
                <span style={{ fontSize: '0.7rem', color: '#10b981' }}>● Online 24/7</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginLeft: 'auto' }}>
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'var(--bg-primary)' }}>
            {messages.map((m, idx) => (
              <div key={idx} style={{ alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                <div style={{
                  background: m.sender === 'user' ? 'var(--accent-gradient)' : 'var(--bg-secondary)',
                  color: m.sender === 'user' ? '#fff' : 'var(--text-primary)',
                  border: m.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                  padding: '0.6rem 0.85rem',
                  borderRadius: m.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  fontSize: '0.825rem',
                  lineHeight: 1.4
                }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.4rem' }}>
            <input
              type="text"
              placeholder="Ask travel question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="form-input"
              style={{ flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '0.5rem 0.75rem' }}>
              <Send size={16} />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};
