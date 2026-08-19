const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./models/User');
const Flight = require('./models/Flight');
const Hotel = require('./models/Hotel');
const Package = require('./models/Package');
const Booking = require('./models/Booking');
const Review = require('./models/Review');

const initialUsers = [
  {
    name: 'Admin Manager',
    email: 'admin@wanderlust.com',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
    phone: '+1 800-555-0199',
    loyaltyPoints: 1200,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Sophia Vance',
    email: 'user@wanderlust.com',
    password: bcrypt.hashSync('user123', 10),
    role: 'user',
    phone: '+1 555-0147',
    loyaltyPoints: 350,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  }
];

const initialFlights = [
  {
    airline: 'SkyWays Express',
    flightNumber: 'SK-402',
    departureCity: 'Mumbai',
    arrivalCity: 'Goa',
    departureTime: '08:30 AM',
    arrivalTime: '09:45 AM',
    price: 3500,
    seatsAvailable: 42,
    duration: '1h 15m',
    rating: 4.8,
    logo: '✈️'
  },
  {
    airline: 'Air France',
    flightNumber: 'AF-882',
    departureCity: 'Delhi',
    arrivalCity: 'Paris',
    departureTime: '01:15 PM',
    arrivalTime: '06:50 PM',
    price: 48000,
    seatsAvailable: 15,
    duration: '9h 05m',
    rating: 4.9,
    logo: '🇫🇷'
  },
  {
    airline: 'Japan Airlines',
    flightNumber: 'JL-771',
    departureCity: 'Bangalore',
    arrivalCity: 'Tokyo',
    departureTime: '10:00 PM',
    arrivalTime: '07:30 AM',
    price: 52000,
    seatsAvailable: 28,
    duration: '7h 00m',
    rating: 4.9,
    logo: '🇯🇵'
  },
  {
    airline: 'Emirates Air',
    flightNumber: 'EK-508',
    departureCity: 'Mumbai',
    arrivalCity: 'Dubai',
    departureTime: '04:15 PM',
    arrivalTime: '06:30 PM',
    price: 24000,
    seatsAvailable: 34,
    duration: '3h 45m',
    rating: 4.9,
    logo: '🇦🇪'
  },
  {
    airline: 'Swiss Air',
    flightNumber: 'LX-302',
    departureCity: 'Delhi',
    arrivalCity: 'Zurich',
    departureTime: '02:00 AM',
    arrivalTime: '07:15 AM',
    price: 56000,
    seatsAvailable: 18,
    duration: '8h 45m',
    rating: 4.7,
    logo: '🇨🇭'
  },
  {
    airline: 'Singapore Airlines',
    flightNumber: 'SQ-423',
    departureCity: 'Chennai',
    arrivalCity: 'Bali',
    departureTime: '11:20 AM',
    arrivalTime: '05:40 PM',
    price: 29000,
    seatsAvailable: 50,
    duration: '5h 50m',
    rating: 4.8,
    logo: '🇮🇩'
  },
  {
    airline: 'British Airways',
    flightNumber: 'BA-117',
    departureCity: 'Delhi',
    arrivalCity: 'London',
    departureTime: '06:00 AM',
    arrivalTime: '11:30 AM',
    price: 54000,
    seatsAvailable: 22,
    duration: '10h 00m',
    rating: 4.8,
    logo: '🇬🇧'
  },
  {
    airline: 'Qantas Airways',
    flightNumber: 'QF-082',
    departureCity: 'Singapore',
    arrivalCity: 'Sydney',
    departureTime: '08:15 PM',
    arrivalTime: '06:00 AM',
    price: 62000,
    seatsAvailable: 19,
    duration: '7h 45m',
    rating: 4.9,
    logo: '🇦🇺'
  },
  {
    airline: 'Delta Air Lines',
    flightNumber: 'DL-405',
    departureCity: 'London',
    arrivalCity: 'New York',
    departureTime: '12:45 PM',
    arrivalTime: '04:15 PM',
    price: 58000,
    seatsAvailable: 31,
    duration: '8h 30m',
    rating: 4.7,
    logo: '🇺🇸'
  },
  {
    airline: 'Qatar Airways',
    flightNumber: 'QR-571',
    departureCity: 'Mumbai',
    arrivalCity: 'Rome',
    departureTime: '03:30 AM',
    arrivalTime: '09:00 AM',
    price: 49000,
    seatsAvailable: 25,
    duration: '8h 00m',
    rating: 4.9,
    logo: '🇮🇹'
  },
  {
    airline: 'Thai Airways',
    flightNumber: 'TG-316',
    departureCity: 'Kolkata',
    arrivalCity: 'Bangkok',
    departureTime: '01:50 AM',
    arrivalTime: '05:45 AM',
    price: 18500,
    seatsAvailable: 45,
    duration: '2h 25m',
    rating: 4.7,
    logo: '🇹🇭'
  },
  {
    airline: 'EgyptAir',
    flightNumber: 'MS-962',
    departureCity: 'Dubai',
    arrivalCity: 'Cairo',
    departureTime: '09:30 AM',
    arrivalTime: '11:45 AM',
    price: 22000,
    seatsAvailable: 30,
    duration: '3h 15m',
    rating: 4.6,
    logo: '🇪🇬'
  },
  {
    airline: 'Lufthansa',
    flightNumber: 'LH-760',
    departureCity: 'Frankfurt',
    arrivalCity: 'Barcelona',
    departureTime: '10:00 AM',
    arrivalTime: '12:05 PM',
    price: 24000,
    seatsAvailable: 38,
    duration: '2h 05m',
    rating: 4.8,
    logo: '🇪🇸'
  }
];

