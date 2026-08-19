const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');
const store = require('../store');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_travel_booking_jwt_key_2026';

const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    let existingUser = null;
    if (mongoose.connection.readyState === 1) {
      existingUser = await User.findOne({ email: email.toLowerCase() });
    } else {
      existingUser = store.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    }

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let newUserObj;

    if (mongoose.connection.readyState === 1) {
      const newUser = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'user',
        phone: phone || '',
        loyaltyPoints: 150
      });
      newUserObj = {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        loyaltyPoints: newUser.loyaltyPoints,
        avatar: newUser.avatar
      };
    } else {
      const newUser = {
        id: 'user-' + Date.now(),
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'user',
        phone: phone || '',
        loyaltyPoints: 150,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        createdAt: new Date().toISOString()
      };
      store.users.push(newUser);
      newUserObj = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        loyaltyPoints: newUser.loyaltyPoints,
        avatar: newUser.avatar
      };
    }

    const token = jwt.sign(
      { id: newUserObj.id, name: newUserObj.name, email: newUserObj.email, role: newUserObj.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      message: 'Registration successful! Welcome bonus of 150 Loyalty Points awarded.',
      token,
      user: newUserObj
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    let user = null;
    let userId = null;

    if (mongoose.connection.readyState === 1) {
      const dbUser = await User.findOne({ email: email.toLowerCase() });
      if (dbUser) {
        user = dbUser.toObject();
        userId = dbUser._id.toString();
      }
    } else {
      user = store.users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (user) userId = user.id;
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: userId, name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password: _, _id, ...userWithoutPassword } = user;
    return res.status(200).json({
      message: 'Login successful!',
      token,
      user: { id: userId, ...userWithoutPassword }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    let user = null;
    if (mongoose.connection.readyState === 1) {
      const dbUser = await User.findById(req.user.id);
      if (dbUser) {
        const obj = dbUser.toObject();
        const { password, _id, ...rest } = obj;
        user = { id: _id.toString(), ...rest };
      }
    } else {
      const storeUser = store.users.find(u => u.id === req.user.id);
      if (storeUser) {
        const { password, ...rest } = storeUser;
        user = rest;
      }
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, phone, avatar } = req.body;
    let updatedUser = null;

    if (mongoose.connection.readyState === 1) {
      const dbUser = await User.findById(req.user.id);
      if (dbUser) {
        if (name) dbUser.name = name;
        if (phone) dbUser.phone = phone;
        if (avatar) dbUser.avatar = avatar;
        await dbUser.save();
        const { password, _id, ...rest } = dbUser.toObject();
        updatedUser = { id: _id.toString(), ...rest };
      }
    } else {
      const user = store.users.find(u => u.id === req.user.id);
      if (user) {
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (avatar) user.avatar = avatar;
        const { password, ...rest } = user;
        updatedUser = rest;
      }
    }

    return res.status(200).json({
      message: 'Profile updated successfully!',
      user: updatedUser
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login, getMe, updateProfile };
