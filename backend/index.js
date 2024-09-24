const express = require('express');
require('express-async-errors');
const app = express();

const { PORT } = require('./utils/config');
const { connectToDatabase } = require('./utils/db');

const moviesRouter = require('./controllers/movies');

app.use(express.json());
app.use('/', moviesRouter);

app.use((err, req, res, next) => {
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map((e) => e.message);
    return res.status(400).json({ error: errors });
  }
  next(err);
});

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