const initialHotels = [
  {
    name: 'Grand Hyatt Beach Resort',
    city: 'Goa',
    address: 'Bambolim Beach, North Goa',
    rating: 4.8,
    pricePerNight: 8500,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    amenities: ['Pool', 'Free WiFi', 'Beach Front', 'Spa & Wellness', 'Bar'],
    description: 'Luxurious resort set amidst 28 acres of lush tropical gardens overlooking Bambolim Bay.',
    latitude: 15.4589,
    longitude: 73.8560,
    reviewsCount: 340
  },
  {
    name: 'The Ritz Paris Riviera',
    city: 'Paris',
    address: '15 Place Vendôme, 75001 Paris, France',
    rating: 4.9,
    pricePerNight: 34000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    amenities: ['Michelin Dining', 'Luxury Spa', 'Concierge', 'Private Balcony', 'Airport Shuttle'],
    description: 'Iconic palace hotel in the heart of Paris offering unmatched French elegance.',
    latitude: 48.8675,
    longitude: 2.3294,
    reviewsCount: 520
  },
  {
    name: 'Tokyo Skyline Palace',
    city: 'Tokyo',
    address: 'Shinjuku City, Tokyo, Japan',
    rating: 4.9,
    pricePerNight: 28000,
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    amenities: ['Skyline Bar', 'Onsen Spa', 'High-Speed WiFi', 'Fitness Center', 'Robot Butler'],
    description: 'Modern skyscraper hotel with breathtaking panoramic views of Mount Fuji and Tokyo skyline.',
    latitude: 35.6895,
    longitude: 139.6917,
    reviewsCount: 410
  },
  {
    name: 'Burj Al Arab Luxury Resort',
    city: 'Dubai',
    address: 'Jumeirah Beach Road, Dubai, UAE',
    rating: 5.0,
    pricePerNight: 65000,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    amenities: ['Private Helicopter Pad', 'Infiniti Pool', 'Underwater Restaurant', 'Personal Butler'],
    description: 'World-renowned 7-star sail-shaped luxury monument on its own island.',
    latitude: 25.1412,
    longitude: 55.1853,
    reviewsCount: 890
  },
  {
    name: 'Swiss Alpine Lodge',
    city: 'Zurich',
    address: 'Zermatt Alpine Pass, Switzerland',
    rating: 4.7,
    pricePerNight: 22000,
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80',
    amenities: ['Ski-in/Ski-out', 'Fireplace Suites', 'Hot Tub Spa', 'Fondue Lounge'],
    description: 'Charming wooden chalet surrounded by snow-capped peaks and pristine mountain air.',
    latitude: 46.0207,
    longitude: 7.7491,
    reviewsCount: 190
  },
  {
    name: 'Ubud Rainforest Haven',
    city: 'Bali',
    address: 'Jalan Raya Sanggingan, Ubud, Bali',
    rating: 4.8,
    pricePerNight: 14000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    amenities: ['Infinity Jungle Pool', 'Yoga Shala', 'Organic Vegan Cafe', 'River Tour'],
    description: 'Serene retreat nestled deep inside Ubud lush green palm forest valley.',
    latitude: -8.5069,
    longitude: 115.2625,
    reviewsCount: 310
  },
  {
    name: 'The Ritz London Mayfair',
    city: 'London',
    address: '150 Piccadilly, St. James, London, UK',
    rating: 4.9,
    pricePerNight: 38000,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    amenities: ['High Tea Lounge', 'Chauffeur Service', 'Michelin Restaurant', 'Royal Suite'],
    description: 'World-famous luxury hotel overlooking Green Park near Buckingham Palace.',
    latitude: 51.5074,
    longitude: -0.1278,
    reviewsCount: 680
  },
  {
    name: 'Sydney Harbour Suite Resort',
    city: 'Sydney',
    address: 'Circular Quay West, Sydney, Australia',
    rating: 4.9,
    pricePerNight: 31000,
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
    amenities: ['Opera House View', 'Rooftop Bar', 'Private Yacht Dock', 'Heated Pool'],
    description: 'Stunning waterfront hotel with direct views of Sydney Harbour Bridge & Opera House.',
    latitude: -33.8688,
    longitude: 151.2093,
    reviewsCount: 430
  },
  {
    name: 'The Plaza Fifth Avenue',
    city: 'New York',
    address: '768 5th Ave, New York, NY 10019, USA',
    rating: 4.8,
    pricePerNight: 42000,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
    amenities: ['Central Park View', 'Champagne Bar', 'Guerlain Spa', 'Limousine Service'],
    description: 'Timeless Manhattan landmark hotel situated at Central Park South.',
    latitude: 40.7128,
    longitude: -74.0060,
    reviewsCount: 750
  },
  {
    name: 'Hotel Colosseum Grand Palace',
    city: 'Rome',
    address: 'Via Cavour 18, 00184 Rome, Italy',
    rating: 4.8,
    pricePerNight: 26000,
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
    amenities: ['Rooftop Terrace', 'Italian Wine Cellar', 'Colosseum Views', 'Airport Transfer'],
    description: 'Historic Roman boutique hotel steps away from the Ancient Forum and Colosseum.',
    latitude: 41.9028,
    longitude: 12.4964,
    reviewsCount: 390
  },
  {
    name: 'Nile Palace Resort & Spa',
    city: 'Cairo',
    address: 'Corniche El Nile, Garden City, Cairo, Egypt',
    rating: 4.7,
    pricePerNight: 18000,
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80',
    amenities: ['Nile River Cruise Boat', 'Egyptian Buffet', 'Infinity Pool', 'Pyramid Excursion'],
    description: 'Palatial riverfront oasis offering sunset Nile views and proximity to Giza Pyramids.',
    latitude: 30.0444,
    longitude: 31.2357,
    reviewsCount: 290
  },
  {
    name: 'Bangkok Riverside Sanctuary',
    city: 'Bangkok',
    address: 'Charoen Nakhon Rd, Bangkok, Thailand',
    rating: 4.8,
    pricePerNight: 12000,
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80',
    amenities: ['River Shuttle Boat', 'Thai Spa & Massage', 'Night Market Tour', 'Rooftop Bar'],
    description: 'Lush tropical resort along the Chao Phraya River with floating market access.',
    latitude: 13.7563,
    longitude: 100.5018,
    reviewsCount: 460
  },
  {
    name: 'W Barcelona Beach Resort',
    city: 'Barcelona',
    address: 'Plaça Rosa Del Vents 1, 08039 Barcelona, Spain',
    rating: 4.9,
    pricePerNight: 32000,
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80',
    amenities: ['Sail-shaped Design', 'Barceloneta Beach Front', 'WET Deck Pool', 'Tapas Bar'],
    description: 'Iconic sail-shaped beachfront hotel with panoramic views of the Mediterranean.',
    latitude: 41.3851,
    longitude: 2.1734,
    reviewsCount: 580
  }
];

