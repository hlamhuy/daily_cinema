const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);
const fs = require('fs');
const path = require('path');

const parseFolderName = (folderName) => {
  const regex = /(.*) \((\d{4})\) - \{imdb-(tt\d+)\}/;
  const match = folderName.match(regex);
  if (match) {
    const movieName = match[1].trim();
    const imdbId = match[3].trim();
    return { movieName, imdbId };
  }
  return null;
};

const insertMovie = async (folderName, movieName, imdbId) => {
  try {
    await Movie.create({
      folder_name: folderName,
      movie_name: movieName,
      imdb_id: imdbId,
    });
    console.log(`Inserted: ${folderName}`);
  } catch (err) {
    console.error('Error inserting data:', err);
  }
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

const main = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log('connected to the database');
    sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

main();

module.exports = { sequelize };
