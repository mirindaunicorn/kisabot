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

var arrAnswers = [
  'да, я тут:3',
  'что-что? внимательно слушаю',
  'я люблю котиков <3',
  'ты такой няша^^',
  'мяу-мяу, мрмрмрррр',
  'すみません。',
  'あなたは良い人です。',
  'あなたはどうですか？',
  '猫はすぐに世界を引き継ぐだろう。',
  '私は人間になりたい。。。'
];

function randomInt(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function sendMessage (chatId, resp, time) {
  bot.sendChatAction(chatId, 'typing');
  setTimeout(function () {
    bot.sendMessage(chatId, resp);
  }, time);
}

bot.onText(/\/nihao/, (msg, match) => {
  sendMessage(msg.chat.id, arrEmoji[0], randomInt(500, 2000));
});

bot.onText(/\/sad/, (msg, match) => {
  sendMessage(msg.chat.id, arrEmoji[1], randomInt(500, 2000));
});

bot.onText(/\/nya/, (msg, match) => {
  sendMessage(msg.chat.id, arrEmoji[2], randomInt(500, 2000));
});

bot.onText(/\/what/, (msg, match) => {
  sendMessage(msg.chat.id, arrEmoji[3], randomInt(500, 2000));
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
  var kisa = msg.text.match(/(Kisa|kisa|Kisabot|kisabot|bot|Bot|киса|кисабот|Киса|Кисабот|бот)/);
  /*var resp;*/
   if ((kisa == null && msg.text.charAt(0) !== '/')) {
     resp = arrEmoji[4];
   } else if (kisa !== null) {
     resp = arrAnswers[randomInt(0, arrAnswers.length-1)];
   }
  console.log (msg.text.charAt(0));
  /*var resp = (kisa !== null)
   ? arrAnswers[randomInt(0, arrAnswers.length-1)]
   : arrEmoji[4];*/

   /*if(a > 2) {
     resp = 'foo';
   } else {
     resp = 'bar';
   }
   resp = (a > 2) ? 'foo' : 'bar';*/

  sendMessage(msg.chat.id, resp, randomInt(500, 2000));
});
