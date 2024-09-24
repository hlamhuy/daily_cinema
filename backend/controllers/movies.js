const router = require('express').Router();
const { Movie } = require('../models');

const movieFinder = async (req, res, next) => {
  req.movie = await Movie.findByPk(req.params.id);
  next();
};

router.get('/', async (req, res) => {
  const movies = await Movie.findAll();
  res.json(movies);
});
router.post('/', async (req, res) => {
  const movie = await Movie.create(req.body);
  res.json(movie);
});

router.delete('/:id', movieFinder, async (req, res) => {
  await req.movie.destroy();
  return res.status(204).end();
});

router.put('/:imdb_id', async (req, res) => {
  const { imdb_id } = req.params;
  const { active } = req.body;

  if (typeof active !== 'boolean') {
    return res.status(400).json({ error: "'active' field must be a boolean" });
  }

  const movie = await Movie.findOne({ where: { imdb_id } });

  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  movie.active = active;
  await movie.save();

  res.json(movie);
});

module.exports = router;
