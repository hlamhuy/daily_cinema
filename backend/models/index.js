const Movie = require('./movie');

Movie.sync({ alter: true });

module.exports = { Movie };
