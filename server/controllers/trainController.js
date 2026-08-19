const mongoose = require('mongoose');
const Train = require('../models/Train');
const store = require('../store');

const getTrains = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    const trains = await Train.find({});
    return res.status(200).json(trains.map(t => ({ ...t.toObject(), id: t._id.toString() })));
  } else {
    return res.status(200).json(store.trains || []);
  }
};

module.exports = { getTrains };
