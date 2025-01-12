const mongoose = require('mongoose');

// One-to-Many | | (One User can have Many Bucket List Items)

const bucketListSchema = new mongoose.Schema({
  activity: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    options: ['Adventure', 'Travel', 'Career', 'Health', 'Family', 'Finance', 'Hobbies', 'Education', 'Social', 'Entertainment', 'Giving Back', 'General', 'Skills']
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
  bucketList: [bucketListSchema],
});

module.exports = mongoose.model('User', userSchema);
