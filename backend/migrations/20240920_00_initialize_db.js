import { DataTypes } from 'sequelize';

export async function up({ context: queryInterface }) {
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
    },
  });
}
export async function down({ context: queryInterface }) {
  await queryInterface.dropTable('movies');
}
