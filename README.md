# 🚀 Travel Booking Website (Full-Stack MERN Platform)

A real-world full-stack Travel Booking Application where users can search destinations, book flights, hotels, and holiday packages. It combines JWT authentication, advanced search & filtering, booking management, Stripe/Razorpay payment gateway integration, AI trip planner, interactive Leaflet maps, weather forecasts, loyalty rewards, and administrator command dashboard into a production-ready application.

---

## 📂 Project Folder Structure

```text
travel-booking/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── FlightSearch.jsx
│   │   │   ├── HotelSearch.jsx
│   │   │   ├── PackageCard.jsx
│   │   │   ├── BookingModal.jsx
│   │   │   ├── PaymentModal.jsx
│   │   │   ├── MapView.jsx
│   │   │   ├── WeatherWidget.jsx
│   │   │   ├── CurrencyConverter.jsx
│   │   │   ├── AiPlannerModal.jsx
│   │   │   ├── LiveChatWidget.jsx
│   │   │   ├── ReviewSection.jsx
│   │   │   └── LoyaltyCard.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── FlightsPage.jsx
│   │   │   ├── HotelsPage.jsx
│   │   │   ├── PackagesPage.jsx
│   │   │   ├── PackageDetailPage.jsx
│   │   │   ├── MyBookingsPage.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── index.html
│
├── server/
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── flightRoutes.js
│   │   ├── hotelRoutes.js
│   │   ├── packageRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── aiPlannerRoutes.js
│   │   └── adminRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── flightController.js
│   │   ├── hotelController.js
│   │   ├── packageController.js
│   │   ├── bookingController.js
│   │   ├── paymentController.js
│   │   ├── reviewController.js
│   │   └── adminController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Flight.js
│   │   ├── Hotel.js
│   │   ├── Package.js
│   │   ├── Booking.js
│   │   └── Review.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── uploads/
│   │   └── .gitkeep
│   ├── store.js
│   └── server.js
│
└── README.md
```

---

## 🎨 Application Flow

```text
Home Page ──> Search Destination ──> Select Flight / Hotel / Package 
    │
    ▼
Choose Travel Dates & Passengers ──> Make Online Payment (Stripe/Razorpay Modal)
    │
    ▼
Anti-Double Booking Check ──> Confetti Celebration & Ticket Voucher Issued 
    │
    ▼
Earn Loyalty Reward Points ──> View Booking History & Manage Cancellations
```

---

## 📌 Core Features & Bonus Enhancements

1. **👤 User Authentication & Roles**
   - Register, Login, Logout, Profile updates.
   - User & Admin role-based access control with JWT Tokens.
   - **Demo Traveler**: `user@wanderlust.com` / `user123`
   - **Demo Admin**: `admin@wanderlust.com` / `admin123`

2. **✈️ Flight Search & Booking System**
   - Filter by Departure City, Destination, Max Budget, and Date.
   - Airline carrier details, seat availability tracking, flight duration & ratings.

3. **🏨 Hotel & Resort Finder**
   - Search by destination city, night budget, amenities, and user ratings.
   - Integrated Leaflet Map location visualizer.

4. **🌍 Holiday Package Expeditions**
   - Curated tours with included flight airfares, 5-star hotel stays, meals & excursions.
   - Detailed trip itinerary breakdowns & reviews.

5. **💳 Online Payment Integration (Stripe / Razorpay Simulator)**
   - Credit/Debit Card validation, UPI ID option, Net Banking selection.
   - Transaction ID generation and interactive celebratory confetti animation.

6. **🚫 Anti-Double Booking Security**
   - Backend prevents duplicate active bookings for the same item on identical dates.

7. **🛡️ Admin Command Dashboard**
   - Real-time revenue analytics, total bookings, active users, and popular destination reports.
   - Add new holiday packages, airline routes, and hotel resorts with instant sync.

8. **🌟 Bonus Features Included**
   - 🌙 **Dark & Light Mode Toggle**
   - 🤖 **AI Trip Planner**: Tailored day-by-day customized itinerary generator based on budget & vibe.
   - 🌦 **Live Destination Weather Widget**
   - 💱 **Live Currency Converter** (₹ INR, $ USD, € EUR, £ GBP)
   - 🗺 **Interactive Leaflet Maps Integration**
   - 💬 **24/7 Floating AI Live Chat Assistant**
   - 🎁 **Loyalty Rewards Program**: Earn 5% points back on every booking + discount vouchers!

---

## 📡 Key API Routes

### Authentication
- `POST /api/auth/register` - Create user account (+150 bonus loyalty points)
- `POST /api/auth/login` - Authenticate & receive JWT
- `GET /api/auth/me` - Fetch profile details

### Flights, Hotels & Packages
- `GET /api/flights?departureCity=Mumbai&arrivalCity=Goa` - Search flights
- `GET /api/hotels?city=Goa` - Search hotels
- `GET /api/packages` - Fetch holiday packages

### Bookings & Payments
- `POST /api/bookings` - Create confirmed booking with anti-double-booking validation
- `GET /api/bookings/my` - Fetch user's booking history
- `PUT /api/bookings/:id/cancel` - Cancel booking and process 100% refund
- `POST /api/payments/process` - Demo Stripe/Razorpay payment gateway

### AI Planner & Admin
- `POST /api/ai-planner/generate` - Generate custom day-by-day itineraries
- `GET /api/admin/stats` - Fetch admin metrics and revenue analytics

---

## 💻 How to Run Locally

### 1. Backend Server Setup
```bash
cd server
npm start
```
The server will start on `http://localhost:5000`. 
*(Note: If local MongoDB Compass is running, it connects automatically; otherwise, it seamlessly runs with the built-in mock fallback store).*

### 2. Frontend Client Setup
```bash
cd client
npm run dev
```
The React frontend application will launch on `http://localhost:5173`.
