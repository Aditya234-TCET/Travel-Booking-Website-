const mongoose = require('mongoose');
const Hotel = require('../models/Hotel');
const store = require('../store');

const getHotels = async (req, res) => {
  const { city, destination, maxPrice } = req.query;
  const targetCity = city || destination;

  if (mongoose.connection.readyState === 1) {
    let filter = {};
    if (targetCity) {
      filter.$or = [
        { city: { $regex: targetCity, $options: 'i' } },
        { name: { $regex: targetCity, $options: 'i' } }
      ];
    }
    if (maxPrice) filter.pricePerNight = { $lte: Number(maxPrice) };

    const hotels = await Hotel.find(filter);
    return res.status(200).json(hotels.map(h => ({ ...h.toObject(), id: h._id.toString() })));
  } else {
    let hotels = [...store.hotels];
    if (targetCity) {
      hotels = hotels.filter(h => h.city.toLowerCase().includes(targetCity.toLowerCase()) || h.name.toLowerCase().includes(targetCity.toLowerCase()));
    }
    if (maxPrice) hotels = hotels.filter(h => h.pricePerNight <= Number(maxPrice));
    return res.status(200).json(hotels);
  }
};

const createHotel = async (req, res) => {
  const { name, city, address, pricePerNight, image, description, amenities, latitude, longitude } = req.body;

  if (mongoose.connection.readyState === 1) {
    const hotel = await Hotel.create({
      name, city, address: address || `${city} Central`,
      pricePerNight: Number(pricePerNight),
      image: image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      description: description || 'Luxurious resort stay.',
      amenities: amenities || ['Pool', 'WiFi', 'Spa'],
      latitude: Number(latitude) || 15.2993,
      longitude: Number(longitude) || 74.1240
    });
    return res.status(201).json({ message: 'Hotel added successfully', hotel: { ...hotel.toObject(), id: hotel._id.toString() } });
  } else {
    const newHotel = {
      id: 'ht-' + Date.now(),
      name, city, address: address || `${city} Central`,
      rating: 4.8, pricePerNight: Number(pricePerNight),
      image: image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      amenities: amenities || ['Pool', 'WiFi', 'Spa'],
      description: description || 'Luxurious resort stay.',
      latitude: Number(latitude) || 15.2993, longitude: Number(longitude) || 74.1240, reviewsCount: 15
    };
    store.hotels.push(newHotel);
    return res.status(201).json({ message: 'Hotel added successfully', hotel: newHotel });
  }
};

const deleteHotel = async (req, res) => {
  const { id } = req.params;
  if (mongoose.connection.readyState === 1) {
    await Hotel.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Hotel deleted successfully' });
  } else {
    const index = store.hotels.findIndex(h => h.id === id);
    if (index !== -1) store.hotels.splice(index, 1);
    return res.status(200).json({ message: 'Hotel deleted successfully' });
  }
};

module.exports = { getHotels, createHotel, deleteHotel };
