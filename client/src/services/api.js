const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('wanderlust_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const api = {
  // Auth
  register: async (userData) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return res.json();
  },

  login: async (credentials) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return res.json();
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getHeaders()
    });
    return res.json();
  },

  updateProfile: async (data) => {
    const res = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Flights
  getFlights: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/flights?${query}`);
    return res.json();
  },

  createFlight: async (data) => {
    const res = await fetch(`${API_BASE_URL}/flights`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteFlight: async (id) => {
    const res = await fetch(`${API_BASE_URL}/flights/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return res.json();
  },

  // Hotels
  getHotels: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/hotels?${query}`);
    return res.json();
  },

  createHotel: async (data) => {
    const res = await fetch(`${API_BASE_URL}/hotels`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteHotel: async (id) => {
    const res = await fetch(`${API_BASE_URL}/hotels/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return res.json();
  },

  // Packages
  getPackages: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/packages?${query}`);
    return res.json();
  },

  getPackageById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/packages/${id}`);
    return res.json();
  },

  createPackage: async (data) => {
    const res = await fetch(`${API_BASE_URL}/packages`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deletePackage: async (id) => {
    const res = await fetch(`${API_BASE_URL}/packages/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return res.json();
  },

  // Bookings
  createBooking: async (data) => {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  getMyBookings: async () => {
    const res = await fetch(`${API_BASE_URL}/bookings/my`, {
      headers: getHeaders()
    });
    return res.json();
  },

  getAllBookings: async () => {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      headers: getHeaders()
    });
    return res.json();
  },

  cancelBooking: async (id) => {
    const res = await fetch(`${API_BASE_URL}/bookings/${id}/cancel`, {
      method: 'PUT',
      headers: getHeaders()
    });
    return res.json();
  },

  // Payments
  processPayment: async (paymentData) => {
    const res = await fetch(`${API_BASE_URL}/payments/process`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(paymentData)
    });
    return res.json();
  },

  // Reviews
  getReviews: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/reviews?${query}`);
    return res.json();
  },

  createReview: async (reviewData) => {
    const res = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(reviewData)
    });
    return res.json();
  },

  // AI Planner
  generateAiItinerary: async (plannerData) => {
    const res = await fetch(`${API_BASE_URL}/ai-planner/generate`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(plannerData)
    });
    return res.json();
  },

  // Admin
  getAdminStats: async () => {
    const res = await fetch(`${API_BASE_URL}/admin/stats`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch admin stats');
    return res.json();
  },
  getTrains: async () => {
    const res = await fetch(`${API_BASE_URL}/trains`);
    if (!res.ok) throw new Error('Failed to fetch trains');
    return res.json();
  },
  getCabs: async () => {
    const res = await fetch(`${API_BASE_URL}/cabs`);
    if (!res.ok) throw new Error('Failed to fetch cabs');
    return res.json();
  }
};

export default api;
