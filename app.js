const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

var arrEmoji = [
  '◉◡◉✿',
  '(ಥ_ಥ)',
  '◕‿‿◕✿',
  '¯\\_(ツ)_/¯'
];

function sendMessage (chatId, resp, time) {
  bot.sendChatAction(chatId, 'typing');
  setTimeout(function () {
    bot.sendMessage(chatId, resp);
  }, time);
}

bot.onText(/\/nihao/, (msg, match) => {
  sendMessage(msg.chat.id, arrEmoji[0], 2000);
});

bot.onText(/\/sad/, (msg, match) => {
  sendMessage(msg.chat.id, arrEmoji[1], 2000);
});

bot.onText(/\/nya/, (msg, match) => {
  sendMessage(msg.chat.id, arrEmoji[2], 2000);
});

bot.onText(/\/what/, (msg, match) => {
  sendMessage(msg.chat.id, arrEmoji[3], 2000);
});

bot.on('message', (msg) => {
  if(msg.text.charAt(0) !== '/') {
    sendMessage(msg.chat.id, ':3', 2000);
  }
});
