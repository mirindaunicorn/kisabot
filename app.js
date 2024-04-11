// const TelegramBot = require('node-telegram-bot-api');
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv'; dotenv.config();
// const [] = require('./birthdayActions.js');
import {addBirthday, getAllBirthdays} from './app/birthdayActions.js';
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;
// Create a bot that uses 'polling' to fetch new updates
export const bot = new TelegramBot(token, {polling: true});
//some simple command
const arrEmoji = ['◉◡◉✿', '(ಥ_ಥ)', '◕‿‿◕✿', '¯\\_(ツ)_/¯', ':3'];
//Random answers when user mentions bot name
const arrAnswers = [
    'я тут:3',
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

function sendMessage(chatId, resp, time, options) {
  if(typeof options === 'undefined' && options === null) {
    options = [];
  }
  bot.sendChatAction(chatId, 'typing');
  setTimeout(function () {
    bot.sendMessage(chatId, resp, options);
  }, time);
}

bot.onText(/\/set_birthday/, (msg, match) => {
    let datePattern = /^\d{2}\.\d{2}$/, 
        dateYearPattern = /^\d{2}\.\d{2}\.\d{4}$/,
        chatId = msg.chat.id,
        userId = msg.from.id,
        birthdayDate = msg.text.split(' ')[1];

    if (!birthdayDate) {
        bot.sendMessage(
            chatId,
            'Додамо твій дн? Повтори команду, додавши в кінці дату в форматі ДД.ММ або ДД.ММ.РРРР. Я чекаю!'
        );
    } else {
        let validDateWithYear = birthdayDate.match(dateYearPattern),
            validDate = birthdayDate.match(datePattern);

        if (validDateWithYear) {
            addBirthday(bot, chatId, userId, validDateWithYear[0]);

            bot.sendMessage(chatId, 'Дякую, я зберегла твій день народження!:3 ' + validDateWithYear);
        } else if (validDate){
            validDate = validDate[0] + '.' + new Date().getFullYear();
            addBirthday(bot, chatId, userId, validDate);

            bot.sendMessage(chatId, 'Дякую, я зберегла твій день народження!:3 ' + validDate);
        } else {
            bot.sendMessage(
                chatId,
                'Ой, невалідні дані Т_Т надішли будь ласка свій день народження в форматі ДД.ММ або ДД.ММ.РРРР'
            );
        }
    }
});

bot.onText(/\/all_birthdays/, (msg, match) => {
    let chatId = msg.chat.id,
        userId = msg.from.id;

    getAllBirthdays(bot, chatId, userId);
});

bot.onText(/\/nihao/, (msg, match) => {sendMessage(msg.chat.id, arrEmoji[0], randomInt(500, 2000));});
bot.onText(/\/sad/, (msg, match) => {sendMessage(msg.chat.id, arrEmoji[1], randomInt(500, 2000));});
bot.onText(/\/nya/, (msg, match) => {sendMessage(msg.chat.id, arrEmoji[2], randomInt(500, 2000));});
bot.onText(/\/what/, (msg, match) => {sendMessage(msg.chat.id, arrEmoji[3], randomInt(500, 2000));});

bot.on('message', (msg) => {
  var kisa = msg.text.match(/(Kisa|kisa|Kisabot|kisabot|киця|кіса|Кіса|кісабот|кицю)/);
  var kisa2 = msg.text.match(/k1sa_bot/);
        /*added for command correctly working;
        *without it @kisa_dev_bot will send 2 messages - random answer and command answer*/
   if ((kisa == null && msg.text.charAt(0) !== '/' && kisa2 == null)) {
    // sendMessage(msg.chat.id, arrEmoji[4], randomInt(500, 2000));
   } else if (kisa !== null && kisa2 == null) {
    sendMessage(msg.chat.id, arrAnswers[randomInt(0, arrAnswers.length-1)], randomInt(500, 2000));
   }
});

// TODO: ban command prototype
// bot.onText(/\/ban/, (msg, match) => {
//   if (typeof msg.reply_to_message.from.username !== 'undefined') {
//     sendMessage(msg.chat.id, 'Пользователь @' + msg.reply_to_message.from.username + ' забанен.', randomInt(500, 2000));
//   } else {
//     var resp = 'Пользователь *' + msg.reply_to_message.from.first_name + ' '
//     + ((typeof msg.reply_to_message.from.last_name !== 'undefined') ? msg.reply_to_message.from.last_name : '')
//     + '* забанен.';
//     sendMessage(msg.chat.id, resp, randomInt(500, 2000), {
//       parse_mode: 'Markdown',
//         /*reply_to_message_id: msg.message_id*/ //for replying on message
//         });
//     }
//   });
