const router = require('express').Router();
const { Movie } = require('../models');

router.get('/', async (req, res) => {
  const movies = await Movie.findAll();
  res.json(movies);
});
router.post('/', async (req, res) => {
  const movie = await Movie.create(req.body);
  res.json(movie);
});

module.exports = router;
