const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { PORT, MOVIES_PATH, OUTPUT_PATH } = require('./utils/config');
const baseUrl = `http://localhost:${PORT}`;

const getId = (max) => {
  return Math.floor(Math.random() * max);
};

const getTomorrowDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);

  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}${month}${day}`;
};

const getMovie = async () => {
  let maxId = 0;

  if (!maxId) {
    const maxData = await axios.get(`${baseUrl}/id/max`);
    maxId = maxData.data.max;
  }

  let movieData = null;

  for (let i = 0; i < 5; i++) {
    const id = getId(maxId);
    const response = await axios.get(`${baseUrl}/id/${id}`);
    movieData = response.data.folder_name;
    console.log(movieData);
    if (movieData) break;
  }

  process.chdir(`${MOVIES_PATH}/${movieData}`);

  const files = await fs.readdir(process.cwd());
  const outputFile = path.join(OUTPUT_PATH, `${getTomorrowDate()}.mp4`);
  const outputSub = path.join(OUTPUT_PATH, `${getTomorrowDate()}.en.vtt`);
  
  const command = `ffmpeg -i "${files[0]}" -c:v copy -c:a aac -b:a 192k "${outputFile}" -map 0:s:0 -scodec webvtt ${outputSub}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing ffmpeg: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`FFmpeg stderr: ${stderr}`);
      return;
    }
    console.log(`FFmpeg stdout: ${stdout}`);
  });
};

(async () => {
  getMovie();
})();
