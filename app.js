const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


function sendMessage (chatId, resp) {
  bot.sendChatAction(chatId, 'typing');
  setTimeout(function () {
    bot.sendMessage(chatId, resp);
  }, 2000);
}


bot.onText(/\/nihao/, (msg, match) => {
  sendMessage(msg.chat.id, '◉◡◉✿');
});

bot.onText(/\/sad/, (msg, match) => {
  sendMessage(msg.chat.id, '(ಥ_ಥ)');
});

bot.onText(/\/nya/, (msg, match) => {
  sendMessage(msg.chat.id, '◕‿‿◕✿');
});

bot.onText(/\/what/, (msg, match) => {
  sendMessage(msg.chat.id, '¯\\_(ツ)_/¯');
});


bot.on('message', (msg) => {
  if(msg.text.charAt(0) !== '/') {
    sendMessage(msg.chat.id, ':3');
  }
});
