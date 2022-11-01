const axios = require('axios')

const telegram_tk = process.env.TELGRAM_BOT_TK
const id_groupchat = process.env.ID_GROUPCHAT

async function sendNotification(text) {
    const url = `https://api.telegram.org/bot${telegram_tk}/sendMessage`
    const options = {
        method: 'post',
        url,
        params: {
            chat_id: id_groupchat,
            text
        }
    };
    axios(options);
}

module.exports = sendNotification