const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connection Successful...');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDatabase;