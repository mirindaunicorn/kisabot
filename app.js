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
  '¯\\_(ツ)_/¯',
  ':3'
];

function randomTimer(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function sendMessage (chatId, resp, time) {
  bot.sendChatAction(chatId, 'typing');
  setTimeout(function () {
    bot.sendMessage(chatId, resp);
  }, time);
}

bot.onText(/\/nihao/, (msg, match) => {
  sendMessage(msg.chat.id, arrEmoji[0], randomTimer(500, 2000));
});

bot.onText(/\/sad/, (msg, match) => {
  sendMessage(msg.chat.id, arrEmoji[1], randomTimer(500, 2000));
});

bot.onText(/\/nya/, (msg, match) => {
  sendMessage(msg.chat.id, arrEmoji[2], randomTimer(500, 2000));
});

bot.onText(/\/what/, (msg, match) => {
  sendMessage(msg.chat.id, arrEmoji[3], randomTimer(500, 2000));
});

bot.onText(/\/list/, (msg, match) => {
  var list = arrEmoji.slice().reverse();
  for (let resp of list) {
    if (resp !== ':3') {
      bot.sendMessage(msg.chat.id, resp);
    }
  }
});

bot.on('message', (msg) => {
  if(msg.text.charAt(0) !== '/') {
<<<<<<< HEAD
    sendMessage(msg.chat.id, ':3', randomTimer(500, 2000));
=======
    sendMessage(msg.chat.id, arrEmoji[4], 2000);
    bot.sendMessage(msg.chat.id, '1');
>>>>>>> master
  }
});
