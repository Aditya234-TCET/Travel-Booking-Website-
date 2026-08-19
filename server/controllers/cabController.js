const mongoose = require('mongoose');
const Cab = require('../models/Cab');
const store = require('../store');

const getCabs = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    const cabs = await Cab.find({});
    return res.status(200).json(cabs.map(c => ({ ...c.toObject(), id: c._id.toString() })));
  } else {
    return res.status(200).json(store.cabs || []);
  }
};

module.exports = { getCabs };
