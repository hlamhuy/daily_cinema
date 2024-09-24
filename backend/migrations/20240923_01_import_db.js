const fs = require('fs');
const { MOVIES_PATH } = require('../utils/config');

module.exports = {
  up: async ({ context: queryInterface }) => {
    try {
      const directoryPath = MOVIES_PATH;
      const movies = [];

      // Read the contents of the directory
      const subfolders = fs.readdirSync(directoryPath);

      // Regex to extract "Movie Name", "Year", and "imdb_id" from folder names
      const folderRegex =
        /^(?<movie_name>.+?) \((?<year>\d{4})\) \{imdb-(?<imdb_id>tt\d+)\}$/;

      for (const folder of subfolders) {
        const match = folder.match(folderRegex);
        if (match) {
          const { movie_name, imdb_id } = match.groups;

          // Add the movie to the array
          movies.push({
            folder_name: folder, 
            movie_name: movie_name,
            imdb_id: imdb_id,
            active: true, 
            created_at: new Date(),
            updated_at: new Date(),
          });
        } else {
          console.error(
            `Folder name "${folder}" did not match the expected format`
          );
        }
      }
      await queryInterface.bulkInsert('movies', movies);
    } catch (error) {
      console.error('Error processing folder data:', error);
    }
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('movies', null, {});
  },
};
