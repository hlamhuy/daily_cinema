const fs = require('fs').promises;
const { OUTPUT_PATH } = require('./utils/config');

const getYesterdayDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);

  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}${month}${day}`;
};

const removeMovie = async (mp4, vtt) => {
  process.chdir(`${OUTPUT_PATH}`);
  await fs.unlink(mp4);
  await fs.unlink(vtt);
};

const main = () => {
  const rmFile = `${getYesterdayDate()}.mp4`;
  const rmSub = `${getYesterdayDate()}.en.vtt`;
  removeMovie(rmFile, rmSub);
};

main();
