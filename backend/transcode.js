const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { PORT, MOVIES_PATH, OUTPUT_PATH } = require('./utils/config');
const baseUrl = `http://localhost:${PORT}`;

const getId = async () => {
  const response = await axios.get(`${baseUrl}/id/max`);
  return Math.floor(Math.random() * response.data.max);
};

const getTomorrowDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);

  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}${month}${day}`;
};

const getMovieData = async () => {
  const id = await getId();
  const response = await axios.get(`${baseUrl}/id/${id}`);

  if (response.data.active === true) return response.data;
  else return getMovieData();
};

const deactivateMovie = async (imdbId) => {
  try {
    await axios.put(`${baseUrl}/${imdbId}`, {
      active: false,
    });
  } catch (error) {
    console.log(error);
  }
};

const transcoding = async (i, o, s) => {
  const command = `ffmpeg -y -i "${i}" -c:v copy -c:a aac -b:a 192k "${o}" -map 0:s:0 -scodec webvtt "${s}"`;

  exec(command, (error) => {
    if (!error) {
      console.log('Transcoding completed successfully!');
    } else {
      console.error(`Error executing ffmpeg: ${error.message}`);
      return;
    }
  });
};

const main = async () => {
  const data = await getMovieData();

  process.chdir(`${MOVIES_PATH}/${data.folder_name}`);

  const files = await fs.readdir(process.cwd());
  const outputFile = path.join(OUTPUT_PATH, `${getTomorrowDate()}.mp4`);
  const outputSub = path.join(OUTPUT_PATH, `${getTomorrowDate()}.en.vtt`);

  console.log(`Transcoding: ${data.folder_name}`);
  transcoding(files[0], outputFile, outputSub);

  await deactivateMovie(data.imdb_id);
};

main();
