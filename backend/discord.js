const axios = require('axios');
const { WEBHOOK_URL } = require('./utils/config');

const sendWebhook = (status, name, imdb) => {
  const embedColor = status ? 65280 : 16711680;
  const embedTitle = status ? 'Transcode Completed' : 'Transcode Failed';
  const embed = {
    embeds: [
      {
        title: embedTitle,
        color: embedColor,
        fields: [
          {
            name: 'Name: ',
            value: name,
          },
          {
            name: 'IMDB: ',
            value: imdb,
          },
        ],
        timestamp: new Date(),
      },
    ],
  };

  axios.post(WEBHOOK_URL, embed);
};

module.exports = { sendWebhook };
