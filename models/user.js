const mongoose = require('mongoose');

// One-to-Many | | (One User can have Many Bucket List Items)

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const bucketListSchema = new mongoose.Schema({
  activity: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  photo: {
    type: String,
  },
  status: {
    type: String,
    options: ['Not Started', 'In Progress', 'Completed'],
  },
});

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('BucketList', bucketListSchema);
