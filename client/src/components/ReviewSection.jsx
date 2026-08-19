import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Send, User } from 'lucide-react';
import { api } from '../services/api';

export const ReviewSection = ({ targetType = 'package', targetId = 'pkg-301', user }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = async () => {
    try {
      const data = await api.getReviews({ targetType, targetId });
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [targetType, targetId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to submit a travel review');
      return;
    }
    if (!comment.trim()) return;

    setSubmitting(true);
    try {
      await api.createReview({
        targetType,
        targetId,
        rating: Number(rating),
        comment: comment.trim()
      });
      setComment('');
      fetchReviews();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', marginTop: '2rem' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <MessageSquare size={20} color="#0ea5e9" /> Traveler Reviews & Experience ({reviews.length})
      </h3>

      {/* Review Submission Form */}
      {user && (
        <form onSubmit={handleSubmit} style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Your Rating:</span>
            <div style={{ display: 'flex', gap: '0.2rem' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <Star size={20} fill={star <= rating ? '#f59e0b' : 'none'} color={star <= rating ? '#f59e0b' : 'var(--text-muted)'} />
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              placeholder="Share your travel experience, hotel comfort, or tour details..." 
              value={comment} 
              onChange={(e) => setComment(e.target.value)} 
              required 
              className="form-input" 
              style={{ flex: 1 }} 
            />
            <button type="submit" disabled={submitting} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
              <Send size={16} /> Post
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {reviews.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No reviews yet. Be the first traveler to review!</p>
        ) : (
          reviews.map((rev) => (
            <div key={rev.id} style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{rev.userName}</span>
                <div style={{ display: 'flex', gap: '0.1rem' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{rev.comment}</p>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.4rem' }}>
                {new Date(rev.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
