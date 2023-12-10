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
  'так, я тут:3',
  'що? уважно слухаю',
  'я люблю котиків <3',
  'ти така няша^^',
  'すみません。',
  'あなたは良い人です。',
  'あなたはどうですか？',
  '猫はすぐに世界を引き継ぐだろう。',
  '私は人間になりたい。。。'
];

function randomInt(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function sendMessage (chatId, resp, time, options) {
  if(typeof options === 'undefined' && options === null) {
    options = [];
  }
  bot.sendChatAction(chatId, 'typing');
  setTimeout(function () {
    bot.sendMessage(chatId, resp, options);
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

bot.onText(/\/ban/, (msg, match) => {
  if (typeof msg.reply_to_message.from.username !== 'undefined') {
    sendMessage(msg.chat.id, 'Пользователь @' + msg.reply_to_message.from.username + ' забанен.', randomInt(500, 2000));
  } else {
    var resp = 'Пользователь *' + msg.reply_to_message.from.first_name + ' '
    + ((typeof msg.reply_to_message.from.last_name !== 'undefined') ? msg.reply_to_message.from.last_name : '')
    + '* забанен.';
    sendMessage(msg.chat.id, resp, randomInt(500, 2000), {
      parse_mode: 'Markdown',
      /*reply_to_message_id: msg.message_id*/ //for replying on message
  });
  }
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
  var kisa2 = msg.text.match(/kisa_dev_bot/);
  /*added for command correctly working;
  *without it @kisa_dev_bot will send 2 messages - random answer and command answer*/
   if ((kisa == null && msg.text.charAt(0) !== '/' && kisa2 == null)) {
    sendMessage(msg.chat.id, arrEmoji[4], randomInt(500, 2000));
   } else if (kisa !== null && kisa2 == null) {
    sendMessage(msg.chat.id, arrAnswers[randomInt(0, arrAnswers.length-1)], randomInt(500, 2000));
   }
  /*var resp = (kisa !== null) ? arrAnswers[randomInt(0, arrAnswers.length-1)] : arrEmoji[4];*/

   /*if(a > 2) {
     resp = 'foo';
   } else {
     resp = 'bar';
   }
   resp = (a > 2) ? 'foo' : 'bar';*/
});
