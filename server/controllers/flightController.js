const mongoose = require('mongoose');
const Flight = require('../models/Flight');
const store = require('../store');

const getFlights = async (req, res) => {
  const { departureCity, arrivalCity, maxPrice } = req.query;

  if (mongoose.connection.readyState === 1) {
    let filter = {};
    if (departureCity) filter.departureCity = { $regex: departureCity, $options: 'i' };
    if (arrivalCity) filter.arrivalCity = { $regex: arrivalCity, $options: 'i' };
    if (maxPrice) filter.price = { $lte: Number(maxPrice) };

    const flights = await Flight.find(filter);
    return res.status(200).json(flights.map(f => ({ ...f.toObject(), id: f._id.toString() })));
  } else {
    let flights = [...store.flights];
    if (departureCity) flights = flights.filter(f => f.departureCity.toLowerCase().includes(departureCity.toLowerCase()));
    if (arrivalCity) flights = flights.filter(f => f.arrivalCity.toLowerCase().includes(arrivalCity.toLowerCase()));
    if (maxPrice) flights = flights.filter(f => f.price <= Number(maxPrice));
    return res.status(200).json(flights);
  }
};

const createFlight = async (req, res) => {
  const { airline, flightNumber, departureCity, arrivalCity, departureTime, arrivalTime, price, seatsAvailable, logo } = req.body;

  if (mongoose.connection.readyState === 1) {
    const flight = await Flight.create({
      airline, flightNumber, departureCity, arrivalCity,
      departureTime: departureTime || '10:00 AM',
      arrivalTime: arrivalTime || '12:30 PM',
      price: Number(price),
      seatsAvailable: Number(seatsAvailable) || 50,
      logo: logo || '✈️'
    });
    return res.status(201).json({ message: 'Flight added successfully', flight: { ...flight.toObject(), id: flight._id.toString() } });
  } else {
    const newFlight = {
      id: 'fl-' + Date.now(),
      airline, flightNumber, departureCity, arrivalCity,
      departureTime: departureTime || '10:00 AM', arrivalTime: arrivalTime || '12:30 PM',
      price: Number(price), seatsAvailable: Number(seatsAvailable) || 50, logo: logo || '✈️', duration: '2h 30m', rating: 4.8
    };
    store.flights.push(newFlight);
    return res.status(201).json({ message: 'Flight added successfully', flight: newFlight });
  }
};

const deleteFlight = async (req, res) => {
  const { id } = req.params;
  if (mongoose.connection.readyState === 1) {
    await Flight.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Flight deleted successfully' });
  } else {
    const index = store.flights.findIndex(f => f.id === id);
    if (index !== -1) store.flights.splice(index, 1);
    return res.status(200).json({ message: 'Flight deleted successfully' });
  }
};

module.exports = { getFlights, createFlight, deleteFlight };
