const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/api/users', require('./routes/users'));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started on port ${PORT}`);
});