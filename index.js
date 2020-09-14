const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.static('uploads'));

app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/links', require('./routes/links'));
app.use('/files', require('./routes/files'));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started on port ${PORT}`);
});