const initialPackages = [
  {
    title: 'Goa Tropical Beach & Carnival Expedition',
    destination: 'Goa',
    description: 'Experience sunny beaches, heritage Portuguese architecture, vibrant nightlife, and luxury beach resorts.',
    price: 18500,
    duration: '4 Days / 3 Nights',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    includedItems: ['Flight Tickets', '4-Star Resort Stay', 'Scuba & Water Sports', 'Daily Buffet Breakfast', 'Airport Transfers'],
    highlights: ['Baga & Calangute Beach Sunset', 'Catamaran Cruise', 'Dudhsagar Waterfalls Tour'],
    latitude: 15.2993,
    longitude: 74.1240
  },
  {
    title: 'Parisian Lights & Romance Special',
    destination: 'Paris',
    description: 'Immerse yourself in Parisian art, romantic Seine River cruises, Eiffel Tower dinner, and Louvre museum tours.',
    price: 95000,
    duration: '6 Days / 5 Nights',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    includedItems: ['Roundtrip Flights', '5-Star Hotel Stay', 'Eiffel Tower Priority Pass', 'Seine Dinner Cruise', 'Visa Assistance'],
    highlights: ['Louvre Priority Ticket', 'Versailles Palace Tour', 'Montmartre Wine Tasting'],
    latitude: 48.8566,
    longitude: 2.3522
  },
  {
    title: 'Japan Cherry Blossom & High-Speed Rail Explorer',
    destination: 'Tokyo',
    description: 'Discover futuristic Tokyo, historic Kyoto temples, Mount Fuji views, and authentic tea ceremony culture.',
    price: 125000,
    duration: '7 Days / 6 Nights',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    includedItems: ['International Flights', 'JR Bullet Train Pass', 'Luxury Hotel Stay', 'Guided Temple Tours', 'Onsen Hot Spring Access'],
    highlights: ['Shibuya Crossing Tour', 'Mt Fuji 5th Station Sightseeing', 'Kyoto Bamboo Forest Walk'],
    latitude: 35.6762,
    longitude: 139.6503
  },
  {
    title: 'Swiss Alps Glacier & Panorama Express',
    destination: 'Zurich',
    description: 'Breathe in pure mountain air, ride high-altitude scenic railways, explore pristine lakes, and sample Swiss chocolates.',
    price: 110000,
    duration: '5 Days / 4 Nights',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    includedItems: ['Flights Included', 'Alpine Chalet Stay', 'Glacier 3000 Pass', 'Swiss Pass Cable Cars', 'Daily Breakfast'],
    highlights: ['Jungfraujoch Top of Europe', 'Lake Lucerne Cruise', 'Zermatt Matterhorn View'],
    latitude: 47.3769,
    longitude: 8.5417
  },
  {
    title: 'Bali Island Hopping & Jungle Sanctuary',
    destination: 'Bali',
    description: 'Unwind with tropical palm beaches, cliffside temple sunsets, rice terrace swings, and private pool villa luxury.',
    price: 45000,
    duration: '5 Days / 4 Nights',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    includedItems: ['Flight Booking', 'Private Pool Villa Stay', 'Nusa Penida Boat Tour', 'Daily Spa Treatment', 'Private Driver'],
    highlights: ['Tegallalang Rice Terraces', 'Uluwatu Sunset Kecak Dance', 'Snorkeling with Manta Rays'],
    latitude: -8.4095,
    longitude: 115.1889
  },
  {
    title: 'Dubai Desert Dune Safari & Skyscraper Extravaganza',
    destination: 'Dubai',
    description: 'Experience futuristic luxury, 4x4 desert dune bashing, Burj Khalifa top deck views, and mega shopping malls.',
    price: 68000,
    duration: '5 Days / 4 Nights',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    includedItems: ['Roundtrip Airfare', '5-Star Hotel Stay', 'Burj Khalifa 124th Floor Ticket', 'Desert Safari with BBQ', 'Yacht Cruise'],
    highlights: ['Desert Camping & Fire Show', 'Museum of the Future Pass', 'Dubai Mall Fountain Show'],
    latitude: 25.2048,
    longitude: 55.2708
  },
  {
    title: 'British Royal Heritage & Highlands Odyssey',
    destination: 'London',
    description: 'Explore London historic palaces, Big Ben, Stonehenge monoliths, and Scottish Highland lochs.',
    price: 105000,
    duration: '6 Days / 5 Nights',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    includedItems: ['International Flights', '4-Star Mayfair Stay', 'London Eye Priority Ticket', 'Stonehenge Day Tour', 'Daily English Breakfast'],
    highlights: ['Buckingham Palace Change of Guard', 'Windsor Castle', 'Thames Cruise'],
    latitude: 51.5074,
    longitude: -0.1278
  },
  {
    title: 'Sydney Harbour & Great Barrier Reef Discovery',
    destination: 'Sydney',
    description: 'Witness the iconic Sydney Opera House, surf at Bondi Beach, and snorkel in the world-famous Great Barrier Reef.',
    price: 135000,
    duration: '7 Days / 6 Nights',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
    includedItems: ['Roundtrip Airfare', 'Harbour View Hotel', 'Reef Helicopter Flight', 'Snorkeling & Scuba Gear', 'Domestic Flight to Cairns'],
    highlights: ['Sydney Opera House Backstage Tour', 'Blue Mountains Cable Car', 'Great Barrier Reef Catamaran'],
    latitude: -33.8688,
    longitude: 151.2093
  },
  {
    title: 'New York Skyline & Broadway VIP Pass',
    destination: 'New York',
    description: 'Feel the energy of Times Square, take a ferry to Statue of Liberty, view NYC from SUMMIT One Vanderbilt, and catch a Broadway show.',
    price: 115000,
    duration: '5 Days / 4 Nights',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
    includedItems: ['Direct Flights', 'Plaza Fifth Avenue Stay', 'Broadway Show Front Row Pass', 'Statue of Liberty Ferry', 'Subway Pass'],
    highlights: ['Empire State Building Sunset', 'Central Park Horse Carriage', 'Metropolitan Museum Guided Tour'],
    latitude: 40.7128,
    longitude: -74.0060
  },
  {
    title: 'Italian Romance & Amalfi Coast Sunset Cruise',
    destination: 'Rome',
    description: 'Walk through ancient Colosseum history, toss a coin at Trevi Fountain, and sail along dramatic Amalfi Coast cliffs.',
    price: 98000,
    duration: '6 Days / 5 Nights',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
    includedItems: ['Flights Included', 'Rooftop Rome Hotel Stay', 'Vatican Priority Pass', 'Amalfi Catamaran Tour', 'Wine Tasting Excursion'],
    highlights: ['Colosseum Underground Tour', 'Positano Cliffside Lunch', 'Tuscan Vineyard Masterclass'],
    latitude: 41.9028,
    longitude: 12.4964
  },
  {
    title: 'Pyramids of Giza & Ancient Nile Wonders',
    destination: 'Cairo',
    description: 'Stand before the Great Pyramids, marvel at Sphinx monuments, and sail on a luxury Nile River cruise felucca.',
    price: 52000,
    duration: '5 Days / 4 Nights',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80',
    includedItems: ['Flights Included', 'Nile Palace Resort Stay', 'Pyramids Camel Safari', 'Grand Egyptian Museum Pass', 'Nile Dinner Cruise'],
    highlights: ['Great Pyramid Interior Tour', 'Valley of the Kings Excursion', 'Old Cairo Bazaar Shopping'],
    latitude: 30.0444,
    longitude: 31.2357
  },
  {
    title: 'Thailand Tropical Paradise & Island Hopping',
    destination: 'Bangkok',
    description: 'Explore Bangkok golden temples, night food markets, and island hop through Phi Phi & Phuket crystal waters.',
    price: 38000,
    duration: '5 Days / 4 Nights',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80',
    includedItems: ['Airfare Tickets', 'Riverside Resort Stay', 'Speedboat Island Tour', 'Elephant Sanctuary Visit', 'Daily Breakfast'],
    highlights: ['Grand Palace Guided Tour', 'James Bond Island Cruise', 'Thai Massage & Spa Session'],
    latitude: 13.7563,
    longitude: 100.5018
  }
];

