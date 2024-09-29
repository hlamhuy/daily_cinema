const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { PORT, MOVIES_PATH, OUTPUT_PATH } = require('./utils/config');
const baseUrl = `http://localhost:${PORT}`;
const { sendWebhook } = require('./discord');

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

const transcoding = async (data) => {
  process.chdir(`${MOVIES_PATH}/${data.folder_name}`);

  const files = await fs.readdir(process.cwd());
  const outputFile = path.join(OUTPUT_PATH, `${getTomorrowDate()}.mp4`);
  const outputSub = path.join(OUTPUT_PATH, `${getTomorrowDate()}.en.vtt`);
  const command = `ffmpeg -y -i "${files[0]}" -c:v copy -c:a aac -b:a 192k "${outputFile}" -map 0:s:0 -scodec webvtt "${outputSub}"`;

  exec(command, (error) => {
    if (!error) {
      sendWebhook(true, data.movie_name, data.imdb_id);
    } else {
      sendWebhook(false, data.movie_name, data.imdb_id);
    }
  });
};

const main = async () => {
  const data = await getMovieData();
  console.log(`Transcoding: ${data.folder_name}`);
  transcoding(data);
  await deactivateMovie(data.imdb_id);
};

main();
