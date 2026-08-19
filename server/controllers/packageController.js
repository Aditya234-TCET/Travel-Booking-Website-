const mongoose = require('mongoose');
const Package = require('../models/Package');
const store = require('../store');

const getPackages = async (req, res) => {
  const { destination, maxPrice, search } = req.query;

  if (mongoose.connection.readyState === 1) {
    let filter = {};
    if (destination) filter.destination = { $regex: destination, $options: 'i' };
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { destination: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (maxPrice) filter.price = { $lte: Number(maxPrice) };

    const packages = await Package.find(filter);
    return res.status(200).json(packages.map(p => ({ ...p.toObject(), id: p._id.toString() })));
  } else {
    let packages = [...store.packages];
    if (destination) packages = packages.filter(p => p.destination.toLowerCase().includes(destination.toLowerCase()));
    if (search) {
      const q = search.toLowerCase();
      packages = packages.filter(p => p.title.toLowerCase().includes(q) || p.destination.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (maxPrice) packages = packages.filter(p => p.price <= Number(maxPrice));
    return res.status(200).json(packages);
  }
};

const getPackageById = async (req, res) => {
  const { id } = req.params;
  if (mongoose.connection.readyState === 1) {
    try {
      const pkg = await Package.findById(id);
      if (!pkg) return res.status(404).json({ message: 'Package not found' });
      return res.status(200).json({ ...pkg.toObject(), id: pkg._id.toString() });
    } catch (e) {
      const storePkg = store.packages.find(p => p.id === id);
      if (storePkg) return res.status(200).json(storePkg);
      return res.status(404).json({ message: 'Package not found' });
    }
  } else {
    const pkg = store.packages.find(p => p.id === id);
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    return res.status(200).json(pkg);
  }
};

const createPackage = async (req, res) => {
  const { title, destination, description, price, duration, image, includedItems, highlights, latitude, longitude } = req.body;

  if (mongoose.connection.readyState === 1) {
    const pkg = await Package.create({
      title, destination,
      description: description || 'All-inclusive holiday expedition.',
      price: Number(price),
      duration: duration || '5 Days / 4 Nights',
      image: image || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
      includedItems: includedItems || ['Flights', 'Hotel', 'Transfers'],
      highlights: highlights || ['Guided Sightseeing'],
      latitude: Number(latitude) || 15.2993,
      longitude: Number(longitude) || 74.1240
    });
    return res.status(201).json({ message: 'Package added successfully', package: { ...pkg.toObject(), id: pkg._id.toString() } });
  } else {
    const newPackage = {
      id: 'pkg-' + Date.now(),
      title, destination,
      description: description || 'All-inclusive holiday expedition.',
      price: Number(price), duration: duration || '5 Days / 4 Nights', rating: 4.9,
      image: image || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
      includedItems: includedItems || ['Flights', 'Hotel', 'Transfers'], highlights: highlights || ['Guided Sightseeing'],
      latitude: Number(latitude) || 15.2993, longitude: Number(longitude) || 74.1240
    };
    store.packages.push(newPackage);
    return res.status(201).json({ message: 'Package added successfully', package: newPackage });
  }
};

const updatePackage = async (req, res) => {
  const { id } = req.params;
  if (mongoose.connection.readyState === 1) {
    const pkg = await Package.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ message: 'Package updated successfully', package: { ...pkg.toObject(), id: pkg._id.toString() } });
  } else {
    const pkg = store.packages.find(p => p.id === id);
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    Object.assign(pkg, req.body);
    return res.status(200).json({ message: 'Package updated successfully', package: pkg });
  }
};

const deletePackage = async (req, res) => {
  const { id } = req.params;
  if (mongoose.connection.readyState === 1) {
    await Package.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Package deleted successfully' });
  } else {
    const index = store.packages.findIndex(p => p.id === id);
    if (index !== -1) store.packages.splice(index, 1);
    return res.status(200).json({ message: 'Package deleted successfully' });
  }
};

module.exports = { getPackages, getPackageById, createPackage, updatePackage, deletePackage };