async function seedDB() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/travel_booking';
  console.log(`Connecting to MongoDB at ${uri}...`);
  await mongoose.connect(uri);
  console.log('✅ Connected to MongoDB!');

  await User.deleteMany({});
  await Flight.deleteMany({});
  await Hotel.deleteMany({});
  await Package.deleteMany({});
  await Booking.deleteMany({});
  await Review.deleteMany({});

  console.log('Seeding updated international destinations into MongoDB...');

  const createdUsers = await User.insertMany(initialUsers);
  const createdFlights = await Flight.insertMany(initialFlights);
  const createdHotels = await Hotel.insertMany(initialHotels);
  const createdPackages = await Package.insertMany(initialPackages);

  await Booking.create({
    userId: createdUsers[1]._id.toString(),
    userName: createdUsers[1].name,
    itemType: 'package',
    itemId: createdPackages[0]._id.toString(),
    itemTitle: createdPackages[0].title,
    destination: createdPackages[0].destination,
    itemDetails: { price: createdPackages[0].price, duration: createdPackages[0].duration },
    travelDate: '2026-08-15',
    returnDate: '2026-08-19',
    travelers: 2,
    totalPrice: createdPackages[0].price * 2,
    paymentMethod: 'Stripe Credit Card',
    paymentStatus: 'paid',
    bookingStatus: 'confirmed',
    transactionId: 'TXN-99882211'
  });

  await Review.create({
    userId: createdUsers[1]._id.toString(),
    userName: createdUsers[1].name,
    targetType: 'package',
    targetId: createdPackages[0]._id.toString(),
    rating: 5,
    comment: 'Absolutely magical experience! Everything from hotel transfers to guided tours was super smooth.'
  });

  console.log('🎉 MongoDB International Seed Completed Successfully!');
  process.exit(0);
}

seedDB().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
