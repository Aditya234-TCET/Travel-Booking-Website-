import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { PaymentModal } from './components/PaymentModal';
import { AiPlannerModal } from './components/AiPlannerModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { TrainSearch } from './components/TrainSearch';
import { CabSearch } from './components/CabSearch';
import { BackgroundSlideshow } from './components/BackgroundSlideshow';

import { HomePage } from './pages/HomePage';
import { FlightsPage } from './pages/FlightsPage';
import { HotelsPage } from './pages/HotelsPage';
import { PackagesPage } from './pages/PackagesPage';
import { PackageDetailPage } from './pages/PackageDetailPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

export function App() {
  const [activePage, setActivePage] = useState('home');
  const [theme, setTheme] = useState(localStorage.getItem('wanderlust_theme') || 'dark');
  const [currency, setCurrency] = useState('INR');
  const [user, setUser] = useState(null);

  // Modal & Selection States
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [bookingItem, setBookingItem] = useState(null);
  const [bookingItemType, setBookingItemType] = useState('package');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [pendingBookingData, setPendingBookingData] = useState(null);

  const [isAiPlannerOpen, setIsAiPlannerOpen] = useState(false);

  // Initialize Theme and Saved User Token
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('wanderlust_theme', theme);
  }, [theme]);

  useEffect(() => {
    const savedUser = localStorage.getItem('wanderlust_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'GBP': return '£';
      default: return '₹';
    }
  };

  const formatPrice = (amount) => {
    const num = Number(amount) || 0;
    let rate = 1;
    let symbol = '₹';
    switch (currency) {
      case 'USD': rate = 0.012; symbol = '$'; break;
      case 'EUR': rate = 0.011; symbol = '€'; break;
      case 'GBP': rate = 0.0094; symbol = '£'; break;
    }
    return `${symbol}${Math.round(num * rate).toLocaleString()}`;
  };

  // Booking Flow Triggers
  const startBooking = (item, type = 'package') => {
    if (!user) {
      alert('Please sign in or register to book trips and earn loyalty rewards!');
      setActivePage('login');
      return;
    }
    setBookingItem(item);
    setBookingItemType(type);
    setIsBookingModalOpen(true);
  };

  const handleProceedToPayment = (bookingPayload) => {
    setIsBookingModalOpen(false);
    setPendingBookingData(bookingPayload);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (confirmedBooking) => {
    // Refresh user points
    if (user) {
      const updatedUser = {
        ...user,
        loyaltyPoints: (user.loyaltyPoints || 150) + Math.round(confirmedBooking.totalPrice * 0.05)
      };
      setUser(updatedUser);
      localStorage.setItem('wanderlust_user', JSON.stringify(updatedUser));
    }
  };

  const handleSelectPackageDetail = (pkg) => {
    setSelectedPackage(pkg);
    setActivePage('package-detail');
  };

  return (
    <div className="app-container">
      <BackgroundSlideshow theme={theme} />
      
      {/* Navigation Header */}
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        user={user} 
        setUser={setUser}
        theme={theme} 
        toggleTheme={toggleTheme} 
        currency={currency} 
        setCurrency={setCurrency}
        openAiPlanner={() => setIsAiPlannerOpen(true)}
      />

      {/* Main Dynamic View Content */}
      <main className="main-content" style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '1.5rem 1.5rem 4rem 1.5rem' }}>
        
        {activePage === 'home' && (
          <HomePage 
            setActivePage={setActivePage} 
            onSelectPackage={handleSelectPackageDetail} 
            onBookPackage={(pkg) => startBooking(pkg, 'package')} 
            user={user} 
            currencySymbol={getCurrencySymbol()} formatPrice={formatPrice}
            openAiPlanner={() => setIsAiPlannerOpen(true)}
          />
        )}

        {activePage === 'flights' && (
          <FlightsPage 
            onBookFlight={(flight, date, travelers) => startBooking({ ...flight, pricePerNight: flight.price }, 'flight')}
            currencySymbol={getCurrencySymbol()} formatPrice={formatPrice}
          />
        )}

        {activePage === 'hotels' && (
          <HotelsPage 
            onBookHotel={(hotel) => startBooking(hotel, 'hotel')}
            currencySymbol={getCurrencySymbol()} formatPrice={formatPrice}
          />
        )}

        {activePage === 'trains' && (
          <TrainSearch 
            onBookTrain={(train) => startBooking(train, 'train')}
            currencySymbol={getCurrencySymbol()} formatPrice={formatPrice}
          />
        )}

        {activePage === 'cabs' && (
          <CabSearch 
            onBookCab={(cab) => startBooking(cab, 'cab')}
            currencySymbol={getCurrencySymbol()} formatPrice={formatPrice}
          />
        )}

        {activePage === 'packages' && (
          <PackagesPage 
            onBookPackage={(pkg) => startBooking(pkg, 'package')}
            onSelectPackage={handleSelectPackageDetail}
            currencySymbol={getCurrencySymbol()} formatPrice={formatPrice}
          />
        )}

        {activePage === 'package-detail' && (
          <PackageDetailPage 
            pkg={selectedPackage} 
            onBack={() => setActivePage('packages')} 
            onBook={(pkg) => startBooking(pkg, 'package')}
            user={user}
            currencySymbol={getCurrencySymbol()} formatPrice={formatPrice}
          />
        )}

        {activePage === 'my-bookings' && (
          <MyBookingsPage currencySymbol={getCurrencySymbol()} formatPrice={formatPrice} />
        )}

        {activePage === 'admin' && (
          <AdminDashboard currencySymbol={getCurrencySymbol()} formatPrice={formatPrice} />
        )}

        {activePage === 'login' && (
          <LoginPage onLoginSuccess={(loggedInUser) => setUser(loggedInUser)} setActivePage={setActivePage} />
        )}

        {activePage === 'register' && (
          <RegisterPage onLoginSuccess={(registeredUser) => setUser(registeredUser)} setActivePage={setActivePage} />
        )}

      </main>

      {/* Modals & Floating Components */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)}
        item={bookingItem}
        itemType={bookingItemType}
        onProceedToPayment={handleProceedToPayment}
        currencySymbol={getCurrencySymbol()} formatPrice={formatPrice}
      />

      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)}
        onViewBookings={() => {
          setIsPaymentModalOpen(false);
          setActivePage('my-bookings');
        }}
        bookingData={pendingBookingData}
        onPaymentSuccess={handlePaymentSuccess}
        currencySymbol={getCurrencySymbol()} formatPrice={formatPrice}
      />

      <AiPlannerModal 
        isOpen={isAiPlannerOpen} 
        onClose={() => setIsAiPlannerOpen(false)}
        currencySymbol={getCurrencySymbol()} formatPrice={formatPrice}
      />

      <LiveChatWidget />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
