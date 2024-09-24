const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../utils/db');

class Movie extends Model {}
Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    folder_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    movie_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imdb_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'movies',
  }
);

module.exports = Movie;
