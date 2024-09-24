const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('movies', {
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
        unique: true
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('movies');
  },
};
