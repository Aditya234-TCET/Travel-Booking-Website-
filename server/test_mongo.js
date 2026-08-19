const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
console.log('Connecting to:', MONGO_URI);

mongoose.connect(MONGO_URI)
.then(() => {
  console.log('✅ Connected successfully!');
  process.exit(0);
})
.catch((err) => {
  console.error('❌ Connection error:', err);
  process.exit(1);
});
