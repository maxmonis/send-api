const mongoose = require('mongoose');
require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.log('There was an error: ');
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
