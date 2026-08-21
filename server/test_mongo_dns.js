const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
console.log('Connecting to (using Google DNS):', MONGO_URI);

mongoose.connect(MONGO_URI)
.then(() => {
  console.log('✅ Connected successfully with Google DNS!');
  process.exit(0);
})
.catch((err) => {
  console.error('❌ Connection error:', err);
  process.exit(1);
});
